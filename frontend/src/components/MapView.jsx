import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Circle,
    useMap,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import socket from "../services/socket";
import "leaflet.heat";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Layers, Sparkles } from "lucide-react";
import { useTranslation } from 'react-i18next';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom colored markers
const createCustomIcon = (color) =>
    new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

const icons = {
    high: createCustomIcon("red"),
    moderate: createCustomIcon("orange"),
    low: createCustomIcon("green"),
    default: createCustomIcon("blue"),
};

const getIconForRisk = (level) => {
    switch (level?.toLowerCase()) {
        case "high":
            return icons.high;
        case "moderate":
            return icons.moderate;
        case "low":
            return icons.low;
        default:
            return icons.default;
    }
};

// Automatically update map center
const MapUpdater = ({ center }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.flyTo(center, map.getZoom(), { animate: true });
        }
    }, [center, map]);

    return null;
};

// Detect map clicks
const MapClickHandler = ({ onMapClick }) => {
    useMapEvents({
        click(e) {
            if (onMapClick) onMapClick(e.latlng);
        },
    });

    return null;
};

// Heatmap Layer component
const HeatmapLayer = ({ reports, show }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !show || !reports) return;

        // format: [latitude, longitude, intensity]
        const heatData = reports
            .filter((r) => r.location?.coordinates)
            .map((r) => [
                r.location.coordinates[1],
                r.location.coordinates[0],
                r.riskScore ? r.riskScore / 100 : 0.5,
            ]);

        const heatLayer = L.heatLayer(heatData, {
            radius: 25,
            blur: 15,
            maxZoom: 10,
        }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map, reports, show]);

    return null;
};

const MapView = ({ reports = [], clusters = [], onMapClick }) => {
    const { t } = useTranslation();
    const defaultCenter = [34.0522, -118.2437];
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [dynamicCenter, setDynamicCenter] = useState(null);

    useEffect(() => {
        // Listen exclusively for new high-density clusters from the AlertEngine
        socket.on("hazard-alert", (alertPayload) => {
            if (alertPayload.location && alertPayload.location.length === 2) {
                // GeoJSON sends [lng, lat], Leaflet wants [lat, lng]
                setDynamicCenter([alertPayload.location[1], alertPayload.location[0]]);
            }
        });

        return () => {
            socket.off("hazard-alert");
        };
    }, []);

    const latest = reports?.[0];

    const center = dynamicCenter || (latest?.location?.coordinates
        ? [latest.location.coordinates[1], latest.location.coordinates[0]]
        : defaultCenter);

    return (
        <div className="w-full h-full rounded-2xl overflow-hidden glass-panel border border-white/10 relative z-0">
            {/* Heatmap Toggle Control */}
            <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`absolute top-4 right-4 z-[1000] flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-md shadow-lg transition-all
                    ${showHeatmap
                        ? 'bg-orange-500/90 text-white border-orange-400 shadow-orange-500/20'
                        : 'bg-white/90 text-slate-800 border-white/50 hover:bg-white'
                    }`}
            >
                <Layers className="w-4 h-4" />
                <span className="text-sm font-semibold">{showHeatmap ? t('MapHeatmapOn', 'Heatmap On') : t('MapHeatmapOff', 'Heatmap Off')}</span>
            </button>

            <MapContainer center={center} zoom={10} className="w-full h-full">
                <MapUpdater center={center} />
                <MapClickHandler onMapClick={onMapClick} />

                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <HeatmapLayer reports={reports} show={showHeatmap} />

                {/* Clustered markers */}
                <MarkerClusterGroup>
                    {reports.map((report) => {
                        if (!report.location?.coordinates) return null;

                        const lat = report.location.coordinates[1];
                        const lng = report.location.coordinates[0];

                        const imagePath = report.imageUrl || report.image;

                        const imageSrc = imagePath
                            ? imagePath.startsWith("http")
                                ? imagePath
                                : `http://localhost:5000${imagePath}`
                            : null;

                        return (
                            <Marker
                                key={report._id}
                                position={[lat, lng]}
                                icon={getIconForRisk(report.riskLevel)}
                            >
                                <Popup className="custom-popup">
                                    <div className="p-1 max-w-xs">
                                        {imageSrc && (
                                            <img
                                                src={imageSrc}
                                                alt="Hazard"
                                                className="w-full h-32 object-cover rounded-lg mb-2"
                                            />
                                        )}

                                        <div className="flex flex-col mb-2">
                                            <h3 className="font-bold text-gray-900 leading-tight">
                                                {report.hazardType || t('MapHazard', 'Hazard')}
                                            </h3>
                                            {report.aiConfidence > 0 && (
                                                <div className="flex flex-col gap-1 mt-1 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                                                    <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                                                        <Sparkles className="w-3 h-3" />
                                                        {t('MapAIDetected', 'AI Detected')} ({report.aiConfidence.toFixed(0)}%)
                                                    </div>
                                                    {report.aiExplanation && (
                                                        <p className="text-[10px] text-gray-600 leading-snug italic line-clamp-2">"{report.aiExplanation}"</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mb-2 mt-1">
                                            <span
                                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${report.riskLevel?.toLowerCase() === "high"
                                                    ? "bg-red-500"
                                                    : report.riskLevel?.toLowerCase() === "moderate"
                                                        ? "bg-orange-500"
                                                        : "bg-green-500"
                                                    }`}
                                            >
                                                {report.riskLevel || "Low"} {t('MapRiskSuffix', 'Risk')}
                                            </span>

                                            <span className="text-[10px] font-semibold text-gray-500">
                                                {t('MapScore', 'Score:')} {report.riskScore?.toFixed(0) || "N/A"}
                                            </span>
                                        </div>

                                        <p className="text-xs text-gray-600 line-clamp-3">
                                            {report.description}
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MarkerClusterGroup>

                {/* Render Danger Clusters */}
                {clusters.map((cluster, idx) => (
                    <Circle
                        key={`cluster-${idx}`}
                        center={cluster.clusterCenter}
                        radius={5000}
                        pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.2 }}
                    />
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView;
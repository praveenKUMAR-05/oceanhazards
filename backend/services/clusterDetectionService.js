// Uses Haversine formula to compute geographical distances between coordinates
// and groups high-risk hazard reports into geographical clusters.

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

// Detects clusters from a list of reports.
// Condition: >= 3 reports within 5km, with an average risk score > 60.
const detectClusters = (reports) => {
    let clusters = [];
    let visited = new Set();
    const RADIUS_KM = 5;

    for (let i = 0; i < reports.length; i++) {
        if (visited.has(reports[i]._id.toString())) continue;

        // Ensure coordinates exist
        if (!reports[i].location || !reports[i].location.coordinates) continue;

        let cluster = [reports[i]];
        let reportLat = reports[i].location.coordinates[1];
        let reportLon = reports[i].location.coordinates[0];

        visited.add(reports[i]._id.toString());

        // Find neighbors
        for (let j = 0; j < reports.length; j++) {
            if (i === j || visited.has(reports[j]._id.toString())) continue;

            // Ensure coordinates exist
            if (!reports[j].location || !reports[j].location.coordinates) continue;

            const neighborLat = reports[j].location.coordinates[1];
            const neighborLon = reports[j].location.coordinates[0];

            const distance = calculateDistance(reportLat, reportLon, neighborLat, neighborLon);

            if (distance <= RADIUS_KM) {
                cluster.push(reports[j]);
                visited.add(reports[j]._id.toString());
            }
        }

        if (cluster.length >= 3) {
            // Calculate average risk
            const totalRisk = cluster.reduce((sum, r) => sum + (r.riskScore || 0), 0);
            const averageRisk = totalRisk / cluster.length;

            if (averageRisk > 35) {
                // Calculate centroid
                const sumLat = cluster.reduce((sum, r) => sum + r.location.coordinates[1], 0);
                const sumLon = cluster.reduce((sum, r) => sum + r.location.coordinates[0], 0);

                clusters.push({
                    clusterCenter: [sumLat / cluster.length, sumLon / cluster.length], // [lat, lon]
                    reportCount: cluster.length,
                    averageRisk: Math.round(averageRisk)
                });
            }
        }
    }

    return clusters;
};

module.exports = { detectClusters };

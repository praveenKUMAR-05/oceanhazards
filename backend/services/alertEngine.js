const checkAndEmitAlert = (report, io, nearbyCount) => {
    // Alert logic conditions based on final requirements
    const isHighRisk = report.riskScore > 70;
    const isCluster = nearbyCount > 5;
    const isSevereWeather = report.weatherSeverity > 80; // Assuming 0-100 scale
    const isMultiConfirmed = report.confirmations >= 3;

    if (isHighRisk || isCluster || isSevereWeather || isMultiConfirmed) {

        // Define root cause for front-end parsing
        let primaryCause = "High Risk Factors Detected";
        if (isCluster) primaryCause = "Hazard Cluster Detected (Density)";
        if (isSevereWeather) primaryCause = "Severe Weather Correlation";
        if (isMultiConfirmed) primaryCause = "User Verified Hazard";

        const alertPayload = {
            type: "HAZARD_CLUSTER",
            severity: "high",
            location: report.location.coordinates, // [lng, lat]
            nearbyReports: nearbyCount,
            message: primaryCause,
            hazardType: report.hazardType,
            reportId: report._id
        };

        if (io) {
            io.emit("hazard-alert", alertPayload);
            console.log("ALERT ENGINE: Triggered HAZARD_CLUSTER socket emission", alertPayload.message);
        }
    }
};

module.exports = { checkAndEmitAlert };

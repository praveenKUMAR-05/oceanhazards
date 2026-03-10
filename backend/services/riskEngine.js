// Calculates a risk score based on aggregated factors using Smartathon formula
const calculateRisk = (aiConfidence, weatherSeverity, userCredibility, nearbyReports) => {
    // Smartathon Risk formula:
    // RiskScore = 0.4 * weatherSeverity + 0.3 * aiConfidence + 0.2 * nearbyReports + 0.1 * userCredibility

    // Scale nearbyReports to a proper 0-100 range (e.g., 10 reports = 100 max)
    const cappedNearbyScore = Math.min(nearbyReports * 10, 100);

    const riskScore = Math.round(
        (0.4 * weatherSeverity) +
        (0.3 * aiConfidence) +
        (0.2 * cappedNearbyScore) +
        (0.1 * userCredibility)
    );

    let riskLevel = 'low';

    // Smartathon defined boundaries
    if (riskScore >= 61) {
        riskLevel = 'high';
    } else if (riskScore >= 31) {
        riskLevel = 'moderate';
    } else {
        riskLevel = 'low';
    }

    return { riskScore, riskLevel };
};

module.exports = { calculateRisk };

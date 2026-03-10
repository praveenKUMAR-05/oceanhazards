// AI Hazard Detection Service
const detectHazard = (description) => {
    if (!description) {
        return { hazardType: 'Unknown', confidence: 0 };
    }

    const descLowerCase = description.toLowerCase();

    let hazardType = 'Unknown';
    let confidence = 0.5; // Default low confidence

    if (descLowerCase.includes('wave')) {
        hazardType = 'High Waves';
        confidence = 0.85;
    } else if (descLowerCase.includes('storm')) {
        hazardType = 'Storm';
        confidence = 0.90;
    } else if (descLowerCase.includes('oil')) {
        hazardType = 'Oil Spill';
        confidence = 0.95;
    } else if (descLowerCase.includes('debris')) {
        hazardType = 'Floating Debris';
        confidence = 0.80;
    }

    return { hazardType, confidence };
};

module.exports = { detectHazard };

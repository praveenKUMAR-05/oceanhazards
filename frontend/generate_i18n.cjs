const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, 'src', 'i18n.js');
const keysData = JSON.parse(fs.readFileSync(path.join(__dirname, 'extracted_keys.json'), 'utf8'));

// Load custom mappings
const esMapping = JSON.parse(fs.readFileSync(path.join(__dirname, 'es.json'), 'utf8'));
const frMapping = JSON.parse(fs.readFileSync(path.join(__dirname, 'fr.json'), 'utf8'));
const taMapping = JSON.parse(fs.readFileSync(path.join(__dirname, 'ta.json'), 'utf8'));

const oldResources = {
    EN: {
        "Home": "Home",
        "Features": "Features",
        "Technology": "Technology",
        "Solutions": "Solutions",
        "Developers": "Developers",
        "Contact": "Contact",
        "Login": "Login",
        "Register": "Register",
        "HeroBadge": "OceanShield Platform 2.0 Is Live",
        "HeroTitle1": "AI-Powered Ocean Hazard",
        "HeroTitle2": "Intelligence Platform",
        "HeroDescription": "Real-time crowdsourced hazard monitoring, AI validation, and automated alerts for safer oceans. Protect coastal communities and marine operations with predictive insights.",
        "GetStarted": "Get Started",
        "ViewDemo": "View Demo",
    },
    ES: {
        "Home": "Inicio",
        "Features": "Características",
        "Technology": "Tecnología",
        "Solutions": "Soluciones",
        "Developers": "Desarrolladores",
        "Contact": "Contacto",
        "Login": "Iniciar sesión",
        "Register": "Registro",
        "HeroBadge": "OceanShield Plataforma 2.0 en vivo",
        "HeroTitle1": "Riesgo Oceánico Impulsado por IA",
        "HeroTitle2": "Plataforma de Inteligencia",
        "HeroDescription": "Monitoreo de riesgos en tiempo real mediante crowdsourcing, validación por IA y alertas automatizadas para océanos más seguros. Proteja las comunidades costeras y las operaciones marinas con información predictiva.",
        "GetStarted": "Empezar",
        "ViewDemo": "Ver Demo",
    },
    FR: {
        "Home": "Accueil",
        "Features": "Caractéristiques",
        "Technology": "Technologie",
        "Solutions": "Solutions",
        "Developers": "Développeurs",
        "Contact": "Contact",
        "Login": "Connexion",
        "Register": "S'inscrire",
        "HeroBadge": "La plateforme OceanShield 2.0 est en ligne",
        "HeroTitle1": "Risque Océanique Propulsé par l'IA",
        "HeroTitle2": "Plateforme d'Intelligence",
        "HeroDescription": "Surveillance des risques en temps réel par crowdsourcing, validation par l'IA et alertes automatisées pour des océans plus qui. Protégez les communautés côtières et les opérations maritimes grâce à des informations prédictives.",
        "GetStarted": "Commencer",
        "ViewDemo": "Voir la Démo",
    },
    Tamil: {
        "Home": "முகப்பு",
        "Features": "அம்சங்கள்",
        "Technology": "தொழில்நுட்பம்",
        "Solutions": "தீர்வுகள்",
        "Developers": "உருவாக்குநர்கள்",
        "Contact": "தொடர்பு கொள்ள",
        "Login": "உள்நுழைய",
        "Register": "பதிவு செய்ய",
        "HeroBadge": "OceanShield பிளாட்ஃபார்ம் 2.0 நேரலையில் உள்ளது",
        "HeroTitle1": "AI-ஆதரவு பெற்ற கடல் அபாயம்",
        "HeroTitle2": "நுண்ணறிவு தளம்",
        "HeroDescription": "நிகழ்நேர பொதுமக்களிடமிருந்து அபாய கண்காணிப்பு, AI சரிபார்ப்பு மற்றும் பாதுகாப்பான கடல்களுக்கான தானியங்கி எச்சரிக்கைகள். முன்கணிப்பு நுண்ணறிவுகளுடன் கடலோர சமூகங்கள் மற்றும் கடல்சார் நடவடிக்கைகளைப் பாதுகாக்கவும்.",
        "GetStarted": "தொடங்கு",
        "ViewDemo": "டெமோவை காண்க",
    }
};

const newResources = JSON.parse(JSON.stringify(oldResources));

for (const [key, value] of Object.entries(keysData)) {
    if (!newResources.EN[key]) newResources.EN[key] = value;
    if (!newResources.ES[key]) newResources.ES[key] = esMapping[key] || `[ES] ${value}`;
    if (!newResources.FR[key]) newResources.FR[key] = frMapping[key] || `[FR] ${value}`;
    if (!newResources.Tamil[key]) newResources.Tamil[key] = taMapping[key] || `[TA] ${value}`;
}

const fileContent = `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    EN: { translation: ${JSON.stringify(newResources.EN, null, 8).replace(/\n/g, '\n    ')} },
    ES: { translation: ${JSON.stringify(newResources.ES, null, 8).replace(/\n/g, '\n    ')} },
    FR: { translation: ${JSON.stringify(newResources.FR, null, 8).replace(/\n/g, '\n    ')} },
    Tamil: { translation: ${JSON.stringify(newResources.Tamil, null, 8).replace(/\n/g, '\n    ')} }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'EN', // default language
        fallbackLng: 'EN',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
`;

fs.writeFileSync(i18nPath, fileContent);

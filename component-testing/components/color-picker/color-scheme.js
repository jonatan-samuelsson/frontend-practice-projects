const docHead = document.querySelector('head');


const primaries = document.querySelector('#clrs-primary');
const accents = document.querySelector('#clrs-accent');
const neutrals = document.querySelector('#clrs-neutral');

<<<<<<< HEAD

const primaryColor = { 'h': 0, 's': 60, 'l': 55 };
const accentColor = { 'h': 160, 's': 60, 'l': 55 };
const neutralColor = { 'h': 230, 's': 20, 'l': 30 };


const colors = [
    {
        'element': primaries,
        'baseColor': primaryColor,
        'varString': '--clr-primary-',
    },
    {
        'element': accents,
        'baseColor': accentColor,
        'varString': '--clr-accent-',
    },
    {
        'element': neutrals,
        'baseColor': neutralColor,
        'varString': '--clr-neutral-',
    }

];


function populateColorDisplay(display, palette) {
    console.log(palette);
=======
const primaryControls = document.querySelector('#controls-primary');
const accentControls = document.querySelector('#controls-accent');
const neutralControls = document.querySelector('#controls-neutral');


const primaryColor = { 'h': 190, 's': 85, 'l': 60 };
const accentColor = { 'h': 0, 's': 85, 'l': 60 };
const neutralColor = { 'h': 200, 's': 5, 'l': 10 };


const paletteObjects = 
    {
    'primary': {
        'control': primaryControls,
        'element': primaries,
        'baseColor': primaryColor,
        'varString': '--clr-primary-',
        'styleTag': document.createElement('style'),
        'palette': {},
    },
    'accent': {
        'control': accentControls,
        'element': accents,
        'baseColor': accentColor,
        'varString': '--clr-accent-',
        'styleTag': document.createElement('style'),
        'palette': {},
    },
    'neutral': {
        'control': neutralControls,
        'element': neutrals,
        'baseColor': neutralColor,
        'varString': '--clr-neutral-',
        'styleTag': document.createElement('style'),
        'palette': {},
    }
};

function generateAutoPalette(fromPaletteObject) {
    
}

function updatePalette(paletteObject) {
    
    
    const colorValues = new FormData(paletteObject.control);

    paletteObject.baseColor.h = colorValues.get('hue');
    paletteObject.baseColor.s = colorValues.get('saturation');
    paletteObject.baseColor.l = colorValues.get('light');

    console.log(paletteObject.baseColor);

    paletteObject.palette = generatePalette(paletteObject);
    injectStyleTag(paletteObject);


}


function populateColorDisplay(paletteObject) {
    
    const display = paletteObject.element;
    const palette = paletteObject.palette;
    for (const oldPiece of Object.values(display.querySelectorAll('.palette-piece'))) {
            display.removeChild(oldPiece);
        }
>>>>>>> 11451c5e40d755e5f70fec523cd97c99973a19a3
    for (const shade of Object.keys(palette)) {
        const palettePiece = document.createElement('div');
        palettePiece.className = 'color palette-piece';
        palettePiece.style.backgroundColor = `var(${shade})`;
<<<<<<< HEAD
=======
        palettePiece.appendChild(createPaletteLabel(shade));
        
>>>>>>> 11451c5e40d755e5f70fec523cd97c99973a19a3
        display.appendChild(palettePiece);
    }
}

<<<<<<< HEAD


function makeStyleTag(palette) {
    const styleTag = document.createElement('style');
    let rootStyle = "\:root \{\n";

    for (const [_var, color] of Object.entries(palette)) {
        rootStyle += `${_var}: ${color}\;\n`
    }
    rootStyle += `\}`;
    styleTag.innerHTML = rootStyle;
    return styleTag;
=======
function createPaletteLabel(shade) {
    const pieceLabel = document.createElement('div');
    pieceLabel.className = "piece-label";
    pieceLabel.textContent = shade;
    return pieceLabel;
>>>>>>> 11451c5e40d755e5f70fec523cd97c99973a19a3
}



<<<<<<< HEAD
function generatePalette(color) {
    let output = {};
    const baseSaturation = color.baseColor.s;
    const baseLightness = color.baseColor.l;
    const baseHue = color.baseColor.h;

    output[color.varString + '400'] = `hsl(${baseHue}, ${baseSaturation}\%, ${baseLightness}\%)`;

    output = { ...generateLights(), ...output, ...generateDarks() };

=======
function injectStyleTag(paletteObject) {
    
    
    let rootStyle = "\:root \{\n";

    for (const [_var, color] of Object.entries(paletteObject.palette)) {
        rootStyle += `${_var}: ${color}\;\n`
    }
    rootStyle += `\}`;
    paletteObject.styleTag.innerHTML = rootStyle;
    docHead.appendChild(paletteObject.styleTag);
}



function generatePalette(paletteObject) {
    const darkSaturationCeiling = 100;
    const darkLightnessFloor = 9;

    const lightSaturationFloor = 15;
    const lightLightnessCeiling = 90;

    let output = {};
    const baseSaturation = paletteObject.baseColor.s;
    const baseLightness = paletteObject.baseColor.l;
    const baseHue = paletteObject.baseColor.h;

    const baseColorObject = {};
    const lights = generateLights();
    baseColorObject[`${paletteObject.varString}500`] = `hsl(${baseHue}, ${baseSaturation}\%, ${baseLightness}\%)`;
    
    const darks = generateDarks();

    output = { ...lights, ...baseColorObject, ...darks };
    console.log(output);
>>>>>>> 11451c5e40d755e5f70fec523cd97c99973a19a3
    return output;

    function generateLights() {
        let lightOutput = {};


<<<<<<< HEAD
        const lightsLightnessScale = 98 - baseLightness;
        const lightsSaturationScale = baseSaturation - 10;
        const lightsLightnesStep = lightsLightnessScale / 4;
        const lightsSaturationStep = lightsSaturationScale / 4;
        for (let i = 4; i >= 1; i--) {
            const lightsSaturation = baseSaturation - (lightsSaturationStep * i);
            const lightsLightness = baseLightness + (lightsLightnesStep * i);

            lightOutput[color.varString + String(i * 100)] = `hsl(${baseHue}, ${lightsSaturation}\%, ${lightsLightness}\%)`;
=======
        const lightsLightnessScale = lightLightnessCeiling - Number(baseLightness);
        const lightsSaturationScale = Number(baseSaturation) - lightSaturationFloor;
        const lightsLightnesStep = lightsLightnessScale / 4;
        const lightsSaturationStep = lightsSaturationScale / 4;
        console.log(lightsLightnessScale, lightsSaturationScale, lightsLightnesStep, lightsSaturationStep);
        const idSwitch = {
            '1': '400',
            '2': '300',
            '3': '200',
            '4': '100'
        }

        for (let i = 4; i >= 1; i--) {
            const lightsSaturation = Number(baseSaturation) - (lightsSaturationStep * i);
            const lightsLightness = Number(baseLightness) + (lightsLightnesStep * i);
            console.log(lightsSaturation, lightsLightness);
            lightOutput[paletteObject.varString + idSwitch[String(i)]] = `hsl(${baseHue}, ${lightsSaturation}\%, ${lightsLightness}\%)`;
>>>>>>> 11451c5e40d755e5f70fec523cd97c99973a19a3

        }

        return lightOutput;



    }

    function generateDarks() {
        let darkOutput = {};
<<<<<<< HEAD
        const darkLightnessScale = baseLightness - 10;
        const darkSaturationScale = 98 - baseSaturation;
        const darkLightnessStep = darkLightnessScale / 4;
        const darkSaturationStep = darkSaturationScale / 4;
        for (let i = 1; i <= 4; i++) {
            const darkSaturation = baseSaturation + (darkSaturationStep * i);
            const darkLightness = baseLightness - (darkLightnessStep * i);

            darkOutput[color.varString + String((i + 5) * 100)] = `hsl(${baseHue}, ${darkSaturation}\%, ${darkLightness}\%)`;
=======
        const darkLightnessScale = Number(baseLightness) - lightSaturationFloor;
        const darkSaturationScale = darkSaturationCeiling - Number(baseSaturation);
        const darkLightnessStep = darkLightnessScale / 4;
        const darkSaturationStep = darkSaturationScale / 4;
        for (let i = 1; i <= 4; i++) {
            const darkSaturation = Number(baseSaturation) + (darkSaturationStep * i);
            const darkLightness = Number(baseLightness) - (darkLightnessStep * i);

            darkOutput[paletteObject.varString + String((i + 5) * 100)] = `hsl(${baseHue}, ${darkSaturation}\%, ${darkLightness}\%)`;
>>>>>>> 11451c5e40d755e5f70fec523cd97c99973a19a3
        }
        return darkOutput;
    }
}


document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
    console.log('Generating:\n');
    for (const paletteColor of colors) {
        console.log(paletteColor);
        const newPalette = generatePalette(paletteColor);
        docHead.appendChild(makeStyleTag(newPalette));
        populateColorDisplay(paletteColor.element, newPalette);
    }
=======
    
    for (const paletteObject of Object.values(paletteObjects)) {
        
        paletteObject.palette = generatePalette(paletteObject);
        injectStyleTag(paletteObject);
        populateColorDisplay(paletteObject);
        paletteObject.control.addEventListener('change', (e) => {
            e.preventDefault();
            updatePalette(paletteObject);
        })
    }

    
>>>>>>> 11451c5e40d755e5f70fec523cd97c99973a19a3
})




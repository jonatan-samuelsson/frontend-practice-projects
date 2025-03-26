const docHead = document.querySelector('head');


const primaries = document.querySelector('#clrs-primary');
const accents = document.querySelector('#clrs-accent');
const neutrals = document.querySelector('#clrs-neutral');


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
    for (const shade of Object.keys(palette)) {
        const palettePiece = document.createElement('div');
        palettePiece.className = 'color palette-piece';
        palettePiece.style.backgroundColor = `var(${shade})`;
        display.appendChild(palettePiece);
    }
}



function makeStyleTag(palette) {
    const styleTag = document.createElement('style');
    let rootStyle = "\:root \{\n";

    for (const [_var, color] of Object.entries(palette)) {
        rootStyle += `${_var}: ${color}\;\n`
    }
    rootStyle += `\}`;
    styleTag.innerHTML = rootStyle;
    return styleTag;
}



function generatePalette(color) {
    let output = {};
    const baseSaturation = color.baseColor.s;
    const baseLightness = color.baseColor.l;
    const baseHue = color.baseColor.h;

    output[color.varString + '400'] = `hsl(${baseHue}, ${baseSaturation}\%, ${baseLightness}\%)`;

    output = { ...generateLights(), ...output, ...generateDarks() };

    return output;

    function generateLights() {
        let lightOutput = {};


        const lightsLightnessScale = 98 - baseLightness;
        const lightsSaturationScale = baseSaturation - 10;
        const lightsLightnesStep = lightsLightnessScale / 4;
        const lightsSaturationStep = lightsSaturationScale / 4;
        for (let i = 4; i >= 1; i--) {
            const lightsSaturation = baseSaturation - (lightsSaturationStep * i);
            const lightsLightness = baseLightness + (lightsLightnesStep * i);

            lightOutput[color.varString + String(i * 100)] = `hsl(${baseHue}, ${lightsSaturation}\%, ${lightsLightness}\%)`;

        }

        return lightOutput;



    }

    function generateDarks() {
        let darkOutput = {};
        const darkLightnessScale = baseLightness - 10;
        const darkSaturationScale = 98 - baseSaturation;
        const darkLightnessStep = darkLightnessScale / 4;
        const darkSaturationStep = darkSaturationScale / 4;
        for (let i = 1; i <= 4; i++) {
            const darkSaturation = baseSaturation + (darkSaturationStep * i);
            const darkLightness = baseLightness - (darkLightnessStep * i);

            darkOutput[color.varString + String((i + 5) * 100)] = `hsl(${baseHue}, ${darkSaturation}\%, ${darkLightness}\%)`;
        }
        return darkOutput;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('Generating:\n');
    for (const paletteColor of colors) {
        console.log(paletteColor);
        const newPalette = generatePalette(paletteColor);
        docHead.appendChild(makeStyleTag(newPalette));
        populateColorDisplay(paletteColor.element, newPalette);
    }
})




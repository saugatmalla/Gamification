export function useRandomRgba() {
    function getRandomRgbaValues() {
        let o = Math.round;
        let r = Math.random;
        let s = 255;

        const rValue = o(r() * s);
        const gValue = o(r() * s);
        const bValue = o(r() * s);
        // const aValue = r().toFixed(1);
        const aValue = 1;

        return { rValue, gValue, bValue, aValue }
    }
    function generateRandomRgba(opacity?: number): string {
        let { rValue, gValue, bValue, aValue } = getRandomRgbaValues();

        while (rValue === gValue) {
            rValue = getRandomRgbaValues().rValue;
            gValue = getRandomRgbaValues().gValue;
        }

        if (opacity) {
            aValue = opacity;
        }

        const randomRgba = 'rgba(' + rValue + ',' + gValue + ',' + bValue + ',' + aValue + ')';

        return randomRgba
    }

    function getRgbaString(r: number, g: number, b: number, a: number): string {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    return {
        generateRandomRgba,
        getRgbaString,
        getRandomRgbaValues,
    }
}
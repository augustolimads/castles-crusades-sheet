export function setAttributeMod(value: number) {
    const scoreValue = Number(value);
    if (scoreValue === 1) {
        return '-4';
    }
    if (scoreValue >= 2 && scoreValue <= 3) {
        return '-3';
    }
    if (scoreValue >= 4 && scoreValue <= 5) {
        return '-2'
    }
    if (scoreValue >= 6 && scoreValue <= 8) {
        return '-1';
    }
    if (scoreValue >= 9 && scoreValue <= 12) {
        return '0';
    }
    if (scoreValue >= 13 && scoreValue <= 15) {
        return '+1';
    }
    if (scoreValue >= 16 && scoreValue <= 17) {
        return '+2';
    }
    if (scoreValue >= 18) {
        return '+3';
    }
    return '0';
}
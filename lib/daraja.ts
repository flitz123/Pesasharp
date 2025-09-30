// Helpers for M-Pesa Daraja API

export function buildPassword(
    shortcode: string,
    passkey: string,
    timestamp: string
) {
    return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
}

export function timestamp() {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(
        d.getDate()
    )}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}


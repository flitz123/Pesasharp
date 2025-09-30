import { NextResponse } from 'next/server';

// Mock endpoint for now. Replace with live NSE, SACCO, or API data later.
export async function GET() {
    return NextResponse.json({
        sacco: { avgDividend: '12%' },
        mmf: { avgYield: '9.5%' },
        nse: { avgReturn: '10-15%' },
    });
}

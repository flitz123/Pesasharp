import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const worker = process.env.NEXT_PUBLIC_MARKET_WORKER_URL;
        if (!worker) {
            return NextResponse.json({
                data: {
                    mmf: [{ name: 'Demo MMF', yield: '10%' }],
                    sacco: [{ name: 'Demo SACCO', div: '11%' }],
                },
            });
        }
        const r = await fetch(worker);
        const j = await r.json();
        return NextResponse.json(j);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

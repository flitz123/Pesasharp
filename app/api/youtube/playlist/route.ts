import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const playlistId =
            searchParams.get('playlistId') ||
            process.env.NEXT_PUBLIC_YT_PLAYLIST_ID ||
            'PLwarXDNlUyjJ4R_gaIF_ado0gZ0Undk_M';
        const key = process.env.YOUTUBE_API_KEY || '';

        if (!playlistId || !key) {
            // fallback mock
            return NextResponse.json({
                items: [
                    { id: 'https://youtu.be/zMeRhyf-Rbg?si=k0nELv3EpRwrvG5O', title: 'The Complete Map to Getting Rich' },
                    { id: 'https://youtu.be/Q2sCfUkd_QY?si=4gFpwLHoO0iyNm1l', title: '5 Common Finance Rules That Don’t Apply in Kenya' },
                    { id: 'https://youtu.be/6wRxJBdu7z4?si=Xn6kgAVcInM_aBWo', title: 'Beginners Guide to Investing in Shares in Kenya - Nairobi Stock Exchange Investments' },
                    { id: 'https://youtu.be/zTsAWwv47AU?si=gduMVmTx7HTqrdcU', title: 'Personal Finance Audit: 19 Questions to ask yourself' },
                    { id: 'https://youtu.be/HktqGtSaleI?si=Ej9XJ7zq-HWy1pQu', title: 'Best Investment Options in Kenya' },
                    { id: 'https://youtu.be/ymiTz5Og9q0?si=_lKWEC7jdPGnjHLU', title: 'Why Reducing Your Personal Expenses is Not Enough!' },
                ],
            });
        }

        const api = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${playlistId}&key=${key}`;
        const r = await fetch(api);
        const j = await r.json();

        const items = (j.items || []).map((it: any) => ({
            id: it.snippet?.resourceId?.videoId,
            title: it.snippet?.title,
        }));

        return NextResponse.json({ items });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

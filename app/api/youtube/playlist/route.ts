import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const playlistId =
            searchParams.get('playlistId') ||
            process.env.NEXT_PUBLIC_YT_PLAYLIST_ID ||
            '';
        const key = process.env.YOUTUBE_API_KEY || '';

        if (!playlistId || !key) {
            // fallback mock
            return NextResponse.json({
                items: [
                    { id: 'dQw4w9WgXcQ', title: 'PesaPlan: Intro to Investing' },
                    { id: 'abcd1234', title: 'Saving Money in Kenya 101' },
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

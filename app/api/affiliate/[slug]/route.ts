import { NextResponse } from 'next/server';
import { getAffiliateUrl } from '@/lib/affiliate';

export async function GET(
    req: Request,
    { params }: { params: { slug: string } }
) {
    const url = getAffiliateUrl(params.slug);
    if (!url) {
        return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
    }
    return NextResponse.redirect(url);
}

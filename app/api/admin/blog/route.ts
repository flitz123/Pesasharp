import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Fetch all posts
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(posts);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// Create a new post
export async function POST(req: Request) {
    const { secret, title, content } = await req.json();
    if (secret !== process.env.ADMIN_SECRET)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const post = await prisma.post.create({ data: { title, content } });
        return NextResponse.json({ success: true, post });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// Update an existing post
export async function PUT(req: Request) {
    const { secret, id, title, content } = await req.json();
    if (secret !== process.env.ADMIN_SECRET)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const post = await prisma.post.update({
            where: { id },
            data: { title, content },
        });
        return NextResponse.json({ success: true, post });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// Delete a post
export async function DELETE(req: Request) {
    const { secret, id } = await req.json();
    if (secret !== process.env.ADMIN_SECRET)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        await prisma.post.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

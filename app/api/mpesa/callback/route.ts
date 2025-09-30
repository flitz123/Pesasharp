import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const body = await req.json();
    console.log('M-Pesa Callback:', JSON.stringify(body, null, 2));

    try {
        const resultCode = body?.Body?.stkCallback?.ResultCode;
        const resultDesc = body?.Body?.stkCallback?.ResultDesc;
        const purchaseId = body?.Body?.stkCallback?.AccountReference; // 👈 we set this earlier
        const metadata = body?.Body?.stkCallback?.CallbackMetadata?.Item || [];

        const amount =
            metadata.find((i: any) => i.Name === 'Amount')?.Value || 0;
        const phone =
            metadata.find((i: any) => i.Name === 'PhoneNumber')?.Value || '';

        if (purchaseId) {
            await prisma.purchase.update({
                where: { id: purchaseId },
                data: {
                    amount,
                    phone,
                    status: resultCode === 0 ? 'success' : 'failed',
                },
            });
        }
    } catch (err) {
        console.error('DB Update Error:', err);
    }

    return NextResponse.json({ ok: true });
}

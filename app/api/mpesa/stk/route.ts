import { NextResponse } from 'next/server';
import { buildPassword, timestamp } from '@/lib/daraja';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const amount = body?.amount || 10;
        const phone = body?.phone || '254700000000';
        const productId = body?.productId || '';
        const shortcode = process.env.MPESA_SHORTCODE || '';
        const passkey = process.env.MPESA_PASSKEY || '';
        const ts = timestamp();
        const pwd = buildPassword(shortcode, passkey, ts);

        // Create purchase record
        const purchase = await prisma.purchase.create({
            data: {
                product: productId,
                phone,
                amount,
                status: 'pending',
            },
        });

        // Auth
        const authRes = await fetch(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {
                headers: {
                    Authorization:
                        'Basic ' +
                        Buffer.from(
                            `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
                        ).toString('base64'),
                },
            }
        );
        const auth = await authRes.json();
        const token = auth.access_token;

        // STK Push
        const payload = {
            BusinessShortCode: shortcode,
            Password: pwd,
            Timestamp: ts,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phone,
            PartyB: shortcode,
            PhoneNumber: phone,
            CallBackURL: process.env.MPESA_CALLBACK_URL,
            AccountReference: purchase.id, // 👈 use Purchase ID for traceability
            TransactionDesc: productId,
        };

        const r = await fetch(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify(payload),
            }
        );

        const j = await r.json();
        return NextResponse.json({ ...j, purchaseId: purchase.id });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

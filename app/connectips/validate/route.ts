import { NextResponse } from 'next/server';

import { hostname } from '#/utils/constants';

const USERID = process.env.CONNECTIPS_MERCHAND_USER_ID;
const PASSWORD = process.env.CONNECTIPS_MERCHANT_USER_PASSWORD;
const VALADIATION_URL = process.env.CONNECTIPS_VALIDATION_API_URL;

const credentials = Buffer.from(`${USERID}:${PASSWORD}`).toString('base64');

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const tokenResponse = await fetch(`${hostname}/connectips/get_token`, {
      method: 'POST',
      body: JSON.stringify(body),
      cache: 'no-cache',
    });

    if (!tokenResponse.ok) {
      throw new Error('Token Error');
    }

    const { token } = await tokenResponse.json();

    const payload = {
      merchantId: body.MERCHANTID,
      appId: body.APPID,
      referenceId: body.REFERENCEID,
      txnAmt: body.TXNAMT,
      token,
    };

    const response = await fetch(VALADIATION_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error('Validate Error');
    }

    return NextResponse.json(await response.json());
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 'ERROR',
      statusDesc: 'Internal Error',
    });
  }
}

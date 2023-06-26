import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import NodeRSA from 'node-rsa';
import pem, { type Pkcs12ReadResult } from 'pem';

import { objectToKeyValueString } from '#/utils/objectToKeyValueString';

const PASS = process.env.CONNECTIPS_CREDITOR_PASSWORD;

const filePath = path.join(process.cwd(), 'signatures', 'CREDITOR.pfx');
const pfx = fs.readFileSync(filePath);

const getPrivateKey = async (): Promise<Pkcs12ReadResult['key']> => {
  return new Promise(async (resolve, reject) => {
    return pem.readPkcs12(pfx, { p12Password: PASS }, (err, cert) => {
      if (cert) {
        resolve(cert.key);
      } else {
        reject(err);
      }
    });
  });
};

export async function POST(request: Request) {
  const body = await request.json();
  const message = objectToKeyValueString(body);

  const key = new NodeRSA(await getPrivateKey()).exportKey('pkcs8');

  const sign = crypto.createSign('SHA256');
  sign.update(message);
  const signature = sign.sign(key, 'base64');

  return NextResponse.json({ TOKEN: signature });
}

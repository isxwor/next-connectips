'use client';

import Image from 'next/image';

import { generateUniqueId } from '#/utils/generateUniqueId';
import { getDate } from '#/utils/getDate';

const MERCHANTID = process.env.NEXT_PUBLIC_CONNECTIPS_MERCHANTID as string;
const APPID = process.env.NEXT_PUBLIC_CONNECTIPS_APPID as string;
const APPNAME = process.env.NEXT_PUBLIC_CONNECTIPS_APPNAME as string;
const CONNECTIPS_API_URL = process.env.NEXT_PUBLIC_CONNECTIPS_API_URL as string;

type PayWithConnectIPSProps = {
  amount: number;
  remarks: string;
  particulars: string;
};

type TransactionDetails = {
  MERCHANTID: string;
  APPID: string;
  APPNAME: string;
  TXNID: string;
  TXNDATE: string;
  TXNCRNCY: 'NPR';
  TXNAMT: string;
  REFERENCEID: string;
  REMARKS: string;
  PARTICULARS: string;
  TOKEN: 'TOKEN';
};

type Payload = Omit<TransactionDetails, 'TOKEN'> & { TOKEN: string };

const initiatePayment = async (transactionDetails: TransactionDetails) => {
  try {
    const tokenResponse = await fetch('/connectips/get_token', {
      method: 'POST',
      body: JSON.stringify(transactionDetails),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get payment token');
    }

    const { TOKEN } = await tokenResponse.json();

    const payload: Payload = { ...transactionDetails, TOKEN };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = CONNECTIPS_API_URL;

    Object.entries(payload).forEach(([key, value]) => {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = value;
      form.appendChild(hiddenField);
    });

    document.body.appendChild(form);
    form.submit();
  } catch (error) {
    console.error('ConnectIPS Initiate payment error:', error);
  }
};

const PayWithConnectIPS = ({
  amount, // in paisa
  remarks,
  particulars,
}: PayWithConnectIPSProps) => {
  const transactionDetails: TransactionDetails = {
    MERCHANTID,
    APPID,
    APPNAME,
    TXNID: `Tx${generateUniqueId()}`,
    TXNDATE: getDate(),
    TXNCRNCY: 'NPR',
    TXNAMT: amount as unknown as string,
    REFERENCEID: `Re${generateUniqueId()}`,
    REMARKS: remarks,
    PARTICULARS: particulars,
    TOKEN: 'TOKEN',
  };

  return (
    <button
      className='flex items-center gap-4 px-6 border border-gray-300 rounded-md hover:border-gray-400'
      onClick={() => initiatePayment(transactionDetails)}
    >
      Pay with
      <Image
        src='/connectIPS.png'
        alt='Pay with ConnectIPS'
        width={90}
        height={90}
      />
    </button>
  );
};

export default PayWithConnectIPS;

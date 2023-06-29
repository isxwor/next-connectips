import Link from 'next/link';

import { hostname } from '#/utils/constants';

const MERCHANTID = process.env.NEXT_PUBLIC_CONNECTIPS_MERCHANTID;
const APPID = process.env.NEXT_PUBLIC_CONNECTIPS_APPID;

const validateConnectIPSTransaction = async ({
  refId,
  amount,
}: {
  refId: string;
  amount: string | number;
}) => {
  const transactionDetails = {
    MERCHANTID,
    APPID,
    REFERENCEID: refId,
    TXNAMT: amount,
  };

  try {
    const response = await fetch(`${hostname}/connectips/validate`, {
      method: 'POST',
      body: JSON.stringify(transactionDetails),
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error('Failed to validate transaction');
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

const SuccessPage = async ({
  searchParams,
}: {
  searchParams: { TXNID?: string };
}) => {
  const TXNID = searchParams.TXNID;

  if (!TXNID) {
    return <div>NO transaction Id</div>;
  }

  const res = await validateConnectIPSTransaction({
    refId: TXNID,
    amount: 1000, // fetch from db
  });

  if (res.status === 'SUCCESS') {
    return (
      <div>
        <div className='mb-4'>
          <h1>Payment Success</h1>
          <p>Transaction ID: {TXNID}</p>
        </div>
        <Link href='/'>Back to Home &rarr;</Link>
      </div>
    );
  } else if (res.status === 'ERROR') {
    return (
      <div>
        <div className='mb-4'>
          <h1>Something went wrong</h1>
          <p>Transaction ID: {TXNID}</p>
          <p>Error Message: {res.statusDesc}</p>
        </div>
        <Link href='/'>Back to Home &rarr;</Link>
      </div>
    );
  }

  return (
    <div>
      <div className='mb-4'>
        <h1>Payment Failed</h1>
        <p>Transaction ID: {TXNID}</p>
        <p>Error Message: {res.statusDesc}</p>
      </div>
      <Link href='/'>Back to Home &rarr;</Link>
    </div>
  );
};

export default SuccessPage;

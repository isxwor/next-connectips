import Link from 'next/link';

const FailurePage = ({
  searchParams,
}: {
  searchParams: { TXNID?: string };
}) => {
  const TXNID = searchParams.TXNID;

  return (
    <div>
      <div className='mb-4'>
        <h1>Payment Failed</h1>
        <p>Transaction ID: {TXNID}</p>
      </div>
      <Link href='/'>Back to Home &rarr;</Link>
    </div>
  );
};

export default FailurePage;

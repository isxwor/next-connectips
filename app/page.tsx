import PayWithConnectIPS from './_components/PayWithConnectIPS';

const Home = () => (
  <div className='h-screen flex items-center justify-center'>
    <PayWithConnectIPS
      amount={1000} // in paisa
      particulars='PART-01'
      remarks='TEST'
    />
  </div>
);

export default Home;

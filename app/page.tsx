import PayWithConnectIPS from './_components/PayWithConnectIPS';

const Home = () => (
  <PayWithConnectIPS
    amount={1000} // in paisa
    particulars='PART-01'
    remarks='TEST'
  />
);

export default Home;

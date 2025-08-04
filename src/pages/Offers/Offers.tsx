import "./Offers.css";

const Offers = () => {
  return (
    <div className="container-xxl offers">
      <h3 style={{textAlign:'center', marginTop:'30px'}}>Offers</h3>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'400px', color:"gray", fontSize:'22px'}}> 
        <p>No offer available at this moment</p>
      </div>
    </div>
  );
};

export default Offers;

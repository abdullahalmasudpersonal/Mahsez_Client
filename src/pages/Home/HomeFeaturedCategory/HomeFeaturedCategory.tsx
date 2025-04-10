import HomeFCategore from "./HomeFCategore/HomeFCategore";
import "./HomeFeaturedCategory.css";
import UseHomeFeaturedCategory from "../../../Hooks/UseHomeFeaturedCategory/UseHomeFeaturedCategory";

const HomeFeaturedCategory = () => {
  const [homeFCategory] = UseHomeFeaturedCategory();

  return (
    <div className="my-5">
      <h5 className="homefeaturedCategore-title">FEATURED CATEGORIES</h5>
      <hr style={{ marginTop: "10px" }}></hr>

      <div className="homefeaturedCategore homefeaturedCategore-pc">
        {homeFCategory.map((homeFCategore, index) => (
          <div
            key={homeFCategore._id}
            className="delayProductItem"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <HomeFCategore
              key={homeFCategore._id}
              homeFCategore={homeFCategore}
            />
          </div>
        ))}
      </div>

      <div className="homefeaturedCategore homefeaturedCategore-mobile">
        {homeFCategory.slice(0, 8).map((homeFCategore, index) => (
          <div
            key={homeFCategore._id}
            className="delayProductItem"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <HomeFCategore
              key={homeFCategore._id}
              homeFCategore={homeFCategore}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFeaturedCategory;

{
  /*  <div className='homefeaturedCategore-dev homefeaturedCategore-dev1'>
                    <div className='d-flex justify-content-center'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev2'>
                    <div className='d-flex justify-content-center'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev3'>
                    <div className='d-flex justify-content-center m-0 p-0'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev4'>
                    <div className='d-flex justify-content-center'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev5'>
                    <div className='d-flex justify-content-center'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev6'>
                    <div className='d-flex justify-content-center m-0 p-0'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev7'>
                    <div className='d-flex justify-content-center m-0 p-0'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev8'>
                    <div className='d-flex justify-content-center m-0 p-0'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev9'>
                    <div className='d-flex justify-content-center'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev10'>
                    <div className='d-flex justify-content-center m-0 p-0'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev11'>
                    <div className='d-flex justify-content-center'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev12'>
                    <div className='d-flex justify-content-center'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev13'>
                    <div className='d-flex justify-content-center m-0 p-0'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div>
                <div className='homefeaturedCategore-dev homefeaturedCategore-dev14'>
                    <div className='d-flex justify-content-center m-0 p-0'>
                        <img src={categore1} />
                    </div>
                    <h6 className='text-center mt-2'>Beauty</h6>
                </div> */
}

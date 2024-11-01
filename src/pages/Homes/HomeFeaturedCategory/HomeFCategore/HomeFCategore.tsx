/* eslint-disable @typescript-eslint/no-explicit-any */
import "./HomeFCategore.css";

const HomeFCategore = ({ homeFCategore }: any) => {
  const { categoryName, image } = homeFCategore;

  return (
    <div className="homeFCategore" /* rules="all" */>
      <div>
        <img className="text-center homeFCategore-img" src={image} />
        <h6 className="text-center categore-title">
          <small>{categoryName}</small>
        </h6>
      </div>
    </div>
  );
};

export default HomeFCategore;

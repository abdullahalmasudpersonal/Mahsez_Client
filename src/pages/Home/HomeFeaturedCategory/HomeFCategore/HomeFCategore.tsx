import "./HomeFCategore.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HomeFCategore = ({ homeFCategore }: any) => {
  const { categoryName, image } = homeFCategore;

  return (
    <div className="homeFCategore" rules="all">
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

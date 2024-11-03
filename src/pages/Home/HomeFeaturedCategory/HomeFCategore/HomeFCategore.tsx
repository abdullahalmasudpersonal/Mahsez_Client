import "./HomeFCategore.css";

interface Category {
  _id: string;
  categoryName: string;
  image: string;
}
interface HomeFCategoreProps {
  homeFCategore: Category;
}

const HomeFCategore: React.FC<HomeFCategoreProps> = ({ homeFCategore }) => {
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

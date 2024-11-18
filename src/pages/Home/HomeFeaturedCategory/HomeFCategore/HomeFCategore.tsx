import { Link } from "react-router-dom";
import "./HomeFCategore.css";

interface Category {
  _id: string;
  categoryName: string;
  image: string;
  path: string;
}
interface HomeFCategoreProps {
  homeFCategore: Category;
}

const HomeFCategore: React.FC<HomeFCategoreProps> = ({ homeFCategore }) => {
  const { categoryName, image, path } = homeFCategore;

  return (
    <Link to={path} style={{ textDecoration: "none", color: "black" }}>
      <div className="homeFCategore">
        <div>
          <img className="text-center homeFCategore-img" src={image} />
          <h6 className="text-center categore-title">
            <small>{categoryName}</small>
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default HomeFCategore;

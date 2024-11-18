import { useEffect, useState } from "react";

interface Category {
  _id: string;
  categoryName: string;
  image: string;
  path: string;
}

const UseHomeFeaturedCategory = (): [
  Category[],
  React.Dispatch<React.SetStateAction<Category[]>>
] => {
  const [homeFCategory, setHomeFCategory] = useState<Category[]>([]);
  useEffect(() => {
    fetch(`HFCategory.json`)
      .then((res) => res.json())
      .then((data) => setHomeFCategory(data));
  }, []);
  return [homeFCategory, setHomeFCategory];
};

export default UseHomeFeaturedCategory;

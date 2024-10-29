import { useEffect, useState } from "react";

type CategoryType = {
  id: number;
  categoryName: string;
  image: string;
};
const UseHomeFeaturedCategory = () => {
  const [homeFCategory, setHomeFCategory] = useState<CategoryType[]>([]);
  useEffect(() => {
    fetch(`HFCategory.json`)
      .then((res) => res.json())
      .then((data) => setHomeFCategory(data));
  }, []);
  return [homeFCategory, setHomeFCategory] as const;
};

export default UseHomeFeaturedCategory;

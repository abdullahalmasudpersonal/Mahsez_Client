export type TProduct = {
    _id: string;
    productId: string;
    mainCategory: string;
    category: string;
    subCategory: string;
    name: string;
    brand: string;
    availableQuantity: number;
    stockStatus: "In Stock" | "Out Of Stock";
    price: number;
    regularPrice: number;
    offerPrice: number;
    size: string;
    soldQuantity: number;
    features: string;
    features2?: string[];
    description: string;
    warranty?: string;
    image?: string[];
    prodCreator: string;
  };


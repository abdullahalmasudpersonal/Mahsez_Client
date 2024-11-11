type SubCategory = string;

type Category = {
  name: string;
  subCategories: SubCategory[];
};

type MainCategory = {
  name: string;
  categories: Category[];
};

export const categoriesData: MainCategory[] = [
  {
    name: "Beauty",
    categories: [
      {
        name: "1 first",
        subCategories: ["L1 area 1", "area 2"],
      },
      {
        name: "2 Second",
        subCategories: ["L2 area 3", "area 4"],
      },
      {
        name: "3 Thired",
        subCategories: ["L3 area 5", "area 6"],
      },
    ],
  },
  {
    name: "Bags",
    categories: [
      {
        name: "V first",
        subCategories: ["V1 area 1", "area 2"],
      },
      {
        name: "V Second",
        subCategories: ["V2 area 3", "area 4"],
      },
      {
        name: "V Thired",
        subCategories: ["V3 area 5", "area 6"],
      },
    ],
  },
  {
    name: "Computer",
    categories: [
      {
        name: "F first",
        subCategories: ["F1 area 1", "area 2"],
      },
      {
        name: "f Second",
        subCategories: ["F2 area 3", "area 4"],
      },
      {
        name: "F Thired",
        subCategories: ["F3 area 5", "area 6"],
      },
    ],
  },
  {
    name: "Dresses & Jewellery",
    categories: [
      {
        name: "T-Shirt",
        subCategories: [
          "Polo T-Shirt",
          "Crew Neck T-Shirt",
          "No Sub Categories",
        ],
      },
      {
        name: "f Second",
        subCategories: ["F2 area 3", "area 4"],
      },
    ],
  },
  {
    name: "Electronic & TV",
    categories: [
      {
        name: "Fan",
        subCategories: ["Ceiling Fan", "area 2"],
      },
      {
        name: " Iron",
        subCategories: ["F2 area 3", "No Sub Categories"],
      },
      {
        name: "Kettle",
        subCategories: ["Electric Kettle", "No Sub Categories"],
      },
    ],
  },
  {
    name: "Foods",
    categories: [
      {
        name: "F first",
        subCategories: ["F1 area 1", "area 2"],
      },
      {
        name: "f Second",
        subCategories: ["F2 area 3", "area 4"],
      },
      {
        name: "F Thired",
        subCategories: ["F3 area 5", "area 6"],
      },
    ],
  },
  {
    name: "Islamic",
    categories: [
      {
        name: "Attar",
        subCategories: [
          "Popular Attar",
          "Attar Combo Offers",
          "Alif Attar",
          "Al-Nuaim Roll Attar",
        ],
      },
      {
        name: "Miswak",
        subCategories: ["F3 area 5", "area 6"],
      },
      {
        name: "Tasbeeh",
        subCategories: ["No Sub Category"],
      },
      {
        name: "Tupi",
        subCategories: ["F2 area 3", "area 4"],
      },
      {
        name: "Jainamaz",
        subCategories: ["F2 area 3", "area 4"],
      },
    ],
  },
  {
    name: "Sports",
    categories: [
      {
        name: "F first",
        subCategories: ["F1 area 1", "area 2"],
      },
      {
        name: "f Second",
        subCategories: ["F2 area 3", "area 4"],
      },
      {
        name: "F Thired",
        subCategories: ["F3 area 5", "area 6"],
      },
    ],
  },
];

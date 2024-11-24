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
    name: "Health & Beauty",
    categories: [
      {
        name: "Beauty",
        subCategories: ["Cream", "area 2"],
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
    name: "Bags & Watch",
    categories: [
      {
        name: "Watch",
        subCategories: [
          "Smartwatch",
          "Analog-Digital Watch",
          "Digital Watch",
          "Analog Wrist Watch",
        ],
      },
      {
        name: "Bags",
        subCategories: ["Vanity Bag", "area 4"],
      },
      {
        name: "V Thired",
        subCategories: ["V3 area 5", "area 6"],
      },
    ],
  },
  {
    name: "Computer & Accessories",
    categories: [
      {
        name: "Dasktop",
        subCategories: ["F1 area 1", "No Sub Category"],
      },
      {
        name: "Laptop",
        subCategories: ["F2 area 3", "area 4", "No Sub Category"],
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
        subCategories: ["Polo T-Shirt", "Crew Neck T-Shirt", "No Sub Category"],
      },
      {
        name: "Jewellery",
        subCategories: ["Necklace", "Earrings"],
      },
    ],
  },
  {
    name: "Electronic & TV",
    categories: [
      {
        name: "TV",
        subCategories: ["LED TV", "Smart TV"],
      },
      {
        name: "Mobile",
        subCategories: ["Smart Phone", "Button Phone"],
      },
      {
        name: "Fan",
        subCategories: ["Ceiling Fan", "area 2"],
      },
      {
        name: " Iron",
        subCategories: ["F2 area 3", "No Sub Category"],
      },
      {
        name: "Kettle",
        subCategories: ["Electric Kettle", "No Sub Category"],
      },
    ],
  },
  {
    name: "Home Appliences",
    categories: [
      {
        name: "Refrigerator",
        subCategories: [
          "Single Door",
          " Double Door",
          "Side-by-Side",
          "Bottom Mount",
        ],
      },
      { name: "Sink", subCategories: [] },
    ],
  },
  {
    name: "Groceries & Foods",
    categories: [
      {
        name: "Rice",
        subCategories: ["F1 area 1", "No Sub Category"],
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
    name: "Sports & Outdoors",
    categories: [
      {
        name: "Ball",
        subCategories: ["Football", "Tanisball", "Cricket Ball"],
      },
      {
        name: "Bat",
        subCategories: ["Cricket Bat", "Tanis Bat"],
      },
      {
        name: "F Thired",
        subCategories: ["F3 area 5", "area 6"],
      },
    ],
  },
];

export interface SidebarItem {
  title: string;
  icon?: string;
  path?: string;
  childrens?: SidebarItem[];
}

export const navCategoreData: SidebarItem[] = [
  {
    title: "Beauty",
    icon: "fa-sharp fa-solid fa-spa",
    path: "/categore/beauty",
    // childrens: [
    //   {
    //     title: "Jainamaz",
    //     path: "",
    //   },
    //   {
    //     title: "Contact",
    //     icon: "bi-phone-fill",
    //     childrens: [
    //       {
    //         title: "Facebook",
    //         icon: "bi-facebook",
    //       },
    //       {
    //         title: "Twitter",
    //         icon: "bi-twitter",
    //       },
    //       {
    //         title: "Instagram",
    //         icon: "bi-instagram",
    //       },
    //     ],
    //   },
    // ],
  },
  {
    title: "Bags",
    icon: "fa-sharp fa-solid fa-bag-shopping",
    path: "/categore/bags",
    // childrens: [
    //   {
    //     title: "Jainamaz",
    //     path: "",
    //   },
    // ],
  },
  {
    title: "Computer",
    icon: "fa-sharp fa-solid fa-computer",
    path: "/categore/computers",
    // childrens: [
    //   {
    //     title: "Jainamaz",
    //     path: "",
    //   },
    // ],
  },
  {
    title: "Dresses",
    icon: "a-sharp fa-solid fa-person-dress",
    path: "/categore/dresses",
    // childrens: [
    //   {
    //     title: "Jainamaz",
    //     path: "",
    //   },
    // ],
  },
  {
    title: "Electronic",
    icon: "fa-sharp fa-solid fa-microchip",
    path: "/categore/electronics",
    // childrens: [
    //   {
    //     title: "Jainamaz",
    //     path: "",
    //   },
    // ],
  },
  {
    title: "Foods",
    icon: "fa-sharp fa-solid fa-bowl-food",
    path: "/categore/foods",
    // childrens: [
    //   {
    //     title: "Jainamaz",
    //     path: "",
    //   },
    // ],
  },
  {
    title: "Islamic",
    icon: "fa-sharp fa-solid fa-mosque",
    path: "/categore/islamic",
    // childrens: [
    //   {
    //     title: "Jainamaz",
    //     path: "/categore/islamic/jainamazs",
    //   },
    //   {
    //     title: "Tajbeeh",
    //     path: "/categore/islamic/tasbeehs",
    //   },
    //   {
    //     title: "Tupi",
    //     path: "/categore/islamic/tupis",
    //   },
    //   {
    //     title: "Attar",
    //     path: "/categore/islamic/attars",
    //     childrens: [
    //       {
    //         title: "Popular Attar",
    //         path: "/categore/islamic/attars/popular_attar",
    //       },
    //       {
    //         title: "Combo Offers",
    //         path: "/categore/islamic/attars/combo_offer",
    //       },
    //       {
    //         title: "Alif Attar",
    //         path: "/categore/islamic/attars/alifAttars",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Miswak",
    //     path: "/categore/islamic/miswaks",
    //   },
    //   {
    //     title: "burqa",
    //     path: "/categore/islamic/",
    //   },
    // ],
  },
  {
    title: "Sports",
    icon: "fa-sharp fa-solid fa-trophy",
    path: "/categore/sports",
    // childrens: [
    //   {
    //     title: "Jainamaz",
    //     path: "",
    //   },
    // ],
  },
];

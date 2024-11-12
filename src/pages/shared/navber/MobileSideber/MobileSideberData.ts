export interface SidebarItem {
  title: string;
  icon?: string;
  path?: string;
  childrens?: SidebarItem[];
}

export const sideberDatas: SidebarItem[] = [
  {
    title: "Beauty",
    icon: "bi-gear-fill",
    path: "/categore/beautyes",
    childrens: [
      {
        title: "Home",
        icon: "bi-house-fill",
        path: "/",
      },
      {
        title: "About",
        icon: "bi-info-circle-fill",
        path: "/about",
      },
      {
        title: "Contact",
        icon: "bi-phone-fill",
        childrens: [
          {
            title: "Facebook",
            icon: "bi-facebook",
          },
          {
            title: "Twitter",
            icon: "bi-twitter",
          },
          {
            title: "Instagram",
            icon: "bi-instagram",
          },
        ],
      },
      {
        title: "FAQ",
        icon: "bi-question-circle-fill",
      },
    ],
  },
  {
    title: "Bags",
    icon: "bi-info-circle-fill",
    path: "/categore/bags",
    childrens: [
      {
        title: "Login",
        path: "/login",
      },
      {
        title: "Register",
        path: "/register",
      },
      {
        title: "Forgot Password",
        path: "/forgot-password",
      },
      {
        title: "Reset Password",
        path: "/reset-password",
      },
    ],
  },
  {
    title: "Computer",
    icon: "bi-person-fill",
    path: "/categore/computers",
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Settings",
        childrens: [
          {
            title: "Account",
            path: "/settings/account",
          },
          {
            title: "Billing",
            childrens: [
              {
                title: "Payment",
                path: "/settings/billing/payment",
              },
              {
                title: "Subscription",
                path: "/settings/billing/subscription",
              },
            ],
          },
          {
            title: "Notifications",
            path: "/settings/notifications",
          },
        ],
      },
      {
        title: "Logout",
        path: "/logout",
      },
    ],
  },
  {
    title: "Dresses",
    icon: "bi-view-list",
    path: "/categore/dresses",
    childrens: [
      {
        title: "Search",
        path: "/search",
      },
      {
        title: "History",
        path: "/history",
      },
    ],
  },
  {
    title: "Electronic",
    icon: "bi-view-list",
    path: "/categore/electronics",
    childrens: [
      {
        title: "Search",
        path: "/search",
      },
      {
        title: "History",
        path: "/history",
      },
    ],
  },
  {
    title: "Foods",
    icon: "bi-view-list",
    path: "/categore/foods",
    childrens: [
      {
        title: "Search",
        path: "/search",
      },
      {
        title: "History",
        path: "/history",
      },
    ],
  },
  {
    title: "Islamic",
    icon: "bi-view-list",
    path: "/categore/islamic",
    childrens: [
      {
        title: "Attar",
        path: "/search",
        childrens: [
          {
            title: "Popular Attar",
            path: "/settings/account",
          },
          {
            title: "Combo Offer",
            path: "/settings/account",
          },
          {
            title: "Mahsez Attar",
            path: "/settings/account",
          },
          {
            title: "Alif Attar",
            path: "/settings/account",
          },
        ],
      },
      {
        title: "Tupis",
        path: "/search",
      },
      {
        title: "Burqa",
        path: "/search",
      },
      {
        title: "Hijab",
        path: "/history",
      },
    ],
  },
  {
    title: "Sports",
    icon: "bi-view-list",
    path: "/categore/sports",
    childrens: [
      {
        title: "Search",
        path: "/search",
      },
      {
        title: "History",
        path: "/history",
      },
    ],
  },
];

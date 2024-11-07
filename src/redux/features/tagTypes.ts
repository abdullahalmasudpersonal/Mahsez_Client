export enum tagTypes {
  user = "user",
  admin = "admin",
  product = "product",
  order = "order",
}

// export type TagTypes = (typeof tagTypes)[keyof typeof tagTypes];

// export type TagType = keyof typeof tagTypes;

export const tagTypesList = [
  tagTypes.user,
  tagTypes.admin,
  tagTypes.product,
  tagTypes.order,
];

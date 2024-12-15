export enum tagTypes {
  user = "user",
  admin = "admin",
  product = "product",
  order = "order",
  buyer = "buyer",
  blog = "blog",
  payment = "payment",
}

export type TagTypes = (typeof tagTypes)[keyof typeof tagTypes];

// export type TagType = keyof typeof tagTypes;

export const tagTypesList = [
  tagTypes.user,
  tagTypes.admin,
  tagTypes.product,
  tagTypes.order,
  tagTypes.buyer,
  tagTypes.blog,
  tagTypes.payment,
];

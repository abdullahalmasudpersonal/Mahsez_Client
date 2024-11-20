export type TBuyer = {
  _id: string;
  id: string;
  user: string;
  name: string;
  gender: "male" | "female" | "other";
  email: string;
  contactNo: string;
  companyName: string;
  city: string;
  postCode: string;
  status: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};

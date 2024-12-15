export type TAdmin = {
  _id: string;
  id: string;
  user: string;
  name: string;
  gender: "male" | "female" | "other";
  email: string;
  contactNo: string;
  companyName: string;
  city: string;
  status: string;
  postCode: string;
  isOnline: string;
  onlineStatus: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};

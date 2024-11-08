import "./Profile.css";
import profile from "../../../assets/img/profile/profile.png";
import { FieldValues } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "../../../redux/features/user/userApi";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Upload,
  UploadFile,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "sonner";

const Profile = () => {
  const { data: userData } = useGetMyProfileQuery({});
  const {
    email,
    name,
    profileImg,
    contactNo,
    companyName,
    city,
    gender,
    postCode,
    presentAddress,
    permanentAddress,
  } = userData?.data || {};
  const [updateMyProfileData] = useUpdateMyProfileMutation();
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();

  //// set default values
  useEffect(() => {
    form.setFieldsValue({
      name: name,
      contactNo: contactNo,
      companyName: companyName,
      city: city,
      gender: gender,
      postCode: postCode,
      presentAddress: presentAddress,
      permanentAddress: permanentAddress,
    });
  }, [
    name,
    contactNo,
    companyName,
    city,
    gender,
    postCode,
    presentAddress,
    permanentAddress,
    form,
  ]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const defaultAvatar = "https://www.w3schools.com/w3images/avatar2.png";

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList.slice(-1));
  };

  const handleFinish = async (values: FieldValues) => {
    const profileData = {
      name: values?.name,
      contactNo: values?.contactNo,
      companyName: values?.companyName,
      city: values?.city,
      gender: values?.gender,
      postCode: values?.postCode,
      presentAddress: values?.presentAddress,
      permanentAddress: values?.permanentAddress,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(profileData));
    fileList.forEach((file) => {
      formData.append("file", file.originFileObj as File);
    });
    const res = await updateMyProfileData(formData).unwrap();
    if (res?.success === true) {
      toast.success(res?.message, { position: "top-right" });
      form.resetFields();
      setFileList([]);
      setEdit(false);
    }
  };

  return (
    <div className="dashboard-dev2">
      <PageTitle pageTitle="My Profile " />
      <div className="pt-4 px-4 profile-top-part">
        <h4 className="fw-bold side-header">My Profile</h4>
        <button className="profile-edit-btn" onClick={() => setEdit(!edit)}>
          <FontAwesomeIcon icon={faEdit} />
          <span>&nbsp;Edit</span>
        </button>
      </div>
      <hr />
      <div className="p-2">
        {edit ? (
          <div>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <Row>
                <div
                  style={{
                    height: "230px",
                    width: "250px",
                    margin: "auto",
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "30px",
                  }}
                >
                  <Image
                    width={160}
                    height={160}
                    src={
                      fileList.length > 0
                        ? fileList[0].thumbUrl ||
                          URL.createObjectURL(fileList[0].originFileObj as Blob)
                        : profileImg || defaultAvatar
                    }
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      backgroundColor: "#f56a00",
                      borderRadius: "2px",
                      margin: "auto",
                    }}
                  />

                  <Upload
                    accept="image/*"
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={() => false}
                    showUploadList={false}
                    multiple={false}
                  >
                    <Button
                      type="primary"
                      icon={<UploadOutlined />}
                      style={{
                        backgroundColor: "orange",
                        marginLeft: "11px",
                      }}
                    >
                      Profile Image
                    </Button>
                  </Upload>
                </div>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input placeholder="Enter your name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Gender"
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Please select your gender",
                        },
                      ]}
                    >
                      <Select placeholder="Select your gender">
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Contact No"
                      name="contactNo"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your contact number",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your contact number" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Company Name"
                      name="companyName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your company name",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your company name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="City"
                      name="city"
                      rules={[
                        { required: true, message: "Please enter your city" },
                      ]}
                    >
                      <Input placeholder="Enter your city" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Post Code"
                      name="postCode"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your post code",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your post code" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Present Address"
                      name="presentAddress"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your present address",
                        },
                      ]}
                    >
                      <Input.TextArea placeholder="Enter your present address" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Permanent Address"
                      name="permanentAddress"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your permanent address",
                        },
                      ]}
                    >
                      <Input.TextArea placeholder="Enter your permanent address" />
                    </Form.Item>
                  </Col>
                </Row>
              </Row>
              <div style={{ textAlign: "center", margin: "20px auto" }}>
                <Button
                  type="primary"
                  style={{ backgroundColor: "orange" }}
                  htmlType="submit"
                >
                  Update Profile
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <div>
            <div className="my-profile py-4">
              <div className="my-profile-img">
                {profileImg ? (
                  <img width="170px" height="170px" src={profileImg} alt="" />
                ) : (
                  <img width="170px" height="170px" src={profile} alt="" />
                )}
              </div>

              <div className="edit-user-profile-info">
                <label className="">
                  <small>Full Name</small>
                </label>
                <br />
                <h6 className="mb-0"> {name}</h6>
                <label className="">
                  <small>Email Address</small>
                </label>
                <h6 className="mb-0">{email}</h6>
                <label className="">
                  <small>Phone Number </small>
                </label>
                <br />
                <h6 className="mb-0">{contactNo}</h6>
                <br />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

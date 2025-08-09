import { UploadOutlined } from "@ant-design/icons";
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
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "../../../redux/features/user/userApi";
type UpdateProfileProps = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateProfile = ({ setEdit }: UpdateProfileProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [updateMyProfileData] = useUpdateMyProfileMutation();
  const defaultAvatar = "https://www.w3schools.com/w3images/avatar2.png";
  const { data: userData } = useGetMyProfileQuery({});
  const {
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
                rules={[{ required: true, message: "Please enter your name" }]}
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
                    required: false,
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
                    required: false,
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
                    required: false,
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
                rules={[{ required: false, message: "Please enter your city" }]}
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
                    required: false,
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
                    required: false,
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
                    required: false,
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
  );
};

export default UpdateProfile;

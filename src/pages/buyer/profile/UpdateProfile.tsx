import { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Upload,
    Avatar,
    Select,
    Card,
    UploadFile,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

type UpdateProfileProps = {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateProfile = ({ setEdit }: UpdateProfileProps) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { data: userData } = useGetMyProfileQuery({});
    const [updateMyProfileData] = useUpdateMyProfileMutation();
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

    const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
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
        // শুধুমাত্র এক ফাইল
        if (fileList.length > 0) {
            formData.append("file", fileList[0].originFileObj as File);
        }

        try {
            const res = await updateMyProfileData(formData).unwrap();
            if (res?.success) {
                toast.success(res?.message, { position: "top-right" });
                form.resetFields();
                setFileList([]);
                setEdit(false);
            } else {
                toast.error(res?.message || "Something went wrong", { position: "top-right" });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.data?.message || "Network error", { position: "top-right" });
        }
    };

    return (
        <Card
            title={<span style={{ color: "white" }}>Update Profile</span>}
            bordered={false}
            style={{ maxWidth: 1200, margin: "20px auto", borderRadius: 2, backgroundColor: '#0b2644ff', border: '1px solid #1e3657ff' }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                autoComplete="off"
            >
                <div
                    style={{
                        marginBottom: 30,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Avatar
                        size={160}
                        src={
                            fileList.length > 0
                                ? fileList[0].thumbUrl || URL.createObjectURL(fileList[0].originFileObj as Blob)
                                : profileImg || null
                        }
                        icon={<UserOutlined />}
                        style={{
                            border: "2px solid #f0f0f0",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            marginBottom: 15,
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
                        <Button type="primary" icon={<UploadOutlined />}>
                            Profile Image
                        </Button>
                    </Upload>
                </div>

                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label={<span style={{ color: "white" }}>Name</span>}
                            name="name"
                            rules={[{ required: true, message: "Please enter your name" }]}
                        >
                            <Input placeholder="Enter your name" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label={<span style={{ color: "white" }}>Gender</span>} name="gender">
                            <Select placeholder="Select your gender">
                                <Select.Option value="male">Male</Select.Option>
                                <Select.Option value="female">Female</Select.Option>
                                <Select.Option value="other">Other</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label={<span style={{ color: "white" }}>Contact No</span>} name="contactNo">
                            <Input placeholder="Enter your contact number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label={<span style={{ color: "white" }}>Company Name</span>} name="companyName">
                            <Input placeholder="Enter your company name" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item name="city" label={<span style={{ color: "white" }}>City</span>} >
                            <Input placeholder="Enter your city" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label={<span style={{ color: "white" }}>Post Code</span>} name="postCode">
                            <Input placeholder="Enter your post code" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item name="presentAddress" label={<span style={{ color: "white" }}>Present Address</span>} >
                            <Input.TextArea placeholder="Enter your present address" rows={3} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item name="permanentAddress" label={<span style={{ color: "white" }}>Permanent Address</span>}>
                            <Input.TextArea placeholder="Enter your permanent address" rows={3} />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Update Profile
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default UpdateProfile;
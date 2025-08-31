import PageTitle from "@/pages/shared/PageTitle/PageTitle";
import { useCrateAdminMutation } from "@/redux/features/admin/adminApi";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select, Upload, UploadFile } from "antd";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const genderOptions = ["male", "female", "other"];
const CreateAdmin = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const navigate = useNavigate();
    const [createAdmin] = useCrateAdminMutation();
    const [submitting, setSubmitting] = useState(false);

    const beforeUpload = (file: File) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("❌ You can only upload image files!");
            return Upload.LIST_IGNORE;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("❌ Image must be smaller than 2MB!");
            return Upload.LIST_IGNORE;
        }
        return false; // prevent auto upload
    };

    const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList.slice(-1));
    };

    const onFinish = async (values: FieldValues) => {
        setSubmitting(true);
        const adminData = {
            password: values.password,
            admin: {
                name: values.name,
                email: values.email,
                gender: values.gender,
                contactNo: values.contactNo,
                city: values.city,
                postCode: values.postCode,
                presentAddress: values.presentAddress,
                permanentAddress: values.permanentAddress,
            }
        }

        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(adminData));
            fileList.forEach((file) => {
                formData.append("file", file.originFileObj as File);
            });

            const res = await createAdmin(formData).unwrap();
            if (res?.success === true) {
                message.success(res?.message);
                form.resetFields();
                setFileList([]);
                navigate('/admin/admin-list', { replace: true });
            }
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            message.error(error?.data?.message || "Network error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <PageTitle pageTitle="Create Admin || Admin" />
            <div style={{ padding: '20px', backgroundColor: '#1c6fc2ff', borderRadius: '5px 5px 0 0' }}>
                <h5 style={{ color: 'white', margin: "0", fontWeight: '700' }}>Create Admin</h5>
            </div>
            <div style={{ padding: '20px 0' }}>
                <Form style={{ padding: '20px', backgroundColor: '#4187ceff', }}
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off" >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item className="my-label"
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: "Name is required" }]}
                            >
                                <Input placeholder="Enter Full Name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item className="my-label"
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Email is required" },
                                    { type: "email", message: "Enter a valid email" },
                                ]}
                            >
                                <Input placeholder="Enter Email Address" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item className="my-label" label="Gender" name="gender">
                                <Select placeholder="Select Gender">
                                    {genderOptions.map((g) => (
                                        <Option key={g} value={g}>
                                            {g}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item className="my-label" label="Contact Number" name="contactNo">
                                <Input placeholder="Enter Contact Number" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item className="my-label" label="City" name="city">
                                <Input placeholder="Enter City" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item className="my-label" label="Post Code" name="postCode">
                                <Input placeholder="Enter Post Code" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} >
                            <Form.Item className="my-label" label="Present Address" name="presentAddress">
                                <Input.TextArea rows={3} placeholder="Enter Present Address" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item className="my-label" label="Permanent Address" name="permanentAddress">
                                <Input.TextArea rows={3} placeholder="Enter Permanent Address" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                className="my-label"
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: "Please enter your password" },
                                ]}
                            >
                                <Input.Password placeholder="Enter Password" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item className="my-label"
                                label="Profile Image"
                                name="profileImg"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => e?.fileList}
                            >
                                <Upload
                                    beforeUpload={beforeUpload}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleChange}
                                    maxCount={1}
                                    showUploadList={{
                                        showRemoveIcon: true,
                                        showPreviewIcon: false,
                                    }}
                                >
                                    {fileList.length >= 1 ? null : (
                                        <div>
                                            <UploadOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>

                        </Col>
                    </Row>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full" loading={submitting}>
                            Create Admin
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CreateAdmin;
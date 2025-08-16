import { useState } from "react";
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
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

const UpdateProfile = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);

    const handleChange = ({ fileList }: any) => {
        setFileList(fileList);
    };

    const handleFinish = (values: any) => {
        console.log("Submitted Data:", values);
    };

    return (
        <Card
            title="Update Profile"
            bordered={false}
            style={{ maxWidth: 800, margin: "0 auto", boxShadow: "0 2px 8px #f0f1f2" }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                autoComplete="off"
            >
                {/* Profile Image Section */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: 30,
                    }}
                >
                    <Avatar
                        size={120}
                        src={
                            fileList.length > 0
                                ? fileList[0].thumbUrl ||
                                URL.createObjectURL(fileList[0].originFileObj as Blob)
                                : null
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
                    >
                        <Button type="primary" icon={<UploadOutlined />}>
                            Upload Profile Image
                        </Button>
                    </Upload>
                </div>

                {/* Form Fields */}
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
                        <Form.Item label="Gender" name="gender">
                            <Select placeholder="Select your gender">
                                <Select.Option value="male">Male</Select.Option>
                                <Select.Option value="female">Female</Select.Option>
                                <Select.Option value="other">Other</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Contact No" name="contactNo">
                            <Input placeholder="Enter your contact number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Company Name" name="companyName">
                            <Input placeholder="Enter your company name" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="City" name="city">
                            <Input placeholder="Enter your city" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Post Code" name="postCode">
                            <Input placeholder="Enter your post code" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Present Address" name="presentAddress">
                            <Input.TextArea placeholder="Enter your present address" rows={3} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Permanent Address" name="permanentAddress">
                            <Input.TextArea placeholder="Enter your permanent address" rows={3} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Submit Button */}
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        style={{ backgroundColor: "orange", borderColor: "orange" }}
                    >
                        Update Profile
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default UpdateProfile;
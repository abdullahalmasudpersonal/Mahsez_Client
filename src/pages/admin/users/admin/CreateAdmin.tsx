import PageTitle from "@/pages/shared/PageTitle/PageTitle";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select, Upload } from "antd";

const { Option } = Select;
const genderOptions = ["male", "female", "other"];
const CreateAdmin = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("✅ Form Data: ", values);
        message.success("Admin Created Successfully!");
    };

    return (
        <div>
            <PageTitle pageTitle="Create Admin || Admin" />
            <div style={{ padding: '20px', backgroundColor: '#1c6fc2ff', borderRadius: '5px 5px 0 0' }}>
                <h5 style={{ color: 'white', margin: "0", fontWeight: '700' }}>Create Admin</h5>
            </div>
            <div style={{padding:'20px 0'}}>
                <Form style={{ padding: '20px', backgroundColor: '#4187ceff', }}
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off" >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: "Name is required" }]}
                            >
                                <Input placeholder="Enter Full Name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
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
                            <Form.Item label="Gender" name="gender">
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
                            <Form.Item label="Contact Number" name="contactNo">
                                <Input placeholder="Enter Contact Number" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item label="City" name="city">
                                <Input placeholder="Enter City" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item label="Post Code" name="postCode">
                                <Input placeholder="Enter Post Code" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} >
                            <Form.Item label="Present Address" name="presentAddress">
                                <Input.TextArea rows={3} placeholder="Enter Present Address" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item label="Permanent Address" name="permanentAddress">
                                <Input.TextArea rows={3} placeholder="Enter Permanent Address" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Profile Image" name="profileImg" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
                        <Upload beforeUpload={() => false} listType="picture">
                            <Button icon={<UploadOutlined />}>Profile Image</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Create Admin
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CreateAdmin;
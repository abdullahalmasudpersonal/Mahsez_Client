import { useState } from "react";
import PageTitle from "../../../shared/PageTitle/PageTitle";
import { Form, Input, Button, Row, Col, Upload, UploadFile, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import imageCompression from "browser-image-compression";
import { TBlog } from "../../../../types/blog.types";
import { toast } from "sonner";
import { useCreateBlogMutation } from "../../../../redux/features/blog/BlogApi";
import { resizeImage } from "../../../../utils/resizeResolution";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [createBlog] = useCreateBlogMutation();
  const navigate = useNavigate();

  const handleChange = async ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    if (newFileList.length > 0) {
      const file = newFileList[newFileList.length - 1]; // শুধুমাত্র প্রথম ইমেজ নিন
      if (file.originFileObj) {
        try {
          // Compress the file
          const options = {
            maxSizeMB: 1,
            useWebWorker: true,
          };

          const compressedBlob = await imageCompression(
            file.originFileObj as File,
            options
          );

          const compressedFile = new File([compressedBlob], file.name, {
            type: file.type,
            lastModified: file.originFileObj.lastModified,
          });

          // Resize the compressed file
          const resizedFile = await resizeImage(compressedFile, 1350, 1000);

          // Update fileList with only one processed file
          setFileList([
            {
              ...file,
              url: URL.createObjectURL(resizedFile),
              originFileObj: resizedFile,
              size: resizedFile.size,
            } as UploadFile<unknown>,
          ]);
        } catch (error) {
          console.error("Error compressing or resizing image:", error);
        }
      }
    }
  };

  const onFinish = async (values: TBlog) => {
    const blogData = {
      title: values?.title,
      description: values?.description,
      description2: values?.description2,
      features: values?.features,
      features2: values?.features2,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(blogData));
    fileList.forEach((file) => {
      formData.append("file", file.originFileObj as File);
    });
    const res = await createBlog(formData).unwrap();
    if (res?.success === true) {
      toast.success(res?.message, { position: "top-right" });
      form.resetFields();
      setFileList([]);
      navigate(`/admin/list-blogs`);
    } else {
      toast.error(res?.message, { position: "top-right" });
      console.log(res.message);
    }
  };

  return (
    <div>
      <PageTitle pageTitle="Create Blog || Admin" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#1c6fc2ff', borderRadius: '5px 5px 0 0' }}>
        <h5 style={{ color: 'white', margin: "0", fontWeight: '700' }}>Create Blog</h5>
      </div>
      <div style={{ paddingTop: "20px", }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: "980px", margin: "0 auto", backgroundColor: '#4187ceff', padding: '20px', borderRadius: '5px' }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item className="my-label"
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter the title" }]}
              >
                <Input placeholder="Enter title" />
              </Form.Item>
            </Col>

            {/* Description */}
            <Col xs={24} sm={24}>
              <Form.Item className="my-label"
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter the description" },
                ]}
              >
                <Input.TextArea placeholder="Enter description" rows={4} />
              </Form.Item>
            </Col>

            {/* Description2 (Array of Strings) */}
            <Col xs={24} sm={24}>
              <Form.Item className="my-label" label="Description2 (Optional)" name="description2">
                <Input.TextArea
                  placeholder="Enter multiple descriptions separated by commas"
                  rows={4}
                />
              </Form.Item>
            </Col>

            {/* Features */}
            <Col xs={24} sm={24}>
              <Form.Item className="my-label" label="Features (Optional)" name="features">
                <Input.TextArea placeholder="Enter features" rows={4} />
              </Form.Item>
            </Col>

            {/* Features2 (Array of Strings) */}
            <Col xs={24} sm={24}>
              <Form.Item className="my-label" label="Features2 (Optional)" name="features2">
                <Input.TextArea
                  placeholder="Enter multiple features separated by commas"
                  rows={4}
                />
              </Form.Item>
            </Col>

            <div
              style={{
                height: "230px",
                // width: "250px",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  height: "160px",
                  width: "180px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  borderRadius: "2px",
                }}
              >
                {fileList.length > 0 && (
                  <Image
                    width={180}
                    height={160}
                    src={fileList[0].url}
                    style={{ borderRadius: "2px" }}
                  />
                )}
              </div>

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
                    backgroundColor: "#004196ff",
                    marginLeft: "28px",
                  }}
                >
                  Blog Image
                </Button>
              </Upload>
            </div>
          </Row>
          <hr />
          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#004196ff", padding: "10px 50px" }}
            >
              Create Blog
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateBlog;

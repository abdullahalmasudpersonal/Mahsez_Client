import { Form, Input, Button, Row, Col, Image, Upload, UploadFile } from "antd";
import PageTitle from "../../../shared/PageTitle/PageTitle";
import { TBlog } from "../../../../types/blog.types";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "../../../../redux/features/blog/BlogApi";
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { resizeImage } from "../../../../utils/resizeResolution";
import { toast } from "sonner";

const UpdateBlog = () => {
  const { blogId } = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [updateBlog] = useUpdateBlogMutation();
  const { data: blogData } = useGetSingleBlogQuery(blogId);
  const defaultAvatar = "https://www.w3schools.com/w3images/avatar2.png";
  const { _id, title, description, description2, features, features2, image } =
    blogData?.data || {};

  //// set default values
  useEffect(() => {
    form.setFieldsValue({
      title: title,
      description: description,
      description2: description2,
      features: features,
      features2: features2,
    });
  });

  // const handleChange = ({
  //   fileList: newFileList,
  // }: {
  //   fileList: UploadFile[];
  // }) => {
  //   setFileList(newFileList.slice(-1));
  // };

  const handleChange = async ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    const compressedFileList = (await Promise.all(
      newFileList.map(async (file) => {
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

            console.log(compressedFile, "compressedfile");
            // Resize the compressed file to 1000 x 1000 pixels
            const resizedFile = await resizeImage(compressedFile, 1350, 1000);

            console.log(resizedFile, "resizefiles");

            return {
              ...file,
              url: URL.createObjectURL(resizedFile),
              originFileObj: resizedFile,
              size: resizedFile.size,
            } as UploadFile<unknown>;
          } catch (error) {
            console.error("Error compressing or resizing image:", error);
            return file;
          }
        }
        return file;
      })
    )) as UploadFile<unknown>[];

    setFileList([...compressedFileList]);
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
    const res = await updateBlog({ formData, _id }).unwrap();
    if (res?.success === true) {
      toast.success(res?.message, { position: "top-right" });
      // form.resetFields();
      // setFileList([]);
    }
  };

  return (
    <div className="dashboard-dev2">
      <PageTitle pageTitle="Update Blog || Admin" />
      <div className="pt-4 px-4">
        <h5 className="fw-bold ">Update Blog</h5>
      </div>
      <hr />
      <div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: "980px", margin: "0 auto" }}
        >
          <Row gutter={16}>
            {/* Title */}
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter the title" }]}
              >
                <Input placeholder="Enter title" />
              </Form.Item>
            </Col>

            {/* Description */}
            <Col xs={24} sm={24}>
              <Form.Item
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
              <Form.Item label="Description2 (Optional)" name="description2">
                <Input.TextArea
                  placeholder="Enter multiple descriptions separated by commas"
                  rows={4}
                />
              </Form.Item>
            </Col>

            {/* Features */}
            <Col xs={24} sm={24}>
              <Form.Item label="Features (Optional)" name="features">
                <Input.TextArea placeholder="Enter features" rows={4} />
              </Form.Item>
            </Col>

            {/* Features2 (Array of Strings) */}
            <Col xs={24} sm={24}>
              <Form.Item label="Features2 (Optional)" name="features2">
                <Input.TextArea
                  placeholder="Enter multiple features separated by commas"
                  rows={4}
                />
              </Form.Item>
            </Col>

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
                    : image || defaultAvatar
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
                    marginLeft: "17px",
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
              style={{ backgroundColor: "orange", padding: "10px 50px" }}
            >
              Update Blog
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateBlog;

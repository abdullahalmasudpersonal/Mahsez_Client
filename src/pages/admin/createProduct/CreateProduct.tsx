import { useState } from "react";
import "./CreateProduct.css";
import PageTitle from "../../shared/PageTitle/PageTitle";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Row,
  Col,
  Upload,
  Modal,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import ReactQuill from "react-quill";
import { PlusOutlined } from "@ant-design/icons";
import { categoriesData } from "./CreateCategoreData";
import { FieldValues } from "react-hook-form";
import { useCreateProductMutation } from "../../../redux/features/product/productApi";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { resizeImage } from "../../../utils/resizeResolution";

const { Option } = Select;

type SubCategory = string;
type Category = {
  name: string;
  subCategories: SubCategory[];
};

const CreateProduct = () => {
  const [mainCategory, setMainCategory] = useState<string>("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [createProduct] = useCreateProductMutation();

  // ///////////////// category handle
  const changeMainCategory = (value: string) => {
    setMainCategory(value);
    const mainCategoryData = categoriesData.find((ctr) => ctr.name === value);
    if (mainCategoryData) {
      setCategories(mainCategoryData.categories);
    }
  };
  const changeCategory = (value: string) => {
    setCategory(value);
    const categoryData = categories.find((ctr) => ctr.name === value);
    if (categoryData) {
      setSubCategories(categoryData.subCategories);
    }
  };
  const changeSubCategory = (value: string) => {
    setSubCategory(value);
  };

  /////////////////// images upload /////////////
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || file.thumbUrl || "");
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
    setPreviewOpen(true);
  };

  // const handleChange = ({
  //   fileList: newFileList,
  // }: {
  //   fileList: UploadFile[];
  // }) => {
  //   setFileList(newFileList);
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
            const resizedFile = await resizeImage(compressedFile, 1000, 1000);

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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // ////////////////////  Handle form //////////////////
  const [form] = Form.useForm();
  const handleSubmit = async (data: FieldValues) => {
    Modal.confirm({
      title: "Are you sure you want to create product !",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          const productData = {
            mainCategory: data?.mainCategory,
            category: data?.category,
            subCategory: data?.subCategory,
            name: data?.name,
            brand: data?.brand,
            availableQuantity: data?.availableQuantity,
            stockStatus: data?.stockStatus,
            price: data?.price,
            regularPrice: data?.regularPrice,
            offerPrice: data?.offerPrice,
            size: data?.size,
            features: data?.features,
            features2: data?.features2,
            description: data?.description,
            description2: data?.description2,
          };

          const formData = new FormData();
          formData.append("data", JSON.stringify(productData));
          fileList.forEach((file) => {
            console.log(file, "file");
            formData.append("files", file.originFileObj as File);
          });

          const res = await createProduct(formData).unwrap();
          if (res?.success === true) {
            toast.success(res?.message, { position: "top-right" });
            form.resetFields();
            setFileList([]);
          }
        } catch (error) {
          if (error && typeof error === "object" && "data" in error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errorData = (error as any).data;
            if (
              errorData &&
              typeof errorData === "object" &&
              "message" in errorData
            ) {
              toast.error(errorData.message, { position: "top-right" });
              form.resetFields();
              setFileList([]);
              console.log(errorData.message);
            }
          } else {
            console.log("An unknown error occurred");
          }
        }
      },
    });
  };

  return (
    <>
      <div className="dashboard-dev2">
        <PageTitle pageTitle="Create Product || Admin" />
        <div className="pt-4 px-4">
          <h4 className="fw-bold side-header">Create Product</h4>
        </div>
        <hr />
        <div className="p-3">
          <div className="create-product-dev">
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="mainCategory"
                    label="Main Category"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Main Category--"
                      value={mainCategory}
                      onChange={changeMainCategory}
                    >
                      {categoriesData.map((mainCat) => (
                        <Option key={mainCat.name} value={mainCat.name}>
                          {mainCat.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="   Category--"
                      value={category}
                      onChange={changeCategory}
                      disabled={!categories.length}
                    >
                      {categories.map((cat) => (
                        <Option key={cat.name} value={cat.name}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Sub Category"
                    name="subCategory"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Sub Category--"
                      value={subCategory}
                      onChange={changeSubCategory}
                      disabled={!subCategories.length}
                    >
                      {subCategories.map((subCat) => (
                        <Option key={subCat} value={subCat}>
                          {subCat}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Option value="Mahsez">Mahsez</Option>
                      <Option value="Alif">Alif</Option>
                      <Option value="Al-Nuaim">Al-Nuaim</Option>
                      <Option value="Manfare">Manfare</Option>
                      <Option value="Leebas">Leebas</Option>
                      <Option value="AKIJ">AKIJ</Option>
                      <Option value="Morphy">Morphy</Option>
                      <Option value="No Brand">No Brand</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Available Quantity"
                    name="availableQuantity"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Stock Status"
                    name="stockStatus"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Option value="In Stock">In Stock</Option>
                      <Option value="Out Of Stock">Out Of Stock</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true }]}
                  >
                    <InputNumber style={{ width: "100%" }} min={0} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Regular Price"
                    name="regularPrice"
                    rules={[{ required: true }]}
                  >
                    <InputNumber style={{ width: "100%" }} min={0} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="offerPrice" label="Offer Price">
                    <InputNumber style={{ width: "100%" }} min={0} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={24}>
                  <Form.Item
                    name="size"
                    label="Size"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Option value="S">S</Option>
                      <Option value="M">M</Option>
                      <Option value="L">L</Option>
                      <Option value="No Size">No Size</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label="Features"
                    name="features"
                    rules={[{ required: true }]}
                  >
                    <ReactQuill />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Features 2" name="features2">
                    <ReactQuill />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true }]}
                  >
                    <ReactQuill />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Description 2" name="description2">
                    <ReactQuill />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Image Upload" name="images">
                    <Upload
                      accept="image/*"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      beforeUpload={() => false}
                      multiple
                    >
                      {fileList.length >= 8 ? null : uploadButton}
                    </Upload>

                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                      />
                    </Modal>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: "#ff6347",
                        borderColor: "#ff6347",
                        color: "#ffffff",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Save Product
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;

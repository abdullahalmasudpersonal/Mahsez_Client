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

export type TProduct = {
  mainCategory: string;
  category: string;
  subCategory: string;
  name: string;
  brand: string;
  availableQuantity: number;
  stockStatus: "In Stock" | "Out Of Stock";
  price: number;
  regularPrice: number;
  offerPrice: number;
  size: string;
  features: string;
  features2: string[];
  description: string;
  description2: string[];
  image: string[];
};

const { Option } = Select;
type SubCategory = string;
type Category = {
  name: string;
  subCategories: SubCategory[];
};

const CreateProduct = () => {
  const [product, setProduct] = useState<TProduct>({
    mainCategory: "",
    category: "",
    subCategory: "",
    name: "",
    brand: "",
    availableQuantity: 0,
    stockStatus: "In Stock",
    price: 0,
    regularPrice: 0,
    offerPrice: 0,
    size: "",
    features: "",
    features2: [],
    description: "",
    description2: [],
    image: [],
  });

  // const [loading, setLoading] = useState(false);
  ///////////////////////////////
  const [mainCategory, setMainCategory] = useState<string>("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // ////////////// handle react quill
  const handleQuillChange = (
    value: string | string[],
    field: keyof TProduct
  ) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: Array.isArray(value) ? value : value.split("\n"),
    }));
  };

  // const handleImageUpload = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "your_upload_preset"); // আপনার Cloudinary এর upload_preset
  //   formData.append("cloud_name", "your_cloud_name"); // আপনার Cloudinary এর cloud_name

  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //     const data = await res.json();
  //     setProduct((prev) => ({
  //       ...prev,
  //       image: [...prev.image, data.secure_url],
  //     }));
  //     message.success("Image uploaded successfully");
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (error) {
  //     message.error("Image upload failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  ////////////////// handle comfirm mmodal
  // const showConfirmModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleOk = async () => {
    setIsModalOpen(false);
  };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  /////////////////// images upload /////////////
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  // প্রিভিউ মোডাল বন্ধ করার জন্য
  const handleCancel = () => setPreviewOpen(false);

  // ইমেজ প্রিভিউ দেখানোর জন্য
  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || file.thumbUrl || "");
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
    setPreviewOpen(true);
  };

  // আপলোডকৃত ফাইল লিস্ট পরিবর্তনের জন্য
  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };

  // আপলোড বাটন
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // const handleUpload = async () => {
  //   setUploading(true);
  // };

  // ////////////////////  Handle form //////////////////
  const handleSubmit = async (data: FieldValues) => {
    // showConfirmModal();
    // const handleOk = async () => {
    //   setIsModalOpen(false);
    // };
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

    // ফর্মডাটা তৈরি এবং ডেটা যুক্ত
    const formData = new FormData();
    formData.append("data", JSON.stringify(productData)); // JSON স্ট্রিং হিসেবে পাঠানো
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj as File); // `files` নামে ইমেজগুলো যুক্ত করা
    });

    console.log(formData, "formdata");
    // const datas = modifyPayload(productData);
    const res = await createProduct(formData);
    console.log(res, "res");
  };

  //  const imageStorageKey = "a3d4bff21c6d258146feb02c43808485";
  // const onSubmit = async (data) => {
  //   const proseed = window.confirm(`Are you sure Create New Product ?`);
  //   if (proseed) {
  //     const image = data.image1[0];
  //     const image2 = data.image2[0];
  //     const formData = new FormData();
  //     formData.append("image", image, image2);
  //     const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
  //     fetch(url, {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then((imgData) => {
  //         if (imgData.success) {
  //           //  const img = imgData.data.url;
  //           const newPorduct = {
  //             mainCategory: mainCategory,
  //             category: category,
  //             subCategory: subCategory,
  //             name: data.name,
  //             brand: data.brand,
  //             availableQuantity: data.availableQuantity,
  //             stockStatus: data.stockStatus,
  //             price: data.price,
  //             ragularPrice: data.ragularPrice,
  //             offerPrice: data.offerPrice,
  //             description: data.description,
  //             description2: val,
  //             image1: imgData.data.url,
  //             image2: imgData.data.url,
  //           };
  //           fetch("http://localhost:5000/api/v1/products", {
  //             method: "POST",
  //             headers: {
  //               "content-type": "application/json",
  //               authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //             },
  //             body: JSON.stringify(newPorduct),
  //           })
  //             .then((res) => res.json())
  //             .then((inserted) => {
  //               //   console.log('inser', inserted)
  //               if (inserted.insertedId) {
  //                 toast.success("Added New Product");
  //                 reset();
  //               } else {
  //                 toast.error("Faield to Added New Product");
  //               }
  //             });
  //         }
  //       });
  //   }
  // };

  return (
    <>
      <Modal
        title="Are you Sure ?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to submit this product?</p>
      </Modal>
      <div className="dashboard-dev2">
        <PageTitle pageTitle="Create Product |" />
        <div className="pt-4 ps-4">
          <h4 className="fw-bold side-header">Create Product</h4>
        </div>
        <hr />
        <div className="p-3">
          <div className="create-product-dev">
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="mainCategory"
                    label="Main Category"
                    rules={[{ required: true }]}
                  >
                    <Select value={mainCategory} onChange={changeMainCategory}>
                      <Option value="" hidden>
                        Main Category--
                      </Option>
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
                    <Input
                      value={product.name}
                      onChange={(e) =>
                        setProduct({ ...product, name: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[{ required: true }]}
                  >
                    <Select value={product.brand}>
                      <Option value="Mahsez">Mahsez</Option>
                      <Option value="Alif">Alif</Option>
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
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      value={product.availableQuantity}
                      onChange={(value) =>
                        setProduct({
                          ...product,
                          availableQuantity: value || 0,
                        })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Stock Status"
                    name="stockStatus"
                    rules={[{ required: true }]}
                  >
                    <Select
                      value={product.stockStatus}
                      onChange={(value) =>
                        setProduct({ ...product, stockStatus: value })
                      }
                    >
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
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      value={product.price}
                      onChange={(value) =>
                        setProduct({ ...product, price: value || 0 })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Regular Price"
                    name="regularPrice"
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      value={product.regularPrice}
                      onChange={(value) =>
                        setProduct({ ...product, regularPrice: value || 0 })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="offerPrice" label="Offer Price">
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      value={product.offerPrice}
                      onChange={(value) =>
                        setProduct({ ...product, offerPrice: value || 0 })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={24}>
                  <Form.Item
                    name="size"
                    label="Size"
                    rules={[{ required: true }]}
                  >
                    <Select value={product.size}>
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
                    <ReactQuill
                      value={product.features}
                      onChange={(value) => handleQuillChange(value, "features")}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Features 2" name="features2">
                    <ReactQuill
                      value={product.features2.join("\n")}
                      onChange={(value) =>
                        handleQuillChange(value.split("\n"), "features2")
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true }]}
                  >
                    <ReactQuill
                      value={product.description}
                      onChange={(value) =>
                        handleQuillChange(value, "description")
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Description 2" name="description2">
                    <ReactQuill
                      value={product.description2.join("\n")}
                      onChange={(value) =>
                        handleQuillChange(value.split("\n"), "description2")
                      }
                    />
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
                      beforeUpload={() => false} // ফাইলগুলো সরাসরি আপলোড না করে, শুধু UI তে দেখাবে
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

                    {/* {fileList.length > 0 && (
                      <button
                        onClick={handleUpload}
                        disabled={uploading}
                        style={{ marginTop: 16 }}
                      >
                        {uploading ? "Uploading..." : "Start Upload"}
                      </button>
                    )}

                    {uploading && <Progress percent={50} status="active" />} */}
                    {/* <Upload
                      accept="image/*"
                      beforeUpload={handleImageUpload}
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />} loading={loading}>
                        Click to Upload
                      </Button>
                    </Upload>
                    {product.image.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="uploaded"
                        style={{ width: 100, marginTop: 10 }}
                      />
                    ))} */}
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
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

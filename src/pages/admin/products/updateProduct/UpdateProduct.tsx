import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../shared/PageTitle/PageTitle";
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
  UploadFile,
} from "antd";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { resizeImage } from "../../../../utils/resizeResolution";
import imageCompression from "browser-image-compression";
import { categoriesData } from "../createProduct/CreateCategoreData";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../../redux/features/product/productApi";
import { toast } from "sonner";

type SubCategory = string;
type Category = {
  name: string;
  subCategories: SubCategory[];
};

const { Option } = Select;
const UpdateProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [mainCategory, setMainCategory] = useState<string>("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [updateProduct] = useUpdateProductMutation();
  const { data: productData } = useGetSingleProductQuery(productId);
  /////////////////// images upload /////////////
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  //////////////////////handle preview image ///////////////////
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || file.thumbUrl || "");
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
    setPreviewOpen(true);
  };

  //////////// ‍set default values
  useEffect(() => {
    if (productData?.data) {
      const {
        mainCategory,
        category,
        subCategory,
        name,
        brand,
        availableQuantity,
        stockStatus,
        purchaseprice,
        price,
        regularPrice,
        offerPrice,
        size,
        features,
        features2,
        description,
        description2,
        image,
      } = productData.data;

      setMainCategory(mainCategory);
      const mainCategoryData = categoriesData.find(
        (ctr) => ctr.name === mainCategory
      );
      if (mainCategoryData) {
        setCategories(mainCategoryData.categories);
        setCategory(category);
      }
      const categoryData = mainCategoryData?.categories.find(
        (cat) => cat.name === category
      );
      if (categoryData) {
        setSubCategories(categoryData.subCategories);
        setSubCategory(subCategory);
      }

      form.setFieldsValue({
        mainCategory,
        category,
        subCategory,
        name,
        brand,
        availableQuantity,
        stockStatus,
        purchaseprice,
        price,
        regularPrice,
        offerPrice,
        size,
        features,
        features2,
        description,
        description2,
        image,
      });

      const imageFiles = (image || []).map(
        (imageUrl: string, index: number) => ({
          uid: `${index}`,
          name: `Image ${index + 1}`,
          status: "done",
          url: imageUrl,
        })
      );
      setFileList(imageFiles);
    }
  }, [productData, form]);

  // ///////////////// category handle
  const changeMainCategory = async (value: string) => {
    setMainCategory(value);
    const mainCategoryData = categoriesData.find((ctr) => ctr.name === value);
    if (mainCategoryData) {
      setCategories(mainCategoryData.categories);
    }
  };
  const changeCategory = async (value: string) => {
    setCategory(value);
    const categoryData = categories.find((ctr) => ctr.name === value);
    if (categoryData) {
      setSubCategories(categoryData.subCategories);
    }
  };
  const changeSubCategory = async (value: string) => {
    setSubCategory(value);
  };

  ////////////////// handle upload image /////////////
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

  /////////////// handle update prodcut //////////////////
  const handleSubmit = async (data: FieldValues) => {
    const productData = {
      mainCategory: data?.mainCategory,
      category: data?.category,
      subCategory: data?.subCategory,
      name: data?.name,
      brand: data?.brand,
      availableQuantity: data?.availableQuantity,
      stockStatus: data?.stockStatus,
      price: data?.price,
      purchaseprice: data?.purchaseprice,
      regularPrice: data?.regularPrice,
      offerPrice: data?.offerPrice,
      size: data?.size,
      features: data?.features,
      features2: data?.features2,
      description: data?.description,
      description2: data?.description2,
    };

    const existingImages = fileList
      .filter((file) => !file.originFileObj && file.url)
      .map((file) => file.url);
    const newImages = fileList.filter((file) => file.originFileObj);
    const formData = new FormData();
    formData.append("data", JSON.stringify(productData));
    existingImages.forEach((url) => {
      if (url) {
        formData.append("existingFiles", url);
      }
    });
    for (const file of newImages) {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj as File);
      }
    }

    try {
      const res = await updateProduct({ formData, productId }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { position: "top-right" });
        form.resetFields();
        setFileList([]);
        navigate("/admin/list-products");
      } else {
        toast.error(res?.message, { position: "top-right" });
      }
    } catch (error) {
      toast.error("Failed to update product!", { position: "top-right" });
      console.error(error);
    }
  };

  return (
    <div className="dashboard-dev2">
      <PageTitle pageTitle="Create Product || Admin" />
      <div className="pt-4 px-4">
        <h4 className="fw-bold side-header">Update Product</h4>
      </div>
      <hr />
      <div style={{ padding: "5px 20px" }}>
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
                label="Purchase Price"
                name="purchaseprice"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
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

            <Col xs={24} md={12}>
              <Form.Item name="size" label="Size" rules={[{ required: true }]}>
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
              <Form.Item label="Warranty" name="warranty">
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
  );
};

export default UpdateProduct;

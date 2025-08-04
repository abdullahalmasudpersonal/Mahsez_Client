
import { TProduct } from "../../../../types/product.types";
import { Modal, Form, Input, Rate, Button, Row, Col, Grid, UploadFile } from 'antd';
import { useGetMyProfileQuery } from "../../../../redux/features/user/userApi";
import { useCreateReviewMutation } from "../../../../redux/features/review/reviewApi";
import { useState } from "react";
import { toast } from "sonner";
import { TReview } from "../../../../types/review.types";

type ReviewModalProps = {
  open: boolean;
  onClose: () => void;
  productDetails: TProduct;
};


const CreateReview = ({ open, onClose, productDetails }: ReviewModalProps) => {
  const { useBreakpoint } = Grid;
  const { data: userData } = useGetMyProfileQuery({});
  // const [review, setReview] = useState<string | undefined>(undefined);
  const { _id, image, name: productName } = productDetails || '';
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [createReview] = useCreateReviewMutation();
  const [fileList, /* setFileList */] = useState<UploadFile[]>([]);

  const onFinish = async (values: TReview) => {
    const { name } = userData?.data || "";
    const reviewData = {
      productId: _id,
      displayName: name,
      rating: values.rating,
      comment: values.comment,
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(reviewData));
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj as File);
    });
    const res = await createReview(formData).unwrap();
    if (res.success) {
      toast.success(res?.message, { position: "top-right" });
      form.resetFields();
      onClose();
    }else {
      toast.error(res?.message, { position: "top-right" });
      form.resetFields();
      onClose();
    }

  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={screens.xs ? '90%' : 800}
      centered
      style={{ marginTop: "120px", marginBottom: '80px' }}
      title={<h3 style={{ margin: 0 }}>Write Your Review</h3>}
      maskClosable={false}
    >
      <Row gutter={16} wrap>
        <Col xs={24} md={12}>
          {image?.[0] && (
            <img src={image?.[0]} alt="Product image" className="img-fluid" /* style={{ width: '100%', height: 'auto', borderRadius: 8 }} */ />
          )}
        </Col>
        <Col xs={24} md={12}>
          <h5>{productName.length < 65 ? productName : `${productName.slice(0, 65) + '...'}`}</h5>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
              <Rate style={{ color: 'orange' }} />
            </Form.Item>
            <Form.Item name="comment" label="Comment">
              <Input.TextArea rows={4} placeholder="Write your review..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit Review
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>

  );
};

export default CreateReview;
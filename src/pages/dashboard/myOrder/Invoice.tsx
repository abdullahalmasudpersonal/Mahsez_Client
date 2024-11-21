import { useState } from "react";
import logo from "../../../../public/assets/img/logo/mahsez.png";
import {
  Card,
  Typography,
  Table,
  Row,
  Col,
  Divider,
  Button,
  Image,
} from "antd";
import PageTitle from "../../shared/PageTitle/PageTitle";
import {
  DownloadOutlined,
  PrinterOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
const { Title, Text } = Typography;

const Invoice = () => {
  const [downLovered, setdownLovered] = useState(false);
  const [printHovered, setprintHovered] = useState(false);
  const [shareHovered, setshareHovered] = useState(false);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Product Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Qty.",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const data = [
    {
      key: "1",
      no: "01",
      description: "Business Card Design",
      price: "$50",
      quantity: 2,
      total: "$100",
    },
    {
      key: "2",
      no: "02",
      description: "Business Card Design",
      price: "$50",
      quantity: 2,
      total: "$100",
    },
    // আরও ডাটা যোগ করুন...
  ];

  // PDF ডাউনলোড করার ফাংশন
  const handleDownload = () => {
    const element = document.getElementById("invoice");
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
        pdf.save("invoice.pdf");
      });
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("invoice");
    if (printContent) {
      const newWindow = window.open("", "", "width=800,height=600");
      newWindow?.document.write(
        "<html><head><title>Invoice</title></head><body>"
      );
      newWindow?.document.write(printContent.innerHTML);
      newWindow?.document.write("</body></html>");
      newWindow?.document.close();
      newWindow?.print();
    }
  };

  return (
    <div className="dashboard-dev2">
      <PageTitle pageTitle="Invoice" />
      <div className="pt-4 px-4" style={{ display: "flex", gap: "10px" }}>
        <h5 className="fw-bold ">Invoice</h5>
        <div>
          <Button
            color="default"
            variant="outlined"
            style={{
              color: downLovered ? "white" : "#ff6600",
              backgroundColor: downLovered ? "#ff6600" : "white",
              borderColor: downLovered ? "#ff6600" : "#ff6600",
              transition: "all 0.5s ease",
            }}
            onClick={handleDownload}
            onMouseEnter={() => setdownLovered(true)}
            onMouseLeave={() => setdownLovered(false)}
            // onClick={() => setdownLovered(true)}
          >
            <DownloadOutlined /> Download
          </Button>
        </div>
        <Button
          style={{
            color: printHovered ? "white" : "#8000e9",
            backgroundColor: printHovered ? "#8000e9" : "white",
            borderColor: printHovered ? "#8000e9" : "#8000e9",
            transition: "all 0.5s ease",
          }}
          onMouseEnter={() => setprintHovered(true)}
          onMouseLeave={() => setprintHovered(false)}
          //   onClick={() => setprintHovered(true)}
          onClick={handlePrint}
        >
          <PrinterOutlined /> Prient
        </Button>
        <Button
          style={{
            color: shareHovered ? "white" : "#1e9700",
            backgroundColor: shareHovered ? "#1e9700" : "white",
            borderColor: shareHovered ? "#1e9700" : "#1e9700",
            transition: "all 0.5s ease",
          }}
          onMouseEnter={() => setshareHovered(true)}
          onMouseLeave={() => setshareHovered(false)}
          onClick={() => setshareHovered(true)}
        >
          <ShareAltOutlined /> Share
        </Button>
      </div>
      <hr />
      <Card style={{ margin: 20 }} id="invoice">
        <Row justify="space-between" align="middle">
          <Col>
            <Image
              src={logo}
              alt="Logo"
              width={140}
              height={60}
              preview={false}
            />
            <Typography>Committed To Quality</Typography>
          </Col>
          <Col>
            <Title level={2} style={{ margin: 0, color: "green" }}>
              INVOICE
            </Title>
            <Text>Invoice Number: #123456</Text>
            <br />
            <Text>Invoice Date: April 05, 2020</Text>
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Invoice To:</Text>
            <br />
            <Text>Jhonne Doe.</Text>
            <br />
            <Text>Managing Director, Company Ltd.</Text>
            <br />
            <Text>Phone: +123-4567-8910</Text>
            <br />
            <Text>Email: example@mail.com</Text>
          </Col>
          <Col span={12}>
            <Text strong>Invoice From:</Text>
            <br />
            <Text>Jhonne Smith.</Text>
            <br />
            <Text>Managing Director, Company Ltd.</Text>
            <br />
            <Text>Phone: +123-4567-8910</Text>
            <br />
            <Text>Email: example@mail.com</Text>
          </Col>
        </Row>
        <Divider />
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{ marginBottom: 20 }}
        />
        <Row justify="end">
          <Col span={8}>
            <Row justify="space-between">
              <Text>Subtotal:</Text>
              <Text>$315.00</Text>
            </Row>
            <Row justify="space-between">
              <Text>Tax (10%):</Text>
              <Text>$31.50</Text>
            </Row>
            <Row justify="space-between">
              <Text strong>Total:</Text>
              <Text strong>$346.50</Text>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <Text strong>Payment Method:</Text>
            <br />
            <Text>Account No: 1234 5678 910</Text>
            <br />
            <Text>Account Name: Jhonne Doe.</Text>
            <br />
            <Text>Branch Name: XYZ</Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Text>Authorized Sign:</Text>
            <br />
            <br />
            <div
              style={{
                width: "150px",
                height: "50px",
                border: "1px solid #ddd",
                margin: "auto",
              }}
            />
          </Col>
        </Row>
        <Divider />
        <Row justify="center">
          <Text type="secondary">Thank You For Your Business</Text>
        </Row>
      </Card>
    </div>
  );
};

export default Invoice;

import { Collapse, notification } from "antd";

const Panel = Collapse.Panel;

const DemoCredentials = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        notification.success({
          message: "Copied!",
          description: `${text} copied to clipboard!`,
          placement: "top",
          duration: 1.5, // সেকেন্ডে সময়সীমা নির্ধারণ
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        notification.error({
          message: "Error",
          description: "Failed to copy text",
          placement: "top",
          duration: 1.5,
        });
      });
  };

  return (
    <div style={{ marginTop: "-60px" }}>
      <h6 style={{ textAlign: "center" }}>Demo Credentials</h6>
      <Collapse
        accordion
        style={{ borderRadius: "5px", margin: "auto", maxWidth: "400px" }}
      >
        <Panel header="Buyer" key="1">
          <p
            onClick={() => handleCopy("mahmud@gmail.com")}
            style={{ marginBottom: "5px", cursor: "pointer", color: "gray" }}
          >
            Email: mahmud@gmail.com
          </p>
          <p
            onClick={() => handleCopy("123456")}
            style={{ margin: "0", cursor: "pointer", color: "gray" }}
          >
            Password: 123456
          </p>
        </Panel>
        <Panel header="Admin" key="2">
          <p
            onClick={() => handleCopy("abdullah@gmail.com")}
            style={{ marginBottom: "5px", cursor: "pointer", color: "gray" }}
          >
            Email: abdullah@gmail.com
          </p>
          <p
            onClick={() => handleCopy("123456")}
            style={{ margin: "0", cursor: "pointer", color: "gray" }}
          >
            Password: 123456
          </p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default DemoCredentials;

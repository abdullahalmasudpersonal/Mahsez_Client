import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  Input,
  Typography,
  ConfigProvider,
  Alert,
  Divider,
} from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";
import { toast } from "sonner";
import { useLoginMutation, useRegistrationBuyerMutation } from "@/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
// import { useRegisterMutation } from "@/redux/features/auth/authApi"; // API Hook


const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Register = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();
  const [createBuyer] = useRegistrationBuyerMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState<string | null>(null);
  const from = location.state?.from?.pathname || "/";

  const passwordRules = [
    { required: true, message: "Enter password" },
    {
      validator(_: RuleObject, value: StoreValue) {
        if (!value) return Promise.resolve();
        if ((value as string).length < 6) {
          return Promise.reject("Must be at least 6 characters.");
        }
        return Promise.resolve();
      },
    },
  ];

  const handleFinish = async (data: { name: string; email: string; password: string }) => {
    setSubmitting(true);
    try {
      const userInfo = {
        password: data.password,
        buyer: {
          name: data.name.trim(),
          email: data.email.trim(),
        }
      };
      const res = await createBuyer(userInfo).unwrap();
      if (res.success) {
        const loginData = {
          email: res?.data?.email,
          password: data?.password,
        };
        const result = await login(loginData).unwrap();
        const user = verifyToken(result?.data?.accessToken) as TUser;
        dispatch(setUser({ user: user, token: result?.data?.accessToken }));
        const toastId = toast.loading("Logging in...");
        toast.success("Logged in successfully!", {
          id: toastId,
          duration: 2000,
        });
        navigate(from, { replace: true });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const goWithoutLogin = () => {
    navigate("/");
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff9100",
          colorLink: "#ff9100",
          colorLinkHover: "#e67f00",
          colorLinkActive: "#cc6f00",
          borderRadius: 8,
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: screens.xs ? 16 : 24,
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 12,
          }}
          bordered
        >
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <Title level={3} style={{ marginBottom: 10 }}>
              Register
            </Title>
          </div>

          <Form
            form={form}
            name="register"
            layout="vertical"
            autoComplete="on"
            onFinish={handleFinish}
            requiredMark={false}
            validateTrigger={["onBlur", "onSubmit"]}
          >
            {serverError && (
              <Alert message={serverError} type="error" style={{ marginBottom: 16 }} />
            )}

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Enter your name" }]}
              // normalize={(value) => (value ? value.trim() : value)}
              normalize={(value) => (value ? value.replace(/\s+/g, ' ') : value)}

            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Your Name"
                aria-label="Name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Enter email" },
                { type: "email", message: "Enter valid email" },
              ]}
              normalize={(value) => (value ? value.trim() : value)}
            >
              <Input
                size="large"
                prefix={<MailOutlined />}
                placeholder="you@example.com"
                inputMode="email"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="email"
                aria-label="Email"
              />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={passwordRules}>
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="••••••••"
                autoComplete="new-password"
                aria-label="Password"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={submitting}
            >
              Register
            </Button>
            <Button type="link" onClick={goWithoutLogin} block style={{marginTop:'20px'}}>
              Continue Without Login
            </Button>
            <Divider />
            <div style={{ textAlign: "center" }}>
              <Text type="secondary">Already have an account?</Text>{" "}
              <Link to="/auth/login">Login</Link>
            </div>
          </Form>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default Register;

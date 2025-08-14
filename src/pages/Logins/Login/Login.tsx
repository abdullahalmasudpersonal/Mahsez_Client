import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Grid,
  Input,
  Typography,
  Space,
  ConfigProvider,
  Alert,
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface ErrorSource {
  path: string;
  message: string;
}

interface ServerErrorResponse {
  data: {
    errorSources: ErrorSource[];
    message?: string;
  };
}

const Login = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  // const from = location.state?.from?.pathname || `${role}`;
  const [serverError, setServerError] = useState<string | null>(null);

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

  useEffect(() => {
    if (serverError) {
      const timer = setTimeout(() => setServerError(""), 3000); // 5 seconds
      return () => clearTimeout(timer); // cleanup
    }
  }, [serverError]);


  const handleFinish = async (data: { email: string, password: string }) => {
    setSubmitting(true);
    try {
      const userInfo = {
        email: data?.email,
        password: data?.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      const toastId = toast.loading("Logging in...");
      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
      navigate(location.state?.from?.pathname || `/${user?.role}`, { replace: true });
    } catch (err) {
      const fieldErrors: { name: string | (string | number)[]; errors: string[] }[] = [];

      const e = err as ServerErrorResponse;
      if (e?.data?.errorSources?.length) {
        e.data.errorSources.forEach((source) => {
          if (source.path === "email") {
            fieldErrors.push({ name: "email", errors: [source.message] });
          } else if (source.path === "password") {
            fieldErrors.push({ name: "password", errors: [source.message] });
          } else {
            // unknown path, show general server error
            setServerError(source.message);
          }
        });
      } else if (e?.data?.message) {
        // general message
        setServerError(e.data.message);
      } else {
        setServerError("Login failed. Please try again.");
      }
      form.setFields(fieldErrors);
    }
    finally {
      setSubmitting(false);
    }
  };

  const fillBuyerDemo = () => {
    form.setFieldsValue({
      email: "taki@gmail.com",
      password: "123456",
    });
  };
  const fillAdminDemo = () => {
    form.setFieldsValue({
      email: "abdullah@gmail.com",
      password: "123456",
    });
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
          // background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
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
              Login
            </Title>
          </div>

          <Form
            form={form}
            name="login"
            layout="vertical"
            autoComplete="on"
            onFinish={handleFinish}
            requiredMark={false}
            validateTrigger={["onBlur", "onSubmit"]}
          >
            {serverError && setTimeout(() => setServerError(""), 5000) && <Alert message={serverError} type="error" style={{ marginBottom: 16 }} />}
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
                autoComplete="current-password"
                aria-label="Password"
              />
            </Form.Item>

            <div
              style={{
                display: "flex",
                flexDirection: screens.xs ? "column" : "row",
                alignItems: screens.xs ? "flex-start" : "center",
                justifyContent: "space-between",
                gap: screens.xs ? 8 : 0,
                marginBottom: 12,
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember Me</Checkbox>
              </Form.Item>
              <Text>Forgot password?</Text>
              {/* <Link to="#/forgot-password">Forgot password?</Link> */}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={submitting}
            >
              Login
            </Button>

            {/* Demo credential buttons */}
            <Space style={{ marginTop: 12, width: "100%" }} direction="vertical">
              <Button onClick={fillBuyerDemo} block>
                Fill Buyer Demo
              </Button>
              <Button onClick={fillAdminDemo} block>
                Fill Admin Demo
              </Button>
              <Button type="link" onClick={goWithoutLogin} block>
                Continue Without Login
              </Button>
            </Space>

            <Divider />
            <div style={{ textAlign: "center" }}>
              <Text type="secondary">Don't have an account?</Text>{" "}
              <Link to="/auth/register">Sign Up</Link>
            </div>
          </Form>
        </Card>
      </div>
    </ConfigProvider>
  );
}

export default Login;
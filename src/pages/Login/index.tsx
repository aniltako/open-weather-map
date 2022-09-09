import React from "react";
import { Button, Form, Input, Layout, Typography } from "antd";
import { useMst } from "store";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "constants/RoutesConstant";
import { setLocalStorageItem } from "utils/localstorageUtils";
import { IS_LOGIN } from "constants/variablesConstant";

const { Title } = Typography;

const App = () => {
  const { userStore } = useMst();
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    // handle login logic
    console.log("Success:", values);
    setLocalStorageItem(IS_LOGIN, JSON.stringify(true));
    const { username } = values;
    userStore.login(username);
    navigate(HOME_ROUTE);
  };

  const onFinishFailed = (errorInfo: any) => {
    // handle on errro
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout
      style={{
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        marginTop: "140px",
      }}
    >
      <div>
        <div style={{ textAlign: "center", color: "#43454C" }}>
          <Title level={2}>OpenWeatherMap </Title>
        </div>
        <div
          className="form-wrapper"
          style={{ backgroundColor: "#f1f1f1", padding: "20px 40px" }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default App;

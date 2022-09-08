import React from "react";
import { Button, Form, Input, Layout } from "antd";
import { useMst } from "store";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "constants/RoutesConstant";
import { setLocalStorageItem } from "utils/localstorageUtils";
import { IS_LOGIN } from "constants/variablesConstant";

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
      <div className="form-wrapper">
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
    </Layout>
  );
};

export default App;

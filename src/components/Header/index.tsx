import React from "react";
import { Avatar, Button, Layout } from "antd";
import Title from "antd/lib/typography/Title";
import { UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useMst } from "store";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "constants/RoutesConstant";
import { removeLocalstorageItem } from "utils/localstorageUtils";
import { IS_LOGIN } from "constants/variablesConstant";

const { Header } = Layout;

const NavHeader = observer(() => {
  const { userStore } = useMst();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalstorageItem(IS_LOGIN);
    userStore.logout();
    navigate(LOGIN_ROUTE);
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        verticalAlign: "center",
        justifyContent: "space-between",
      }}
    >
      <Title level={3} style={{ color: "white", marginTop: "0.5rem" }}>
        OpenWeatherMap
      </Title>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button
          type="primary"
          onClick={handleLogout}
          style={{ marginRight: "10px" }}
        >
          Logout
        </Button>
        <Avatar style={{ float: "right" }} icon={<UserOutlined />} />
      </div>
    </Header>
  );
});

export default NavHeader;

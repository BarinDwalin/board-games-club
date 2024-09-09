import "./App.css";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Layout,
  Menu,
  MenuProps,
  Typography,
  theme,
} from "antd";
import { GameRecord } from "./interfaces";
import { AppRoute, Pages } from "./settings";
import { CollectionPage, MainPage } from "./components";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
interface AppProps {
  clubCollections: { [key: string]: GameRecord[] };
  allGames: GameRecord[];
}
type MenuItem = Required<MenuProps>["items"][number];

const App: React.FC<AppProps> = ({ clubCollections, allGames }: AppProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = React.useState(AppRoute.Collection);
  const [collections, setCollections] = React.useState(clubCollections);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const items: MenuItem[] = [
    {
      key: AppRoute.Main,
      icon: React.createElement("img", {
        height: "40px",
        width: "40px",
        src: "./images/main.png",
        style: { left: "-12px", position: "relative" },
      }),
      label: "Главная",
    },
    {
      key: AppRoute.Collection,
      icon: React.createElement("img", {
        height: "40px",
        width: "40px",
        src: "./images/collection.png",
        style: { left: "-12px", position: "relative" },
      }),
      label: "Игры клуба",
    },
    {
      key: AppRoute.Events,
      icon: React.createElement("img", {
        height: "40px",
        width: "40px",
        src: "./images/tournament.png",
        style: { left: "-12px", position: "relative" },
      }),
      label: "Турниры",
    },
  ];

  const onClickMenu: MenuProps["onClick"] = (e) => {
    setPage(e.key);
  };

  const getPage = (page: string) => {
    switch (page) {
      case AppRoute.Main:
        return <MainPage />;
      case AppRoute.Collection:
        return <CollectionPage collection={allGames} />;

      case AppRoute.Events:
      default:
        return null;
    }
  };
  const getTitle = (route: string) => {
    return <>{Pages[route]?.title}</>;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            //collapsedIconSize: 32,
          },
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", maxHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={isTabletOrMobile ? true : collapsed}
          collapsedWidth={80}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            onClick={onClickMenu}
          />
        </Sider>
        <Layout>
          <Header
            className="header"
            style={{ padding: 0, background: colorBgContainer }}
          >
            {!isTabletOrMobile && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            )}
            <Title className="header__title" level={isTabletOrMobile ? 4 : 2}>
              {getTitle(page)}
            </Title>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "scroll",
            }}
          >
            {getPage(page)}
          </Content>
          <Footer
            className="footer"
            style={{ textAlign: "center", position: "relative" }}
          >
            <div>
              Клуб настольных игр Кинь&nbsp;Двинь ©{new Date().getFullYear()}{" "}
              Астана
            </div>
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;

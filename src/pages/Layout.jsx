import { useEffect, createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWallet, useWalletList, useNetwork, useAddress } from '@meshsdk/react';

import { UploadOutlined, UserOutlined, VideoCameraOutlined, DisconnectOutlined, DownOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Dropdown, Button, Space } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import {
  walletConnected,
  walletDisconnected,
  updateWalletInstance,
  updateWalletAddress,
} from '../redux/slices/walletSlice';

const AppLayout = () => {
  const dispatch = useDispatch();

  const connectedWallet = useSelector((state) => state);

  const address = useAddress();
  const network = useNetwork();
  const wallets = useWalletList();
  const { wallet, connected, connect, disconnect, error } = useWallet();

  const items = wallets.map((wallet, index) => {
    return {
      key: index,
      label: wallet.name,
      icon: <img src={wallet.icon} style={{ width: '18px' }} />,
    };
  });

  const handleWalletSelect = (e) => {
    const selected = wallets[e.key];
    connect(selected.name);
    dispatch(walletConnected(selected.name));
  };

  const handleWalletDisconnect = () => {
    disconnect();
    dispatch(walletDisconnected());
  };

  const menuProps = {
    items,
    onClick: handleWalletSelect,
  };

  const menuProps2 = {
    items: [{ key: 0, label: 'Diconnect', icon: <DisconnectOutlined /> }],
    onClick: handleWalletDisconnect,
  };

  useEffect(() => {
    dispatch(updateWalletInstance(wallet));
  }, [wallet]);

  useEffect(() => {
    if (address) {
      dispatch(updateWalletAddress(address));
    }
  }, [address, connected]);

  useEffect(() => {
    const accountListner = () => {
      disconnect();
      window.location.reload();
    };

    const networkListner = async () => {
      window.location.reload();
    };

    window.cardano.onAccountChange(accountListner);

    window.cardano.onNetworkChange(networkListner);

    if (connectedWallet.name && Object.keys(wallet).length == 0) {
      connect(connectedWallet.name);
    }
  }, []);

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ zIndex: 2 }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map((icon, index) => ({
            key: String(index + 1),
            icon: createElement(icon),
            label: `nav ${index + 1}`,
          }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: 'rgb(255, 255, 255)',
            display: 'flex',
            alignItems: 'center',
            zIndex: 1,
            justifyContent: 'end',
          }}
        >
          {connected ? (
            <Dropdown menu={menuProps2} size={'large'}>
              <Button size={'large'}>
                <Space>
                  {`${network ? 'Mainnet |' : 'Testnet |'}`}
                  {`${connectedWallet.address?.slice(0, 9)}...${connectedWallet.address?.slice(-4)}`}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          ) : (
            <Dropdown menu={menuProps}>
              <Button size={'large'}>
                <Space>
                  Connect Wallet
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          )}
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: 'rgb(255, 255, 255)',
              minHeight: '70vh',
            }}
          >
            content
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MeshProvider } from "@meshsdk/react";
import { store, persistor } from "./redux/store";
import { App } from "antd";

import AppLayout from "./pages/Layout.jsx";

function WebCardano() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MeshProvider>
          <App>
            <AppLayout />
          </App>
        </MeshProvider>
      </PersistGate>
    </Provider>
  );
}
export default WebCardano;

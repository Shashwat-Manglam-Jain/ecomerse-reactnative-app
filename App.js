import React from "react";
import Stacknavigation from "./Navigation/Stacknavigation";
import { Provider } from "react-redux";
import Store from "./Store";
import { ModalPortal } from "react-native-modals";
import { UserContext } from "./UserContext";
export default function App() {
  return (
    <>
      <Provider store={Store}>
        <UserContext>
          <Stacknavigation />
          <ModalPortal />
        </UserContext>
      </Provider>
    </>
  );
}

import React from "react";
import Routes from './src/routes';

import { Provider } from "react-redux";

import { reducer } from "./src/store";
import { createStore } from "redux";

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}


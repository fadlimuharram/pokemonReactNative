import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import logger from "redux-logger";
import promise from "redux-promise-middleware";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

const presistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["users", "maps"]
};

const presistedReducer = persistReducer(presistConfig, reducers);

export const store = createStore(
  presistedReducer,
  undefined,
  applyMiddleware(reduxThunk, logger, promise)
);

export const persistore = persistStore(store);

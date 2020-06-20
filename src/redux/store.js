import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";

let middlewares = [];
let middlewareSection = applyMiddleware(...middlewares)

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
  middlewareSection = composeWithDevTools(applyMiddleware(...middlewares))
}
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  middlewareSection
);

const persistor = persistStore(store);

export  { store, persistor };

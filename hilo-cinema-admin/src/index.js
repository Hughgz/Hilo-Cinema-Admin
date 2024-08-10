import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"; // Thêm ColorModeScript vào đây
import theme from "../src/theme/theme";
import { allReducers } from "./reduxHilo/reducers/index.jsx";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import EditEmployeeForm from "views/admin/users/components/employees/components/EditEmployee";
import AddEmployeeForm from "views/admin/users/components/employees/components/AddEmployee";

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      {/* Thêm ColorModeScript ngay dưới ChakraProvider */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ThemeEditorProvider>
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <Route path={`/edit-employee/:id`} component={EditEmployeeForm} />
            <Route path={`/employee/add`} component={AddEmployeeForm} />
            <Redirect from="/" to="/admin" />
          </Switch>
        </HashRouter>
      </ThemeEditorProvider>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);

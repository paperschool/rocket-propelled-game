import * as React from "react";
import * as ReactDOM from "react-dom";
import appContainerProvider from "../server/frontend/documentProvider/appContainerProvider";
import Router from "./components/Router";
import "./styles/global.scss";

const appContainerNode = document.getElementById(appContainerProvider())

ReactDOM.render(
    <Router />,
    appContainerNode
);
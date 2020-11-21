import React, { FunctionComponent } from "react";
import Header from "../Header";
import Footer from "../Footer";

import { pageTemplate, appContainer } from "./index.scss";

const PageTemplate: FunctionComponent = ({
    children
}) => {
    return (<div className={pageTemplate}>
        <div className={appContainer}>
            <Header />
            {children}
            <Footer />
        </div>
    </div>)
}

export default PageTemplate
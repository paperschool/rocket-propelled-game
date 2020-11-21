import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import PageTemplate from "../PageTemplate";

import {
    errorContainer,
    errorDetails
} from "./index.scss";


const Error: FunctionComponent = () => {

    return <PageTemplate>
        <div className={errorContainer}>
            <div className={errorDetails}>
                <h1>404</h1>
                <p>Look its not you, its probably me. We messed up, but don't tell anyone, some one is looking into it I promise!</p>
                <Link to={"/"}><h4>Click Here If you want to live!</h4></Link>
            </div>
        </div>
    </PageTemplate>
}

export default Error;
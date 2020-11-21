import React, { FunctionComponent } from "react";

import {
    smallHeader
} from "./index.scss";

type SmallHeaderProps = {
    heading: string;
    subHeading: string
}

const SmallHeader: FunctionComponent<SmallHeaderProps> = ({
    heading,
    subHeading
}) => {

    return (<div className={smallHeader}>
        <h4>{heading}</h4>
        <p>{subHeading}</p>
    </div>)
}

export default SmallHeader;
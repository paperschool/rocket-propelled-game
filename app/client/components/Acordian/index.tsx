import React, { FunctionComponent, useState, useEffect } from "react";
import classnames from "classnames";
import ArrowIcon from "../../../assets/arrow.svg";
import {
    acordian,
    acordianOpen,
    acordianClosed,
    foldControls,
    icon,
    iconOpen
} from "./index.scss";

type AcordianProps = {
    title: string;
    openInitially?: boolean;
}

const Acordian: FunctionComponent<AcordianProps> = ({
    title,
    children,
    openInitially = false
}) => {

    const [open, setOpen] = useState(openInitially);

    return <div className={acordian}>
        <div className={foldControls} onClick={() => setOpen(!open)}>
            <h6>{title}</h6>
            <ArrowIcon
                className={classnames(icon, {
                    [iconOpen]: open
                })}
            />
        </div>
        <div className={classnames({
            [acordianOpen]: open,
            [acordianClosed]: !open
        })}>
            {children}
        </div>
    </div >
}

export default Acordian;
import React, { FunctionComponent } from 'react';
import environmentProvider from '../../environmentProvider';
import { footer, linkContainer, aboutContainer, linkDivider } from './index.scss';
import { Link } from 'react-router-dom';

const Footer: FunctionComponent = () => {
    const { CLIENT_BUILD_VERSION } = environmentProvider();

    return (
        <div className={footer}>
            <div className={linkContainer}>
                <Link to={'/about'}>
                    <p>about</p>
                </Link>
                <span className={linkDivider}></span>
                <Link to={'/faq'}>
                    <p>faq</p>
                </Link>
            </div>
            <div className={aboutContainer}>
                <p>{CLIENT_BUILD_VERSION}</p>
                <span className={linkDivider}></span>
                <Link to={'/about'}>
                    <p>by d&d</p>
                </Link>
            </div>
        </div>
    );
};

export default Footer;

import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import RoomCode from '../RoomCode';

import { header, headerContainer } from './index.scss';

const Header: FunctionComponent = () => {
    return (
        <div className={headerContainer}>
            <Link to={'/'}>
                <div className={header}>
                    <h1>Rocket Propelled Game</h1>
                    <p>It's a moonshot, I guess.</p>
                </div>
            </Link>
            {location.pathname === '/play' ? <RoomCode /> : null}
        </div>
    );
};

export default Header;

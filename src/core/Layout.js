import React from 'react';

import Menu from './Menu';
import "./../styles.css"

const Layout = ({title = 'Title', description = 'Description', classname, children}) => (
    <div>
        <Menu />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={classname}>
            {children}
        </div>
    </div>
);

export default Layout;
import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
    return (
        <Menu className='menu'>
            <div>
                <img src="https://blueprint-api-production.s3.amazonaws.com/uploads/story/thumbnail/8695/instagram_icon.png" width='100' height='100' style={{marginRight:'10px'}} />
                <a className="menu-item" href="/dsc_report" id='home'>
                    Home
      </a>
            </div>
            <a className="menu-item" href="#">
                Salads
      </a>
            <a className="menu-item" href="#">
                Pizzas
      </a>
            <a className="menu-item" href="#">
                Desserts
      </a>
        </Menu>
    );
};
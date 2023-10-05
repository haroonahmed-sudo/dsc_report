

import React, { Component, useEffect, useState, useContext } from 'react';
import { MDBNavbar, MDBBtn, MDBListGroup, MDBListGroupItem, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBButtonFixed } from 'mdbreact';
import { NavLink,useLocation } from 'react-router-dom';
import logo from '../assets/DSCLogo.png'; // Import the image (if it's a local file)
import Dropdown from 'react-bootstrap/Dropdown';
import { useMyContext } from '../MyContext'; // Import the context hook

const TopNavigation = () => {
    const location = useLocation();

    // return (

    // <MDBNavbar className="flexible-navbar" light expand="lg" scrolling>
    //     <MDBNavbarBrand href='/home'>
    //         <h4 style={{ fontFamily: 'cursive', color: 'black' }}>Programming & Tech</h4>
    //     </MDBNavbarBrand>
    //     <MDBNavbarToggler onClick={onClickk} />
    //     <MDBCollapse isOpen={collapse} navbar>
    //         <MDBNavbarNav left className='mt-3'>

    //             <MDBListGroup className="list-group-flush">
    //                 {/* <NavLink exact={true} to='/' activeClassName="activeClass" id='home'>
    //                     <MDBListGroupItem>
    //                         <div style={{ display: 'flex', flexDirection: 'row' }}>

    //                             <h5 className="mt-1">Blog's</h5>
    //                         </div>

    //                     </MDBListGroupItem>
    //                 </NavLink>
    //                 <NavLink to='/about' activeClassName="activeClass" id="home">
    //                     <MDBListGroupItem>

    //                         <div style={{ display: 'flex', flexDirection: 'row' }}>

    //                             <h5 className="mt-1">About Us</h5>
    //                         </div>
    //                     </MDBListGroupItem>
    //                 </NavLink> */}
    //             </MDBListGroup>


    //         </MDBNavbarNav>
    //         <MDBNavbarNav right>
    //             <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}></div>
    //         </MDBNavbarNav>
    //     </MDBCollapse>
    // </MDBNavbar>
    const [collapse, setCollapse] = useState(false)
    const { selectedValue, setSelectedValue } = useMyContext(); // Access context values

    const handleDropdownSelect = (value) => {
        setSelectedValue(value);
    };
    // const onClickk = () => {
    //     setCollapse(!collapse)
    // }

    // const toggle = () => {
    //     drp(!dropdownOpen)
    // }

    return (
        <div>
            <MDBNavbar className="navbar" light expand="lg" scrolling style={{ backgroundColor: '#fff' }}>
                <MDBNavbarBrand >
                    <NavLink to='/dsc_report' >
                        <img src={logo} style={{ height: 50 }} />
                    </NavLink>
                </MDBNavbarBrand>
                <MDBNavbarNav right>
                     <Dropdown onSelect={handleDropdownSelect}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {selectedValue}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {selectedValue != 'Changing Management' ? <Dropdown.Item eventKey="Changing Management">
                                Changing Management
                            </Dropdown.Item> : <Dropdown.Item eventKey="Project Management">
                                Project Management
                            </Dropdown.Item>}

                        </Dropdown.Menu>
                    </Dropdown>

                    {/* <h4 style={{ fontFamily: 'fangsong', color: 'black' }}>Changing Management</h4> */}
                </MDBNavbarNav>
            </MDBNavbar>

        </div >
    );
}



export default TopNavigation;

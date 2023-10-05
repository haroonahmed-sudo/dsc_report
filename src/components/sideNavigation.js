import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon, MDBInput } from 'mdbreact';

import { NavLink, useParams } from 'react-router-dom';
import { collection, onSnapshot, getDocs } from 'firebase/firestore'
import { db } from '../config'
import './showBlog.css'
import { useMyContext } from '../MyContext'; // Import the context hook

const TopNavigation = ({ match }) => {
    const [show, setShow] = useState(false)
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { selectedValue, setSelectedValue } = useMyContext(); // Access context values

    useLayoutEffect(() => {
        // Reference to the Firestore collection you want to listen to based on selectedValue
        const collectionRef =
            selectedValue === 'Changing Management'
                ? collection(db, 'Points')
                : selectedValue === 'Project Management'
                    ? collection(db, 'Projects') // Use the 'Projects' collection for 'Project Management'
                    : null; // Handle other cases or return null if no specific condition matches

        if (collectionRef) {
            const fetchData = async () => {
                try {
                    const querySnapshot = await getDocs(collectionRef);
                    const newData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setData(newData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData(); // Call the fetchData function
        } else {
            // Handle cases where collectionRef is null (other cases)
            // For example, you can set some default data or handle the case differently
            console.log('Unsupported selectedValue:', selectedValue);
        }
    }, [selectedValue]); // Trigger the effect whenever selectedValue changes

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const filteredData = data.filter((item) => {
        return item.NameEN.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div>
            <MDBIcon fas icon="bars" className="ml-4 mt-3" style={{ cursor: 'pointer' }} onClick={() => setShow(true)} />
            {show && <div className="sidebar-fixed position-fixed" style={{ height: '100vh', overflowY: 'auto' }}>

                <input type='text'
                    style={{ marginTop: '45px', marginLeft: '29px', border: 'none', outline: 'none', }}
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <div className="sidebar-logo">
                    <MDBIcon fas icon="bars" className="mt-5 mr-5" style={{ cursor: 'pointer' }} onClick={() => setShow(false)} />
                </div>
                <MDBListGroup className="list-group-flush mt-3">
                    <NavLink exact={true} to='/dsc_report' activeClassName="activeClasss">
                        <MDBListGroupItem >
                            {/* <MDBIcon icon="paperclip" className="mr-3"/> */}
                            Home
                        </MDBListGroupItem>
                    </NavLink>
                    {filteredData.map((item) => (
                        <NavLink to={`/dsc_report/search/${item.id}`} activeClassName="activeClasss" key={item.id}>
                            <MDBListGroupItem>
                                {/* <MDBIcon icon="map-marker-alt" className="mr-3"/> */}
                                {item.NameEN.slice(0, 30)}...
                                {/* {item.NameEN.slice(-10)} Display first 20 characters, an ellipsis (...), and the last 10 characters */}
                            </MDBListGroupItem>
                        </NavLink>
                    ))}

                </MDBListGroup>
            </div>}
        </div>
    );
}

export default TopNavigation;

import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBInput, MDBAnimation, MDBIcon } from "mdbreact";
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../config'
import { useNavigate } from 'react-router-dom';
import './showBlog.css'
import { useMyContext } from '../MyContext'; // Import the context hook

const Blog = () => {
  const [data, setData] = useState([]);
  const [Project, setDataProject] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
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

  const clearSearch = () => {
    setSearchQuery('');
  };


  const filteredData = data.filter((item) => {
    return item.NameEN.toLowerCase().includes(searchQuery.toLowerCase());
  });


  const ShowDetails = (item) => {
    const route = `/dsc_report/search/${item.id}`;
    navigate(route);
  }

  
  // const uploadDataToFirestore = async (data) => {
  //   const collectionRef = collection(db, 'Points'); // Replace 'your_collection_name' with your Firestore collection name
  
  //   // Loop through your data and add each object as a document
  //   for (const item of data_to_upload) {
  //     await addDoc(collectionRef, item);
  //   }
  // };
  

  return (
    <div className='container-fluid '>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <MDBInput
          type="text"
          label="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          containerClass="mt-4 mb-3 w-25 ml-2"
        />
        {searchQuery.length > 0 ?
          <MDBIcon fas icon="backspace" className='mt-5 ml-3' size="1.9x" onClick={() => setSearchQuery('')} />
          : null}
      </div>

      {filteredData.length > 0 ? (
        <div className='row mb-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {filteredData.map((item) => (
            <div className='col-lg-6 col-md-6 col-12 ' >
              <MDBCard className='mt-2 mb-3' style={{ cursor: 'pointer', height: 150 }} onClick={() => ShowDetails(item)}>
                <MDBCardBody>
                  <MDBCardTitle class="card-body" style={{ fontSize: 16, cursor: 'pointer', lineHeight: 1.5 }}>{item.NameEN}</MDBCardTitle>
                  <MDBCardText>
                    Responsibilty - <span style={{ direction: 'rtl', cursor: 'pointer' }}>{item.Responsibility} </span>
                  </MDBCardText>
                  {/* <MDBBtn>Button</MDBBtn> */}
                </MDBCardBody>
              </MDBCard>
            </div>
          ))}
        </div>
      ) : (
        <div className="loader-container">
          <MDBAnimation type="flipInX" infinite>
            <MDBIcon icon="spinner" size="3x" pulse />
          </MDBAnimation>
        </div>
      )}

    </div >
  )
}

export default Blog
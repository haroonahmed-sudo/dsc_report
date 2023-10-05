import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './showBlog.css'
import { db } from '../config'
import { collection, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import ReactApexChart from 'react-apexcharts';
import SideNavigation from './sideNavigation'
import { MDBAnimation, MDBIcon } from 'mdbreact';
import { useMyContext } from '../MyContext'; // Import the context hook

const ShowBlog = () => {
    const { uid } = useParams()
    const [blogData, setBlogData] = useState(null);
    const { selectedValue, setSelectedValue } = useMyContext(); // Access context values

    useEffect(() => {
        // Reference to the Firestore document using the uid
        // const blogDocRef = doc(db, 'Points', uid);
        const blogDocRef =
        selectedValue === 'Changing Management'
          ? doc(db, 'Points', uid)
          : selectedValue === 'Project Management'
          ? doc(db, 'Projects', uid) // Use the 'Projects' collection for 'Project Management'
          : null; // Handle other cases or return null if no specific condition matches
  
  
        // Fetch the document data
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(blogDocRef);
                if (docSnap.exists()) {
                    // Document exists, extract data
                    setBlogData(docSnap.data());
                } else {
                    // Document does not exist
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document: ', error);
            }
        };

        fetchData(); // Call the fetchData function

        // Cleanup effect
        return () => {
            // You can perform cleanup here if needed
        };
    }, [selectedValue,uid]); // Trigger the effect whenever uid changes

    const series = [
        {
            name: 'Target Value',
            data: [60, 55, 42],
        },
        {
            name: 'Actual',
            data: [55, 40, 36],
        },
    ];

    const options = {
        chart: {
            type: "bar",
            height: 350,
            stacked: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "50%", // Adjust the column width as needed
            },
        },
        xaxis: {
            categories: ["2023", "2022", "2021"],
        },
        legend: {
            position: "top",
        },
    };

    // const options = {
    //     chart: {
    //         height: 350,
    //         type: 'bar',
    //         toolbar: {
    //             show: false,
    //         },
    //     },
    //     plotOptions: {
    //         bar: {
    //             horizontal: false,
    //             columnWidth: '45%',
    //             endingShape: 'rounded',
    //         },
    //     },
    //     dataLabels: {
    //         enabled: false,
    //     },
    //     stroke: {
    //         show: true,
    //         width: 2,
    //         colors: ['transparent'],
    //     },
    //     // colors: chartColumnColors,
    //     xaxis: {
    //         categories: ['2023', '2022', '2021'],
    //     },
    //     yaxis: {
    //         title: {
    //             text: '$ (thousands)',
    //         },
    //     },
    //     grid: {
    //         borderColor: '#f1f1f1',
    //     },
    //     fill: {
    //         opacity: 1,
    //     },
    //     tooltip: {
    //         y: {
    //             formatter: function (val) {
    //                 return "$ " + val + " thousands";
    //             },
    //         },
    //     },
    // };


    return (
        <div >
            <SideNavigation />
            {blogData ? (
                <div>
                    <p style={{ fontSize: 20 }} className='text-center mt-3'>{blogData.NameEN}</p>
                    <p style={{ fontSize: 20 }} className='text-center '>Responsibility - <span style={{ direction: 'rtl' }}>{blogData.Responsibility}</span></p>
                    <p style={{ fontSize: 20 }} className='text-center '>{blogData.NameAR}</p>
                    <div className="chart">
                        <center>
                            <ReactApexChart series={series} options={options} type="bar" height={400} width={'90%'} />
                        </center>
                    </div>
                </div>
            ) : (
                <div className="loader-container">
                    <MDBAnimation type="flipInX" infinite>
                        <MDBIcon icon="spinner" size="3x" pulse />
                    </MDBAnimation>
                </div>
            )}
        </div>
    )
}

export default ShowBlog
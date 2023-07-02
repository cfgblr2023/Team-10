import React from 'react'
import SideNavbar from './SideNavbar'
// import Navbar from './NavbarAA'
import NavbarAA from './NavbarAA'
import MyCalender from '../Calender';
import Chart from '../menteedashboard/Chart';

const  MaindashboardAA = (props) => {
  const { id } = props;
  return (
    <div>
      <NavbarAA/>
      <MyCalender id={id}/>
      <div>
      <Chart/>
      </div>
      
      {/* <SideNavbar/> */}
      
    </div>
  )
}

export default MaindashboardAA

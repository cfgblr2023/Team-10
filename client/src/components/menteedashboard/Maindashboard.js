import React from 'react'
import Navbar from './Navbar'
import Cards from './Cards'


const MentorMaindashboard = (props) => {
  const { id } = props;
  return (
    <div>
      <Navbar/>
      <Cards id={id}/>
      
    </div>
  )
}

export default MentorMaindashboard;
import React from 'react'
import MyCalender from '../Calender'
import Chart from '../menteedashboard/Chart'

function Calenderscreen() {
  return (
    <div className='container'>
      <MyCalender/>
      <div>Progress</div>
      <div className='col-md-4'>
            <Chart />
          </div>
    </div>
  )
}

export default Calenderscreen

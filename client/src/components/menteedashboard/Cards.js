import React from 'react';
import AI from "../../assets/AI.jpg";
import blockchain from "../../assets/blockchain.png";
import communication from "../../assets/communication.png";
import finance from "../../assets/finance.jpg";
import ML from "../../assets/ML.jpg";
import SDE from "../../assets/SDE.jpg";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {Link} from "react-router-dom"


const Cards = (props) => {
  const { id } = props;
  const navigate=useNavigate()
  // const assignMentor=(userData)=>{
  //   axios.put("http://localhost:3001/mentee/assign-module",userData)
  //   .then((res)=>{
  //       if(res){
  //           console.log(res);
  //           navigate(`/dashboard-mentee`);
  //       }
  //       console.log(res)
    
  //   })
  //   .catch((err)=>console.log(err))
  //   // console.log(userData)

  const handleClick = () => {
    navigate(`/calender/${id}`);
  };

  return (
 <>
    <div className='container my-5'>
      <div className='row'>
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={AI} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Artificial Intelligence</h5>
              <p className="card-text">Description...</p>
              <button className="btn btn-dark" onClick={handleClick}>Enroll Now</button>
            </div>
          </div>
        </div>
        {/* Repeat the above card structure for the remaining two cards */}
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={blockchain} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Blockchain</h5>
              <p className="card-text">Description...</p>
              <a className="btn btn-dark">Enroll Now</a>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={communication} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Communication</h5>
              <p className="card-text">Description...</p>
              <a className="btn btn-dark" onClick={() => assignMentor("communication")}>Enroll Now</a>
            </div>
          </div>
        </div> */}
      
       
        {/* <div className='col-md-4'>
            <Chart />
          </div> */}
      </div>
      {/* Repeat the above row structure for additional rows */}
      <div className='row'>
        {/* Place the next set of cards here */}
      </div>
    </div>

    <div className='container my-5'>
      <div className='row'>
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={finance} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Finance</h5>
              <p className="card-text">Description...</p>
              <a className="btn btn-dark">Enroll Now</a>
            </div>
          </div>
        </div>
        {/* Repeat the above card structure for the remaining two cards */}
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={ML} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Machine Learning</h5>
              <p className="card-text">Description...</p>
              <a className="btn btn-dark">Enroll Now</a>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={SDE} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Software Developement</h5>
              <p className="card-text">Description...</p>
              <a className="btn btn-dark">Enroll Now</a>
            </div>
          </div>
        </div>
      </div>
      {/* Repeat the above row structure for additional rows */}
      <div className='row'>
        {/* Place the next set of cards here */}
      </div>
    </div>
      </>
  );
}

export default Cards;

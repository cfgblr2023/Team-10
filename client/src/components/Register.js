import React from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const handleMenteeRegistration = () => {
    navigate('/mentee-registration');
  };
  const handleMentorRegistration = () => {
    navigate('/mentor-registration');
  };

  return (
    <div className="Container text-center position-fixed bottom-0 start-50 translate-middle-x">
      <button type="button" className="btn btn-primary mx-3" onClick={handleMenteeRegistration}>
        Register as Mentee
      </button>
      <button type="button" className="btn btn-primary mx-3" onClick={handleMentorRegistration}>
        Register as Mentor
      </button>
    </div>
  );
}

export default Register;

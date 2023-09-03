// ClubRegistration.js
import React, { useState } from "react";
import axios from "axios";

const OrganizerRegistration = () => {
  const [organizerData, setOrganizerData] = useState({
    organizerName: "",
    organizerHeadName: "",
    startingYear: "",
    description: "",
    collegeName: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    organizerName: { state: false, para: { maxLength: 50, minLength: 1 } },
    organizerHeadName: { state: false, para: { maxLength: 50, minLength: 1 } },
    startingYear: { state: false },
    collegeName: { state: false, para: { maxLength: 50, minLength: 1 } },
    location: { state: false, para: { maxLength: 50, minLength: 1 } },
    email: {
      state: false,
      para: {
        maxLength: 500,
        minLength: 3,
        match:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
    password: {
      state: false,
      para: {
        maxLength: 50,
        minLength: 6,
        match: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{6,}$/,
      },
    },
    confirmPassword: { state: false, para: { maxLength: 50, minLength: 6 } },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrganizerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Trim all form field values
    const trimmedorganizerData = {};
    for (const key in organizerData) {
      trimmedorganizerData[key] = organizerData[key].trim();
    }
    setOrganizerData(trimmedorganizerData);

    // Validate each field
    const updatedErrors = { ...errors };
    for (const key in updatedErrors) {
      const value = trimmedorganizerData[key];
      const para = updatedErrors[key].para;

      if (value === "" || value === null || value === undefined) {
        updatedErrors[key].state = true;
      } else if (
        para != null &&
        para.minLength !== null &&
        (value.length < para.minLength || value.length > para.maxLength)
      ) {
        updatedErrors[key].state = true;
      } else if (
        para != null &&
        para.match != null && !value.match(para.match)) {
        updatedErrors[key].state = true;
      } else {
        updatedErrors[key].state = false;
      }
    }
    setErrors(updatedErrors);
  };

  const sendDataToBackend = async () => {
    if (!errors.password.state && !errors.confirmPassword.state) {
      if (organizerData.password === organizerData.confirmPassword) {
        let totalValidInputs = 0;
        for (const key in errors) {
          if (!errors[key].state) {
            totalValidInputs++;
          }
        } 
        console.log(totalValidInputs)
        console.log(Object.keys(errors).length)
        console.log(errors)
        if (totalValidInputs === (Object.keys(errors).length)) {
          console.log("Sending data")

          let dataToSend = organizerData

          delete dataToSend["confirmPassword"]

          console.log(dataToSend)

          await axios
            .post("/register/organizer", dataToSend)
            .then((response) => {
              console.log("Registered Successfully", response);
            })
            .catch((error) => {
              console.log("Error during registration", error);
            });
        }
      }
    }
  };

  const handleRegister = async () => {
    // Send clubData to backend for club registration
    await validateForm();
    await sendDataToBackend();
  };

  return (
    <div>
      <h2>Organization Registration</h2>
      <form>
        <div>
          <label>Organization Name:</label>
          <input
            type="text"
            name="organizerName"
            value={organizerData.organizerName}
            onChange={handleInputChange}
          />
        </div>
        {errors.organizerName.state ? (
          <div>Please provide Organizer name</div>
        ) : null}
        <div>
          <label>organizerHead Name:</label>
          <input
            type="text"
            name="organizerHeadName"
            value={organizerData.organizerHeadName}
            onChange={handleInputChange}
          />
        </div>
        {errors.organizerHeadName.state ? (
          <div>Please provide name of the head of the organization</div>
        ) : null}
        <div>
          <label>Starting Year:</label>
          <input
            type="text"
            name="startingYear"
            value={organizerData.startingYear}
            onChange={handleInputChange}
          />
        </div>
        {errors.startingYear.state ? (
          <div>Please provide organization starting year</div>
        ) : null}
        <div>
          <label>Organization Description:</label>
          <textarea
            name="description"
            value={organizerData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>College Name:</label>
          <input
            type="text"
            name="collegeName"
            value={organizerData.collegeName}
            onChange={handleInputChange}
          />
        </div>
        {errors.collegeName.state ? (
          <div>Please provide your college name</div>
        ) : null}
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={organizerData.location}
            onChange={handleInputChange}
          />
        </div>
        {errors.location.state ? <div>Please provide your location</div> : null}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={organizerData.email}
            onChange={handleInputChange}
          />
        </div>
        {errors.email.state ? <div>Please provide a valid email</div> : null}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={organizerData.password}
            onChange={handleInputChange}
          />
        </div>
        {errors.password.state ? (
          <div>Please provide a valid password</div>
        ) : null}
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={organizerData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        {errors.confirmPassword.state ? (
          <div>Please confirm your password</div>
        ) : null}
        <button type="button" onClick={handleRegister}>
          Register Organization
        </button>
      </form>
    </div>
  );
};

export default OrganizerRegistration;

import axios from "axios";
import React, { useState } from "react";
// import collegeOptions from '../datasets/collegesList'

const ParticipantRegistration = () => {
  const genderOptions = ["Male", "Female", "Other"];
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    collegeName: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
    completionYear: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: { state: false, para: { maxLength: 50, minLength: 1 } },
    lastName: { state: false, para: { maxLength: 50, minLength: 1 } },
    middleName: { state: false, para: { maxLength: 50, minLength: 1 } },
    collegeName: { state: false, para: { maxLength: 50, minLength: 1 } },
    email: {
      state: false,
      para: {
        maxLength: 500,
        minLength: 3,
        match:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
    birthDate: {
      state: false,
      para: {
        maxLength: null,
        minLength: null,
        minDate: new Date().toJSON().slice(0, 10),
      },
    },
    completionYear: {
      state: false,
      para: { maxLength: null, minLength: null },
    },
    gender: { state: false, para: { maxLength: null, minLength: null } },
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Trim all form field values
    const trimmedFormData = {};
    for (const key in formData) {
      trimmedFormData[key] = formData[key].trim();
    }
    setFormData(trimmedFormData);

    // Validate each field
    const updatedErrors = { ...errors };
    for (const key in updatedErrors) {
      const value = trimmedFormData[key];
      const para = updatedErrors[key].para;
      if (value === '' || value === null || value === undefined) {
        updatedErrors[key].state = true;
      } else if (
        para.minLength !== null &&
        (value.length < para.minLength || value.length > para.maxLength)
      ) {
        updatedErrors[key].state = true;
      } else if (para.match && !value.match(para.match)) {
        updatedErrors[key].state = true;
      } else {
        updatedErrors[key].state = false;
      }
    }
    setErrors(updatedErrors);
  };

  const sendDataToBackend = async () => {
    if (!errors.password.state && !errors.confirmPassword.state) {
      if (formData.password === formData.confirmPassword) {
        let totalValidInputs = 0;
        for (const key in errors) {
          if (!errors[key].state) {
            totalValidInputs++;
          }
        }

        if (totalValidInputs === Object.keys(errors).length) {

          let dataToSend = formData

          delete dataToSend["confirmPassword"]

          console.log(dataToSend)

          await axios.post("/register/participant", dataToSend)
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
    await validateForm();
    await sendDataToBackend();
  };

  return (
    <div>
      <h2>StudentRegistration</h2>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleInputChange}
          required
        />
        {errors.firstName.state ? <div>Please provide first name</div> : null}
        <input
          type="text"
          name="middleName"
          placeholder="Middle Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleInputChange}
          required
        />
        {errors.lastName.state ? <div>Please provide last name</div> : null}
        <input
          type="text"
          name="collegeName"
          placeholder="College Name"
          onChange={handleInputChange}
          required
        />
        {/* <select
          name="collegeName"
          onChange={handleInputChange}
          value={formData.collegeName}
          required
        >
          <option value="" disabled>
            Select College
          </option>
          {collegeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}
        {errors.collegeName.state ? (
          <div>Please provide your college name</div>
        ) : null}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          required
        />
        {errors.email.state ? <div>Please provide email</div> : null}
        <input
          type="date"
          name="birthDate"
          placeholder="dd/mm/yyyy"
          onChange={handleInputChange}
          required
        />
        {errors.birthDate.state ? (
          <div>Please provide your birth date</div>
        ) : null}
        <input
          type="text"
          name="completionYear"
          placeholder="Complition Year"
          onChange={handleInputChange}
          required
        />
        {errors.completionYear.state ? (
          <div>Please provide your college completion year</div>
        ) : null}
        <select
          name="gender"
          onChange={handleInputChange}
          value={formData.gender}
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.gender.state ? <div>Please select your gender</div> : null}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          required
        />
        {errors.password.state ? <div>Please provide password</div> : null}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleInputChange}
          required
        />
        {errors.confirmPassword.state ? (
          <div>Please confirm your password</div>
        ) : null}
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default ParticipantRegistration;

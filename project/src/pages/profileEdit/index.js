import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Other/input";
import PageWrapper from "../../Components/page-wrapper";
import UserContext from "../../Context";
import {
  familyNameValidator,
  firstNameValidator,
  phoneNumberValidator,
} from "../../utils/registration";
import styles from "./index.module.css";
const ProfileEdit = () => { 
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { user } = context;
  const [firstName, setFirstName] = useState(`${user.firstName}`);
  const [familyName, setFamilyName] = useState(`${user.familyName}`);
  const [phoneNumber, setPhoneNumber] = useState(`${user.phoneNumber}`);
  const [picture, setPicture] = useState(`${user.picture}`);
  const [error, setError] = useState("");
  const [firstNameError, setFirstnameError] = useState("");
  const [familyNameError, setFamilyNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      firstName &&
      familyName &&
      phoneNumber &&
      firstNameError === "" &&
      familyNameError === "" &&
      phoneNumberError === ""
    ) {
      const promise = await fetch("/profile/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user._id,
          firstName,
          familyName,
          phoneNumber,
          picture,
        }),
      });
      const response = await promise.json();
      if (promise.status === 200) {
        context.logIn(response);
        navigate("/profile");
        window.scrollTo(0, 0);
      } else {
        if (promise.status === 409) {
          setError(response.error);
        } else {
          setError(response.error);
        }
      }
    } else {
      setError("Please enter valid credentials");
    }
  };
  const handlePicture = (event) => {
    event.preventDefault();
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "daqcaszkf",
        uploadPreset: "softuni",
      },
      (error, result) => {
        if (error) {
          console.log("Error:", error);
        }
        if (result.event === "success") {
          setPicture(result.info.url);
        }
      }
    );
    widget.open();
  };
  const handleBlurFirstName = () => {
    setFirstnameError(firstNameValidator(firstName));
  };
  const handleBlurFamilyName = () => {
    setFamilyNameError(familyNameValidator(familyName));
  };
  const handleBlurPhoneNumber = () => {
    setPhoneNumberError(phoneNumberValidator(phoneNumber));
  };

  return (
    <PageWrapper>
      <form className={styles.container} onSubmit={handleSubmit}>
        <img className={styles.picture} src={picture}></img>
        <button
          type="button"
          className={styles.submitPicture}
          onClick={handlePicture}
        >
          Change Picture
        </button>
        <Input
          name="firstName"
          value={firstName}
          lebal="First Name"
          onBlur={handleBlurFirstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={firstNameError}
        />
        <Input
          name="FamilyName"
          value={familyName}
          onBlur={handleBlurFamilyName}
          lebal="Family Name"
          onChange={(e) => setFamilyName(e.target.value)}
          error={familyNameError}
        />
        <Input
          name="phoneNumber"
          value={phoneNumber}
          onBlur={handleBlurPhoneNumber}
          lebal="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={phoneNumberError}
        />

        <button type="submit" className={styles.submitButton}>
          Save
        </button>
        {error ? <div className={styles.error}>{error}</div> : ""}
      </form>
    </PageWrapper>
  );
};

export default ProfileEdit;

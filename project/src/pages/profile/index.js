import React, { useContext, useEffect, useState } from "react";
import DivComponent from "../../Components/Other/profileDiv";
import styles from "./index.module.css";
import PageWrapper from "../../Components/page-wrapper";
import UserContext from "../../Context";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [picture, setPicture] = useState(`${user.picture}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    let path = "/profile/edit";
    navigate(path);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (user.picture) {
      setPicture(`${user.picture}`);
    }
  }, []);
  return (
    <PageWrapper>
      <div className={styles.container}>
        <DivComponent img={picture} />
        <DivComponent title="First Name" name={`${user.firstName}`} />
        <DivComponent title="Family Name" name={`${user.familyName}`} />
        <DivComponent title="Phone Number" name={`${user.phoneNumber}`} />
        <DivComponent title="Email" name={`${user.email}`} />
        <div>
          <button
            type="submit"
            className={styles.submit}
            onClick={(e) => handleSubmit(e)}
          >
            Edit
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};
export default Profile;

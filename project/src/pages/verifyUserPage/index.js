import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../../Components/page-wrapper";
const VerifyUser = () => {
  const params = useParams();
  const [verify, setVerify] = useState("");
  const userId = params.userId;
  const uniqueString = params.uniqueString;
  const verification = async () => {
    const promise = await fetch(`/getVerification/${userId}/${uniqueString}`);
    if (promise.status === 200) {
      setVerify("Verification complate");
    } else {
      setVerify(
        "Error. Your link has expired/been activeted already or wrong details"
      );
    }
  };
  useEffect(() => {
    verification();
  }, []);
  return <PageWrapper>{verify ? <div>{verify}</div> : ""}</PageWrapper>;
};
export default VerifyUser;

import React, { useState } from "react";
import UserContext2 from "./Context2";
const App2 = (props) => {
  const [isError, setIsError] = useState(false);
  const isError2 = () => {
    setIsError(true);
  };
  const error2 = () => {
    setIsError(false);
  };
  return (
    <UserContext2.Provider
      value={{
        isError,
        isError2: isError2,
        error2: error2,
      }}
    >
      {props.children}
    </UserContext2.Provider>
  );
};
export default App2;

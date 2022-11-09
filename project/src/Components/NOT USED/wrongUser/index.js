import React from "react";
import styles from './index.module.css'
const WrongUser = () => {
  return (
  <div className={styles.wrongUser}> Грешка: Несъответствие на въведената електронна поща и/или парола.</div>
  )
};

export default WrongUser;

const handleMinus = (valueNumber) => {
  let newValueNumber = valueNumber;
  if (newValueNumber > 1) {
    newValueNumber = newValueNumber - 1;
  }
  if (valueNumber === 1) {
    newValueNumber = 0;
  }
  if (valueNumber > 9) {
    return (newValueNumber = 9);
  }
  return newValueNumber;
};
const handlePlus = (valueNumber) => {
  let newValueNumber = valueNumber;
  if (newValueNumber >= 9) {
    return (newValueNumber = 9);
  }
  newValueNumber = newValueNumber + 1;
  return newValueNumber;
};
export { handleMinus, handlePlus };

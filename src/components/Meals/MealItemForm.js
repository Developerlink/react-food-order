import React, { useState, useRef } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = (props) => {
  const [amount, setAmount] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

    const inputChangeHandler = event => {
      setAmount(event.target.value);
    }

  const submitHandler = (event) => {
    event.preventDefault();

    if (amount < 1 || 5 < amount) {
      setAmountIsValid(false);
    } else {
      props.onAddToCart(amount);
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          value: amount,
          onChange: inputChangeHandler
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;

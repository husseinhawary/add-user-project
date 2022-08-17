import React, { useState} from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css"
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredUserAge, setEnteredUserAge] = useState("");
    const [error, setError] = useState();
    
  const addUserHandler = (event) => {
    event.preventDefault();
    if(enteredUsername.trim().length === 0 || enteredUserAge.trim().length === 0){
        setError({
            title: "Invalid Input",
            message: "Please enter a valid name && age (non-empty values)"
        })
        return;
    }
    // Cast the string into number by adding (+) before the variable name
    if(+enteredUserAge < 1){
        setError({
            title: "Invalid Age",
            message: "Please enter a valid  age (> 0)"
        })
        return;
    }
    props.onAddUser(enteredUsername, enteredUserAge);
    setEnteredUsername("");
    setEnteredUserAge("");
  };

  const usernameChangeHandler = (event) =>{
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) =>{
    setEnteredUserAge(event.target.value);
  };
  const errorHandler = () =>{
    setError(null);
  }
  return (
    <>
    {error && (<ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>)}
    <Card className={styles.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={enteredUsername} onChange={usernameChangeHandler}/>
        <label htmlFor="age">Age</label>
        <input type="number" id="age" value={enteredUserAge} onChange={ageChangeHandler}/>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </>
  );
};

export default AddUser;

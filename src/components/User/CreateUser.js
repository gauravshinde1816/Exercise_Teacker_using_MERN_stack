import React, { useState, useEffect } from "react";
import axios from "axios";
const CreateUser = () => {
  const [username, setUsername] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    const user = {
      username,
    };

    //add user to database
    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));
    setUsername("");
  };

  return (
    <div>
      <h1 className="text-center">Create User</h1>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-lg btn-outline-success">
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;

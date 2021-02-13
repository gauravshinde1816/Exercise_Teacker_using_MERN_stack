import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-date-picker";
import axios from "axios";
const CreateExercise = () => {
  const userInput = useRef("");
  const [username, setUsername] = useState("test user");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);

  const handleDate = (date) => {
    setDate(date);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.users.length > 0) {
        setUsers(res.data.users.map((user) => user.username));
        // setUsername(res.data.users[0].username);
      } else {
        console.log("No user");
      }
    }, []);

    console.log(users);
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username, duration, description, date);
    const exercise = {
      username,
      duration,
      description,
      date,
    };
    axios
      .post("http://localhost:5000/exercise/add", exercise)
      .then((res) => console.log(res.data));
    console.log(exercise, "Exercise Added");
    window.location = "/";
  };
  return (
    <div className="container mb-5">
      <h2 className="text-center">Create New Exercise</h2>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <div>
            <select
              className="form-control"
              onChange={() => setUsername(userInput.current.value)}
              ref={userInput}
            >
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          {/* <input
            name="username"
            className="form-control"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          /> */}
        </div>
        <div className="form-group">
          <label htmlFor="username">duration</label>
          <input
            name="duration"
            className="form-control"
            type="number"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Date</label>
          <DatePicker
            className="form-control"
            onChange={handleDate}
            value={date}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="form-control"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-outline-success btn-block">Create</button>
      </form>
    </div>
  );
};

export default CreateExercise;

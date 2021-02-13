import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-date-picker";
import axios from "axios";
const EditExercise = (props) => {
  const id = window.location.pathname.split("/")[2];
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
    // console.log(window.location.pathname.split("/")[2]);
    axios.get("http://localhost:5000/exercise/" + id).then((res) => {
      setUsername(res.data.exercise.username);
      setDuration(res.data.exercise.duration);
      setDescription(res.data.exercise.description);
      setDate(new Date(res.data.exercise.date));
    });

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
      .put("http://localhost:5000/exercise/update/" + id, exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
    console.log(exercise, "Exercise Updated");
  };
  return (
    <div className="container mb-5">
      <h2 className="text-center">Edit Exercise</h2>
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
        </div>
        <div className="form-group">
          <label htmlFor="username">duration</label>
          <input
            name="duration"
            className="form-control"
            value={duration}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-outline-success btn-block">Edit</button>
      </form>
    </div>
  );
};

export default EditExercise;

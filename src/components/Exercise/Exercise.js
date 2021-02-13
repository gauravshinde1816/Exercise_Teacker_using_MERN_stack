import React from "react";
import { Link } from "react-router-dom";
import EditExercise from "./EditExercise";
const Exercise = (props) => {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>{props.exercise.description}</td>
      <td>
        <Link to={"/edit/" + props.exercise._id}>
          <i
            style={{ cursor: "pointer" }}
            className="fa fa-pencil-square-o text-primary"
            aria-hidden="true"
          ></i>
        </Link>{" "}
        |{" "}
        <a
          style={{ cursor: "pointer" }}
          className="text-danger"
          onClick={() => props.deleteItem(props.exercise._id)}
        >
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </a>
      </td>
    </tr>
  );
};

export default Exercise;

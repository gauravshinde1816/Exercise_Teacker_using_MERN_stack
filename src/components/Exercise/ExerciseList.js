import React, { Component } from "react";
import { List } from "react-router-dom";
import axios from "axios";
import Exercise from "./Exercise";
export default class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get("http://localhost:5000/exercise");

    this.setState({
      exercises: res.data.ExerciseList,
    });
  }

  deleteItem = (id) => {
    axios
      .delete("http://localhost:5000/exercise/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  };

  render() {
    const { exercises } = this.state;

    return (
      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Duration</th>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.length > 0 &&
              exercises.map((exercise) => (
                <Exercise
                  exercise={exercise}
                  key={exercise._id}
                  deleteItem={this.deleteItem}
                />
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ExerciseList from "./components/Exercise/ExerciseList";
import CreateExercise from "./components/Exercise/CreateExercise";
import EditExercise from "./components/Exercise/EditExercise";
import CreateUser from "./components/User/CreateUser";
import SampleForm from "./components/Exercise/SampleForm";
const App = () => {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route path="/" exact component={ExerciseList} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/edit" component={EditExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
};

export default App;

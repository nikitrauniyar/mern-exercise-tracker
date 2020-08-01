import React, { useState, useEffect } from "react";
import axios from "axios";
import Exercise from "./Exercise";

function ExerciseList() {
  const [exerciseList, setExercisesList] = useState({
    exercises: [],
  });
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        setExercisesList({ exercises: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => setServerMessage(res.data));
    setExercisesList({
      exercises: exerciseList.exercises.filter((el) => el._id !== id),
    });
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList.exercises.map((currentExercise) => (
            <Exercise
              exercise={currentExercise}
              deleteExercise={deleteExercise}
              key={currentExercise._id}
            />
          ))}
        </tbody>
      </table>
      {serverMessage}
    </div>
  );
}

export default ExerciseList;

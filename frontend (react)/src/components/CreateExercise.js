import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/users/").then(
      (res) =>
        res &&
        setExercise((prevValue) => ({
          ...prevValue,
          users: res.data.map((user) => user.username),
        }))
    );
  }, []);

  function CreateAsterisk() {
    return <span style={{ color: "red" }}>*</span>;
  }

  function onChange(e) {
    const { name, value } = e.target;
    setExercise((prevValue) => ({ ...prevValue, [name]: value }));
    setServerMessage("");
  }

  function onChangeDate(newDate) {
    setExercise((prevValue) => ({ ...prevValue, date: newDate }));
  }

  function onSubmit(e) {
    e.preventDefault();

    const newExercise = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };

    console.log(newExercise);

    axios
      .post("http://localhost:5000/exercises/add", newExercise)
      .then((res) => setServerMessage(res.data))
      .catch((err) => setServerMessage(err.message));

    window.location = "/";
  }

  return (
    <div>
      <h3>Create new Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>
            Username: <CreateAsterisk />
          </label>
          <select
            name="username"
            required
            className="form-control"
            onChange={onChange}
            value={exercise.username}
          >
            {exercise.users.map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>
            Description: <CreateAsterisk />
          </label>
          <input
            type="text"
            required
            name="description"
            className="form-control"
            value={exercise.description}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>
            Duration (in minutes): <CreateAsterisk />
          </label>
          <input
            type="text"
            required
            name="duration"
            className="form-control"
            value={exercise.duration}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>
            Date: <CreateAsterisk />
          </label>
          <DatePicker selected={exercise.date} onChange={onChangeDate} />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
      {serverMessage}
    </div>
  );
}

export default CreateExercise;

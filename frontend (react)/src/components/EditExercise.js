import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise(props) {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/" + props.match.params.id)
      .then((res) => {
        setExercise((prevValue) => ({
          ...prevValue,
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        }));
      });

    axios.get("http://localhost:5000/users/").then((res) => {
      res &&
        setExercise((prevValue) => ({
          ...prevValue,
          users: res.data.map((user) => user.username),
        }));
    });
  }, [props.match.params.id]);

  function CreateAsterisk() {
    return <span style={{ color: "red" }}>*</span>;
  }

  function onChange(e) {
    const { name, value } = e.target;
    setExercise((prevValue) => ({ ...prevValue, [name]: value }));
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

    console.log(props.match.params.id);

    axios
      .post(
        "http://localhost:5000/exercises/update/" + props.match.params.id,
        newExercise
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
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
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;

import React, { useState, useEffect } from "react";
import axios from "axios";

export function MovieForm(props) {

  // Instantiate the movie id, getting it from the props history
  const id = props.match.params.id;

  // Create a new slice of state for the movie edit form with the properties for each input field
  const [movieForm, setMovieForm] = useState({
    id,
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  // Send a get request passing in the id of the movie you want to get and save the response to the movie form
  const getMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovieForm(res.data))
      .catch(err => console.error(err.message));
  };

  useEffect(() => {
    getMovie(id);
  }, [id]);

  // Manage the form input state (controlled input)
  // stars is an array and so must be represented as such in the input state
  const inputChange = evt => {
    setMovieForm({
      ...movieForm,
      [evt.target.name]:
        evt.target.name === "stars"
          ? evt.target.value.split(",")
          : evt.target.value,
    });
  };

  // Create a function to update the movie information on click of the update button
  const updateMovie = (evt) => {
    evt.preventDefault();

    axios.put(`http://localhost:5000/api/movies/${id}`, movieForm)
      .then(res => {
        props.history.push(`/movies/${id}`);
      })
      .catch(err => console.error(err.message));
  };

  return (
    <div>
      <form>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={movieForm.title}
            onChange={inputChange}
          />
        </label>
        <br /> <br />
        <label>
          Director
          <input
            type="text"
            name="director"
            value={movieForm.director}
            onChange={inputChange}
          />
        </label>
        <br /> <br />
        <label>
          Metascore
          <input
            type="number"
            name="metascore"
            value={movieForm.metascore}
            onChange={inputChange}
          />
        </label>
        <br /> <br />
        <label>
          Stars
          <input
            type="text"
            name="stars"
            value={movieForm.stars}
            onChange={inputChange}
          />
        </label>
        <br /> <br />
        <button onClick={updateMovie}>Update Movie</button>
      </form>
    </div>
  );
}

export default MovieForm;

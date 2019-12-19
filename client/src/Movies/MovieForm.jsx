import React, { useState, useEffect } from "react";
import axios from "axios";

export function MovieForm(props) {

  const id = props.match.params.id;
  const [movieForm, setMovieForm] = useState({
    id,
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  const getMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovieForm(res.data))
      .catch(err => console.error(err.message));
  };

  useEffect(() => {
    getMovie(id);
  }, [id]);

  const inputChange = evt => {
    setMovieForm({
      ...movieForm,
      [evt.target.name]:
        evt.target.name === "stars"
          ? evt.target.value.split(",")
          : evt.target.value,
    });
  };

  const updateMovie = () => {};

  // GET CARD DETAILS USING AXIOS AND CARD ID AND SET TO FORM STATE SO YOU CAN POPULATE THE FORM TO EDIT
  // HANDLECHANGE
  // HANDLESUBMIT

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
        <button>Update Movie</button>
      </form>
    </div>
  );
}

export default MovieForm;

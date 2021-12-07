import React, { useState } from 'react'
import axios from 'axios';
import { themoviedbApiKey, themoviedbBaseUrl } from '../constants';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import classes from './moviesPage.module.css';

export const MoviesPage = (props) => {

  const [searchText, setSearchText] = useState('')

  const [moviesList, setMoviesList] = useState([]);

  const handleChange = (event) => {
    setSearchText(event.currentTarget.value)
  }

  const handleSubmite = (event) => {
    event.preventDefault()

    const queryParamsString = queryString.stringify({
      api_key: themoviedbApiKey,
      query: searchText,
    });

    axios(`${themoviedbBaseUrl}/search/movie?${queryParamsString}`)
        .then(response => {
            setMoviesList(response.data.results);
    })
  }

  return (
    <>
      <header className={classes.searchbar}>
        <form className={classes.search_form} onSubmit={handleSubmite}>
          <button type="submit" className={classes.search_form_button}>
            🔎
            <span className={classes.search_form_button_label}>Search</span>
          </button>
          <input
            value={searchText}
            onChange={handleChange}
            className={classes.search_form_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
        </form>
      </header>
      <main>
        <ul>
          {
              moviesList.map(item => (
                <li kay={item.id}>
                      <Link key={item.id} to={`/movies/${item.id}`}>{item.title}</Link>
                  </li>
              ))
          }
        </ul>
      </main>
      </>
  )
}

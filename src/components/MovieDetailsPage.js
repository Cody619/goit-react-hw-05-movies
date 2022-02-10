import queryString from 'query-string'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  useParams,
  useNavigate,
  Link,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import { Cast } from './Cast'
import { Reviews } from './Reviews'

import { themoviedbApiKey, themoviedbBaseUrl } from '../constants'

import classes from './movieDetailsPage.module.css'

export const MovieDetailsPage = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()

  const [movieData, setMovieData] = useState(null)

  useEffect(() => {
    const queryParamsString = queryString.stringify({
      api_key: themoviedbApiKey,
    })

    axios(`${themoviedbBaseUrl}/movie/${movieId}?${queryParamsString}`).then(
      (response) => {
        setMovieData(response.data)
      },
    )
  }, [movieId])

  if (movieData === null) {
    return null
  }

  return (
    <div className={classes.movies_page}>
      <button onClick={() => navigate(-1)}>⇐ Go back</button>
      <div className={classes.movie}>
        <img
          src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
          alt={movieData.original_title}
        />

        <div className={classes.info}>
          <h2>{movieData.title}</h2>
          <p>User score {Math.round(movieData.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movieData.overview}</p>
          <h3>Genres</h3>
          <div className={classes.genres}>
            {movieData.genres.map((item) => (
              <span key={item.id}>{item.name}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.additional}>
        <h3>Adittional information</h3>
        <ul>
          <li>
            <Link replace to={`/movies/${movieId}/cast`}>
              Cast
            </Link>
          </li>
          <li>
            <Link replace to={`/movies/${movieId}/reviews`}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/cast" element={<Cast />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/" />
        <Route
          path="*"
          element={<Navigate replace to={`/movies/${movieId}`} />}
        />
      </Routes>
    </div>
  )
}

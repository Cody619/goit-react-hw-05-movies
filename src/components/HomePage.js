import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { themoviedbApiKey, themoviedbBaseUrl } from '../constants';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import classes from './homePage.module.css'

export const HomePage = () => {

    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {

        const queryParamsString = queryString.stringify({
            api_key: themoviedbApiKey,
        })

        axios(`${themoviedbBaseUrl}/trending/movie/day?${queryParamsString}`)
            .then(response => {
                setMoviesList(response.data.results);
            });
     }, []);

    return (
        <div className={classes.home_page}>
            <h1>Trending today</h1>
            <ul>
                {
                    moviesList.map(item => (
                        <li kay={item.id}>
                            <Link key={item.id} to={`/movies/${item.id}`}>{item.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
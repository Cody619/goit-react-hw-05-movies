import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import queryString from 'query-string';
import { themoviedbApiKey, themoviedbBaseUrl } from '../constants';

import classes from './cast.module.css'

export const Cast = () => {
    const {movieId} = useParams();

    const [castData, setCastData] = useState(null);

    useEffect(() => {
        const queryParamsString = queryString.stringify({
            api_key: themoviedbApiKey
        });

        axios(`${themoviedbBaseUrl}/movie/${movieId}/credits?${queryParamsString}`)
            .then(response => {
                setCastData(response.data);
        })
    },[movieId])

    if (castData === null) {
        return null;
    }

    return (
        <div>
            {castData.cast.map(item => (
                <div className={classes.person} key={item.id}>
                    {item.profile_path === null ? (
                        <div className={classes.no_image}>No photo</div>
                    ): (
                        <img src={`https://image.tmdb.org/t/p/original${item.profile_path}`} alt={item.name}/>
                    )}
                    <p>{item.name}</p>
                    <p>Character: {item.character}</p>
                </div>
            ))}
        </div>
    )
}
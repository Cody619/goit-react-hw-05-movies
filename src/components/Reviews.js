import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import queryString from 'query-string';
import { themoviedbApiKey, themoviedbBaseUrl } from '../constants';


export const Reviews = () => {

    const {movieId} = useParams();

    const [reviewsData, setReviewsData] = useState(null);

    useEffect(() => {
        const queryParamsString = queryString.stringify({
            api_key: themoviedbApiKey
        });

        axios(`${themoviedbBaseUrl}/movie/${movieId}/reviews?${queryParamsString}`)
            .then(response => {
                setReviewsData(response.data.results);
        })
    },[movieId])

    if (reviewsData === null) {
        return null;
    } else if (reviewsData.length === 0) {
        return (
            <p>We dont have any reviews for this movie</p>
        )
    } else {
        return (
            <div style={{ whiteSpace: 'pre-wrap' }}>
                <ul>
                    {reviewsData.map(item => (
                        <li key={item.id}>
                            <h3>{item.author}</h3>
                            <p>{item.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
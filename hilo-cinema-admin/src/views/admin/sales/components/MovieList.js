import React from 'react'
import movies from "/variables/dataMovie.json"

function Movies({ movie, onChange }) {
    return (
        <div className="Movies">
            <label htmlFor="movie">Pick a movie</label>
            <select
                id="movie"
                value={movie.name}
                onChange={e => {
                    onChange(movies.find(movie => movie.name === e.target.value))
                }}
            >
                {movies.map(movie => (
                    <option key={movie.name} value={movie.name}>
                        {movie.name} (${movie.price})
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Movies
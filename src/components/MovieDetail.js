import React from 'react'
import { useParams } from 'react-router-dom'

function MovieDetail() {
    const params = useParams();

    return (
        <div>MovieDetail {params.id}</div>
    )
}

export default MovieDetail
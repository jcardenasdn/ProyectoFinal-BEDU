import React from 'react'
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function MovieCard({ title, img, id }) {
    return (
        <Link to={`/movie/${id}`}>
            <Card>
                <CardContent>
                    <Typography>
                        <img src={img} width={400} />
                        Title: {title}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

export default MovieCard
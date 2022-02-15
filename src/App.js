import { AppBar, Container, Grid, Paper, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import MovieCamera from './img/movie_camera.jpg';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const url = 'https://jsonplaceholder.typicode.com/posts';
const options = {
  method: 'GET',
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchData () {
    const response = await fetch(url, options).then((data) => data.json());
    const slicedResponse = response.slice(0, 10)
    setMovies(slicedResponse);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const searchMovie = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchText));

    if (!searchText) {
      fetchData();
    } else {
      setMovies(filteredMovies);
    }
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          Weird Movie Names

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => searchMovie(e)}
            />
          </Search>
        </Toolbar>
      </AppBar>

      <Grid container spacing={5} sx={{ my: 1 }}>
        { 
          movies.map((movie) => (
            <Grid 
              item 
              xs={4}
              key={movie.id}
            >
              <MovieCard 
                img={MovieCamera}
                title={movie.title} 
                id={movie.id}
              />
            </Grid>
          ))
        }
      </Grid>        
    </Container>
  );
}

export default App;

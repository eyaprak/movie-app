import React from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import axios from 'axios';
import Swal from 'sweetalert2'
import AddMovie from './AddMovie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import EditMovie from './EditMovie';





class App extends React.Component {
    state = {
        movies: [],
        searchQuery: ""
    }

    async componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        const response = await axios.get("http://localhost:3001/movies")
        this.setState({ movies: response.data })
    }

    deleteMovie = async (movie) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to remove the movie?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/movies/${movie.id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'The movie has been deleted.',
                            'success'
                        )
                        const newMovieList = this.state.movies.filter(m => m.id !== movie.id)
                        this.setState(state => ({
                            movies: newMovieList
                        }))
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

    }

    searchMovie = (event) => {
        this.setState({ searchQuery: event.target.value })
    }

    addMovie = async (movie) => {
        await axios.post(`http://localhost:3001/movies/`, movie)
            .then(_ => {
                Swal.fire({
                    title: 'New Movie Has Added!',
                    text: movie.name + ' has been added.',
                    timer: 2000,
                    icon: 'success',
                    showConfirmButton: false
                })
                this.setState(state => ({
                    movies: state.movies.concat([movie])
                }));
                this.getMovies();
            });



    }

    editMovie = async (id, movie) => {
        axios.put(`http://localhost:3001/movies/${id}`, movie)
            .then(_ => {
                Swal.fire({
                    title: 'Updated!',
                    text: movie.name + ' Movie has been updated.',
                    timer: 2000,
                    icon: 'success',
                    showConfirmButton: false
                })
                this.getMovies();
            })

    }


    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toString().toLowerCase().indexOf(this.state.searchQuery.toString().toLowerCase()) !== -1
            }
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? - 1 : 0
        })


        return (
            <Router>
                <div className="container">
                    <Switch>

                        <Route path="/" exact render={() => (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-lg-10">
                                        <SearchBar
                                            searchMovie={this.searchMovie}
                                        />
                                    </div>
                                    <div className="col-lg-2 mt-2 mb-2">
                                        <Link to="/add" type="button" className="btn btn-md btn-danger w-100" style={{ float: 'right' }}>
                                            Add Movie
                                        </Link>
                                    </div>
                                </div>
                                <MovieList
                                    movies={filteredMovies}
                                    deleteMovie={this.deleteMovie}
                                />
                            </React.Fragment>
                        )}>

                        </Route>


                        <Route path="/add" render={(props) => (
                            <AddMovie
                                {...props}
                                onAddMovie={(movie) => {
                                    this.addMovie(movie)
                                    // { history }history.push('/')
                                }}
                            />
                        )}>
                        </Route>


                        <Route path="/edit/:id" render={(props) => (
                            <EditMovie
                                {...props}
                                onEditMovie={(id, movie) => {
                                    this.editMovie(id, movie)
                                }}
                            />
                        )}>
                        </Route>

                    </Switch>
                </div>
            </Router >
        );
    }
}


export default App;
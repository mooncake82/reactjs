import React, { Component, Fragment } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utilities/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movie extends Component {
    state = {
        movies: [],
        genres: [],
        filtered: [],
        pageSize: 4,
        currentPage: 1
    };

    componentDidMount() {
        this.setState({ movies: this.getInitialState(), genres: getGenres() });
    }

    getInitialState() {
        const movies = getMovies();
        const moviesClone = movies.map(item => {
            const obj = {
                ...item,
                isLiked: false
            };
            return obj;
        });
        return moviesClone;
    }

    render() {

        const { pageSize, currentPage, genres, selectedGenre } = this.state;
        const movies = paginate(this.state.movies, currentPage, pageSize);
        this.state.filtered = selectedGenre ? this.state.movies.filter(m => m.genre._id === selectedGenre._id) : movies;
        
        // console.log('filtered', this.state.filtered);
        // console.log('selectedGenre',selectedGenre);
        

        return (
            <React.Fragment>
                <div className="row">
                    <h1>Vidly Project</h1>
                </div>

                <div className="row">
                    <aside className="col-md-3">
                        <ListGroup
                            genres={genres}
                            selectedGenre={this.state.selectedGenre}
                            onGenreSelected={this.handleGenresSelect}/>
                    </aside>

                    <section className="col-md-9">
                        {this.state.filtered.length ? (
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Rate</th>
                                        <th scope="col"></th>
                                        <th scope="col">
                                            <button
                                                onClick={this.reset}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                Reset
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filtered.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.title}</td>
                                            <td>{item.genre.name}</td>
                                            <td>{item.numberInStock}</td>
                                            <td>{item.dailyRentalRate}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        this.movieDelete(item)
                                                    }
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                            <td>
                                                <Like
                                                    onLiked={() =>
                                                        this.handleLike(item)
                                                    }
                                                    isLiked={item.isLiked}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="alert alert-danger" role="alert">
                                <h4 className="alert-heading">
                                    No movies left!
                                </h4>
                                <hr />
                                <button
                                    onClick={this.reload}
                                    className="btn btn-primary"
                                >
                                    Reload
                                </button>
                            </div>
                        )}
                        <Pagination
                            itemsCount={!selectedGenre ? this.state.movies.length : this.state.filtered.length }
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </section>
                </div>
            </React.Fragment>
        );
    }

    handleGenresSelect = genre => {
        // console.log(genre);
        this.setState({ selectedGenre: genre });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleLike = item => {
        item.isLiked = !item.isLiked;
        this.setState({ isLiked: item.isLiked });
    };

    reset = () => {
        const { movies } = this.state;

        movies.map(item => {
            item.isLiked = false;
            return item;
        });

        this.setState(movies);
    };

    movieDelete = item => {
        const { movies, selectedGenre, filtered } = this.state;
        let dynamicArray = !selectedGenre ? movies : filtered;

        const index = dynamicArray.indexOf(item);
        dynamicArray[index] = { ...dynamicArray[index] };
        dynamicArray.splice(index, 1)
        this.setState({ movies: dynamicArray });
    };
}

export default Movie;

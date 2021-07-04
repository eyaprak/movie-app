import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


class EditMovie extends React.Component {


    state = {
        name: "",
        rating: "",
        overview: "",
        imageURL: ""
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        await axios.get(`http://localhost:3001/movies/${id}`)
            .then((res) => {
                this.setState(
                    {
                        name: res.data.name,
                        rating: res.data.rating,
                        overview: res.data.overview,
                        imageURL: res.data.imageURL
                    }
                )
            })
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleForSubmit = (e) => {
        e.preventDefault();

        const { name, rating, overview, imageURL } = this.state;
        const id = this.props.match.params.id;
        const updatedMovie = {
            name: name,
            rating: rating,
            overview: overview,
            imageURL: imageURL
        }

        this.props.onEditMovie(id, updatedMovie);
        this.props.history.push('/');

    }

    handleGoBack = () => {
        this.props.history.push('/')
    }


    render() {
        return (
            <div className="container">
                <form className="mt-5" onSubmit={this.handleForSubmit}>
                    <input className="form-control" id="disabledInput" type="text" placeholder="Edit The Form To Add A Movie.." disabled />
                    <div className="form-row">
                        <div className="form-group col-md-10">
                            <label htmlFor="inputName">Name</label>
                            <input type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onInputChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputRating">Rating</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rating"
                                value={this.state.rating}
                                onChange={this.onInputChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputImage">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="imageURL"
                                value={this.state.imageURL}
                                onChange={this.onInputChange} />
                            <div className="col-md-4 d-block ml-0 mt-1">
                                <img src={this.state.imageURL} style={{width:'150px',height:'200px'}}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="overviewTextarea">Overview</label>
                            <textarea
                                className="form-control"
                                name="overview" rows="5"
                                value={this.state.overview}
                                onChange={this.onInputChange}></textarea>
                        </div>
                    </div>
                    <div className="col-md-12 d-flex flex-wrap align-content-around">
                        <div className="col-sm-8 pl-0 ml-auto mb-2"><input type="submit" className="btn btn-primary btn-block" value="Update Movie" /></div>
                        <div className="col-sm-4 pl-0 "><button className="btn btn-primary btn-block" onClick={this.handleGoBack}>Go Back</button></div>

                    </div>

                </form>

            </div>
        );
    }
}

export default EditMovie;
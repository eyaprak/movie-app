import serialize from 'form-serialize';
import React from 'react';


class AddMovie extends React.Component {

    handleForSubmit = (e) => {
        e.preventDefault()
        const newMovie = serialize(e.target, { hash: true })
        this.props.onAddMovie(newMovie)
        this.props.history.push('/');
    }

    handleGoBack = () => {
        this.props.history.push('/')
    }


    render() {
        return (
            <div className="container">
                <form className="mt-5" onSubmit={this.handleForSubmit}>
                    <input className="form-control" id="disabledInput" type="text" placeholder="Fill The Form To Add A Movie.." disabled />
                    <div className="form-row">
                        <div className="form-group col-md-10">
                            <label htmlFor="inputName">Name</label>
                            <input type="text"
                                className="form-control"
                                name="name" 
                                required/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputRating">Rating</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rating"
                                required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputImage">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="imageURL"
                                required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="overviewTextarea">Overview</label>
                            <textarea
                                className="form-control"
                                name="overview" rows="5"
                                required></textarea>
                        </div>
                    </div>
                    <div className="col-md-12 d-flex flex-wrap align-content-around">
                        <div className="col-sm-8 pl-0 ml-auto mb-2"><input type="submit" className="btn btn-primary btn-block" value="Add Movie" /></div>
                        <div className="col-sm-4 pl-0"><button className="btn btn-primary w-100" onClick={this.handleGoBack}>Go Back</button></div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddMovie;
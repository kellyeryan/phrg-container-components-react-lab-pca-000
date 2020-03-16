import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'FHHt3HTPHsQ1nnGAc0a6ByPd3dryPMEJ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/all.json?'
            + `api-key=${NYT_API_KEY}`;
const BASE_URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?' +
  `api-key=${NYT_API_KEY}&query=`;

class SearchableMovieReviewsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      searchTerm: ""
    }
  }

  handleSearchInputChange = event => this.setState({ searchTerm: event.target.value })


  handleSubmit = event => {

    event.preventDefault();

    fetch(BASE_URL.concat(this.state.searchTerm))
      .then(response => response.json())
      .then(response => this.setState({ reviews: response.results }))
  }

    render() {
      return(
        <div className="searchable-movie-reviews">
          <form onSubmit={this.handleSubmit}>
            <label>Search Movie Reviews</label>
            <input onChange={this.handleSearchInputChange}
          />
          <button type="submit">Submit</button>
          </form>
          {typeof this.state.reviews === 'object' &&
          this.state.reviews.length > 0 && <h2>Movie Review By Search:</h2>}
          <MovieReviews reviews={this.state.reviews} />
        </div>
      )
    }
}

export default SearchableMovieReviewsContainer;

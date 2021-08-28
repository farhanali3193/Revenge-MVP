import React from 'react';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({searchTerm: e.target.value}, () => console.log('SEARCH TERM AFTER INPUT CHANGE', this.state))
  }

  handleSubmit = () => {
    if (this.state.searchTerm === '') {
      return;
    }
    this.props.onSearch(this.state.searchTerm)
    this.setState({searchTerm: ''})
  }

  render () {
    return  (
      <div className='search'>
        SEARCH
        <input type='search' name='search-bar' id='search-bar' className='search-bar' onChange={this.handleInputChange} />
        <button onClick={this.handleSubmit}>SUBMIT</button>
      </div>
    )
  }
}

export default Search;
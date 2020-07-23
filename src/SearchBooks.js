import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    booksFound : [],
    searchstate : '', // 'noresults', 'searching', 'results', 'error',
    errormsg: ''
  }

  changeQuery = (query) => {
    this.setState({ booksFound : [], searchstate : 'noresults' })
    if(query) {
      this.setState({ searchstate : 'searching' })
      BooksAPI.search(query, 20).then((data) => {
        let { mybooks } = this.props

        if (data) {
          if(!data.error){
            // Some query words (e.g. "react") returns duplicates. Remove them before displaying
            const noDuplicatedData = data.filter((elem, pos, arr) => arr.findIndex((e) => e.id === elem.id) === pos);

            // merge mybooks with booksFound to have correct shelf value
            const booksMerged = noDuplicatedData.map((b, index) => (
              mybooks.findIndex((b2) => b2.id === b.id) === -1 ? b : mybooks[mybooks.findIndex((b2) => b2.id === b.id)]
            ))

            this.setState({ booksFound : booksMerged, searchstate : 'results' })
          } else {
            this.setState({ searchstate : 'error', errormsg: data.error })
          }
        } else {
          this.setState({ searchstate : 'noresults' })
        }

      })
    }
  }

  render(){
    const { updateShelf } = this.props
    let { booksFound, searchstate, errormsg } = this.state


    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              onChange={(event) => this.changeQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          { searchstate === 'error' &&
            <div className="search-book-results-msg">Search error - {errormsg}</div>}
          { searchstate === 'searching' &&
            <div className="search-book-results-msg">Searching...</div>}
          { searchstate === 'noresults' &&
            <div className="search-book-results-msg">No results found</div>}
          { searchstate === 'results' &&
            <BooksGrid books={booksFound} updateShelf={updateShelf} />}

        </div>
      </div>
    )
  }
}

export default SearchBooks

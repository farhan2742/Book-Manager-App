import React, { Component } from 'react'
import Book from './Book'

class BooksGrid extends Component {
  state = {}

  render(){
    const { books, updateShelf } = this.props
    let { currentBook } = this.state

    return(
      <ol className="books-grid">
        {books.map(book => (
          <Book key={book.id} book={book} updateShelf={updateShelf}/>
        ))}
      </ol>
    )
  }
}

export default BooksGrid

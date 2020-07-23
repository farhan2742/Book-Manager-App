import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    mybooks: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((mybooks) => {
      this.setState({mybooks: mybooks})
    })
  }

  updateShelf = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(
      //this.setState(state => (state.mybooks.filter(b => b.id === book.id)[0].shelf = shelf) --> works but wrong! never update prevState directly
      this.setState((prevState, props) => {
        return {
          mybooks: prevState.mybooks.map((b) => b.id === book.id ? book : b)
        }
      }


      )
    )
  }

  addBook = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(
      this.setState(state => (
        {mybooks: state.mybooks.concat([ book ])}
        )
      )
    )
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks mybooks={this.state.mybooks} updateShelf={this.updateShelf}/>
        )} />
        <Route exact path="/search" render={() => (
          <SearchBooks updateShelf={this.addBook} mybooks={this.state.mybooks}/>
        )} />
      </div>
    )
  }
}

export default BooksApp

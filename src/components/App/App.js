import './App.css';
import React, {Component} from "react";
import Service from '../../repository/Service';
import {BrowserRouter as Router, Redirect, Route, Routes} from 'react-router-dom';
import Header from '../Header/Header';
import Categories from '../Category/Categories';
import Book from '../Book/books';
import BookAdd from "../Book/BookAdd/bookAdd";
import BookEdit from "../Book/BookEdit/bookEdit";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <Routes>
                    <Route path="/categories" element={<Categories/>}/>
                    <Route path="/books" element={<Book onBorrowBook={this.borrowBook} onDelete={this.deleteBook}
                                                        books={this.state.books}/>}/>
                    <Route path="/" element={<Book onBorrowBook={this.borrowBook} onDelete={this.deleteBook}
                                                        books={this.state.books}/>}/>
                    <Route path="/books/add" element={<BookAdd/>}/>
                    {["/books", "/"].map((value, index) => (
                        <Route key={index} path={value} element={<Book/>}/>
                    ))}
                    <Route path="/books/edit/:id" element={<BookEdit/>}/>

                </Routes>
            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks()
        this.loadCategories()
        this.loadAuthors()
    }

    loadBooks = () => {
        Service.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }
    loadAuthors = () => {
        Service.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }
    loadCategories = () => {
        Service.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            })
    }
    deleteBook = (id) => {
        Service.deleteProduct(id)
            .then(() => {
                this.loadBooks();
            });
    }
    borrowBook = (id) => {
        Service.borrowBook(id)
            .then(() => {
                this.loadBooks();
            });
    }
    getBook = (id) => {
        Service.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }
}

export default App;

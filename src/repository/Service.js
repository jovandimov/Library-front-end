import React from 'react'
import axios from '../custom-axios/axios';

const Service = {
    fetchBooks: () => {
        return axios.get("/books");
    },
    fetchCategories: () => {
        return axios.get("/categories");
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },

    addBook: (name, category, authorId, availableCopies) => {
        return axios.post("/books/add", {
            name: name,
            category: category,
            authorId: authorId,
            availableCopies: availableCopies
        });
    },
    editBookWithIdInPath: (id, name, category, author, availableCopies) => {
        return axios.post('/books/edit/${id}', {
            "name": name,
            "category": category,
            "author": author,
            "availableCopies": availableCopies
        });
    },
    editBook: (id, name, category, authorId, availableCopies) => {
        return axios.put('/books/edit', {
            id: id,
            name: name,
            category: category,
            authorId: authorId,
            availableCopies: availableCopies
        });
    },
    findById: (id) => {
        return axios.get(`/books/${id}`)

    },
    deleteProduct: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    borrowBook : (id) => {
        return axios.put(`/books/borrow/${id}`);
    }
}

export default Service;
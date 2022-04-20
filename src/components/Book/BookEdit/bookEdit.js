import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Service from "../../../repository/Service";

const BookEdit = (props) => {
    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([])
    const [book, setBook] = useState({
        id: -1,
        name: "",
        category: "",
        author: 0,
        availableCopies: 0
    })

    const navigate = useNavigate()
    const bookParamsId = useParams()

    const [formData, setFormData] = useState({
        id: 0, name: "", category: 0, authorId: 0, availableCopies: 0,
    })
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value.trim()
        })
    }
    const submitData = (e) => {
        e.preventDefault()
        const name = formData.name === "" ? book.name : formData.name
        const availableCopies = formData.availableCopies === 0 ? book.availableCopies : formData.availableCopies
        editBook(formData.id, name, formData.category, formData.authorId, availableCopies)
    }
    const editBook = (id, name, category, authorId, availableCopies) => {
        Service.editBook(id, name, category, authorId, availableCopies)
            .then((data) => navigate("/books"))
    }

    useEffect(() => {
        Service.fetchCategories().then((data) => setCategories(data.data))
        Service.fetchAuthors().then((data) => {
            setAuthors(data.data)
            setFormData(prevState => ({
                ...prevState, ["authorId"]: data.data[0].id
            }))
        })
        Service.findById(bookParamsId.id).then((data) => {
            setBook(data.data)
            setFormData((prevState => ({
                ...prevState, ["id"]: data.data.id
            })))
        })
            .catch(() => setBook(null))
    }, [])

    const showEditForm = () => (
        <div className={"text-center w-25 container"}>
            <form onSubmit={submitData}>

                <span>Book Name</span>
                <input name={"name"} onChange={handleChange} className={"form-control"} type={"text"}
                       placeholder={book?.name}/>

                <span>Book Category</span>
                <select name={"category"} onChange={handleChange} className={"form-control"}>
                    {categories.map((value, index) => {
                        if (value === book.category)
                            return <option selected key={index} value={index}>{value.toString()}</option>
                        else
                            return <option key={index} value={index}>{value.toString()}</option>
                    })}
                </select>

                <span>Book Author</span>
                <select name={"authorId"} onChange={handleChange} className={"form-control"}>
                    {authors.map((value, index) => {
                        if (value.id === book.author.id)
                            return <option selected key={index}
                                           value={value.id}>{value.name + ' ' + value.surname}</option>
                        else
                            return <option key={index} value={value.id}>{value.name + ' ' + value.surname}</option>
                    })}
                </select>


                <span>Book Available Copies</span>
                <input name={"availableCopies"} onChange={handleChange}
                       className={"form-control"}
                       type={"number"}
                       placeholder={book?.availableCopies}/>

                <button type={"submit"} className={"btn btn-warning mt-3"}>Edit Book</button>
            </form>
        </div>
    )
    const bookNotFound = () => (
        <div className={"container text-center"}>
            <p className={"text-danger"}>Book with id {bookParamsId.id} was not found for editing!</p>
        </div>
    )
    return book !== null ? showEditForm() : bookNotFound()
}

export default BookEdit;
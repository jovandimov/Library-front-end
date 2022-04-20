import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import {Link, useNavigate} from "react-router-dom";
import Service from "../../../repository/Service";

const BookAdd = (props) => {
    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        authorId: 0,
        availableCopies: 0,
    })

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value.trim()
        })
    }

    const submitData = (e) => {
        e.preventDefault()
        addBook(formData)
    }
    const addBook = ({name, category, authorId, availableCopies}) => {
        Service.addBook(name, category, authorId, availableCopies)
            .then(() => navigate("/books"))

    }
    useEffect(() => {
        Service.fetchCategories().then((data) => setCategories(data.data))
        Service.fetchAuthors().then((data) => {
            setAuthors(data.data)
            setFormData(prevState => ({
                ...prevState, ["authorId"]: data.data[0].id
            }))
        })
    }, [])

    return (<div className={"w-25 text-center container"}>
        <form onSubmit={submitData}>

            <span>Book Name</span>
            <input name={"name"} onChange={handleChange} required className={"form-control"} type={"text"}
                   placeholder={"name"}/>

            <span>Book Category</span>
            <select name={"category"} onChange={handleChange} className={"form-control"}>
                {categories.map((value, index) => (
                    <option key={index} value={index}>{value.toString()}</option>
                ))}
            </select>

            <span>Book Author</span>
            <select name={"authorId"} onChange={handleChange} className={"form-control"}>
                {authors.map((value, index) => (
                    <option key={index} value={value.id}>{value.name + ' ' + value.surname}</option>))}
            </select>

            <span>Book Available Copies</span>
            <input name={"availableCopies"} onChange={handleChange} required
                   className={"form-control"}
                   type={"number"}
                   placeholder={"available copies"}/>

            <button type={"submit"} className={"btn btn-info mt-3"}>Add Book</button>
        </form>
    </div>)
}


export default BookAdd;
import React from "react";
import {Link} from "react-router-dom";

const Header = () => (
    <div className={"d-flex p-2 justify-content-evenly bg-dark"}>
        <Link className={"btn btn-light"} to={"/books"}>Books</Link>
        <Link className={"btn btn-light"} to={"/books/add"}>Add New Book</Link>
        <Link className={"btn btn-light"} to={"/categories"}>Categories</Link>
    </div>
)

export default Header;
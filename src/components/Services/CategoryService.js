import React from 'react'
import axios from "../../custom-axios/axios";

export const CategoryService = {
    findAll: () => axios.get("/categories"),
}
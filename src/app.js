const express = require('express');


const app = express()
const {index, create} = require ("./db")


app.get("/api/notes", async (req, res)=>{
    const data = await index()
    res.send(data)
})


module.exports = app
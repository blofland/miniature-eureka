const express = require('express');


const app = express()

const port = process.env.PORT || 3001



app.use("/api/test", (req, res) => {
    res.send("FU")
    
}), 

module.exports = app
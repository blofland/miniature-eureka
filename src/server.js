const express = require('express');


const app = express()

const port = process.env.PORT || 3001



app.use("/api/test", (req, res) => {
    res.send("FU")
    
}), 


app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})
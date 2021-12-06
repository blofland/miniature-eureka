const express = require("express")
const path = require("path")
const apiRouter = require("./routes/api/router")
const viewRouter = require("./routes/notes/router")

const app = express()
const index = path.resolve(__dirname, "../public/index.html")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.use("/api/notes", apiRouter)
app.use("/notes", viewRouter)
app.use("/", (req, res) => {
  res.sendFile(index)
})


module.exports = app 

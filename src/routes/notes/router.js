const Router = require("express").Router
const path = require("path")
const router = Router()

router.route('/')
    .get((req, res) => {
        const notes = path.resolve(__dirname, "../../../public/notes.html")

        res.sendFile(notes)
    })
module.exports = router

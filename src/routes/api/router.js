const Router = require("express").Router
const db = require("../../database")
const router = Router()

router.route('/')
    .get(async(req, res) => {
        try {
            let data = await db.index()
            res.send(data || [])
        } catch (err) {
            res.status(500).send(err)
        }
    })

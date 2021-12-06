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
    .post(async(req, res, next)=> {
        if(!req.body.title || !req.body.text)return res.status(400).send("Improper request sent")
        try {
            const record = await db.create(req.body)
            res.send(record)
        } catch (err){
            res.send(err)
        }
    })
router.route("/:id")
    .get(async (req, res) => {
    const record = await db.record(req.params)
    res.send(record)
})
    .delete(async(req, res, next) => {
        try {
            const message = await db.destroy(req.params)
            res.send(message)
        } catch (err) {
            res.send(err)
        }
    })
module.exports = router

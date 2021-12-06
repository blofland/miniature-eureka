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

const express = require('express')
const { catchErrors } = require('../helpers')
const { Talk } = require('../models')
const router = express.Router()

module.exports = router

const fetchTalks = async (req, res) => {
    const talks = await Talk.find()
    const data = {
        talks,
        total: talks.length,
    }
    res.json(data)
}

const createTalk = async (req, res) => {
    const data = {
        ...req.body,
        vote: 0,
    }
    try {
        const talk = await (new Talk(data)).save()
        res.json(talk)
    } catch (_) {
        res.status(403).end()
    }
}

const upvoteTalk = async (req, res) => {
    const talk = await Talk.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { vote: 1 } },
        { new: true }
    )
    res.json(talk)
}


router.get('/', catchErrors(fetchTalks))
router.post('/', catchErrors(createTalk))
router.put('/:id/upvote', catchErrors(upvoteTalk))

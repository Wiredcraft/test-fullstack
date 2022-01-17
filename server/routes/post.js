import express from 'express'
import { getList, get, create, remove } from '../controllers/post.js'

const router = express.Router()

router.get('', getList)
router.get('/:id', get)
router.post('', create)
router.delete('/:id', remove)

export default router
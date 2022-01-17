import Post from '../models/postModel.js'

const postModel = Post.getInstance()

export const get = async (req, res)=> {
    const { id } = req.params
    const item = await postModel.get({_id: id});
    res.status(200).json({ result: item });
}

export const getList = async (req, res)=> {
    const list = await postModel.getAll();
    res.status(200).json({ result: list });
}

export const create = async (req, res) => {
    const result = await postModel.create(req.body);
    res.status(200).json({ result: result });
}

export const remove = async (req, res) => {
    await postModel.delete(req.params.id);
    res.status(200).json({ result: 'ok' });
}

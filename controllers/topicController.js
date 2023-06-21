import {Topic} from "../models/models.js";

class TopicController {
    async create(req, res) {
        try {
            const {name} = req.body
            const topic = await Topic.create({name})
            res.json(topic);
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async update(req, res) {
        try {
            const topic = req.body
            if (!topic.id) {
                res.status(400).json({message:'Id не указан'})
            }
            const updatedTopic = await Topic.findByIdAndUpdate(topic.id, topic, {new: true})
            res.json(updatedTopic);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const topics = await Topic.find();
            return res.json(topics)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message:'Id не указан'})
            }
            const topic = await Topic.findByIdAndDelete(id);
            return res.json(topic)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new TopicController();
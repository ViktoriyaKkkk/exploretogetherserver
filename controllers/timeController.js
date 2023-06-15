import {Time} from "../models/models.js";

class TimeController {
    async create(req, res) {
        try {
            const {name} = req.body
            const time = await Time.create({name})
            console.log(req.body)
            res.json(time);
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async update(req, res) {
        try {
            const time = req.body
            if (!time.id) {
                res.status(400).json({message:'Id не указан'})
            }
            const updatedTime = await Time.findByIdAndUpdate(time.id, time, {new: true})
            console.log(req.body)
            res.json(updatedTime);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const times = await Time.find();
            return res.json(times)
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
            const time = await Time.findByIdAndDelete(id);
            return res.json(time)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new TimeController();
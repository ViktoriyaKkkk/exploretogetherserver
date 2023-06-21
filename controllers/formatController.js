import {Format} from "../models/models.js";

class FormatController {
    async create(req, res) {
        try {
            const {name} = req.body
            const format = await Format.create({name})
            res.json(format);
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async update(req, res) {
        try {
            const format = req.body
            if (!format.id) {
                res.status(400).json({message:'Id не указан'})
            }
            const updatedFormat = await Format.findByIdAndUpdate(format.id, format, {new: true})
            res.json(updatedFormat);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const formats = await Format.find();
            return res.json(formats)
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
            const format = await Format.findByIdAndDelete(id);
            return res.json(format)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new FormatController();
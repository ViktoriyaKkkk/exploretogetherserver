import {Level} from "../models/models.js";
import mongoose from "mongoose";

class LevelController {
    async create(req, res) {
        try {
            let {name, sectionId} = req.body
            sectionId = new mongoose.Types.ObjectId(sectionId);
            const level = await Level.create({name, sectionId})
            res.json(level);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const level = req.body
            if (!level.id) {
                res.status(400).json({message:'Id не указан'})
            }
            const updatedLevel = await Level.findByIdAndUpdate(level.id, level, {new: true})
            res.json(updatedLevel);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const levels = await Level.find();
            return res.json(levels)
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
            const level = await Level.findByIdAndDelete(id);
            return res.json(level)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new LevelController();
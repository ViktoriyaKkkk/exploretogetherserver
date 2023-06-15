import {Section} from "../models/models.js";
import mongoose from "mongoose";

class SectionController {
    async create(req, res) {
        try {
            let {name, topicId} = req.body
            topicId = new mongoose.Types.ObjectId(topicId);
            const section = await Section.create({name, topicId})
            console.log(req.body)
            res.json(section);
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async update(req, res) {
        try {
            const section = req.body
            if (!section.id) {
                res.status(400).json({message:'Id не указан'})
            }
            const updatedSection = await Section.findByIdAndUpdate(section.id, section, {new: true})
            console.log(req.body)
            res.json(updatedSection);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const sections = await Section.find();
            return res.json(sections)
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
            const section = await Section.findByIdAndDelete(id);
            return res.json(section)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new SectionController();
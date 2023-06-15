import {Age} from "../models/models.js";

class AgeController {
    async create(req, res) {
        try {
            const {name} = req.body
            const age = await Age.create({name})
            console.log(req.body)
            res.json(age);
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async update(req, res) {
        try {
            const age = req.body
            if (!age.id) {
                res.status(400).json({message:'Id не указан'})
            }
            const updatedAge = await Age.findByIdAndUpdate(age.id, age, {new: true})
            console.log(req.body)
            res.json(updatedAge);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const ages = await Age.find();
            return res.json(ages)
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
            const age = await Age.findByIdAndDelete(id);
            return res.json(age)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new AgeController();
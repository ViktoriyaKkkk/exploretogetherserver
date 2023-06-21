import {Periodicity} from "../models/models.js";

class PeriodicityController {
    async create(req, res) {
        try {
            const {name} = req.body
            const periodicity = await Periodicity.create({name})
            res.json(periodicity);
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async update(req, res) {
        try {
            const periodicity = req.body
            if (!periodicity.id) {
                res.status(400).json({message:'Id не указан'})
            }
            const updatedPeriodicity = await Periodicity.findByIdAndUpdate(periodicity.id, periodicity, {new: true})
            res.json(updatedPeriodicity);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const periodicities = await Periodicity.find();
            return res.json(periodicities)
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
            const periodicity = await Periodicity.findByIdAndDelete(id);
            return res.json(periodicity)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new PeriodicityController();
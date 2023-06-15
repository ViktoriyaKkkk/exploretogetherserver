import {City} from "../models/models.js";

class CityController {
    async create(req, res) {
        try {
            const {name} = req.body
            const city = await City.create({name})
            console.log(req.body)
            res.json(city);
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async update(req, res) {
        try {
            const city = req.body
            if (!city.id) {
                res.status(400).json({message:'Id не указан'})
            }
            const updatedCity = await City.findByIdAndUpdate(city.id, city, {new: true})
            console.log(req.body)
            res.json(updatedCity);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const cities = await City.find();
            return res.json(cities)
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
            const city = await City.findByIdAndDelete(id);
            return res.json(city)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new CityController();
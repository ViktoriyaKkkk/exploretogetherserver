import {Report} from "../models/models.js";
import { mailer } from '../nodemailer.js'

class ReportController {
	async create(req, res) {
		try {
			const {sender, offender, reportText, processed} = req.body
			const report = await Report.create({sender, offender, reportText, processed})
			console.log(req.body)
			res.json(report);
		} catch (e) {
			res.status(500).json(e)
		}

	}

	async update(req, res) {
		try {
			const report = req.body
			if (!report.id) {
				res.status(400).json({message:'Id не указан'})
			}
			const updatedReport = await Report.findByIdAndUpdate(report.id, report, {new: true})
			const message = {
				to: report.offenderData.email,
				subject: 'Explore Together уведомляет о жалобе на вас',
				text: `Здравствуйте, ${report.offenderData.name}! На вас была подана жалоба.
${report.notificationText}.
Просим в дальнейшем не распространять подобный контент, иначе Explore Together будет вынужден заблокировать ваш аккаунт.
С уважением, администрация Explore Together.`,
			}
			mailer(message)
			console.log(req.body)
			res.json(updatedReport);
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async getAll(req, res) {
		try {
			const reports = await Report.find();
			return res.json(reports)
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
			const report = await Report.findByIdAndDelete(id);
			return res.json(report)
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

export default new ReportController();
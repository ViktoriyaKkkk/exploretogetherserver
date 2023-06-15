import { Age, Role, User } from '../models/models.js'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { mailer } from '../nodemailer.js'

const generateToken = (id, role) => {
	const payload = {
		id,
		role,
	}
	return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class AuthController {
	async registration(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				console.log(errors)
				return res.status(400).json({ message: 'Ошибка регистрации', errors })
			}
			let role = 'USER'
			const { name, email, password, gender, socialNetwork, info } = req.body
			const candidate = await User.findOne({ email })
			if (candidate) {
				return res.status(400).json({ message: 'Пользователь с таким адресом email уже существует' })
			}
			bcrypt.hash(password, 7, async function(err, hash) {
				if (err) {
					return res.status(500).json({ message: 'Что-то пошло не так' })
				}
				if (email === 'admin@admin.com') {
					role = 'ADMIN'
				}
				const [roleData] = await Role.find({ name: role }).exec()
				const user = await User.create({ email, password: hash, role: roleData._id, name, gender, socialNetwork, info })
				const token = generateToken(user._id, user.role)
				return res.json(token)
			})
		} catch (e) {
			return res.status(500).json(e)
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ email }).exec()
			if (!user) {
				return res.status(400).json({ message: `Пользователь ${email} не найден` })
			}
			bcrypt.compare(password, user.password, function(err, result) {
				if (err || !result) {
					return res.status(400).json({ message: 'Неверный пароль' })
				}
				const token = generateToken(user._id, user.role)
				res.json(token)
			})
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async update(req, res) {
		try {
			const userData = req.body
			const user = await User.findOne({ email: userData.email }).exec()
			// console.log(id, name, email,role, password, newPassword, gender, socialNetwork, info)
			if (!userData.id) {
				res.status(400).json({ message: 'Id не указан' })
			}
			// if (userData.password) {
			// 	bcrypt.compare(userData.password, user.password, async function(err, result) {
			// 		if (err || !result) {
			// 			return res.status(400).json({ message: 'Неверный пароль' })
			// 		}
			// 		if (userData.newPassword) {
			// 			bcrypt.hash(userData.newPassword, 7, async function(err, hash) {
			// 				if (err) {
			// 					return res.status(500).json({ message: 'Что-то пошло не так' })
			// 				}
			// 				console.log('userData: ', userData)
			// 				const updatedUser = await User.findByIdAndUpdate(userData.id, {
			// 					id: userData.id || user._id,
			// 					name: userData.name || user.name,
			// 					email: userData.email || user.email,
			// 					role: userData.role || user.role,
			// 					password: hash,
			// 					gender: userData.gender || user.gender,
			// 					socialNetwork: userData.socialNetwork,
			// 					info: userData.info,
			// 				}, { new: true })
			// 				return res.json(updatedUser)
			// 			})
			// 		} else {
			// 			const updatedUser = await User.findByIdAndUpdate(userData.id, {
			// 				id: userData.id || user._id,
			// 				name: userData.name || user.name,
			// 				email: userData.email || user.email,
			// 				role: userData.role || user.role,
			// 				password: user.password,
			// 				gender: userData.gender || user.gender,
			// 				socialNetwork: userData.socialNetwork,
			// 				info: userData.info,
			// 			}, { new: true })
			// 			return res.json(updatedUser)
			// 		}
			// 	})
			// } else {
			// 	const updatedUser = await User.findByIdAndUpdate(userData.id, {
			// 		id: userData.id || user._id,
			// 		name: userData.name || user.name,
			// 		email: userData.email || user.email,
			// 		role: userData.role || user.role,
			// 		password: user.password,
			// 		gender: userData.gender || user.gender,
			// 		socialNetwork: userData.socialNetwork,
			// 		info: userData.info,
			// 	}, { new: true })
			// 	return res.json(updatedUser)
			// }
			if (!userData.password) {
				console.log('block1', userData.password, userData.newPassword)
				const updatedUser = await User.findByIdAndUpdate(userData.id, {
					id: userData.id || user._id,
					name: userData.name || user.name,
					email: userData.email || user.email,
					role: userData.role || user.role,
					password: user.password,
					gender: userData.gender || user.gender,
					socialNetwork: userData.socialNetwork,
					info: userData.info,
				}, { new: true })
				return res.json(updatedUser)
			} else {
				console.log('block2', userData.password, userData.newPassword)
				bcrypt.compare(userData.password, user.password, async function(err, result) {
					if (err || !result) {
						return res.status(400).json({ message: 'Неверный пароль' })
					} else {
						if (userData.newPassword) {
							bcrypt.hash(userData.newPassword, 7, async function(err, hash) {
								if (err) {
									return res.status(500).json({ message: 'Что-то пошло не так' })
								}
								console.log('userData: ', userData)
								const updatedUser = await User.findByIdAndUpdate(userData.id, {
									id: userData.id || user._id,
									name: userData.name || user.name,
									email: userData.email || user.email,
									role: userData.role || user.role,
									password: hash,
									gender: userData.gender || user.gender,
									socialNetwork: userData.socialNetwork,
									info: userData.info,
								}, { new: true })
								return res.json(updatedUser)
							})
						} else {
							console.log('block3', userData.password, userData.newPassword)
							const updatedUser = await User.findByIdAndUpdate(userData.id, {
								id: userData.id || user._id,
								name: userData.name || user.name,
								email: userData.email || user.email,
								role: userData.role || user.role,
								password: user.password,
								gender: userData.gender || user.gender,
								socialNetwork: userData.socialNetwork,
								info: userData.info,
							}, { new: true })
							return res.json(updatedUser)
						}

					}

				})
			}

		} catch (e) {
			res.status(500).json(e)
		}
	}

	async getAll(req, res) {
		try {
			const users = await User.find()
			res.json(users)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async getOne(req, res) {
		const { id } = req.params
		if (!id) {
			res.status(400).json({ message: 'Id не указан' })
		}
		const user = await User.findOne({ _id: id }).exec()
		return res.json(user)
	}

	async check(req, res) {
		try {
			const token = generateToken(req.user.id, req.user.role)
			res.json(token)
			console.log(token)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			if (!id) {
				res.status(400).json({ message: 'Id не указан' })
			}
			const user = await User.findByIdAndDelete(id)
			return res.json(user)
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

export default new AuthController()
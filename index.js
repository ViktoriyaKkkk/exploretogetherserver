import express from 'express'
import mongoose from 'mongoose'
import router from './routes/index.js'
import * as dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

dotenv.config()

const DB_URL = 'mongodb+srv://root:gemini2903@cluster0.5cjniay.mongodb.net/?retryWrites=true&w=majority'

const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(express.json())
app.use('/api', router)
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
})

io.on('connection', (socket) => {
	console.log('user connected:', socket.id)
	socket.on('leave_room', (data) => {
		socket.leave(data)
		console.log(`User ${socket.id} joined room ${data}`)
	})
	socket.on('join_room', (data) => {
		socket.join(data)
		console.log(`User ${socket.id} left room ${data}`)
	})
	socket.on('send_message', (data) => {
		console.log('receive send mes')
		socket.to(data.searchId).emit('receive_message', data)
	})
	socket.on('disconnect', () =>
		console.log('user disconnected: ', socket.id))
})

async function startApp() {
	try {
		await mongoose.connect(DB_URL)
		server.listen(5000, (err) => {
			if (err) {
				return console.log(err)
			}
			console.log('OK')
		})
	} catch (e) {
		console.log(e)
	}
}

startApp().then()

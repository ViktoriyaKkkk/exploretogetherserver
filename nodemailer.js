import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	host: 'smtp.mail.ru',
	port: 465 ,
	secure:true,
	auth: {
		user: 'oopshimyfirst@mail.ru',
		pass: 'KTRjkpZthuBuRy0qzexZ'
	}
},
	{
		from: 'Explore Together <oopshimyfirst@mail.ru>'
	}
)

export const mailer= message => {
	transporter.sendMail(message, (err,info)=>{
	if (err) return console.log(err)
		console.log('Email sent: ', info)
	})
}

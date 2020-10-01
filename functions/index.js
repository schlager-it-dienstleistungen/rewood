require('dotenv').config();

const functions = require('firebase-functions');
const admin = require("firebase-admin");
const nodemailer = require('nodemailer');

admin.initializeApp();

let transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.SENDER_EMAIL,
		pass: process.env.SENDER_PASSWORD
	}
});

exports.deleteUser = functions
	.region('europe-west3')
	.firestore
	.document('delUsers/{userId}')
	.onCreate(async (snap, context) => {
		const userId = context.params.userId;

		console.log('userId: ' + userId);
		console.log('snap: ' + JSON.stringify(snap));

		// Set Firebase Authentication User Inactive
    await admin.auth().updateUser(snap.get('authUid'), {
        disabled: true
		});

		// Set User Inactive
		const deleteUser = await admin.firestore().collection('users').doc(userId).get();
		console.log('deleteUser: ' + JSON.stringify(deleteUser));
		await admin.firestore().collection('users').doc(userId).update({
			active: false,
			tstDelete: snap.get('tstDelete'),
			userDelete: snap.get('userDelete')
		});


    // Delete the temp document
    return admin.firestore().collection('delUsers').doc(userId).delete();
});

exports.createUser = functions
	.region('europe-west3')
	.firestore
	.document('newUsers/{userId}')
	.onCreate(async (snap, context) => {
		const userId = context.params.userId;
		console.log('snap: ' + JSON.stringify(snap));
		console.log('userId: ' + userId);

		// Create Firebase Authentication User
    const newUser = await admin.auth().createUser({
        disabled: false,
        displayName: snap.get('username'),
        email: snap.get('email'),
        password: snap.get('password'),
        phone: snap.get('phoneNumber')
		});

		console.log('newUser: ' + JSON.stringify(newUser));

    // Create Firestore User with additional Fields
    await admin.firestore().collection('users').doc(userId).set({
				id: userId,
				authUid: newUser.uid,
				email: snap.get('email'),
				username: snap.get('username'),
				roles: snap.get('roles'),
				categoryNotifications: snap.get('categoryNotifications'),
				firstname: snap.get('firstname'),
				lastname: snap.get('lastname'),
				company: snap.get('company'),
				phone: snap.get('phone'),
				emailVerified: snap.get('emailVerified'),
				active: snap.get('active'),
				tstCreate: snap.get('tstCreate'),
				userCreate: snap.get('userCreate')
		});

		// Send Reset Password Mail
		await sendResetPasswordMail(snap);

    // Delete the temp document
    return admin.firestore().collection('newUsers').doc(userId).delete();
});

var sendResetPasswordMail = function (snap){
	console.log('generatePasswordLink - snap: ' + JSON.stringify(snap));

	admin.auth().generatePasswordResetLink(snap.get('email')).then(resetLink => {
		console.log('resetLink: ' + resetLink);

		const mailOptions = {
			from: `rewood <noreply@rewood.at`,
			to: snap.get('email'),
			subject: 'REWOOD - reset password',
			text: 'Hello,\n\nFollow this link to reset your rewood password for your ' + snap.get('email') + ' account.\n\n' + resetLink + '\n\nIf you didn’t ask to reset your password, you can ignore this email.\n\nThanks,\n\nYour rewood team'
		};

		return transporter.sendMail(mailOptions, (error, data) => {
				if (error) {
						console.error('Error in SendMail: ' + error);
				}
				console.log("Sent, with data: " + JSON.stringify(data));
		});
	}).catch(error => {
		console.error('Error in generatePasswordResetLink: ' + error);
		return;
	});
};

exports.sendEmail = functions
		.region('europe-west3')
		.firestore
    .document('products/{docId}')
    .onCreate((snap, context) => {
			console.log('snap.data(): ' + snap.data());

        const mailOptions = {
            from: `robert.schlager@gmail.com`,
						to: 'dagobert.profanter@gmail.com, roman.zoechling@icloud.com',
						cc: 'robert.schlager@gmail.com',
						subject: 'rewood - neues Produkt angelegt',
						text: 'Neues Produkt angelegt, ' + snap.data().title + 'Preis: ' + snap.data().price + '\nKategorie: ' + snap.data().category,
            html: `<h1>Neues Produkt angelegt, ${snap.data().title}</h1>
                                <p>
																	 <b>${snap.data().title}, Preis: ${snap.data().price}</b></br>
																	 <b>Kategorie:</b> ${snap.data().category}, <b>Unterkategorie:</b> ${snap.data().subcategory}</br>
																	 <b>Beschreibung: </b> ${snap.data().description}
                                </p>`
        };


        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent, with data: " + data);
        });
    });


/*let mailOptions = {
	from: 'robert.schlager@gmail.com',
	to: 'schlager.robert@gmx.at',
	subject: 'Test',
	text: 'it works'
}

transporter.sendMail(mailOptions, function(err, data) {
	if(err){
		console.log('Error: ' + err);
	}else{
		console.log('EMail sent: ' + data);
	}
});*/

/*const functions = require('firebase-functions');
const admin=require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp()
require('dotenv').config()

const {SENDER_EMAIL, SENDER_PASSWORD} = process.env;

exports.sendEmailNotification=functions.firestore.document('products/{docId}')
.onCreate((snap,ctx)=>{
	const data=snap.data();

	console.log('data: ' + data);

	let authData=nodemailer.createTransport({
		service: 'gmail',
		host:'smtp.gmail.com',
		port:465,
		secure:true,
		auth:{
			user: SENDER_EMAIL,
			pass: SENDER_PASSWORD
		}
	});

	authData.sendMail({
		from: 'robert.schlager@gmail.com',
		to: 'schlager.robert@gmx.at',
		subject: 'Test with nodemailer',
		text: 'message',
		html: 'message'
	})
	.then(res=>console.log('successfully sent that mail'))
	.catch(err=>console.log(err));
})*/

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

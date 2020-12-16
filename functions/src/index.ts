import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.triggerContactMail = functions
    .firestore
    .document('/contacts/{documentId}')
    .onCreate(async (snap, context) => {
      // Grab the current value of what was written to Cloud Firestore.
      const {comment, email, name} = snap.data();

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log('Preparing mail trigger...',
          context.params.documentId, email);

      // You must return a Promise when performing asynchronous tasks
      // inside a Functions such as writing to Cloud Firestore.
      // Setting an 'uppercase' field in Cloud Firestore document
      // returns a Promise.
      return await admin
          .firestore()
          .collection('mail')
          .add({
            to: 'Luis <reallyluis@gmail.com>',
            replyTo: `${name} <${email}>`,
            message: {
              subject: 'Reallyluis.com - Contact Message',
              text: comment,
              html: `<p>${comment}</p>`,
            },
          })
          .then(() => functions.logger.log('Queued email for delivery!',
              context.params.documentId, email));
    });

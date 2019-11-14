const accountSid = process.env.TWILIO_ID; // Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH; // Auth Token from www.twilio.com/console

const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

module.exports = {
  alertMessage
};

function alertMessage(to, body) {
  client.messages
    .create({
      body: body,
      to: `+1${to}`,
      from: "+16195360824"
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));
}

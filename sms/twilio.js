const accountSid = process.env.TWILIO_ID; // Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH; // Auth Token from www.twilio.com/console

const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

module.exports = {
  alertMessage
};

function alertMessage(phone, address, radius) {
  client.messages
    .create({
      body: `There are active wildfires within ${radius} miles of ${address}`,
      to: `+1${phone}`, // +1(123)456-1234
      from: "+15182415071"
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));
}

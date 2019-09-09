const accountSid = "AC6ee31540c8d5c46bbf2978260f88d56d"; // Account SID from www.twilio.com/console
const authToken = "3ebffba67a2d23484378e87ac3f819cb"; // Auth Token from www.twilio.com/console

const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

module.exports = {
  messageMe
};

function messageMe() {
  client.messages
    .create({
      body: "Hello from Node",
      to: "+15628330376", // Text this number
      from: "+14243961692" // From a valid Twilio number
    })
    .then(message => console.log(message.sid));
}

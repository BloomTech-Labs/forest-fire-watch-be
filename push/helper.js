const webpush = require("web-push");
const apn = require("apn");

const privateVapid = process.env.VAPID_PRIVATE;
const publicVapid = process.env.VAPID_PUBLIC;
const Notifications = require("../models/push-notifications/notifications-model.js");

webpush.setVapidDetails(
    "mailto:contact.firewatch@gmail.com",
    publicVapid,
    privateVapid
);

/**
 * push to a service
 * @param {string}   id id of user
 * @param {object} configs title: main title to display, body: body to display
 */
const push = async (id, configs) => {
    //get subs
    let subscriptions = await Notifications.findBy({
        user_id: id
    });

    console.log(subscriptions);

    //for making sure we don't send repeats
    let ios = false,
        web = false;
    subscriptions.forEach(async subscription => {
        //get last subscription
        subscription = subscriptions.pop();
        //parse depending on type
        let subData;
        if (subscription.type == "web")
            subData = JSON.parse(subscription.subscription);
        else
            subData = subscription.subscription;

        //if web and first sent to web
        if (subscription.type == "web" && !web) {
            try {
                //stringify the configs and send
                const payload = JSON.stringify(configs);

                webpush.sendNotification(subData, payload).catch(err => {
                    console.error("error", err);
                });
                web = true;
            } catch (err) {
                console.error("Error processing Push: ", err.message);
            }
        } else if (!ios) {
            try {
                // set ios options for security
                const options = {
                    token: {
                        key: Buffer.from(process.env.IOS_KEY),
                        keyId: process.env.IOS_KEY_ID,
                        teamId: process.env.IOS_TEAM
                    },
                    production: true
                };
                //create provider and message
                const provider = new apn.Provider(options);
                let notification = await new apn.Notification();
                notification.expiry = Math.floor(Date.now() / 1000) + 3600; //1 hour
                notification.title = configs.title;
                notification.body = configs.body;
                notification.topic = process.env.IOS_BUNDLE_ID;
                notification.pushType = "alert";
                notification.sound = "ping.aiff";
                notification.badge = 1;

                //send to apple
                const res = await provider.send(notification, subData.trim());
                //returns arrays filled with response codes, if failure we log it.
                if (res.failed.length > 0) {
                    res.failed.forEach(element => {
                        console.error("failed object:", element.response);
                    });
                } else {
                    ios = true;
                }
                //close connection
                provider.shutdown();
            } catch (err) {
                console.error("Error", err);
            }
        }
        // provider.shutdown();
    });
};

module.exports = push;
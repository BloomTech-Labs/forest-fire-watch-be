const webpush = require('web-push')
const iospush = require('apn')

const privateVapid=process.env.VAPID_PRIVATE;
const publicVapid=process.env.VAPID_PUBLIC;
const Notifications = require('../models/push-notifications/notifications-model.js')

webpush.setVapidDetails('mailto:fireflightapp@gmail.com',publicVapid,privateVapid);

/**
 * push to a service
 * @param {string}   id id of user
 * @param {object} configs title: main title to display, body: body to display
 */
const push=async (id,configs)=>{
    let subscription = await Notifications.findBy({user_id:id})
    subscription=subscription.pop()
    let subData
    if(subscription.type=='web')
        subData=JSON.parse(subscription.subscription)
    else
        subData=subscription.subscription
    
    if('endpoint' in subData){
        try {
            console.log('here');
            const payload=JSON.stringify(configs);
        
            webpush.sendNotification(subData,payload)
                .catch(err=>{
                    console.error(err.stack);
                })
        } catch (err) {
            console.error("Error processing Push: ",err.message);
        }
    }else{
        console.err('Great Mighty Hero: ', subData);
        try{
            const options = {
                token:{
                    key:process.env.IOS_KEY,
                    keyId:process.env.IOS_KEY_ID,
                    teamID:process.env.IOS_TEAM
                },
                production:true
            }

            const provider=new iospush.Provider(token)

            let notification = new iospush.Notification({
                alert:{
                    body:configs.body,
                    title:configs.title
                },
                expiry: Math.floor(Date.now()/1000)+3600, //1 hour
                topic: process.env.IOS_BUNDLE_ID,
                pushType:'alert'
            })
            const res = await provider.send(notification,subData)

            provider.shutdown()
        }catch(err){
            console.error(err)
        }

    }
} 

module.exports=push;
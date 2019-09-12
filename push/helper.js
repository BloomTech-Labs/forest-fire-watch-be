const webpush = require('web-push')
const iospush = require('apn')

const privateVapid=process.env.VAPID_PRIVATE;
const publicVapid=process.env.VAPID_PUBLIC;

webpush.setVapidDetails('mailto:fireflightapp@gmail.com',publicVapid,privateVapid);

/**
 * push to a service
 * @param {string} subData You will put whatever is in the subscription field here. for web, this will be an object. For ios, a string
 * @param {object} configs title: main title to display, body: body to display
 */
const push=async (subData,configs)=>{
    if('endpoint' in subData){
        try {
            const payload=JSON.stringify(configs);
        
            webpush.sendNotification(subData,payload)
                .catch(err=>{
                    console.error(err.stack);
                })
        } catch (err) {
            console.error("Error processing Push: ",err.message);
        }
    }else{
        const options = {
            token:{
                key:process.env.IOS_KEY,
                keyId:process.env.IOS_KEY_ID,
                teamID:process.env.IOS_TEAM
            },
            production:false
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
        try{
            const res = await provider.send(notification,subData)

            provider.shutdown()
        }catch(err){
            console.error(err)
        }

    }
} 

module.exports=push;
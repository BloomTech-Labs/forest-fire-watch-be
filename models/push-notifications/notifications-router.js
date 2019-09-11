const router = require('express').Router();
const webpush = require('web-push');
const Notifications=require('./notifications-model.js');
const restricted = require('../../auth/restricted-middleware.js');


const privateVapid=process.env.VAPID_PRIVATE;
const publicVapid=process.env.VAPID_PUBLIC;

webpush.setVapidDetails('mailto:fireflightapp@gmail.com',publicVapid,privateVapid);

router.post('/register',restricted,async (req,res)=>{
    const subscription=req.body
    let userSub = Notifications.add({...subscription,user_id:req.jwt.user_id})
    
    try {
        if(userSub)
            res.status(201).json({});
        else
            res.status(400).json({message:'information not saved'})
        const payload=JSON.stringify({title:'Your information has been Saved'});
    
    
        webpush.sendNotification(subscription,payload)
            .catch(err=>{
                console.error(err.stack);
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"Server error while saving"
        })
    }
})

module.exports = router
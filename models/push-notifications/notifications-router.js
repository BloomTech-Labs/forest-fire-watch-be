const router = require('express').Router();
const Notifications=require('./notifications-model.js');
const restricted = require('../../auth/restricted-middleware.js');
const pusher = require('../../push/helper.js')

router.post('/register',restricted,async (req,res)=>{
    const subscription=req.body
    let sub = JSON.stringify(subscription)
    let userSub = await Notifications.add({subscription:sub, type:'web',user_id:req.jwt.user_id})
    
    try {
        if(userSub)
            res.status(201).json({});
        else
            res.status(400).json({message:'information not saved'})

        console.log('user subscription recorded', req.jwt.user_id);
        await pusher(req.jwt.user_id,{
            title:"Saved",
            body:'Your subscription has been saved. You will now recieve Fire Data based on your location when it is an emergency'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"Server error while saving"
        })
    }
})

router.post('/saveios',restricted,async (req,res)=>{
    const subscription = req.body
    if(!'deviceId' in subscription){
        res.status(400).json({message:'deviceId not included'})
    }
    try {
        let sub=subscription.deviceId
        console.log('sub: ',sub)
        let userSub=Notifications.add({subscription:sub,type:'ios',user_id:req.jwt.user_id})
        
        if(userSub)
            res.status(201).json({})
        else
            res.status(400).json({message:'information not saved properly'})
        pusher(sub,{
            title:'Saved',
            body:'You will now recieve Fire Data based on your location when it is an emergency'
        })
    } catch (err) {
        console.error('error :', err.message);
    }

})

module.exports = router
const express = require('express');
const app=express();
const router = require('express').Router();
const webpush = require('web-push');
const notifications=require('./notifications-model.js');
const restricted = require('../../auth/restricted-middleware.js');


const privateVapid=process.env.VAPID_PRIVATE;
const publicVapid=process.env.VAPID_PUBLIC;

webpush.setVapidDetails('mailto:fireflightapp@gmail.com',publicVapid,privateVapid);

router.post('/register',restricted,async (req,res)=>{
    const subscription=req.body
    res.status(201).json({});

    const payload=JSON.stringify({title:'Saved'});



    webpush.sendNotification(subscription,payload)
        .catch(err=>{
            console.error(err.stack);
        })
})
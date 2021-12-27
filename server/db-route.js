const express= require('express')

const dbRoutes= require('./db-controller.js')

const router= express.Router()

router.get('/all',dbRoutes.refreeList)

module.exports= router
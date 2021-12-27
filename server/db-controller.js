
const DB= require('./db2.js')

exports.refreeList = async (req,res) =>{
    DB.select('*').from('Refree').then(data=>{
        res.json(data)
    })
}
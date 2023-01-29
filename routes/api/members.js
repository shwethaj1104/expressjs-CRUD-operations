const express = require('express')
const router = express.Router()

const members = require('../../members');

//get list of members
router.get('/', (req, res) => res.json(members))

//get single member
router.get('/:id', (req, res) =>{
    const memberFound = members.some(val=>val.id===parseInt(req.params.id))
    if(memberFound){
        res.json(members.filter(val => val.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg:`Member with id : ${req.params.id} is not found`})
    }
}
)

module.exports=router;
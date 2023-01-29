const express = require('express')
const router = express.Router()
const uuid = require('uuid')

const members = require('../../members');

//get list of members
router.get('/', (req, res) => res.json(members))

//get single member
router.get('/:id', (req, res) => {
    const memberFound = members.some(val => val.id === parseInt(req.params.id))
    if (memberFound) {
        res.json(members.filter(val => val.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `Member with id : ${req.params.id} is not found` })
    }
}
)

//create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
        res.status(400).json({ msg: 'Please include name and email' })
    }
    members.push(newMember)
    res.json(members)
})

//update member
router.put('/:id', (req, res) => {
    const memberFound = members.some(member => member.id === parseInt(req.params.id))
    if (memberFound) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name
                member.email = updateMember.email ? updateMember.email : member.email
                member.status=updateMember.status ? updateMember.status : member.status
                res.json({ msg: "member updated", member })
            }
        });
        //to get all members after updating
        // res.json(members)
    } else {
        res.status(400).json({ msg: `Member with id : ${req.params.id} is not found` })
    }
}
)
//delete member
router.delete('/:id', (req, res) => {
    const memberFound = members.some(val => val.id === parseInt(req.params.id))
    if (memberFound) {
        res.json({msg:"member deleted",members:members.filter(val => val.id !== parseInt(req.params.id))})
    } else {
        res.status(400).json({ msg: `Member with id : ${req.params.id} is not found` })
    }
})


module.exports = router;
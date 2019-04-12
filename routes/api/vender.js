const Vender = require('../../db').Vender
const route = require('express').Router();

route.get('/', (req, res) => {
    // Get all venders
    Vender.findAll()
        .then((venders) => {
            res.status(200).send(venders)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })
})

route.post('/', (req, res) => {
    
    // Add a new vender    
    Vender.findAll({
        where: { Vender_Name: req.body.vender_name}
    }).then(venders =>{
        if(venders.length == 0){
            Vender.create({
                Vender_Name: req.body.vender_name
            }).then((venders) => {
                res.status(201).send({message: "vender added"})
            }).catch((error) => {
                res.status(501).send({
                    error: "Error adding vender"
                })
            })
        }
        else{
            res.status(201).send({message: "vender already exist"})
        }
    }).catch((error) => {
        res.status(501).send({
            error: "Error adding vender"
        })
    })
    
})

route.delete('/', (req, res) => {       
    Vender.destroy({ where: {
        Vender_Name: req.body.vender_name}
    }).then(() => {
        res.status(201).send({message:"deleted"})
    }).catch((error) => {
        res.status(501).send({
            error: "Error deleting vender"
        })
    })
})

exports = module.exports = route
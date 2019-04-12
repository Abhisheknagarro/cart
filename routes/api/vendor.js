const Vendor = require('../../db').Vendor
const route = require('express').Router();

route.get('/', (req, res) => {
    // Get all vendors
    Vendor.findAll()
        .then((vendors) => {
            res.status(200).send(vendors)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })
})

route.post('/', (req, res) => {
    
    // Add a new vendor    
    Vendor.findAll({
        where: { Vendor_Name: req.body.vendor_name}
    }).then(vendors =>{
        if(vendors.length == 0){
            Vendor.create({
                Vendor_Name: req.body.vendor_name
            }).then((vendors) => {
                res.status(201).send({message: "vendor added"})
            }).catch((error) => {
                res.status(501).send({
                    error: "Error adding vendor"
                })
            })
        }
        else{
            res.status(201).send({message: "vendor already exist"})
        }
    }).catch((error) => {
        res.status(501).send({
            error: "Error adding vendor"
        })
    })
    
})

route.delete('/', (req, res) => {       
    Vendor.destroy({ where: {
        Vendor_Name: req.body.vendor_name}
    }).then(() => {
        res.status(201).send({message:"deleted"})
    }).catch((error) => {
        res.status(501).send({
            error: "Error deleting vendor"
        })
    })
})

exports = module.exports = route
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllitems = async (req, res) => {
     //#swagger.tags =['Items']
     try{
        const items = await mongodb.getDatabase().db().collection('items').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items);  
     } catch(err) {
        res.status(400).json({ message: err.message});
            }
     };

const getItemById = async (req,res)=>{
    //#swagger.tags =['Items']
    const itemId = req.params.id;
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({message:'Must use a valid item id to find an item.'});
      }
   try{
    const item = await mongodb.getDatabase().db().collection('items').findOne({ _id: new ObjectId(itemId)});
        if (!item){
            res.status(400).json({ message: 'Item not found.'});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(item);
    } catch (err){
        res.status(500).json({message: 'Error retrieving item.', error: err.message }); 
    }     
   };

const createItem = async(req, res) => {
    //#swagger.tags =['Items']
    const item = {
        itemName: req.body.itemName,
        size: req.body.size,
        location: req.body.location,
        price: req.body.price,
        discount: req.body.discount
    };
    const response = await mongodb.getDatabase().db().collection('items').insertOne(item);
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating this item.');
    }

};

const updateItem = async(req, res) => {
    //#swagger.tags =['Items']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid item id to update an item.');
      }
    const itemId = new ObjectId(req.params.id);
    const item = {
        itemName: req.body.itemName,
        size: req.body.size,
        location: req.body.location,
        price: req.body.price,
        discount: req.body.discount
    };
    const response = await mongodb.getDatabase().db().collection('items').replaceOne( {_id: itemId},item);
    console.log(response);
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating this item.');
    }

};

const deleteItem = async (req, res) => {
    //#swagger.tags =['Items']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid item id to delete an item.');
      }
    const itemId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('items').deleteOne({_id: itemId})
     console.log(response);
    if (response.deletedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while deleting the item.');
    }

};

module.exports = {getAllitems, getItemById, createItem, updateItem, deleteItem};
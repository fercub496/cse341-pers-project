const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
     //#swagger.tags =['Users']
     try {
        const users = await mongodb.getDatabase().db().collection('users').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    };

const getSingle = async (req,res)=>{
    //#swagger.tags =['Users']
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
        res.status(400).json({message: 'Must use a valid user id to find a user.'});
      }
    try{
        const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: new ObjectId(userId)});
        
        if(!user){
            res.status(400).json({message: 'User not found.'});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch (err){
        res.status(500).json({message: 'Error retrieving user.', error: err.message});
    }    
   };

const createUser = async(req, res) => {
    //#swagger.tags =['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        districtAddress: req.body.districtAddress,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating this user.');
    }

};

const updateUser = async(req, res) => {
    //#swagger.tags =['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to update a user.');
      }
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        districtAddress: req.body.districtAddress,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne( {_id: userId},user);
    console.log(response);
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating this user.');
    }

};

const deleteUser = async (req, res) => {
    //#swagger.tags =['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to delete a user.');
      }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId})
    console.log(response);
    if (response.deletedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }

};

module.exports = {getAll, getSingle, createUser, updateUser, deleteUser};
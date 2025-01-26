const express = require('express');

const router = express.Router();

const itemController = require ('../controllers/item');

router.get('/',itemController.getAllitems);

router.get('/:id', itemController.getItemById);

router.post('/',itemController.createItem);

router.put('/:id', itemController.updateItem);

router.delete('/:id', itemController.deleteItem);

module.exports = router;
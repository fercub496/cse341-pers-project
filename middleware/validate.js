const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    districtAddress: 'string',
    birthday: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveItem = (req, res, next) => {
    const validationRule = {
      itemName: 'required|string',
      size: 'required|string',
      location: 'required|string',
      price: 'required|string',
      discount: 'string'

    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  

module.exports = {
  saveUser, saveItem
};
const {
  createUser,
  // getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,
} = require('../controllers/crud.controllers');

const crudRoutes = require('express').Router();

crudRoutes.post('/', createUser);
// crudRoutes.get('/', getAllUsers);
crudRoutes.get('/:id', getSingleUser);
crudRoutes.put('/:id', updateUser);
crudRoutes.delete('/:id', deleteUser);

module.exports = crudRoutes;

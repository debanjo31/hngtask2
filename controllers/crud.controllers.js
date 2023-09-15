const expressAsyncHandler = require('express-async-handler');
const TaskTwoModel = require('../model/dynamicModel.js');
const { nameSchema } = require('../utils/joi.schema.js');

// /**
//  * API to create user
//  * @author Adebanjo Israel
//  * @param {Request} req - The request as determined by express..
//  * @param {Response} response - The response as determined by express
//  */
const createUser = expressAsyncHandler(async (req, res) => {
  try {
    const { name } = req?.body;

    const { error } = nameSchema.validate(name);

    if (error) {
      return res.status(400).json({ error: 'Only String is accepted' });
    }

    const userExist = await TaskTwoModel.findOne({ name });
    if (userExist) {
      return res.status(400).json({ message: 'User already exist' });
    }

    // CREATE NEW USER
    const newUser = await TaskTwoModel.create({
      name,
    });

    return res
      .status(200)
      .json({ message: `${name} Created Successfully`, newUser });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});


const getSingleUser = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req?.params?.id;
    const findUser = await TaskTwoModel.findById(userId);

    if (!findUser) {
      return res.status(404).json({ message: `Usert Does Not Exist` });
    }

    res
      .status(200)
      .json({ message: `User Fetched Successfully`, user: findUser });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req?.params?.id;
    const { name } = req?.body;

    const { error } = nameSchema.validate(name);

    if (error) {
      return res.status(400).json({ error: 'Only String is accepted' });
    }
    const findUserToUpdate = await TaskTwoModel.findById(userId);

    if (!findUserToUpdate) {
      return res.status(404).json({ message: `Usert Does Not Exist` });
    }

    findUserToUpdate.name = name;
    findUserToUpdate.save();

    res.status(200).json({
      message: `User Updated Successfully`,
      updatedUser: findUserToUpdate,
    });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req?.params?.id;
    const findUserToDelete = await TaskTwoModel.findById(userId);

    if (!findUserToDelete) {
      return res.status(404).json({ message: `User Not Found` });
    }

    findUserToDelete.deleteOne();
    res.status(200).json({ message: `User  Deleted Successfully` });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

module.exports = {
  createUser,
  // getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,
};

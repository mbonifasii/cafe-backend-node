'use strict';

const Role = require('./../models/role.model');
const User = require('./../models/user.model')

const isAValidRole = async (role = '') => {
    const roleExists = await Role.findOne({role});
    console.log(roleExists);
    if(!roleExists){
        throw new Error(`Role does not exist on database`);
    }
}

const emailExists = async (email = '') => {
    const emailE = await User.findOne({email});
    console.log(emailE);
    if(emailE){
        throw new Error('Email already exists');
    }
}

const userByIdExists = async (id = '') => {
    const userExists = await User.findById(id);
    if(!userExists){
        throw new Error('User does not exist');
    }
}

module.exports = {
    isAValidRole,
    emailExists,
    userByIdExists
}
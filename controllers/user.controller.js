'use strict';

const { request, response } = require("express");
const User = require("./../models/user.model")
const bcryptJS = require('bcryptjs');

const usersGet =  async (req = request, res = response) => {

    let {limit = 2, from = 0} = req.query;
    let query = {status: true};

    let [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({total, users});
}

const usersPut = async (req, res) => {
    let { userId } = req.params;
    let { _id, password, google, email, ...rest } = req.body;

    if(password){
        // Encrypt password
        const salt = bcryptJS.genSaltSync();
        rest.password = bcryptJS.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, rest);

    res.json({user});
}

const usersPost = async (req, res) => {
    let { name, email, password, role } = req.body;
    let user = new User({name, email, password, role});

    // Encrypt password
    const salt = bcryptJS.genSaltSync();
    user.password = bcryptJS.hashSync(password, salt);

    //Save on DB
    await user.save();
    res.json({message: 'POST Request', user});
}

const usersDelete = async (req, res) => {
    let { id } = req.params;

    // Physically
    // let user = await User.findByIdAndDelete(id);

    let user = await User.findByIdAndUpdate(id, {status: false});

    res.json(user);
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}
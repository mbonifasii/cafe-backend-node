'use strict';

const Role = require('./../models/role.model');
const {usersDelete, usersGet, usersPost, usersPut } =  require("./../controllers/user.controller");

const { Router } = require('express');
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate.fields");
const { isAValidRole, emailExists, userByIdExists } = require('../helpers/db.validators');
const router = Router();

router.get('/', usersGet);
router.put('/:userId', [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( userByIdExists ),
    validateFields
],usersPut);
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and more than 6 letters').isLength({min: 6}),
    check('email', 'Email invalid').isEmail(),
    check('email').custom( emailExists ),
    // check('role', 'This is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isAValidRole ),
    validateFields
],usersPost);
router.delete('/:id', [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( userByIdExists ),
    validateFields
],usersDelete);

module.exports = router;
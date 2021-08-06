'use strict';

const express = require('express');
const cors = require('cors');
const userRoutes = require('./../routes/user.routes.js');
const { dbConnection } = require('../database/config.js');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        // Database connecction
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Routes   
        this.routes();
    }

    async dbConnection(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Read and parse - body
        this.app.use( express.json() );

        // Public folder
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.userPath, userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running at port ${ this.port }`);
        });
    }
}

module.exports = Server;
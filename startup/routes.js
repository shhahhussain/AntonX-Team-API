const express = require("express");
const AntonRoute = require('../routes/antonTeamMember');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/anton', AntonRoute);
};
const express = require ('express');
const homeController = require('../controller/homeController');
const router = express.Router();

const initApiRoutes = (app) => {
    router.get("/test", homeController.handleWebTestApi);

    return app.use("/api/v1/", router);
};

module.exports = initApiRoutes;
const express = require('express')
const mapsRouter = express.Router()
const authMiddleware = require("../middlewares/auth.middleware.js")
const mapController = require("../controllers/map.controller")
const { query } = require('express-validator');



mapsRouter.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates
)

mapsRouter.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistance
)

mapsRouter.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

module.exports = mapsRouter;
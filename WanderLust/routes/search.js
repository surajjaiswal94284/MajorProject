const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const searchController = require('../controllers/search.js');


router.get("/search",wrapAsync(searchController.search));

module.exports=router;
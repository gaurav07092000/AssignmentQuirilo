const express = require('express');
const router = express.Router();
const siteController = require('../Controllers/siteController');

router.post('/add-site', siteController.addSite);
router.put('/approve/:id', siteController.approveSite);
router.put('/reject/:id', siteController.rejectSite);
router.post('/add-zone/:siteId', siteController.addZone);
router.get('/all-sites', siteController.getAllSites);
router.get('/approved-sites', siteController.getApprovedSites);

module.exports = router;

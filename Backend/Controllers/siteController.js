const Site = require('../Models/Site');
const mongoose = require('mongoose');

exports.addSite = async (req, res) => {
    const { name, url, category } = req.body;
    try {
        const site = new Site({ name, url, category });
        await site.save();
        res.status(201).send(site);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to add site' });
    }
};

exports.approveSite = async (req, res) => {
    const { id } = req.params;
    try {
        const site = await Site.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
        if (!site) {
            return res.status(404).send('Site not found');
        }
        res.status(200).send(site);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to approve site' });
    }
};

exports.rejectSite = async (req, res) => {
    const { id } = req.params;
    try {
        const site = await Site.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
        if (!site) {
            return res.status(404).send('Site not found');
        }
        res.status(200).send(site);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to reject site' });
    }
};

exports.addZone = async (req, res) => {
    const { siteId } = req.params;
    const { type, CPC } = req.body;

    try {
        const site = await Site.findById(siteId);
        if (!site) {
            return res.status(404).send('Site not found');
        }

        const zoneId = new mongoose.Types.ObjectId();
        const trackingCode = `${site.url}?siteId=${siteId}&zoneId=${zoneId}`;
        const newZone = { _id: zoneId, type, CPC, trackingCode };
        site.zones.push(newZone);

        await site.save();

        res.status(201).send(newZone);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add zone');
    }
};

exports.getAllSites = async (req, res) => {
    try {
        const sites = await Site.find();
        res.status(200).send(sites);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to fetch sites' });
    }
};

exports.getApprovedSites = async (req, res) => {
    try {
        const approvedSites = await Site.find({ status: 'Approved' });
        res.status(200).send(approvedSites);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch approved sites');
    }
};

const Device = require('../models/Device');

exports.addDevice = async (req, res) => {

    const {user_id, device_plan, expiry, phone_no} = req.body;

    // Check if all required fields are provided
    if (!user_id || !device_plan || !phone_no || !expiry ) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const addNewDevice = new Device({user_id, device_plan, expiry, phone_no});
    try {
        await addNewDevice.save();
        res.status(201).json({ message: "New Device Added created successfully" });
    } catch (error) {
        res.status(401).json({ message: 'Device Add Failed', error });
    }
};

exports.getAllDeviceInfo = async (req, res) => {
    try {
        const deviceInfo = await Device.find();
        res.json(deviceInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching Device data' });
    }
};

exports.getDeviceById = async (req, res) => {
    const deviceId = req.params.deviceId;

    try {
        const device = await Device.findById(deviceId);
        if (!device) {
            return res.status(404).json({ error: 'Device not found' });
        }   

        res.json({ device });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching device' });
    }
};

// Update Device Info
exports.updateDevice = async (req, res) => {
    const deviceId= req.params.deviceId;
    const {user_id, device_plan, expiry, phone_no} = req.body;

    try {
        const device = await Device.findById(deviceId);
        if (!device) {
            return res.status(404).json({ error: 'Device not found' });
        }

        device.user_id = user_id || device.user_id
        device.expiry = expiry || device.expiry
        device.phone_no = phone_no || device.phone_no
        device.device_plan =  device_plan || device.device_plan

        await device.save();

        res.json({ message: 'Device updated successfully', device });
    } catch (error) {
        res.status(500).json({ error: 'Error updating device' });
    }
};

// Delete Device Info
exports.deleteDevice = async (req, res) => {
    const deviceId = req.params.deviceId;

    try {
        const result = await Device.findByIdAndDelete(deviceId);
        if (!result) {
            return res.status(404).json({ error: 'Device not found' });
        }

        res.json({ message: 'Device deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting device' });
    }
};

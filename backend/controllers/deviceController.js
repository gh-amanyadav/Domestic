const Device = require('../models/Device');

exports.addDevice = async (req, res) => {
    const { data } = req.query;

    // Check if 'data' query parameter is provided
    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [user_id, device_plan, expiry, phone_no] = data.split(',');

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
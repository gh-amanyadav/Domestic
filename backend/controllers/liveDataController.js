const LiveData = require('../models/LiveData');

exports.uploadLiveData = async (req, res) => {
    const { data } = req.query;

    // Check if 'data' query parameter is provided
    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [device_id, user_id, liters_remaining, cost, current_plan, total_liters, status] = data.split(',');

    // Check if all required fields are provided
    if (!device_id || !user_id || !liters_remaining || !cost || !current_plan || !total_liters || !status) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const newLiveData = new LiveData({
        device_id,
        user_id,
        liters_remaining,
        cost,
        current_plan,
        total_liters,
        status
    });

    try {
        await newLiveData.save();
        res.status(201).json({ message: "Live Data uploaded successfully" });
    } catch (error) {
        res.status(401).json({ message: 'Live Data upload failed', error });
    }
};

exports.getAllLivedata = async (req, res) => {
    try {
        const liveData = await LiveData.find();
        res.json(liveData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Live Data' });
    }
};
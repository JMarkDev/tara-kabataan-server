const archiveModel = require('../models/archivesModel');

const updateEventStatus = async (req, res) => {
    const { id } = req.params;
    const { event_id, event_title, images, status } = req.body;

    try {
        const updatedArchive = await archiveModel.update({
            event_id,
            event_title,
            images,
            status
        }, {
            where: {
                id
            }
        });

        const updateEvent = await eventModel.update({
            status: status
        }, {
            where: {
                id: event_id
            }
        });
        updateEvent.status(200).json({ message: "Event status updated successfully" });

        res.json(updatedArchive);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    updateEventStatus
}
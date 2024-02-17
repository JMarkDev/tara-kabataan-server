const archiveModel = require('../models/archivesModel');
const eventModel = require('../models/eventModel');
const date = require('date-and-time');
const fs = require('fs');

const getAllArchives = async (req, res) => {
    try {
        const archives = await archiveModel.findAll();
        return res.status(200).json(archives);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getArchiveById = async (req, res) => {
    const { id } = req.params;
    try {
        const archive = await archiveModel.findOne({ where: { event_id: id } });

        return res.status(200).json(archive);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updateEventStatus = async (req, res) => {
    const { id } = req.params;
    const { event_name } = req.body

    try {
        const created_at = new Date()
        const formattedDate = date.format(created_at, 'YYYY/MM/DD HH:mm:ss');

        const imageFileNames = [];

        await Promise.all(
           req.files.map(async (file) => {
             const fileType = file.mimetype.split('/')[1];
             const newFileName = `${file.filename}.${fileType}`;
     
             try {
               await fs.promises.rename(`./uploads/${file.filename}`, `./uploads/${newFileName}`);
               console.log('Uploaded Success');
               imageFileNames.push(newFileName);
             } catch (err) {
               console.error('Error renaming/uploading file:', err);
             }
           })
         );

        const createArchive = await archiveModel.create({
            event_id: id,
            event_name: event_name,
            images: imageFileNames.join(','),
            created_at: formattedDate
        });

        const updateEvent = await eventModel.update({
            status: 'Completed'
        }, {
            where: {
                id: id
            }
        });

        return res.status(200).json({ 
            status: 'success',
            message: "Event Completed Successfully!",
            createArchive, 
            updateEvent
        });

        // return res.json(updatedArchive);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllArchives,
    getArchiveById,
    updateEventStatus
}
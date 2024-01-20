const eventModel = require('../models/eventModel');
const fs = require('fs');
const date = require('date-and-time');
const sequelize = require('../configs/database');
const { Op } = require("sequelize");

const addEvents = async (req, res) => {
    const { title, 
            description, 
            image, 
            organizer_name,
            event_type,
            start_time, 
            end_time, 
            start_date,
            end_date,
            location, 
            max_attendees,
            is_paid,
            price, 
            discount
        } = req.body;

    try {
        let filetype = req.file.mimetype.split('/')[1];
        let newFileName = req.file.filename + '.' + filetype;
        fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFileName}`, async (err) => {
            if(err) throw err;
            console.log('uploaded successfully')
        })

        const createdAt = new Date()
        const formattedDate = date.format(createdAt, 'YYYY-MM-DD HH:mm:ss') ; 

        const event = await eventModel.create({
            event_title: title,
            event_description: description,
            image: `/uploades/${newFileName}`,
            event_type: event_type,
            start_time: start_time,
            end_time: end_time,
            start_date: start_date,
            end_date: end_date,
            location: location,
            organizer_name: organizer_name,
            max_attendees: max_attendees,
            is_paid: is_paid,
            price: price,
            discount: discount,
            created_at: sequelize.literal(`'${formattedDate}'`),
        });
        return res.status(200).json({ 
            status: 'success',
            message: 'Event added successfully',    
            event
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Add event error in server'})
    }
}

const getAllEvents = async (req, res) => {
    try {
        const events = await eventModel.findAll();
        return res.status(200).json(events)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Get all events error in server'})
    }
}

const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await eventModel.findOne({ where: { id: id } });
        return res.status(200).json(event)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Get event by id error in server'})
    }
}

const updateEvents = async (req, res) => {
    const { id } = req.params;
    const { title, 
            description, 
            image, 
            organizer_name,
            event_type,
            start_time, 
            end_time, 
            start_date,
            end_date,
            location, 
            max_attendees,
            is_paid,
            price, 
            discount
        } = req.body;

    try {
        const event = await eventModel.findByPk(id);
        if(!event) {
            return res.status(404).json({Error: 'Event not found'})
        } else {
            let filetype = req.file.mimetype.split('/')[1];
            let newFileName = req.file.filename + '.' + filetype;
            fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFileName}`, async (err) => {
                if(err) throw err;
                console.log('uploaded successfully')
            })

            const updatedAt = new Date()
            const formattedDate = date.format(updatedAt, 'YYYY-MM-DD HH:mm:ss') ; 

            await event.update({
                event_title: title,
                event_description: description,
                image: `/uploades/${newFileName}`,
                event_type: event_type,
                start_time: start_time,
                end_time: end_time,
                start_date: start_date,
                end_date: end_date,
                location: location,
                organizer_name: organizer_name,
                max_attendees: max_attendees,
                is_paid: is_paid,
                price: price,
                discount: discount,
                updated_at: sequelize.literal(`'${formattedDate}'`),
            });
            return res.status(200).json({
                status: 'success', 
                message: 'Event updated successfully',
                event
            })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Update event error in server'})
    }

}

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await eventModel.findByPk(id);
        if(!event) {
            return res.status(404).json({Error: 'Event not found'})
        } else {
            await event.destroy();
            return res.status(200).json({
                status: 'success', 
                message: 'Event deleted successfully',
            })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Delete event error in server'})
    }
}

const searchEvents = async (req, res) => {
    const { title } = req.params;
    try {
        
        const searchCriteria = {
            where: {
                event_title: { [Op.like]: `%${title}%` }, // Use LIKE for partial matches
            },
        }

        const event = await eventModel.findAll(searchCriteria);
        return res.status(200).json(event)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Search event error in server'})
    }
}

const filterEvents = async (req, res) => {
    const { is_free } = req.params;
    try {

        const filteredEvents = await eventModel.findAll({
            where: {
                is_paid: is_free
            }
        })
        return res.status(200).json(filteredEvents)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Search event error in server'})
    }
}

module.exports = {
    addEvents,
    getAllEvents,
    getEventById,
    updateEvents,
    deleteEvent,
    searchEvents,
    filterEvents
}
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
            event_category,
            start_time, 
            end_time, 
            start_date,
            end_date,
            location, 
            attendance_count,
            event_type,
            price, 
            status,
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
            image: `/uploads/${newFileName}`,
            event_category: event_category,
            start_time: start_time,
            end_time: end_time,
            start_date: start_date,
            end_date: end_date,
            location: location,
            organizer_name: organizer_name,
            attendance_count: attendance_count,
            event_type: event_type,
            price: price,
            status: 'Upcoming',
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

const getUpcomingEvents = async (req, res) => {
    try {
        const events = await eventModel.findAll({ where: { status: 'Upcoming' } });
        return res.status(200).json(events)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Get all events error in server'})
    }
}

const getCompletedEvents = async (req, res) => {
    try {
        const events = await eventModel.findAll({ where: { status: 'Completed' } });
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
    const {
        event_title,
        event_description,
        organizer_name,
        event_category,
        start_time,
        end_time,
        start_date,
        end_date,
        location,
        attendance_count,
        event_type,
        price,
        discount,
    } = req.body;

    try {
        const updatedAt = new Date();
        const formattedDate = date.format(updatedAt, 'YYYY-MM-DD HH:mm:ss');

        let newFileName = null;

        if (req.file) {
            let fileType = req.file.mimetype.split('/')[1];
            newFileName = req.file.filename + '.' + fileType;

            fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFileName}`, function (err) {
                if (err) throw err;
                console.log('Uploaded Success');
            });
        }

        const updateEvent = await eventModel.update(
            {
                event_title: event_title,
                event_description: event_description,
                organizer_name: organizer_name,
                image: `/uploads/${newFileName}`,
                event_category: event_category,
                start_time: start_time,
                end_time: end_time,
                start_date: start_date,
                end_date: end_date,
                location: location,
                attendance_count: attendance_count,
                event_type: event_type,
                price: price,
                discount: discount,
                updated_at: sequelize.literal(`'${formattedDate}'`)
            }, {
                where: {
                    id: id
                }
            })

        return res.status(200).json({
            status: 'success',
            message: 'Event updated successfully',
            updateEvent
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: 'Update event error in server' });
    }
};


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
                status: 'Upcoming',
                event_title: { [Op.like]: `${title}%` }, // Use LIKE for partial matches
            },
        }

        const event = await eventModel.findAll(searchCriteria);
        return res.status(200).json(event)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Search event error in server'})
    }
}

const searchEventsCompleted = async (req, res) => {
    const { title } = req.params;
    try {
        
        const searchCriteria = {
            where: {
                status: 'Completed',
                event_title: { [Op.like]: `${title}%` }, // Use LIKE for partial matches
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
    const { event_type, event_category } = req.query;
    try {

        const filteredEvents = await eventModel.findAll({
            where: {
                event_type: event_type,
                event_category: event_category
            }
        })
        return res.status(200).json(filteredEvents)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Search event error in server'})
    }
}

const paginationEvents = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
        try{
            const data = await eventModel.findAndCountAll({ 
                where: {
                    status: 'Upcoming'
                }, limit, offset })
            const response = getPagingData(data, page, limit);
            res.send(response);
        } catch (error) {
            console.error(error)
            return res.status(500).json({Error: 'Pagination event error in server'})
        }
}

const paginationEventsCompleted = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
        try{
            const data = await eventModel.findAndCountAll({ 
                where: {
                    status: 'Completed'
                }, limit, offset })
            const response = getPagingData(data, page, limit);
            res.send(response);
        } catch (error) {
            console.error(error)
            return res.status(500).json({Error: 'Pagination event error in server'})
        }
}

const paginationCategory = async (req, res) => {
    const { page, size, event_category} = req.query;
    const { limit, offset } = getPagination(page, size);
        try{
            const data = await eventModel.findAndCountAll({ 
            where: {
                event_category: event_category
            }, limit, offset })

            const response = getPagingData(data, page, limit);
            res.send(response);
        } catch (error) {
            console.error(error)
            return res.status(500).json({Error: 'Pagination category error in server'})
        }
}

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;
    return { limit, offset };
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: events } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, events, totalPages, currentPage };
}

const filterEventByCategory = async (req, res) => {
    const { event_category } = req.query;
    try {
        const category = await eventModel.findAll({ where: { event_category: event_category } });
        console.log(category)
        return res.status(200).json(category)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Filter event error in server'})
    }
}

module.exports = {
    addEvents,
    getAllEvents,
    getUpcomingEvents,
    getCompletedEvents,
    getEventById,
    updateEvents,
    deleteEvent,
    searchEvents,
    searchEventsCompleted,
    filterEvents,
    paginationEvents,
    filterEventByCategory,
    paginationCategory,
    paginationEventsCompleted
}
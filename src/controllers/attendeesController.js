const attendeesModel = require('../models/attendeesModel');
const date = require('date-and-time');
const sequelize = require('../configs/database');

const addAttendees = async (req, res) => {
    const { event_id, 
            event_name, 
            event_type, 
            attendee_name,
            attendee_email,
            phone_number,
            location,
            payment_method,
            total_amount,
            status,
        } = req.body;

    try {
        const createdAt = new Date()
        const formattedDate = date.format(createdAt, 'YYYY-MM-DD HH:mm:ss') ; 

        const attendee = await attendeesModel.create({
            event_id: event_id,
            event_name: event_name,
            event_type: event_type,
            attendee_name: attendee_name,
            attendee_email: attendee_email,
            phone_number: phone_number,
            registration_time: formattedDate,
            location: location,
            payment_method: payment_method,
            total_amount: total_amount,
            status: status,
            created_at: sequelize.literal(`'${formattedDate}'`),
        })

        return res.status(200).json({ 
            status: 'success',
            message: 'Attendees Join Successfully',    
            attendee
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Add Attendees error in server'})
    }
}

const allAttendeesByEventID = async (req, res) => {
    const { event_id } = req.params;

    try {
        const getAttendees = await attendeesModel.findAll({ where: { event_id: event_id }})
        
        return res.status(200).json(getAttendees)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Get all attendees error in server'})
    }
} 

module.exports = {
    addAttendees,
    allAttendeesByEventID
}
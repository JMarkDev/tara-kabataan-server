const attendeesModel = require("../models/attendeesModel");
const date = require("date-and-time");
const sequelize = require("../configs/database");

const addAttendees = async (req, res) => {
  const {
    event_id,
    user_id,
    event_name,
    event_date,
    event_type,
    attendee_name,
    gender,
    birthdate,
    attendee_email,
    phone_number,
    location,
    payment_method,
    total_amount,
    // status,
  } = req.body;

  try {
    const createdAt = new Date();
    const formattedDate = date.format(createdAt, "YYYY-MM-DD HH:mm:ss");

    const checkAttendees = await attendeesModel.findOne({
      where: { event_id: event_id, user_id: user_id },
    });
    if (checkAttendees) {
      return res.status(400).json({ Error: "You already join this event!" });
    }

    const attendee = await attendeesModel.create({
      event_id: event_id,
      user_id: user_id,
      event_name: event_name,
      event_date: event_date,
      event_type: event_type,
      attendee_name: attendee_name,
      gender: gender,
      birthdate: birthdate,
      attendee_email: attendee_email,
      phone_number: phone_number,
      registration_time: formattedDate,
      location: location,
      payment_method: payment_method,
      total_amount: total_amount,
      // status: status,
      created_at: sequelize.literal(`'${formattedDate}'`),
    });

    return res.status(200).json({
      status: "success",
      message: "Attendees Join Successfully",
      attendee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Add Attendees error in server" });
  }
};

const allAttendeesByEventID = async (req, res) => {
  const { event_id } = req.params;

  try {
    const getAttendees = await attendeesModel.findAll({
      where: { event_id: event_id },
    });

    return res.status(200).json(getAttendees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Get all attendees error in server" });
  }
};

const userJoinEvents = async (req, res) => {
  const { user_id } = req.params;
  try {
    const getEvents = await attendeesModel.findAll({
      where: { user_id: user_id },
    });
    return res.status(200).json(getEvents);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ Error: "Get all events join error in server" });
  }
};

const getAttendeeDetails = async (req, res) => {
  const { user_id } = req.params;

  try {
    const getAttendee = await attendeesModel.findOne({
      where: { user_id: user_id },
    });
    return res.status(200).json(getAttendee);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ Error: "Get all events join error in server" });
  }
};

// const getAllEventsJoined = async (req, res) => {
//   const { user_id } = req.params;
//   try {
//     const getAllEvents = await attendeesModel.findAll({
//       where: { user_id: user_id },
//     });
//     return res.status(200).json(getAllEvents);
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ Error: "Get all events join error in server" });
//   }
// };

module.exports = {
  addAttendees,
  allAttendeesByEventID,
  userJoinEvents,
  getAttendeeDetails,
  //   getAllEventsJoined
};

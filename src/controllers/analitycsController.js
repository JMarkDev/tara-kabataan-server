const sequelize = require("../configs/database");
const attendeesModel = require("../models/attendeesModel");
const userModel = require("../models/userModel");
const eventModel = require("../models/eventModel");
const { Op } = require("sequelize");

const fetchTotals = async (req, res) => {
  try {
    const totalEvents = await eventModel.count();

    const totalRevenue = await attendeesModel.findAll({
      attributes: [
        [sequelize.fn("sum", sequelize.col("total_amount")), "total_amount"],
      ],
    });

    const totalUsers = await userModel.count({
      where: { role: "user", status: "verified" },
    });

    const upcomingEvents = await eventModel.count({
      where: { status: "Upcoming" },
    });

    const jsonFormat = [
      {
        totalEvents: totalEvents,
        totalRevenue: totalRevenue[0].dataValues.total_amount,
        totalUsers: totalUsers,
        upcomingEvents: upcomingEvents,
      },
    ];

    const data = jsonFormat.map((item) => [
      // use [] instead of {} to make it an array
      {
        name: "Total Events",
        count: item.totalEvents,
      },
      {
        name: "Total Revenue",
        count: `₱ ${totalRevenue[0].dataValues.total_amount}`,
      },
      {
        name: "Total Users",
        count: totalUsers,
      },
      {
        name: "Upcoming Events",
        count: upcomingEvents,
      },
    ]);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAttendeesYearly = async (req, res) => {
  const { year } = req.params;
  const events = await eventModel.findAll();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  try {
    const totalAttendees = [];

    for (const month of months) {
      const monthlyCounts = { month };

      for (const event of events) {
        const count = await attendeesModel.count({
          where: {
            [Op.and]: [
              sequelize.where(
                sequelize.fn("YEAR", sequelize.col("created_at")),
                year
              ),
              sequelize.where(
                sequelize.fn("MONTH", sequelize.col("created_at")),
                months.indexOf(month) + 1
              ),
              { event_id: event.id },
            ],
          },
        });

        monthlyCounts[event.event_title] = count;
      }

      totalAttendees.push(monthlyCounts);
    }

    return res.json(totalAttendees);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserGender = async (req, res) => {
  try {
    // Array of genders to be included in the response
    const genders = ["Male", "Female", "Non-Binary"];

    // Fetch the counts for each gender from the database
    const getUser = await userModel.findAll({
      attributes: [
        "gender",
        [sequelize.fn("COUNT", sequelize.col("gender")), "totalCount"],
      ],
      where: {
        status: "verified",
        gender: genders, // Include only the specified genders
        role: "user",
      },
      group: ["gender"],
    });

    // Create an object to store the counts for each gender
    const genderCounts = {};
    getUser.forEach((user) => {
      genderCounts[user.gender] = parseInt(user.totalCount);
    });

    const allGenders = genders.map((gender) => {
      const foundGender = getUser.find((user) => user.gender === gender);

      if (foundGender) {
        return foundGender;
      } else {
        return { gender: gender, totalCount: 0 };
      }
    });

    return res.status(200).json(allGenders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAttendeesGenderByEventID = async (req, res) => {
  const { event_id } = req.params;

  try {
    // Array of genders to be included in the response
    const genders = ["Male", "Female", "Non-Binary"];

    // Fetch the counts for each gender from the database
    const getUser = await attendeesModel.findAll({
      attributes: [
        "gender",
        [sequelize.fn("COUNT", sequelize.col("gender")), "totalCount"],
      ],
      group: ["gender"],
      where: { event_id: event_id },
    });

    // Create an object to store the counts for each gender
    const genderCounts = {};
    getUser.forEach((user) => {
      genderCounts[user.gender] = parseInt(user.totalCount);
    });

    const allGenders = genders.map((gender) => {
      const foundGender = getUser.find((user) => user.gender === gender);

      if (foundGender) {
        return foundGender;
      } else {
        return { gender: gender, totalCount: 0 };
      }
    });

    return res.status(200).json(allGenders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchTotals,
  getAttendeesYearly,
  getUserGender,
  getAttendeesGenderByEventID,
};

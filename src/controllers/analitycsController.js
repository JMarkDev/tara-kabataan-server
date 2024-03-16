const sequelize = require("../configs/database");
const attendeesModel = require("../models/attendeesModel");
const userModel = require("../models/userModel");
const eventModel = require("../models/eventModel");
const { json } = require("body-parser");

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

module.exports = {
  fetchTotals,
};

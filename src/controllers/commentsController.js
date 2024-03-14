const commentsModel = require("../models/commentsModel");
const date = require("date-and-time");
const sequelize = require("../configs/database");
const fs = require("fs");

const addComments = async (req, res) => {
  const { event_id, user_id, event_name, attendees_name, comment } = req.body;

  try {
    const existingComment = await commentsModel.findAll({
      where: {
        event_id: event_id,
        user_id: user_id,
      },
    });

    if (existingComment.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "You have already written feedback on this event!",
      });
    }

    const createdAt = new Date();
    const formattedDate = date.format(createdAt, "YYYY-MM-DD HH:mm:ss");

    const imageFileNames = [];
    await Promise.all(
      req.files.map(async (file) => {
        const fileType = file.mimetype.split("/")[1];
        const newFileName = `${file.filename}.${fileType}`;

        try {
          await fs.promises.rename(
            `./uploads/${file.filename}`,
            `./uploads/${newFileName}`
          );
          imageFileNames.push(newFileName);
        } catch (err) {
          console.error("Error renaming/uploading file:", err);
        }
      })
    );

    const postcomment = await commentsModel.create({
      event_id: event_id,
      user_id: user_id,
      event_name: event_name,
      attendees_name: attendees_name,
      comment: comment,
      image: imageFileNames.join(","),
      created_at: sequelize.literal(`'${formattedDate}'`),
    });

    return res.status(200).json({
      status: "success",
      postcomment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Add comments error in server" });
  }
};

const getCommentsByEventId = async (req, res) => {
  const { event_id } = req.params;

  try {
    const getComments = await commentsModel.findAll({
      where: { event_id: event_id },
    });
    return res.status(200).json(getComments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Get comments error in server" });
  }
};

module.exports = {
  addComments,
  getCommentsByEventId,
};

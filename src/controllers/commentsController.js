const commentsModel = require("../models/commentsModel");
const date = require("date-and-time");
const sequelize = require("../configs/database");
const fs = require("fs");
const userModel = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

const addComments = async (req, res) => {
  const { event_id, user_id, event_name, attendees_name, comment } = req.body;
  const comment_id = uuidv4();

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
    const formattedDate = date.format(createdAt, "YYYY-MM-DD");

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
      comment_id: comment_id,
      role: "user",
      event_id: event_id,
      user_id: user_id,
      event_name: event_name,
      attendees_name: attendees_name,
      comment: comment,
      image: imageFileNames.join(","),
      created_at: formattedDate,
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

const replyComments = async (req, res) => {
  const { comment_id, event_id, user_id, event_name, attendees_name, comment } =
    req.body;

  try {
    const createdAt = new Date();
    const formattedDate = date.format(createdAt, "YYYY-MM-DD");

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
      comment_id: comment_id,
      role: "admin",
      event_id: event_id,
      user_id: user_id,
      event_name: event_name,
      attendees_name: attendees_name,
      comment: comment,
      image: imageFileNames.join(","),
      created_at: formattedDate,
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
    // get all comments in event
    const comments = await commentsModel.findAll({
      where: { event_id: event_id },
    });

    const eventComments = await Promise.all(
      comments.map(async (comment) => {
        // get the image in the user table
        const user = await userModel.findOne({
          where: { id: comment.user_id },
        });

        if (user) {
          return {
            ...comment.toJSON(),
            user: {
              image: user.image,
            },
          };
        } else {
          return {
            ...comment.toJSON(),
            user: {
              image: null,
            },
          };
        }
      })
    );

    return res.status(200).json(eventComments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Get comments error in server" });
  }
};

const deleteComment = async (req, res) => {
  const { comment_id } = req.params;

  try {
    const comment = await commentsModel.findOne({
      where: { id: comment_id },
    });

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
    }

    await commentsModel.destroy({
      where: { id: comment_id },
    });

    return res.status(200).json({
      status: "success",
      message: "Comment deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Delete comment error in server" });
  }
};

module.exports = {
  addComments,
  replyComments,
  getCommentsByEventId,
  deleteComment,
};

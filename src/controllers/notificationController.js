const notificationModel = require("../models/notificationsModel");
const userModel = require("../models/userModel");

const addNotification = async ({
  event_id,
  event_status,
  image,
  message,
  is_read,
  created_at,
}) => {
  try {
    const users = await userModel.findAll({
      where: {
        role: "user",
        status: "verified",
      },
    });

    const notifications = await Promise.all(
      users.map(async (user) => {
        const saveNotification = await notificationModel.create({
          user_id: user.id,
          role: user.role,
          event_id: event_id,
          event_status: event_status,
          image: image,
          message: message,
          is_read: is_read,
          created_at: created_at,
        });
        return saveNotification;
      })
    );

    return notifications;
  } catch (error) {
    throw error;
  }
};

const addNotificationAdmin = async ({
  user_id,
  attendee_name,
  message,
  event_id,
  role,
  is_read,
  created_at,
}) => {
  try {
    // const users = await userModel.findAll({
    //   where: {
    //     role: "admin",
    //     status: "verified",
    //   },
    // });

    const saveNotification = await notificationModel.create({
      user_id: user_id,
      attendee_name: attendee_name,
      role: role,
      image: null,
      event_id: event_id,
      message: message,
      is_read: is_read,
      created_at: created_at,
    });

    return saveNotification;
  } catch (error) {
    throw error;
  }
};

// const getAdminNotifications = async (req, res) => {
//   try {
//     // Find all verified users with role "user"
//     const users = await userModel.findAll({
//       where: {
//         role: "user",
//         status: "verified",
//       },
//     });

//     const notifications = await notificationModel.findAll({
//       where: {
//         role: "admin",
//       },
//       order: [["created_at", "DESC"]],
//     });

//     return res.status(200).json(notifications);
//   } catch (error) {
//     console.error("Error fetching admin notifications:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };

const getUserNotifications = async (req, res) => {
  try {
    const { user_id } = req.params;

    const notifications = await notificationModel.findAll({
      where: {
        user_id: user_id,
        role: "user",
      },
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getAdminNotifications = async (req, res) => {
  try {
    // Find all notifications for admin role, ordered by created_at descending
    const notifications = await notificationModel.findAll({
      where: {
        role: "admin",
      },
      order: [["created_at", "DESC"]],
    });

    // Fetch user details for each notification
    const notificationsWithUsers = await Promise.all(
      notifications.map(async (notification) => {
        // Find the user associated with the notification

        const user = await userModel.findOne({
          where: {
            id: notification.user_id,
            // role: "user",
            // status: "verified",
          },
        });

        // If user is found, attach the user's image to the notification
        if (user) {
          return {
            ...notification.toJSON(),
            user: {
              id: user.id,
              image: user.image,
            },
          };
        } else {
          // If user is not found (unlikely), attach null image
          return {
            ...notification.toJSON(),
            user: {
              id: null,
              image: null,
            },
          };
        }
      })
    );

    // Respond with the notifications including user details
    return res.status(200).json(notificationsWithUsers);
  } catch (error) {
    console.error("Error fetching admin notifications:", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateIsRead = async (req, res) => {
  const { user_id, event_id, role } = req.params;
  try {
    const update = await notificationModel.update(
      { is_read: true },
      {
        where: {
          user_id: user_id,
          event_id: event_id,
          role: role,
        },
      }
    );

    return res.status(200).json(update);
  } catch (err) {
    throw err;
  }
};
const updateIsReadAdmin = async (req, res) => {
  const { event_id } = req.params;
  try {
    const update = await notificationModel.update(
      { is_read: true },
      {
        where: {
          event_id: event_id,
          role: "admin",
        },
      }
    );

    return res.status(200).json(update);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addNotification,
  addNotificationAdmin,
  getUserNotifications,
  getAdminNotifications,
  updateIsRead,
  updateIsReadAdmin,
};

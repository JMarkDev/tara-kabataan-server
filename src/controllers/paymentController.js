const paymentModel = require("../models/paymentModel");

const addTransaction = async (req, res) => {
  const {
    transaction_id,
    event_id,
    user_id,
    email_address,
    amount,
    status,
    created_at,
  } = req.body;
  console.log(transaction_id.body);

  try {
    const addTransaction = await paymentModel.create({
      transaction_id: transaction_id,
      event_id: event_id,
      user_id: user_id,
      email_address: email_address,
      amount: amount,
      status: status,
      created_at: created_at,
    });

    console.log(addTransaction);
    return res.status(200).json({
      status: "success",
      addTransaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Get transaction error in server" });
  }
};

const getAllTrasactionByID = async (req, res) => {
  const { id } = req.params;

  try {
    const getTransaction = await paymentModel.findAll({
      where: {
        event_id: id,
      },
    });

    return res.status(200).json(getTransaction);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ Error: "Get all transaction by ID error in server" });
  }
};

const getTransactionByID = async (req, res) => {
  const { transaction_id } = req.params;

  try {
    const getTransaction = await paymentModel.findOne({
      where: {
        transaction_id: transaction_id,
      },
    });

    return res.status(200).json(getTransaction);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ Error: "Get transaction by ID error in server" });
  }
};

module.exports = {
  addTransaction,
  getAllTrasactionByID,
  getTransactionByID,
};

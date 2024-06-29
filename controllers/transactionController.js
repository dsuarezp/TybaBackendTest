import Transaction from '../models/Transaction.js';

export const getTransactions = async (req, res) => {
  try {
    // Obtener las transacciones del usuario actual
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const addTransaction = async (req, res) => {
  const { details, amount } = req.body;
  
  // Crear una nueva transacción para el usuario actual
  try {
    const newTransaction = new Transaction({
      userId: req.user.id,
      details,
      amount
    });

    // Guardar la nueva transacción en la base de datos
    await newTransaction.save();

    res.json({ msg: 'Transaction added successfully', transaction: newTransaction });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

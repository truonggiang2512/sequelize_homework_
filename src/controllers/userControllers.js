import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize)

const getLikeUser = async (req, res) => {
  let { id } = req.params
  let data = await model.like_res.findAll({
    where: {
      user_id: id
    },
    include: ['user']
  });

  res.send(data);
}

const postUserLike = async (req, res) => {
  try {
    const { userId, resId } = req.params;
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');

    // Check if the user has already liked the restaurant
    const existingLike = await model.like_res.findOne({
      where: {
        user_id: userId,
        res_id: resId
      }
    });

    if (existingLike) {
      // User has already liked the restaurant, perform "unlike" action
      await model.like_res.destroy({
        where: {
          user_id: userId,
          res_id: resId
        }
      });

      res.status(200).json({ message: 'Restaurant unliked successfully' });
    } else {
      // User has not liked the restaurant, perform "like" action
      const newLike = await model.like_res.create({
        user_id: userId,
        res_id: resId,
        date_like: formattedTime
      });

      console.log('New Like:', newLike.get());
      res.status(201).json({ message: 'Restaurant liked successfully', newLike });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const userOrder = async (req, res) => {
  try {
    const { user_id, food_id, amount } = req.body
    // create a new order
    const newOrder = await model.orders.create({ user_id, food_id, amount })
    res.status(201).json({ message: 'Order successfully', newOrder });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const postUserRate = async (req, res) => {
  try {
    const { user_id, res_id, amount } = req.body;
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');

    // Tạo một bản ghi đánh giá mới
    const newRate = await model.rate_res.create({
      user_id,
      res_id,
      amount,
      date_rate: formattedTime
    });

    res.status(201).json({ message: 'Rate successfully', newRate });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRateUser = async (req, res) => {
  let { id } = req.params
  let data = await model.rate_res.findAll({
    where: {
      user_id: id
    },
    include: ['re']
  });

  res.send(data);
}

export { getLikeUser, postUserLike, userOrder, postUserRate, getRateUser }
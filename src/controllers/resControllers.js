import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize)
const getLikeRes = async (req, res) => {
  let { id } = req.params
  let data = await model.like_res.findAll({
    where: {
      res_id: id
    },
    include: ['user']
  });

  res.send(data);
}
const getRateRes = async (req, res) => {
  let { id } = req.params
  let data = await model.rate_res.findAll({
    where: {
      res_id: id
    },
    include: ['user']
  });

  res.send(data);
}



export { getLikeRes, getRateRes }
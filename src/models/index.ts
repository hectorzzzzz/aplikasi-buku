import sequelize from '../configs/sequelize'
import UserModel from './users'
import UserPrivilegeModel from './userPrivilege'
import TaskModel from './task'


async function syncDatabase() {
  UserPrivilegeModel.hasMany(UserModel, {
    foreignKey: 'privilegeId',
    as: 'users',
  })

  UserModel.belongsTo(UserPrivilegeModel, {
    foreignKey: 'privilegeId',
    as: 'privilege',
  })

  await sequelize.sync()
}

export {
  syncDatabase,
  UserModel,
  UserPrivilegeModel,
  TaskModel
}
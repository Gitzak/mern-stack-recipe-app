const { errorMonitor } = require("nodemailer/lib/xoauth2");
const CONSTANTS = require("../constants/index");

class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUsers(skip, limit, sort) {
    const users = await this.userModel
      .aggregate([
        { $sort: { creationDate: -1 } },
        { $project: { password: 0 } }, // Exclude the password field
      ])
      .skip(skip)
      .limit(limit)
      .exec();
    return users;
  }

  async AddUser(user) {
    const { role, userName, email, hashedPass, active } = user;

    const createUser = await this.userModel.create({
      role,
      userName,
      email,
      password: hashedPass,
      active,
    });

    const userWithoutPassword = createUser.toObject();
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  async registerUser(user) {
    const { role, userName, email, hashedPass } = user;

    const createUser = await this.userModel.create({
      role,
      userName,
      email,
      password: hashedPass,
    });

    const clientWithoutPassword = createUser.toObject();
    delete clientWithoutPassword.password;

    return clientWithoutPassword;
  }

  async Login(email) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async updateUser(id, data) {
    const user = await this.userModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
    return user;
  }
  // async getUserById(id) {
  //   const user = await this.userModel.findById(id);
  //   return user;
  // }

  async FindById(userId) {
    const userWithoutPass = await this.userModel
      .findOne({ _id: userId })
      .select("-password")
      .lean();

    return userWithoutPass;
  }

  async DeleteUser(id) {
    return await this.userModel.findByIdAndDelete(id);
  }
}

module.exports = { UserRepository };

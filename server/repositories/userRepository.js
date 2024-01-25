const CONSTANTS = require("../constants/index");

class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
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

    async DeleteUser(id){
        return await this.userModel.findByIdAndDelete(id)
    }
}

module.exports = { UserRepository };


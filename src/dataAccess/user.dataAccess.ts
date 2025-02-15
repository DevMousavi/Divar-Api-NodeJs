import UserModel from '../modules/user/user.module';

class UserDataAccess {
    public async SelectUserByUserName(userName: string) {
        return await UserModel.findOne({ userName: userName });
    }
}
export default new UserDataAccess();

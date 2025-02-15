import UserModel from '../modules/user/user.module';
import { UserSchemaType } from '../types/user/UserSchemaType';

class UserDataAccess {
    public async SelectUserByMobile(userMobile: string) {
        return await UserModel.findOne({ mobile: userMobile });
    }
    public async UpdateUser(userMobile: string, updateData: {}) {
        return await UserModel.updateOne({ mobile: userMobile }, updateData);
    }
    public async CreateUser(userMobile: string, user: UserSchemaType) {
        return await UserModel.create(user);
    }
}
export default new UserDataAccess();

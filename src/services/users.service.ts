import { UpdateUserDto } from './../dtos/users.dto';
import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import reflexologyModel from '@models/reflexology.model';
import meridianlogyModel from '@models/meridianlogy.model';

class UserService {
  public users = userModel;
  public reflexology = reflexologyModel;
  public meridianlogy = meridianlogyModel;

  public async findAllUser(): Promise<User[]> {
    const users = await this.users.find();
    const reflexology = await this.reflexology.find().count();
    const meridianlogy = await this.meridianlogy.find().count();

    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async DashbaordCount(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData: any): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'No date provided');

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }
    console.log(userId);

    const updateUserById: any = await this.users.updateOne(
      {
        _id: userId,
      },
      userData,
    );
    if (!updateUserById) throw new HttpException(409, "You're not user");
    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;

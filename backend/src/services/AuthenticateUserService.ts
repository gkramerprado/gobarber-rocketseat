import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const userPasswordFailedMessage = 'Incorrect email/password combination...';

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error(userPasswordFailedMessage);
    }

    const passwordMathced = await compare(password, user.password);

    if (!passwordMathced) {
      throw new Error(userPasswordFailedMessage);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;

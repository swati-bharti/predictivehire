import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './auth.model';
dotenv.config();
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signup(username: string, password: string, role: string) {
    const existingUser = await this.userModel
      .findOne({ username: username })
      .exec();
    if (existingUser) {
      throw new HttpException('User Exists', HttpStatus.CONFLICT);
    } else {
      var salt = bcrypt.genSaltSync(12)
      const passwordHash = bcrypt.hashSync(password, salt);
      const newUser = new this.userModel({
        username,
        password: passwordHash,
        role,
      });

      const res = await newUser.save();

      const userInfo = { username, role };
      const token = jwt.sign(userInfo, process.env.JWT_TOKEN, {
        expiresIn: '1h',
      });

      return { token };
    }
  }

  async login(username: string, password: string){
      const existingUser = await this.userModel
        .findOne({ username: username })
        .exec();

        if(!existingUser){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        else{
         const isPasswordCorrect: boolean  =  bcrypt.compareSync(password, existingUser.password);
         if(isPasswordCorrect){
             const userInfo = {username, role: existingUser.role};
                
            const token = jwt.sign(userInfo, process.env.JWT_TOKEN, {
              expiresIn: '1h',
            });

            return { token };
         }
         else{
             throw new HttpException('invalid credentials',HttpStatus.UNAUTHORIZED);
         }

        }
  }
}
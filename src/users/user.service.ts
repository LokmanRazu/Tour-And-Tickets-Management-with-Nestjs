import { Injectable,UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.type";
import { LoginDTO, UserDTO } from "./user.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt"

@Injectable()
export class UserService{
constructor(@InjectModel(User.name) private userModel:Model<User>,private jwtService:JwtService){}
async users(): Promise<User[]> {
    return await this.userModel.find()
};

async findUser(_id:string):Promise<User>{
    return await this.userModel.findById(_id)
};

async createUser(userDTO:UserDTO):Promise<User>{
    const user = new this.userModel(userDTO)
        const saltOrRounds = 10;
        const password = user.password
        const hash = await bcrypt.hash(password, saltOrRounds);
        user.password = hash
        return user.save();
};

async login(loginDTO:LoginDTO):Promise<{accessToken:string}>{
    let user = await this.userModel.findOne({email:loginDTO.email})
    if (!user) {
        throw new UnauthorizedException('Invalid email or Password')
    }
    let match = await bcrypt.compare(loginDTO.password, user.password)
        console.log("match_++++", match)
        if (!match) {
            throw new UnauthorizedException('Invalid email or Password')
        }
        const payload = { 
            sub: user._id,
            name: user.name
        }
        console.log("payload++++++++++++", payload)
        return {
            accessToken: await this.jwtService.signAsync(payload)
        }

}

}
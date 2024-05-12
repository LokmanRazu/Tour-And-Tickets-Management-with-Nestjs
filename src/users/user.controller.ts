import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "./user.type";
import { LoginDTO, UserDTO } from "./user.dto";

@Controller('user')
@ApiTags('user')
export class UserController{
    constructor(private readonly userService:UserService){}

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.users()
};

    @Get('/:_id')
    async getUser(@Param('_id') _id:string): Promise<User> {
        return this.userService.findUser(_id)
    };

    @Post()
    async createUser(@Body() data:UserDTO):Promise<User>{
        return this.userService.createUser(data)
    };

    @Post('/login')
    async login(@Body() data:LoginDTO):Promise<{}>{
        return this.userService.login(data)
    }

}
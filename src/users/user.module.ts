import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.type";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: () => {
                    return UserSchema
                }
            }

        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<any>('JWT_SECRET'),
                signOptions: { expiresIn: '15m' }
            }),
            inject: [ConfigService]
        })

    ],
    controllers: [UserController],
    providers: [UserService],
    exports: []
})

export class UserModule {

}
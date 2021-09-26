import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { UserModel } from "./auth.model";
import { UserService } from "./auth.service";

@Module({
    imports:[MongooseModule.forFeature([{name:'User', schema: UserModel}])],
    controllers: [AuthController],
    providers: [UserService]
})
export class AuthModule{}
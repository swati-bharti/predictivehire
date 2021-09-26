import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./auth.service";

@Controller('/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const token = await this.userService.login(username, password);
    return token;
  }
  @Post('/signup')
  async signup(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role:string
  ) {
    const token = await this.userService.signup(username, password, role);
    return token;
  }
}

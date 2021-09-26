import { Test } from "@nestjs/testing";
import { AuthController } from "../auth.controller"
import { UserService } from "../auth.service";

jest.mock('../auth.service');
describe("auth controller unit test", () => {
    let authController:AuthController;
    let authService: UserService;

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            controllers:[AuthController],
            providers:[UserService]
        }).compile();

        authController = app.get<AuthController>(AuthController);
        authService = app.get<UserService>(UserService);


        
    })

    it('controller should be defined', () => {
      expect(authController).toBeDefined();
    });
    it('signup should be called with params',() => {
        const params = {
           'username': "tonystark",
            'password':'iamironman',
            'role':'admin'
        };
        authController.signup(params.username,params.password,params.role);
        expect(authService.signup).toHaveBeenCalled()
    })
    it('login should be called with params', () => {
      const params = {
        username: 'tonystark',
        password: 'iamironman',
        
      };
      authController.login(params.username, params.password);
      expect(authService.login).toHaveBeenCalled();
    });
})
import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from '../auth.service';

class AuthServiceMock {
  login(username: string, password: string) {
    return {};
  }
  signup(username: string, password: string, role: string) {
    return {};
  }
}

describe('UserService', () => {
  let authService: UserService;
  beforeAll(async () => {
    const UserServiceProvider = {
      provide: UserService,
      useClass: AuthServiceMock,
    };
    const app: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserServiceProvider],
    }).compile();

    authService = app.get<UserService>(UserService);
  });

  it('Should call login with required params', async () => {
    const loginSpy = jest.spyOn(authService, 'login');
    const params = {
      'username': 'tonystark',
      'password': 'iamironman',

    };

    authService.login(params.username, params.password);
    expect(loginSpy).toHaveBeenCalledWith(params.username, params.password);
  });

  it('Should call signup with required params', async () => {
    const signupSpy = jest.spyOn(authService, 'signup');
    const params = {
      username: 'tonystark',
      password: 'iamironman',
      role: 'admin',
    };

    authService.signup(params.username, params.password, params.role);
    expect(signupSpy).toHaveBeenCalledWith(params.username, params.password, params.role);
  });
});

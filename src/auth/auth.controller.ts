import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoggedinUserDto } from './dto/loggedin-user.dto';
import { RequestWithUserInterface } from '../interfaces/requestWithUser.interface';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loggedinUser(@Req() req: RequestWithUserInterface) {
    // return await req.user;
    const { user } = req;
    const token = await this.authService.generateAccessToken(user.id);
    return { user, token };
  }
  // async loggedinUser(@Body() loggedinUserDto: LoggedinUserDto) {
  //   const user = await this.authService.logInUser(loggedinUserDto);
  //   const token = await this.authService.generateAccessToken(user.id);
  //   return { user, token };
  // }
}

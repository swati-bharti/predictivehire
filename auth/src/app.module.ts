import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.tzszk.mongodb.net/test?retryWrites=true&w=majority`,{
    dbName:'test'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

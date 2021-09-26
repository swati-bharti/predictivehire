import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VacanciesModule } from './vacancies/vacamcies.module';

@Module({
  imports: [
    VacanciesModule,

    GraphQLModule.forRoot({
      autoSchemaFile: 'vacancies.gql',
      context: ({ req }) => ({ headers: req.headers }),
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.tzszk.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true, dbName: 'test' },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

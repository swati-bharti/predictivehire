import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VacancyInput {
  @Field()
  title: string;
  @Field()
  jobDescription: string;
  @Field()
  datePosted: string;
}

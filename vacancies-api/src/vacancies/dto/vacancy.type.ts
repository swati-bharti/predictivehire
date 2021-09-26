import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VacancyType {
  @Field(() => ID)
  id: string;
  @Field()
  title: string;
  @Field()
  jobDescription: string;
  @Field()
  datePosted: string;
}

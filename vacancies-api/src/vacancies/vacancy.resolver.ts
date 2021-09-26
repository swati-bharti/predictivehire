
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "./auth.gaurd";
import { VacancyType } from "./dto/vacancy.type";
import { VacancyInput } from "./input/vacancy.input";
import { Roles } from "./roles.decorator";
import { VacanciesService } from "./vaccancies.service";

@Resolver()
export class VacanciesResolver {
  constructor(private readonly vacancyService: VacanciesService) {}
  @UseGuards(new AuthGuard())
  @Mutation(() => VacancyType)
  async addVacancy(@Args('input') vacancyInput: VacancyInput) {
    const id = await this.vacancyService.insertVacancy(vacancyInput);

    return id;
  }
  @UseGuards(new AuthGuard())
  @Query(() => [VacancyType])
  async getAllVacancies() {
    return await this.vacancyService.getAllVacancies();
  }
  @UseGuards(new AuthGuard())
  @Query(() => VacancyType)
  async findOne(@Args('id') id: string) {
    return await this.vacancyService.fineOneVacancy(id);
  }
  @Mutation(() => VacancyType)
  @UseGuards(new AuthGuard())
  async updateVacancy(
    @Args('id') id: string,
    @Args('title') title: string,
    @Args('jobDescription') jobDescription: string,
    @Args('datePosted') datePosted:string) {
    return await this.vacancyService.updateVacancy(id,title, jobDescription, datePosted);
  }

  @Mutation(() => VacancyType)
  @UseGuards(new AuthGuard())
  async deleteVacancy(@Args('id') id:string){
    return await this.vacancyService.deleteVacancy(id);
  }
}
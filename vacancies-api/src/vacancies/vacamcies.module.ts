import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VacanciesResolver } from "./vacancy.resolver";
import { VacanciesService } from "./vaccancies.service";
import { VacanciesModel } from "./vcancies.model";

@Module({
    imports:[MongooseModule.forFeature([{name:'Vacancies', schema:VacanciesModel}])],
    providers: [VacanciesResolver, VacanciesService]
})
export class VacanciesModule{}
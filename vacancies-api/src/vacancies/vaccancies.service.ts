import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { title } from "process";
import { VacancyInput } from "./input/vacancy.input";
import { Vacancies } from "./vcancies.model";

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel('Vacancies') private readonly vacanciesModel: Model<Vacancies>,
  ) {}

  async insertVacancy(vacancyObject: VacancyInput) {
    const newVacancy = new this.vacanciesModel(vacancyObject);
    const res = await newVacancy.save();
    return res;
  }

  async getAllVacancies() {
    const vacancies = await this.vacanciesModel.find().exec();

    return vacancies;
  }

  async getSingleVacancy(id: string) {
    let vacancy;
    try {
      vacancy = await this.vacanciesModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Vacancy not available');
    }
    if (!vacancy) {
      throw new NotFoundException('Vacancy not available');
    }
    return vacancy;
  }

  async fineOneVacancy(id) {
    let vacancy;
    try {
      vacancy = await this.vacanciesModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Vacancy not found');
    }

    if (!vacancy) {
      throw new NotFoundException('Vacancy not found');
    }
    return vacancy;
  }

  async deleteVacancy(id:string) {
    let vacancy;
    try {
      vacancy = await this.vacanciesModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Vacancy not found');
    }
    if (!vacancy) {
      throw new NotFoundException('Vacancy not found');
    }
    const deletedvacancy = await this.vacanciesModel.findByIdAndDelete(id);
    return deletedvacancy;
  }
  async updateVacancy  (id:string, title:string, jobDescription:string, datePosted:string){
    let updatedVacancy;
    
    
    try{
      updatedVacancy = await this.vacanciesModel.findById(id);
      if (title) {
        updatedVacancy.title = title;
      }
      if (jobDescription) {
        updatedVacancy.jobDescription = jobDescription;
      }
      if (datePosted) {
        updatedVacancy.datePosted = datePosted;
      }

      updatedVacancy.save();
      return updatedVacancy;
    }catch (error) {
      throw new NotFoundException('Vacancy not found');
    }
  }
}
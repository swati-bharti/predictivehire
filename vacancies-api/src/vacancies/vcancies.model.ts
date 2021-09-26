import * as mongoose from 'mongoose';

export const VacanciesModel = new mongoose.Schema({
  title: { type: String, required: true },
  jobDescription: { type: String, required: true },
  datePosted: { type: String, required: true },
});


export interface Vacancies extends mongoose.Document {
  
  title: string;
  jobDescription: string;
  datePosted: string;
}

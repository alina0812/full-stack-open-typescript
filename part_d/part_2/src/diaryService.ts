import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllDiaryEntries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createDiaryEntry = (object: NewDiaryEntry) => {
    console.log(object)
    return axios
      .post<DiaryEntry>(baseUrl, object)
      .then(response => response.data)
      .catch(function (error) {
        throw(error)
      })
  }
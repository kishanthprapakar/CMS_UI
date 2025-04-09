import axios from 'axios';

const BASE_URL = 'http://192.168.172.227:8000/auth';

// GET all reports
export const fetchReports = () => axios.get(BASE_URL);

//POST a new report 
export const createReport = (Data) => axios.post(BASE_URL, Data);

//PUT a report by ID
export const updateReport = (id, updateData) => axios.put(`${BASE_URL}/${id}`, updateData);

//DELETE a report by ID
export const deleteReport = (id) => axios.delete(`${BASE_URL}/${id}`);

import axios from 'axios';

const BASE_URL = 'https://65489caedd8ebcd4ab233e54.mockapi.io/contacts';
const instance = axios.create({ baseURL: BASE_URL });

export const getContactsByAxios = async () => {
  const { data } = await instance.get('/');
  return data;
};

export const deleteContactByAxios = async userID => {
  const { data } = await instance.delete(`/${userID}`);
  return data;
};
export const postContactByAxios = async user => {
  const { data } = await instance.post('/', user);
  return data;
};

import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = newPerson => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

const deleteId = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

const put = person => {
  return axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data);
};

export { getAll, create, deleteId, put };

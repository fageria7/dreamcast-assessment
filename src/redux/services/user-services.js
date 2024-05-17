import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const getUsers = () => {
    return axios.get(API_URL);
};

const postUsers = (newUser) => {
    return axios.post(API_URL, newUser);
};

const putUser = (updatedUser) => {
    return axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
};

const deleteUser = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const UserServices = {
    get: getUsers,
    post: postUsers,
    put: putUser,
    delete: deleteUser
}
import * as axios from 'axios';

const instance = axios.create({
    baseURL: `http://fakeapi.ru/`,
});

export const contactsAPI = {
    getAllContacts() {
        return instance.get(`contacts`)
    },
    createNewContact(name, phone, email) {
        return instance.post(`contacts/add`, {name, phone, email})
    },
    updateContact(id, name, phone, email) {
        return instance.put(`contacts/update`, {id, name, phone, email})
    },
    deleteContact(id) {
        return instance.delete(`contacts/delete`, {id})
    },
}
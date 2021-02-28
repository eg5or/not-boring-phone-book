import {contactsAPI} from '../API/api';

// constants
const SET_CONTACTS_DATA = 'notBoringPhoneBook/contacts/SET_CONTACTS_DATA'
const ADD_NEW_CONTACT = 'notBoringPhoneBook/contacts/ADD_NEW_CONTACT'
const UPDATE_NAME = 'notBoringPhoneBook/contacts/UPDATE_NAME'
const UPDATE_PHONE = 'notBoringPhoneBook/contacts/UPDATE_PHONE'
const UPDATE_EMAIL = 'notBoringPhoneBook/contacts/UPDATE_EMAIL'
const DELETE_CONTACT = 'notBoringPhoneBook/contacts/DELETE_CONTACT'
const SET_ERROR_MESSAGE = 'notBoringPhoneBook/contacts/SET_ERROR_MESSAGE'

// randomId

function randomId(length) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    let id = '';
    for (let i = 0; i < length; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}


// state
let initialState = {
    contacts: [
        {
            id: 1,
            name: 'Собак Собакевич',
            phone: '+7 926 123-45-67',
            email: 'sobaks@mail.ru'
        },
        {
            id: 2,
            name: 'Енот Енотов',
            phone: '+7 926 987-65-43',
            email: 'enotik@mail.ru'
        },
        {
            id: 3,
            name: 'Хомяк Щекастый',
            phone: '+7 926 876-54-32',
            email: 'homa@mail.ru'
        },
        {
            id: 4,
            name: 'Выдра Речная',
            phone: '+7 926 765-43-21',
            email: 'vidrar@mail.ru'
        },
        {
            id: 5,
            name: 'Попугай Птицевич',
            phone: '+7 926 234-56-78',
            email: 'popugaip@mail.ru'
        },
        {
            id: 6,
            name: 'Дельфин Плавников',
            phone: '+7 926 345-67-89',
            email: 'dolphinep@mail.ru'
        }
    ],
    errorMessage: null
}

// cases
const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTACTS_DATA:
            return {
                ...state,
                contacts: action.data
            }
        case ADD_NEW_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, {
                    id: randomId(4),
                    name: action.name,
                    phone: action.phone,
                    email: action.email
                }]
            }
        case UPDATE_NAME:
            return {
                ...state,
                contacts: state.contacts.map(item =>
                    item.id === action.id ? {...item, name: action.name} : item
                )
            }
        case UPDATE_PHONE:
            return {
                ...state,
                contacts: state.contacts.map(item =>
                    item.id === action.id ? {...item, phone: action.phone} : item
                )
            }
        case UPDATE_EMAIL:
            return {
                ...state,
                contacts: state.contacts.map(item =>
                    item.id === action.id ? {...item, email: action.email} : item
                )
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(item =>
                    item.id !== action.id
                )
            }
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.message
            }
        default:
            return state

    }
}

// actionCreators
export const setContactsData = (data) => ({type: SET_CONTACTS_DATA, data})
export const addNewContact = (name, phone, email) => ({type: ADD_NEW_CONTACT, name, phone, email})
export const updateName = (id, name) => ({type: UPDATE_NAME, id, name})
export const updatePhone = (id, phone) => ({type: UPDATE_PHONE, id, phone})
export const updateEmail = (id, email) => ({type: UPDATE_EMAIL, id, email})
export const deleteContact = (id) => ({type: DELETE_CONTACT, id})
export const setErrorMessage = (message) => ({type: SET_ERROR_MESSAGE, message})

// thunks
export const getAllContactsThunk = () => async (dispatch) => {
    try {
        const data = await contactsAPI.getAllContacts()
        dispatch(setContactsData(data))
    } catch (e) {
        console.log('Ошибка ', e)
    }
}
export const addNewContactThunk = (name, phone, email) => async (dispatch) => {
    try {
        await contactsAPI.createNewContact(name, phone, email)
    } catch (e) {
        console.log('Ошибка ', e)
    }
    dispatch(getAllContactsThunk())
}
export const updateContactThunk = (id, name, phone, email) => async (dispatch) => {
    try {
        await contactsAPI.updateContact(id, name, phone, email)
    } catch (e) {
        console.log('Ошибка ', e)
    }
    dispatch(getAllContactsThunk())
}
export const deleteContactThunk = (id) => async (dispatch) => {
    try {
        await contactsAPI.deleteContact(id)
    } catch (e) {
        console.log('Ошибка ', e)
    }
    dispatch(getAllContactsThunk())
}

export default contactsReducer
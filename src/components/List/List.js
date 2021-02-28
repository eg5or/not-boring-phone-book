import React, {useState} from 'react'
import Contact from '../Contact/Contact';
import {useFormik} from 'formik';

const List = ({
        contacts,
        updateName,
        updatePhone,
        updateEmail,
        deleteContact,
        addNewContact,
        setErrorMessage,
        errorMessage
    }) => {
    // ------------ MAPS ELEMENTS ----------------------------------
    const contactsElements = contacts.map(item => <Contact key={item.id}
                                                    id={item.id}
                                                    name={item.name}
                                                    phone={item.phone}
                                                    email={item.email}
                                                    updateName={updateName}
                                                    updatePhone={updatePhone}
                                                    updateEmail={updateEmail}
                                                    deleteContact={deleteContact}
    />)
    // ------------ / MAPS ELEMENTS --------------------------------
    // ------------ FORMIK -----------------------------------------
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
        }
    });
    // ------------ / FORMIK ---------------------------------------
    // ------------ LOCAL STATE ------------------------------------
    const [showAddContact, setShowAddContact] = useState(false)
    // ------------ / LOCAL STATE ----------------------------------
    // ------------ FUNCTIONS --------------------------------------
    const onShowAddContact = () => {
        setShowAddContact(true)
    }

    const onHideAddContact = () => {
        setShowAddContact(false)
        formik.values.name = ''
        formik.values.phone = ''
        formik.values.email = ''
        setErrorMessage(null)
    }

    const onAddContact = () => {
        if (formik.values.name.length < 1) {
            setErrorMessage('Поле Имя должно быть заполнено')
        } else if (formik.values.phone.length < 1) {
            setErrorMessage('Поле Телефон должно быть заполнено')
        } else if (formik.values.email.length < 1) {
            setErrorMessage('Поле E-mail должно быть заполнено')
        } else {
            addNewContact(formik.values.name, formik.values.phone, formik.values.email)
            onHideAddContact()
            setErrorMessage(null)
        }
    }
    // ------------ / FUNCTIONS ------------------------------------

    return <div className="list-wrapper">
        <div className="list-inner">
            <div className="list__add-contact">
                {
                    showAddContact
                        ? <div className="list__add-contact-form">
                            <div className="list__add-contact-form-item">
                                <div className="list__add-contact-icon">
                                    <span className="material-icons">
                                        badge
                                    </span>
                                </div>
                                <div className="list__add-contact-input">
                                    <input id="name"
                                           name="name"
                                           type="text"
                                           value={formik.values.name}
                                           onChange={formik.handleChange}
                                           autoFocus={true}
                                           placeholder="Имя и Фамилия"
                                    />
                                </div>
                            </div>
                            <div className="list__add-contact-form-item">
                                <div className="list__add-contact-icon">
                                    <span className="material-icons">
                                        call
                                    </span>
                                </div>
                                <div className="list__add-contact-input">
                                    <input id="phone"
                                           name="phone"
                                           type="text"
                                           value={formik.values.phone}
                                           onChange={formik.handleChange}
                                           placeholder="Телефон"
                                    />
                                </div>
                            </div>
                            <div className="list__add-contact-form-item">
                                <div className="list__add-contact-icon">
                                    <span className="material-icons">
                                        mail
                                    </span>
                                </div>
                                <div className="list__add-contact-input">
                                    <input id="email"
                                           name="email"
                                           type="text"
                                           value={formik.values.email}
                                           onChange={formik.handleChange}
                                           placeholder="E-mail"
                                    />
                                </div>
                            </div>
                            {errorMessage !== null && <div className="list__add-contact-form-error">
                                {errorMessage}
                            </div>}
                            <div className="list__add-contact-form-buttons">
                                <div onClick={onAddContact} className="list__add-contact-form-buttons-add">
                                    + Добавить
                                </div>
                                <div onClick={onHideAddContact} className="list__add-contact-form-buttons-cancel">
                                    Отмена
                                </div>
                            </div>
                        </div>
                        : <div onClick={onShowAddContact} className="list__add-contact-btn">
                                <div className="list__add-contact-icon">
                                    <span className="material-icons">
                                        person_add
                                    </span>
                                </div>
                                <div className="list__add-contact-text">Добавить контакт</div>
                            </div>
                }
            </div>
            {contactsElements.length > 0
                ? contactsElements
                : <div className="list__not">нет контактов...</div>}
        </div>
    </div>
}

export default List
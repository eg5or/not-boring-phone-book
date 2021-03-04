import React, {useState} from 'react'
import Contact from '../Contact/Contact';
import {useFormik} from 'formik';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import * as yup from 'yup';
import MaskedInput from 'react-text-mask'

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
    const contactsElements = contacts.map(item => <CSSTransition
        key={item.id}
        timeout={480}
        classNames="contact-wrapper"
        mountOnEnter
        unmountOnExit
    >
        <Contact key={item.id}
                 id={item.id}
                 name={item.name}
                 phone={item.phone}
                 email={item.email}
                 updateName={updateName}
                 updatePhone={updatePhone}
                 updateEmail={updateEmail}
                 deleteContact={deleteContact}
        />
    </CSSTransition>)
    // ------------ / MAPS ELEMENTS --------------------------------
    let validationSchema = yup.object().shape({
        name: yup.string().required('Имя обязательно'),
        phone: yup.string().required('Телефон обязателен').matches(/(\+7\ \([1-9]\d\d\)\ \d\d\d\-\d\d\-\d\d)/, 'Введите номер полностью'),
        email: yup.string().email('Некорректный email').required('E-mail обязателен'),
    });
    // ------------ FORMIK -----------------------------------------
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
        },
        validateOnMount: true,
        validationSchema: validationSchema,
    });
    // ------------ / FORMIK ---------------------------------------
    // ------------ LOCAL STATE ------------------------------------
    const [showAddContactBtn, setShowAddContactBtn] = useState(true)
    const [showAddContactForm, setShowAddContactForm] = useState(false)
    const [errorShow, setErrorShow] = useState(false)
    // ------------ / LOCAL STATE ----------------------------------
    // ------------ FUNCTIONS --------------------------------------
    const onShowAddContact = () => {
        setShowAddContactForm(true)
    }

    const onHideAddContact = () => {
        setShowAddContactForm(false)
        formik.values.name = ''
        formik.values.phone = ''
        formik.values.email = ''
        setErrorMessage(null)
    }

    const onErrorShow = (message) => {
        setErrorMessage(message)
        setErrorShow(true)
        setTimeout(() => {
            setErrorShow(false)
        }, 500)
    }

    const onAddContact = () => {
        if (formik.errors.name) {
            onErrorShow(formik.errors.name)
        } else if (formik.errors.phone) {
            onErrorShow(formik.errors.phone)
        } else if (formik.errors.email) {
            onErrorShow(formik.errors.email)
        } else {
            addNewContact(formik.values.name, formik.values.phone, formik.values.email)
            onHideAddContact()
            setErrorShow(false)
        }
    }
    // ------------ / FUNCTIONS ------------------------------------

    return <div className="list-wrapper">
        <div className="list-inner">
            <div className="list__add-contact">
                <CSSTransition
                    in={showAddContactForm}
                    timeout={{
                        enter: 900,
                        exit: 190,
                    }}
                    classNames="list__add-contact-form"
                    unmountOnExit
                    onEnter={() => setShowAddContactBtn(false)}
                    onExited={() => setShowAddContactBtn(true)}
                >
                    <div className="list__add-contact-form">
                        <div className="list__add-contact-form-item">
                            <label htmlFor="name" className="list__add-contact-icon">
                                    <span className="material-icons">
                                        badge
                                    </span>
                            </label>
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
                            <label htmlFor="phone" className="list__add-contact-icon">
                                    <span className="material-icons">
                                        call
                                    </span>
                            </label>
                            <div className="list__add-contact-input">
                                <MaskedInput  mask={['+','7',' ','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/]}
                                              showMask={true}
                                              id="phone"
                                              name="phone"
                                              type="text"
                                              value={formik.values.phone}
                                              onChange={formik.handleChange}

                                />
                            </div>
                        </div>
                        <div className="list__add-contact-form-item">
                            <label htmlFor="email" className="list__add-contact-icon">
                                    <span className="material-icons">
                                        mail
                                    </span>
                            </label>
                            <div className="list__add-contact-input">
                                <input id="email"
                                       name="email"
                                       type="email"
                                       value={formik.values.email}
                                       onChange={formik.handleChange}
                                       placeholder="E-mail"
                                />
                            </div>
                        </div>
                        <CSSTransition
                            in={errorShow}
                            timeout={1000}
                            classNames="list__add-contact-form-error"
                            mountOnEnter
                        >
                            <div className="list__add-contact-form-error">
                                {errorMessage}
                            </div>
                        </CSSTransition>
                        <div className="list__add-contact-form-buttons">
                            <div onClick={onAddContact} className="list__add-contact-form-buttons-add">
                                + Добавить
                            </div>
                            <div onClick={onHideAddContact} className="list__add-contact-form-buttons-cancel">
                                Отмена
                            </div>
                        </div>
                    </div>
                </CSSTransition>
                {showAddContactBtn && <div onClick={onShowAddContact} className="list__add-contact-btn">
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
                ? <TransitionGroup>
                    {contactsElements}
                </TransitionGroup>
                : <div className="list__not">нет контактов...</div>}
        </div>
    </div>
}

export default List
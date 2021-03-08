import React, {useState, useRef, useEffect} from 'react'
import {useFormik} from 'formik';
import {CSSTransition} from 'react-transition-group';

const Contact = ({
                     id,
                     name,
                     phone,
                     email,
                     updateName,
                     updatePhone,
                     updateEmail,
                     deleteContact,
                     dispatch
                 }) => {
    // ------------ FORMIK ---------------------------------------
    const formik = useFormik({
        initialValues: {
            name: name,
            phone: phone,
            email: email,
        }
    });
    // ------------ / FORMIK ---------------------------------------
    // ------------ LOCAL STATE ------------------------------------
    const [openInform, setOpenInform] = useState(false)
    const [editIconPhoneShow, setEditIconPhoneShow] = useState(false)
    const [editIconEmailShow, setEditIconEmailShow] = useState(false)
    const [editModeName, setEditModeName] = useState(false)
    const [editModePhone, setEditModePhone] = useState(false)
    const [editModeEmail, setEditModeEmail] = useState(false)
    // ------------ / LOCAL STATE ----------------------------------
    // ------------ HOOKS ------------------------------------------
    const contactWrapper = useRef()
    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick)
    }, [])
    // ------------ / HOOKS ----------------------------------------
    // ------------ FUNCTIONS --------------------------------------
    const handleOutsideClick = (e) => {
        if (!e.path.includes(contactWrapper.current)) {
            setOpenInform(false)
            setEditModeName(false)
            setEditModePhone(false)
            setEditModeEmail(false)
        }
    }
    const onOpenInform = () => {
        setOpenInform(!openInform)
    }
    const onEditIconPhoneShow = () => {
        setEditIconPhoneShow(true)
    }
    const onEditIconPhoneHide = () => {
        setEditIconPhoneShow(false)
    }
    const onEditIconEmailShow = () => {
        setEditIconEmailShow(true)
    }
    const onEditIconEmailHide = () => {
        setEditIconEmailShow(false)
    }
    const onEditMode = (e) => {
        switch (e.target.id || e.target.parentNode.id) {
            case 'name':
            case 'name-edit-btn':
                if (editModeName) {
                    dispatch(updateName(id, formik.values.name))
                    setEditModeName(false)
                } else {
                    setEditModeName(true)
                }
                break
            case 'email':
            case 'email-edit-btn':
                if (editModeEmail) {
                    dispatch(updateEmail(id, formik.values.email))
                    setEditModeEmail(false)
                } else {
                    setEditModeEmail(true)
                }
                break
            case 'phone':
            case 'phone-edit-btn':
                if (editModePhone) {
                    dispatch(updatePhone(id, formik.values.phone))
                    setEditModePhone(false)
                } else {
                    setEditModePhone(true)
                }
                break
            default:
                break
        }
    }
    const onKeyEnter = (e) => {
        if (e.code === 'Enter') {
            onEditMode(e)
        }
    }
    const onDeleteContact = () => {
        dispatch(deleteContact(id))
    }
    // ------------ / FUNCTIONS ------------------------------------

    return <div ref={contactWrapper} className="contact-wrapper">
            <div onClick={onOpenInform} className={`contact-name-wrapper ${openInform && 'contact-name-open'}`}>
                <div className="contact-name__avatar">
                <span className="material-icons">
                    account_circle
                </span>
                </div>
                {
                    editModeName
                        ? <div className="contact-name__input">
                            <input id="name"
                                   name="name"
                                   type="text"
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   autoFocus={true}
                                   onKeyDown={onKeyEnter}
                            />
                        </div>
                        : <div className="contact-name__name">
                            {name}
                        </div>
                }
                <div className="contact-name__arrow">
                    <span className="material-icons">
                        { openInform ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }
                    </span>
                </div>
            </div>
            <CSSTransition
                in={openInform}
                timeout={300}
                classNames="contact-inform-wrapper"
                mountOnEnter
                unmountOnExit
            >
                <div className={`contact-inform-wrapper ${openInform && 'contact-inform-open'}`}>
                    <div className="contact-inform__phone-wrapper"
                         onMouseEnter={onEditIconPhoneShow} onMouseLeave={onEditIconPhoneHide}
                    >
                        {
                            editModePhone
                                ? <div className="contact-inform__phone-input">
                                    <input id="phone"
                                           name="phone"
                                           type="tel"
                                           value={formik.values.phone}
                                           onChange={formik.handleChange}
                                           autoFocus={true}
                                           onKeyDown={onKeyEnter}
                                    />
                                </div>
                                : <div className="contact-inform__phone-text">
                                    {phone}
                                </div>
                        }
                        <div id="phone-edit-btn" className="contact-inform__phone-edit-icon"
                             onClick={onEditMode}
                        >
                    <span className="material-icons">
                        {editModePhone ? 'done' : editIconPhoneShow && 'edit'}
                    </span>
                        </div>
                    </div>
                    <div className="contact-inform__email">
                        <div className="contact-inform__email-wrapper"
                             onMouseEnter={onEditIconEmailShow} onMouseLeave={onEditIconEmailHide}
                        >
                            {
                                editModeEmail
                                    ? <div className="contact-inform__email-input">
                                        <input id="email"
                                               name="email"
                                               type="text"
                                               value={formik.values.email}
                                               onChange={formik.handleChange}
                                               autoFocus={true}
                                               onKeyDown={onKeyEnter}
                                        />
                                    </div>
                                    : <div className="contact-inform__email-text">
                                        {email}
                                    </div>
                            }
                            <div id="email-edit-btn" className="contact-inform__email-edit-icon"
                                 onClick={onEditMode}
                            >
                        <span className="material-icons">
                            {editModeEmail ? 'done' : editIconEmailShow && 'edit'}
                        </span>
                            </div>
                        </div>
                    </div>
                    <div className="contact-inform__buttons">
                        <div id="name-edit-btn" onClick={onEditMode}
                             className="contact-inform__buttons-change-name"
                        >
                            {editModeName ? 'сохранить имя' : 'изменить имя'}
                        </div>
                        <div onClick={onDeleteContact} className="contact-inform__buttons-delete-contact">
                    <span className="material-icons">
                        delete
                    </span>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>

}

export default Contact
import React, {useState} from 'react'
import {useFormik} from 'formik';

const Contact = ({
                     id,
                     name,
                     phone,
                     email,
                     updateName,
                     updatePhone,
                     updateEmail,
                     deleteContact
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
    // ------------ FUNCTIONS --------------------------------------
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
    const onEditModeNameOpen = () => {
        setEditModeName(true)
    }
    const onEditModeNameClose = () => {
        updateName(id, formik.values.name)
        setEditModeName(false)
    }
    const onKeyEnter = (e) => {
        if (e.code === 'Enter') {
            onEditModeNameClose()
        }
    }
    const onEditModePhoneOpen = () => {
        setEditModePhone(true)
    }
    const onEditModePhoneClose = () => {
        updatePhone(id, formik.values.phone)
        setEditModePhone(false)
    }
    const onEditModeEmailOpen = () => {
        setEditModeEmail(true)
    }
    const onEditModeEmailClose = () => {
        updateEmail(id, formik.values.email)
        setEditModeEmail(false)
    }
    const onDeleteContact = () => {
        deleteContact(id)
    }


    // ------------ / FUNCTIONS ------------------------------------

    return <div className="contact-wrapper">
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
                {openInform
                    ? <span className="material-icons">
                        keyboard_arrow_up
                    </span>
                    : <span className="material-icons">
                        keyboard_arrow_down
                    </span>
                }
            </div>
        </div>
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
                            />
                        </div>
                        : <div className="contact-inform__phone-text">
                            {phone}
                        </div>
                }
                <div className="contact-inform__phone-edit-icon"
                     onClick={editModePhone ? onEditModePhoneClose : editIconPhoneShow ? onEditModePhoneOpen : undefined}
                >
                    <span className="material-icons">
                        { editModePhone ? 'done' : editIconPhoneShow && 'edit' }
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
                                />
                            </div>
                            : <div className="contact-inform__email-text">
                                {email}
                            </div>
                    }
                    <div className="contact-inform__email-edit-icon"
                         onClick={editModeEmail ? onEditModeEmailClose : editIconEmailShow ? onEditModeEmailOpen : undefined}
                    >
                        <span className="material-icons">
                            { editModeEmail ? 'done' : editIconEmailShow &&  'edit' }
                        </span>
                    </div>
                </div>
            </div>
            <div className="contact-inform__buttons">
                <div onClick={editModeName ? onEditModeNameClose : onEditModeNameOpen}
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
    </div>
}

export default Contact
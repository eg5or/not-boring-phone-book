import React, {useState, useEffect} from 'react';
import List from './components/List/List';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {
    addNewContact,
    deleteContact,
    setErrorMessage,
    updateEmail,
    updateName,
    updatePhone
} from './redux/contactsReducer';
import {useFormik} from 'formik';

function App(props) {
    // ------------ FORMIK -----------------------------------------
    const formik = useFormik({
        initialValues: {
            search: ''
        }
    });
    // ------------ / FORMIK ---------------------------------------
    // ------------ LOCAL STATE ------------------------------------
    const [searchMode, setSearchMode] = useState(false)
    const [foundContacts, setFoundContacts] = useState([])
    // ------------ / LOCAL STATE ----------------------------------
    // ------------ FUNCTIONS --------------------------------------
    const onSearch = (e) => {
        setFoundContacts(props.contacts.filter(item => new RegExp(e, 'i').test(item.name)))
    }
    // ------------ / FUNCTIONS ------------------------------------
    useEffect(() => {
        if (formik.values.search.length > 0) {
            onSearch(formik.values.search)
            setSearchMode(true)
        } else {
            setSearchMode(false)
        }
    }, [formik.values.search, props.contacts])

    return (
        <div className="app-wrapper">
            <div className="block-main">
                <div className="header">
                    <div className="title">
                        <h1><span>(not)</span> Boring Phone Book</h1>
                    </div>
                    <div className="search-wrapper">
                        <div className="search-inner">
                            <input id="search"
                                   name="search"
                                   type="text"
                                   value={formik.values.search}
                                   onChange={formik.handleChange}
                                   className="search__input"
                                   placeholder="Введите имя или фамилию..."
                            />
                        </div>
                    </div>
                </div>
                {
                    searchMode
                    ? <List contacts={foundContacts}
                            updateName={props.updateName}
                            updatePhone={props.updatePhone}
                            updateEmail={props.updateEmail}
                            deleteContact={props.deleteContact}
                            addNewContact={props.addNewContact}
                            setErrorMessage={props.setErrorMessage}
                            errorMessage={props.errorMessage}
                        />
                    : <List contacts={props.contacts}
                                updateName={props.updateName}
                                updatePhone={props.updatePhone}
                                updateEmail={props.updateEmail}
                                deleteContact={props.deleteContact}
                                addNewContact={props.addNewContact}
                                setErrorMessage={props.setErrorMessage}
                                errorMessage={props.errorMessage}
                    />
                }


            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    contacts: state.contacts.contacts,
    errorMessage: state.contacts.errorMessage,
})

export default compose(
    connect(mapStateToProps, {
        addNewContact,
        updateName,
        updatePhone,
        updateEmail,
        deleteContact,
        setErrorMessage
    })
)(App)

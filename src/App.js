import React, {useState, useEffect} from 'react';
import List from './components/List/List';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';

function App(props) {
    // ------------ LOCAL STATE ------------------------------------
    const [searchMode, setSearchMode] = useState(false)
    const [foundContacts, setFoundContacts] = useState([])
    // ------------ / LOCAL STATE ----------------------------------
    // ------------ FORMIK -----------------------------------------
    const formik = useFormik({
        initialValues: {
            search: ''
        }
    });
    // ------------ / FORMIK ---------------------------------------
    // ------------ HOOKS ------------------------------------------
    const {contacts, errorMessage} = useSelector(({contacts}) => contacts)

    useEffect(() => {
        if (formik.values.search.length > 0) {
            onSearch(formik.values.search)
            setSearchMode(true)
        } else {
            setSearchMode(false)
        }
    }, [formik.values.search, contacts])
    // ------------ / HOOKS ----------------------------------------
    // ------------ FUNCTIONS --------------------------------------
    const onSearch = (e) => {
        setFoundContacts(contacts.filter(item => new RegExp(e, 'i').test(item.name)))
    }
    const clearSearch = () => {
        formik.setFieldValue('search', '')
    }
    // ------------ / FUNCTIONS ------------------------------------
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
                        { formik.values.search.length > 0 && <div onClick={clearSearch} className="search-clear">
                            <span className="material-icons">
                                clear
                            </span>
                        </div>}
                    </div>
                </div>
                <List contacts={searchMode ? foundContacts : contacts} errorMessage={errorMessage} />
            </div>
        </div>
    );
}

export default App

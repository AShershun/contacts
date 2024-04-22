import React, {useState} from 'react';

import styles from './contacts.module.css';

const ContactForm = ({addContact, toggleForm}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !surname.trim() || !phone.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        const newContact = {
            id: Date.now(),
            name,
            surname,
            phone
        };
        addContact(newContact);
        setName('');
        setSurname('');
        setPhone('');
    };

    return (
        <form className={styles.contact_form} onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='First name'
                value={name}
                onChange={(e) => setName(e.target.value.trim())}
            />
            <input
                type='text'
                placeholder='Surname'
                value={surname}
                onChange={(e) => setSurname(e.target.value.trim())}
            />
            <input
                type='text'
                placeholder='Phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value.trim())}
            />
            <div className={styles.btns_block}>
                <button type='submit' className={styles.btn_add}>Add</button>
                <button type='button' className={styles.btn_cancel} onClick={() => {toggleForm()}}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ContactForm;

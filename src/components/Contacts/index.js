import React, {useState, useEffect} from 'react';
import ContactItem from './ContactItem';
import ContactForm from './ContactForm';

import styles from './contacts.module.css';

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setContacts(data.map(contact => {
                const [name, surname] = splitName(contact.name);
                return {...contact, name, surname};
            })))
            .catch(error => {
                console.error('Error get contacts:', error);
            });
    }, []);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const addContact = (newContact) => {
        setContacts([...contacts, newContact]);
    };

    const removeContact = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    //Функциія розбиває поле ім'я на ім'я та прізвище враховуючи приставки та подвійне прізвище
    const splitName = (name) => {
        const matches = name.match(/^(\w+\.)?\s*(\S+)\s*(.*)$/);
        if (matches) {
            const firstName = matches[1] ? `${matches[1]} ${matches[2]}` : matches[2];
            const lastName = matches[3] ? matches[3] : '';
            return [firstName.trim(), lastName.trim()];
        } else {
            return [name, ''];
        }
    };

    return (
        <div className={styles.contact_wrapper}>
            <h2 className={styles.page_title}>Список контактів</h2>
            <table className={styles.contact_list}>
                <thead>
                <tr>
                    <th>First name</th>
                    <th>Surname</th>
                    <th>Phome</th>
                </tr>
                </thead>
                <tbody>
                {contacts.map(contact => (
                    <ContactItem key={contact.id} contact={contact} removeContact={removeContact}/>
                ))}
                </tbody>
                <button onClick={toggleForm} className={styles.contact_add_btn}>Add contact</button>
            </table>

            {showForm && <ContactForm addContact={addContact} toggleForm={toggleForm} />}
        </div>
    );
}

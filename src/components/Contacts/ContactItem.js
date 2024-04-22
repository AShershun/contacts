import styles from './contacts.module.css';

export default function ContactItem({contact, removeContact}) {

    const handleRemove = () => {
        removeContact(contact.id);
    };

    return(
        <tr>
            <td>{contact.name}</td>
            <td>{contact.surname}</td>
            <td>{contact.phone}</td>
            <td>
                <button className={styles.contact_remove_btn} onClick={handleRemove}>×</button>
            </td>
        </tr>
    )
}
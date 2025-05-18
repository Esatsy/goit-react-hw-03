import styles from './Contact.module.css';

const Contact = ({ contact, onDeleteContact }) => {
  return (
    <li className={styles.item}>
      <span>{contact.name}: {contact.number}</span>
      <button className={styles.button} onClick={() => onDeleteContact(contact.id)}>
        Delete
      </button>
    </li>
  );
};

export default Contact; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const ContactForm = ({ onAddContact, contacts }) => {
  const handleSubmit = (values, { resetForm }) => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    onAddContact({
      id: nanoid(),
      name: values.name,
      number: values.number,
    });

    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">Name</label>
          <Field className={styles.input} type="text" name="name" id="name" />
          <ErrorMessage className={styles.error} name="name" component="div" />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="number">Number</label>
          <Field className={styles.input} type="tel" name="number" id="number" />
          <ErrorMessage className={styles.error} name="number" component="div" />
        </div>

        <button className={styles.button} type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm; 
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, Button } from './ContactForm.styled';

export const ContactForm = ({onSubmit, contacts}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const toggleInputValue = ({ currentTarget }) => {
    switch (currentTarget.name) {
      case 'name': setName(currentTarget.value)
        break;
       case 'number': setNumber(currentTarget.value)
          break
          default:
            break
        }
  };
const handlerOnSubmit = event => {
    event.preventDefault();
    if (!checkUniqueNameInContacts(name)) {
      return;
    } else {
      onSubmit({name, number});
    }

    reset();
  };
   const reset = () => {
     setName('')
     setNumber('')
  };
  const checkUniqueNameInContacts = name => {
    const unickName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (unickName) {
      alert(`${name} is already in Contacts`);
      return false;
    } else {
      return true;
    }
  };
  return (
      <Form onSubmit={handlerOnSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={toggleInputValue}
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={toggleInputValue}
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    );
}


ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onSubmit: PropTypes.func,
};

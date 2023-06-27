import PropTypes from 'prop-types';

export const ContactList = ({ onDeleteContact, filter }) => {
  return (
    <>
      <ul>
        {filter().map(({ id, name, number }) => {
          return (
            <li key={id}>
              {name}: {number}
              <button type="button" onClick={() => onDeleteContact(id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

ContactList.protoType = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactList extends Component {
  render() {
    return (
      <>
        <ul>
          {this.props.filter().map(({ id, name, number }) => {
            return (
              <li key={id}>
                {name}: {number}
                <button
                  type="button"
                  onClick={() => {
                    this.props.onDeleteContact(id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default ContactList;

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

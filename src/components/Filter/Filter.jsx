import PropTypes from 'prop-types';

export const Filter = ({ onChangeFilter }) => {
  return (
    <>
      <label htmlFor="">Find contacts by name</label>
      <input type="text" id="findContacts" onChange={onChangeFilter} />
    </>
  );
};

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
};

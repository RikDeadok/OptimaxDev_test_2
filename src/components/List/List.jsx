import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem';
import './list.scss';

function List({ list }) {
  return (
    <ul className="todo-list">
      {list.map((item, index) => (
        <ListItem todo={item} index={index} key={index} />
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.array,
};
List.defaultProps = {
  list: [],
};

export default List;

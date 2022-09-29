import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem';
import './list.css';

function List({ list }) {
  return (
    <ul className="todo-list">
      {list.map((item, index) => (
        <ListItem todo={item} index={index} key={item.toString()} />
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
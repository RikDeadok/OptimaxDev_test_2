import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context';
import './listItem.css';

function ListItem({ todo, index }) {
  const { removeTodo } = useContext(Context);

  return (
    <li className="todo-item">
      <strong>{index + 1}</strong>
      <div className="todo-item__checkbox">
        <input className="checkbox__input" type="checkbox" id={index} name={index} />
        <label className="checkbox__label" htmlFor={index} />
      </div>
      <div className="todo-item__todo">
        {todo}
      </div>
      <button className="todo-item__btn" type="submit" onClick={() => removeTodo(index)}>&times;</button>
    </li>
  );
}

ListItem.propTypes = {
  todo: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default ListItem;

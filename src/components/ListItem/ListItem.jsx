import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context';
import './listItem.scss';

function ListItem({ todo, index }) {
  const { removeTodo, changeChecked } = useContext(Context);

  return (
    <li className="todo-item">
      <strong>{index + 1}</strong>
      <div className="todo-item__checkbox">
        <input className="checkbox__input" type="checkbox" id={index} name={index} onChange={() => changeChecked(index)} checked={todo.checked}/>
        <label className="checkbox__label" htmlFor={index} />
      </div>
      <div className={`todo-item__todo ${todo.checked ? "todo-item--checked" : ""}`}>
        {todo.name}
      </div>
      <button className="todo-item__btn" type="submit" onClick={() => removeTodo(index)}>&times;</button>
    </li>
  );
}

ListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default ListItem;
import React from "react";
import { useContext } from "react";
import "./listItem.css";
import Context from "../../context";

const ListItem = ({ todo, index }) => {
  const { removeTodo } = useContext(Context)

  return (
    <li className="todo-item">
      <strong>{index + 1}</strong>
      <div className="todo-item__checkbox">
        <input className="checkbox__input" type="checkbox" id={index} name={index} />
        <label className="checkbox__label" for={index}></label>
      </div>
      <div className="todo-item__todo">
        {todo}
      </div>
      <button className="todo-item__btn" onClick={() => removeTodo(index)}>&times;</button>
    </li>
  );
};
export default ListItem;
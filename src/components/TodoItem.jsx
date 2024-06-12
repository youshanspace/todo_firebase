import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { editTodo, deleteTodo } from '../store';
import TodoEdit from './TodoEdit';

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [edit, setEdit] = useState(false);

  const handleTitleEdit = () => {
    setEdit(!edit);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleCheckboxChange = () => {
    const updatedTodo = { ...todo, completed: !isCompleted };
    dispatch(editTodo(updatedTodo));
    setIsCompleted(!isCompleted);
  };

  const handleSubmit = () => {
    setEdit(false);
  };

  let editContent = todo.title;
  if (edit) {
    editContent = <TodoEdit todo={todo} onSubmit={handleSubmit} />;
  }

  return (
    <div className={todo.completed ? 'todo-item-container is-completed' : 'todo-item-container'}>
      <input type="checkbox" onChange={handleCheckboxChange} checked={todo.completed} />
      <div className="content">{editContent}</div>
      <div className="actions">
        <button onClick={handleTitleEdit}>
          <MdModeEdit />
        </button>
        <button onClick={handleDelete}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;

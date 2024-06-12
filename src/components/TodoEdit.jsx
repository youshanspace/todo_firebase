import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo } from '../store';
import { MdTask } from 'react-icons/md';

function TodoEdit({ todo, onSubmit }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(todo.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTodo = { ...todo, title };
    dispatch(editTodo(updatedTodo));
    onSubmit();
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <input autoFocus spellCheck={false} value={title} onChange={handleChange} />
      <button type="submit">
        <MdTask />
      </button>
    </form>
  );
}

export default TodoEdit;

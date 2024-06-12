import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addTodo } from '../store';
import { IoAdd } from 'react-icons/io5';

function InputForm() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      const newTodo = {
        title: input,
        completed: false,
        createdTime: new Date().toISOString(),
      };
      dispatch(addTodo(newTodo));
    }
    setInput('');
  };

  return (
    <form className="input-form" onSubmit={handelSubmit}>
      <input spellCheck="false" placeholder="Add a new todo" value={input} onChange={handleChange} />
      <button type="submit">
        <IoAdd />
      </button>
    </form>
  );
}

export default InputForm;

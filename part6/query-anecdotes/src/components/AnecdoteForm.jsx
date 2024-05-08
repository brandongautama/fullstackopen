import axios from 'axios';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const AnecdoteForm = ({ newAnecdoteMutation }) => {
  const [notification, dispatch] = useContext(NotificationContext);
  console.log('see', newAnecdoteMutation);
  const onCreate = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    console.log('new anecdote');
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: 'SET', payload: `you added ${content}` });
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

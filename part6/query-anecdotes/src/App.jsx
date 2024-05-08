import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import NotificationContext from './NotificationContext';

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: newAnecdote =>
      axios
        .post('http://localhost:3001/anecdotes', newAnecdote)
        .then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
    onError: () => {
      dispatch({ type: 'SET', payload: `anecdote too short` });
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: newAnecdote =>
      axios
        .put(`http://localhost:3001/anecdotes/${newAnecdote.id}`, newAnecdote)
        .then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () =>
      axios.get('http://localhost:3001/anecdotes').then(res => res.data),
  });
  console.log(JSON.parse(JSON.stringify(result)));

  const handleVote = anecdote => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: 'SET', payload: `you voted ${anecdote.content}` });
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000);
    console.log('vote');
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

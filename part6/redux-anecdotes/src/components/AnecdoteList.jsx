import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(a => a.content.includes(filter));
  });
  const dispatch = useDispatch();

  anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1));

  const vote = anecdote => {
    dispatch(setNotification(`you voted ${anecdote.content}`, 5000));
    dispatch(addVote(anecdote));
  };

  console.log('List render');
  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

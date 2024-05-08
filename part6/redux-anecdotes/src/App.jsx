import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1));

  const addAnecdote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const action = {
      type: 'NEW_ANECDOTE',
      payload: {
        content,
      },
    };
    dispatch(action);
  };

  const vote = id => {
    const action = {
      type: 'VOTE',
      payload: { id },
    };
    return dispatch(action);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>add</button>
      </form>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;

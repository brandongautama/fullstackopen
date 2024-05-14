import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';

import {
  ALL_AUTHORS_QUERY,
  ALL_BOOKS_QUERY,
  CREATE_BOOK_MUTATION,
  EDIT_BIRTHYEAR_MUTATION,
} from './queries';
import LoginForm from './components/LoginForm';

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const [books, setBooks] = useState([]);

  const allAuthorsResponse = useQuery(ALL_AUTHORS_QUERY);

  const allBooksResponse = useQuery(ALL_BOOKS_QUERY, {
    skip: page !== 'books',
    onCompleted: data => setBooks(data.allBooks),
  });

  const [createBook] = useMutation(CREATE_BOOK_MUTATION, {
    refetchQueries: [{ query: ALL_BOOKS_QUERY }, { query: ALL_AUTHORS_QUERY }],
    onError: error => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR_MUTATION, {
    refetchQueries: [{ query: ALL_AUTHORS_QUERY }],
    onError: error => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  const notify = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        authors={allAuthorsResponse}
        editBirthyear={editBirthyear}
      />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} createBook={createBook} />

      <LoginForm show={page === 'login'} setError={notify} />
    </div>
  );
};

export default App;

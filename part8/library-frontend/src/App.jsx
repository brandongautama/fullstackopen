import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

import {
  ALL_AUTHORS_QUERY,
  ALL_BOOKS_QUERY,
  CREATE_BOOK_MUTATION,
  EDIT_BIRTHYEAR_MUTATION,
} from './queries';

const App = () => {
  const [page, setPage] = useState('authors');

  const allAuthorsResponse = useQuery(ALL_AUTHORS_QUERY);

  const allBooksResponse = useQuery(ALL_BOOKS_QUERY, {
    skip: page !== 'books',
  });

  const [createBook] = useMutation(CREATE_BOOK_MUTATION, {
    refetchQueries: [{ query: ALL_BOOKS_QUERY }, { query: ALL_AUTHORS_QUERY }],
  });

  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR_MUTATION, {
    refetchQueries: [{ query: ALL_AUTHORS_QUERY }],
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={allAuthorsResponse}
        editBirthyear={editBirthyear}
      />

      <Books show={page === 'books'} books={allBooksResponse} />

      <NewBook show={page === 'add'} createBook={createBook} />
    </div>
  );
};

export default App;

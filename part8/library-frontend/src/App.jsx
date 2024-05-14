import { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const ALL_AUTHORS_QUERY = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS_QUERY = gql`
  query {
    allBooks {
      title
      published
      author
      genres
    }
  }
`;

const CREATE_BOOK_MUTATION = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author
      id
      genres
    }
  }
`;

const EDIT_BIRTHYEAR_MUTATION = gql`
  mutation editBirthyear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
    }
  }
`;

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

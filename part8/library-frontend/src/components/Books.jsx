import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { ALL_BOOKS_QUERY } from '../queries';

const Books = props => {
  // const [books, setBooks] = useState([]);

  // const fetchedBooks = useQuery(ALL_BOOKS_QUERY, {
  //   // skip: page !== 'books',
  //   onCompleted: data => setBooks(data.allBooks),
  // });

  const [genre, setGenre] = useState(null);

  if (!props.show) {
    return null;
  }

  const books = props.books ? props.books : [];
  const genres = new Set();
  books.forEach(book => genres.add(...book.genres));
  const filteredBooks = genre
    ? books.filter(book => book.genres.includes(genre))
    : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {Array.from(genres).map(genre => (
        <button
          key={genre}
          value={genre}
          onClick={({ target }) => setGenre(target.value)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;

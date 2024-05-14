import { gql } from '@apollo/client';

export const ALL_AUTHORS_QUERY = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`;

export const ALL_BOOKS_QUERY = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;

export const CREATE_BOOK_MUTATION = gql`
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

export const EDIT_BIRTHYEAR_MUTATION = gql`
  mutation editBirthyear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
    }
  }
`;

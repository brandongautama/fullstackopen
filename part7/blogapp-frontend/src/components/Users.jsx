import { useState, useEffect } from 'react';
import usersService from '../services/users';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';

const Users = () => {
  const users = useSelector(store => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <div>
        <table className='table striped'>
          <thead>
            <tr>
              <th scope='col'>name</th>
              <th scope='col'>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map(user => {
                return (
                  <tr key={user.id}>
                    <td>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </td>
                    <td>{user.blogs.length}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

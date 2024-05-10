import { useState, useEffect } from 'react';
import usersService from '../services/users';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then(allUsers => setUsers(allUsers));
  });

  return (
    <div>
      <h2>Users</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th scope='col'>name</th>
              <th scope='col'>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
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

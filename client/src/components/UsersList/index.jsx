import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './UsersList.module.sass';
import defImage from './defaultPhoto.jpg';
import { useEffect } from 'react';
import { getUsersThunk, removeUserThunk } from '../../store/slices/usersSlice';

export const UsersList = ({
  users,
  isFetching,
  error,
  getUsers,
  removeUser,
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <BeatLoader loading={isFetching} />
      {error && <div>{error.message || '!!!ERROR!!!'}</div>}
      {users.length === 0 && !isFetching && <div>No users found.</div>}
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <img
              src={u.image ? `http://localhost:5001/${u.image}` : defImage}
              alt={u.nickname}
              className={styles.userImage}
            />
            <p>{JSON.stringify(u)}</p>
            <button
              onClick={() => {
                removeUser(u.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = ({ usersData }) => ({
  isFetching: usersData.isFetching,
  error: usersData.error,
  users: usersData.users,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsersThunk()),
  removeUser: id => dispatch(removeUserThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);

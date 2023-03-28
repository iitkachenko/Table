import React from 'react';
import Table from '../components/Table/Table';
import usersColumns from './usersColumns';

const Users = () => {

  return (
    <>
        <h1>Users</h1>
        <Table tableName='users' columns={usersColumns} />
    </>
  )
}

export default Users;
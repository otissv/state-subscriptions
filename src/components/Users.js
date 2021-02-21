import React from "react";

import { useFetchEffect, useSubscribe } from "../hooks";
import { useStoreSubscribe } from "../StoreContext";

export function Users() {
  const [users, setUsers] = useStoreSubscribe("users").value();

  function replaceUsers(resultP) {
    resultP()
      .then((data) =>
        setUsers(() => ({
          users: data,
        }))
      )
      .catch(console.log);
  }

  useFetchEffect(
    {
      url: "https://jsonplaceholder.typicode.com/users",
    },
    replaceUsers
  );

  return (
    <div>
      <h2>Users</h2>
      <UserCount count={users.length} />
      <UsersList users={users} />
    </div>
  );
}

function UserCount({ count }) {
  return <div>{count}</div>;
}

function UsersList({ users = [] }) {
  return users.map(({ id, name }) => <div key={id}>{name}</div>);
}

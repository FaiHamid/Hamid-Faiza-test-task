import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import * as usersActions from "./features/usersSlice";
import { Circles } from "react-loader-spinner";
import { addQuery, changeSort, resetQuery } from "./features/filtersSlice";
import { SortBy } from "./types/filters";
import { handleFilteredUsers } from "./utils/handleFilteredUsers";

export function App() {
  const users = useAppSelector((state) => state.users.users);
  const usersStatus = useAppSelector((state) => state.users.status);
  const query = useAppSelector((state) => state.filters.query);
  const sort = useAppSelector(state => state.filters.sort);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersActions.usersAsync());
  }, []);

  const filters = Object.values(SortBy);

  const filteredUsers = handleFilteredUsers(users, query, sort);

  return (
    <>

      <div className="filters">
      <div className="field search">
        <div className="control has-icons-right">
          <input
            className="input"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => dispatch(addQuery(e.target.value))}
          />

          {query && (
            <span className="icon is-right">
              <button
                className="delete is-small"
                onClick={() => dispatch(resetQuery())}
              ></button>
            </span>
          )}
        </div>
      </div>
      
      <div className="select_container">
        <p className="text">Sort by:</p>
        <div className="select">
          <select value={sort} onChange={e => dispatch(changeSort(e.target.value as SortBy))}>
            {filters.map(filter => (
              <option key={uuidv4()}>{filter}</option>
            ))}
          </select>
        </div>
      </div>
      </div>
      {usersStatus === "loading" && (
        <Circles
          height="80"
          width="80"
          color="black"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}

      {!filteredUsers.length && <p>Nothing match</p>}

      {usersStatus === "idle" && filteredUsers.length > 0 && (
        <table className="table is-bordered is-striped is-hoverable is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => {
              const {
                name,
                username,
                email,
                address,
                phone,
                website,
                company,
              } = user;

              return (
                <tr key={uuidv4()}>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{`${address.city}, ${address.street}`}</td>
                  <td>{phone}</td>
                  <td>{website}</td>
                  <td>{company.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

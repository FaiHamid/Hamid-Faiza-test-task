import { SortBy } from "../types/filters";
import { User } from "../types/User";

export const handleFilteredUsers = (users: User[], query: string, sort: SortBy): User[] => {
  let filteredUsers = [...users];

  if (query.trim()) {
    const normalQuery = query.trim().toLowerCase();

    filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(normalQuery) 
    || user.username.toLowerCase().includes(normalQuery)
    || user.email.toLowerCase().includes(normalQuery)
    || user.phone.toLowerCase().includes(normalQuery))
  }

  if (sort !== SortBy.None) {
    filteredUsers = filteredUsers.sort((user1, user2) => user1[sort].localeCompare(user2[sort])
    )
  }

  return filteredUsers;
}
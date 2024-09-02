import { User } from "../types/User";

function wait(delay: number) {
  return new Promise(resolve =>
    setTimeout(resolve, delay)
  )
} 

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(): Promise<User[]> {
  return wait(200)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}
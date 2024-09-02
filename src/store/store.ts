import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import usersReducer from '../features/usersSlice';
import filtersReducer from '../features/filtersSlice';


export const store = configureStore({
  reducer: {
    users: usersReducer,
    filters: filtersReducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
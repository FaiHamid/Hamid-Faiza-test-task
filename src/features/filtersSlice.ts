import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortBy } from "../types/filters";

export interface FiltersState {
  query: string;
  sort: SortBy;
}

const initialState: FiltersState = {
  query: '',
  sort: SortBy.None,
};


export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addQuery: (state: FiltersState, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    resetQuery: (state: FiltersState) => {
      state.query = '';
    },
    changeSort: (state: FiltersState, action: PayloadAction<SortBy>) => {
      state.sort = action.payload;
    }
  },
});

export const { addQuery, resetQuery, changeSort } = filtersSlice.actions;
export default filtersSlice.reducer;
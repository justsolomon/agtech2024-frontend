import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const driverSlice = createSlice({
  name: 'driver',
  initialState: { isSearchPensModalOpen: false, isFilterPensModalOpen: false },
  reducers: {
    toggleActionModalOpen: (
      state,
      action: PayloadAction<'search' | 'filter'>,
    ) => {
      switch (action.payload) {
        case 'search':
          state.isSearchPensModalOpen = !state.isSearchPensModalOpen;
          break;
        case 'filter':
          state.isFilterPensModalOpen = !state.isFilterPensModalOpen;
          break;
      }
    },
  },
});

export const { toggleActionModalOpen } = driverSlice.actions;

export default driverSlice.reducer;

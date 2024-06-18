import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    isSearchPensModalOpen: false,
    isFilterPensModalOpen: false,
    inIssuePinMode: false,
    isFilterActive: false,
  },
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
    toggleIssuePinMode: (state) => {
      state.inIssuePinMode = !state.inIssuePinMode;
    },
    setFilterActive: (state, action: PayloadAction<boolean>) => {
      state.isFilterActive = action.payload;
    },
  },
});

export const { toggleActionModalOpen, toggleIssuePinMode, setFilterActive } =
  driverSlice.actions;

export default driverSlice.reducer;

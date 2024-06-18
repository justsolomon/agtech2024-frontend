import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialDriverState, LocalFarmRun, PenDump } from 'types';

const initialState: InitialDriverState = {
  isSearchPensModalOpen: false,
  isFilterPensModalOpen: false,
  inIssuePinMode: false,
  isFilterActive: false,
  activeRun: null,
};

export const driverSlice = createSlice({
  name: 'driver',
  initialState,
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
    setActiveRun: (state, action: PayloadAction<LocalFarmRun | null>) => {
      if (action.payload === null) {
        state.activeRun = null;
        return;
      }

      state.activeRun = {
        data: action.payload,
        penDumps: [],
      };
    },
    addNewPenDump: (state, action: PayloadAction<PenDump>) => {
      if (state.activeRun) {
        state.activeRun.penDumps.push(action.payload);
      }
    },
  },
});

export const {
  toggleActionModalOpen,
  toggleIssuePinMode,
  setFilterActive,
  setActiveRun,
  addNewPenDump,
} = driverSlice.actions;

export default driverSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  instance: {},
  address: null,
};

const walletSlice = createSlice({
  name: 'walletSlice',
  initialState,
  reducers: {
    walletConnected: (state, action) => {
      state.name = action.payload;
    },
    walletDisconnected: (state) => {
      state.name = null;
    },
    updateWalletInstance: (state, action) => {
      state.instance = action.payload;
      if (Object.keys(action.payload).length == 0) {
        state.address = null;
      }
    },
    updateWalletAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { walletConnected, walletDisconnected, updateWalletInstance, updateWalletAddress } = walletSlice.actions;
export default walletSlice.reducer;

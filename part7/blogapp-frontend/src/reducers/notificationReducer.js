import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const setNotification = notification => {
  return dispatch => {
    dispatch(notificationSlice.actions.setNotification(notification));
  };
};

export default notificationSlice.reducer;

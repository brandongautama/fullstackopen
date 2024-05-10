import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      console.log('inside slice');
      return action.payload;
    },
  },
});

export const setNotification = notification => {
  console.log('inside thunk');
  return dispatch => {
    dispatch(notificationSlice.actions.setNotification(notification));
  };
};

export default notificationSlice.reducer;

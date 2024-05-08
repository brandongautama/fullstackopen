import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export const setNotification = (notification, timeout) => {
  return dispatch => {
    dispatch(notificationSlice.actions.setNotification(notification));
    setTimeout(
      () => dispatch(notificationSlice.actions.removeNotification()),
      timeout
    );
  };
};
export default notificationSlice.reducer;

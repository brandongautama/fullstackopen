import { createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const CounterContext = createContext();

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <CounterContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContext;

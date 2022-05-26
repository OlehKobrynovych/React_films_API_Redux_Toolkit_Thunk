// // TODO: 07.05.22 old code
// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import thunk from 'redux-thunk';

// import users_reducer from './users_reducer';

// const rootReducer = combineReducers({
//     users_reducer: users_reducer,
// });

// export const store = createStore(rootReducer, applyMiddleware(thunk));



// // TODO: 07.05.22 new code
import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import users_reducer from './users_reducer';

export default configureStore({
    reducer: {
        users_reducer: users_reducer,
    },
});

// window.store = store;
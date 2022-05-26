// // TODO: 07.05.22 new code
// import { userFetch, usersFetch } from "../api";

// const SET_USERS = 'SET_USERS';
// const SET_USER = 'SET_USER';
// const SET_CURRENT_USERS = 'SET_CURRENT_USERS';
// const REMOVE_CURRENT_USERS = 'REMOVE_CURRENT_USERS';

// const initialState = {
//     user: {},
//     users: [],
//     pages: {},
//     currentUsersId: [],
// };

// const users_reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SET_USERS:
//             return { 
//                 ...state,
//                 users: action.payload.results,
//                 pages: action.payload.info
//             }
//         case SET_USER:
//             return { 
//                 ...state,
//                 user: action.payload
//             }
//         case SET_CURRENT_USERS:
//             return { 
//                 ...state,
//                 currentUsersId: [
//                     ...state.currentUsersId,
//                     action.payload
//                 ],
//             }
//         case REMOVE_CURRENT_USERS:
//             // action.payload
//             // debugger
//             return { 
//                 ...state,
//                 currentUsersId: state.currentUsersId.filter(el => el !== action.payload )
//             }
//         default:
//             return state;
//     }
// }

// export default users_reducer;

// export const setUsers_ActionCreater = (payload) => ({ type: SET_USERS, payload });
// export const setCurrentUsers_ActionCreater = (payload) => ({ type: SET_CURRENT_USERS, payload });
// export const setRemoveCurrentUsers_ActionCreater = (payload) => ({ type: REMOVE_CURRENT_USERS, payload });
// export const setUser_ActionCreater = (payload) => ({ type: SET_USER, payload });

// export const getUsersThunk = (location) => (dispatch) => {
//     let numberPage = new URLSearchParams(location.search).get('page') || 1;
//     let userName = new URLSearchParams(location.search).get('name') || '';
//     let userGender = new URLSearchParams(location.search).get('gender') || '';
//     let species = new URLSearchParams(location.search).get('species') || '';

//     if (numberPage || userName || userGender || species ) {
//         usersFetch(numberPage, userName, userGender, species)
//             .then(res => {
//                 if (res.status === 200 && res.data) {
//                     dispatch(setUsers_ActionCreater(res.data));
//                 }
//             })
//             .catch((err) => {
//                 dispatch(setUsers_ActionCreater({ results: [], info: {} }));
//             });
//     } 
// }

// export const getUserThunk = (id) => (dispatch) => {
//     userFetch(id)
//         .then(res => {
//             if (res.status === 200 && res.data) {
//                 dispatch(setUser_ActionCreater(res.data));
//             }
//         })
//         .catch((err) => {
//             dispatch(setUser_ActionCreater({}));
//         });
// }



// // TODO: 07.05.22 new code
import { createSlice } from '@reduxjs/toolkit';
import { userFetch, usersFetch } from "../api";

export const counterSlice = createSlice({
  name: 'users_reducer',
  initialState: {
    user: {},
    users: [],
    pages: {},
    currentUsersId: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.results;
      state.pages = action.payload.info;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCurrentUsers: (state, action) => {
      state.currentUsersId.push(action.payload);
    },
    removeCurrentUsers: (state, action) => {
        // state.currentUsersId.filter(el => el !== action.payload);
        state.currentUsersId = state.currentUsersId.filter(el => el !== action.payload);
    },

  },
})

export const { setUsers, setUser, setCurrentUsers, removeCurrentUsers } = counterSlice.actions

export const getUsersThunk = (location) => (dispatch) => {
    let numberPage = new URLSearchParams(location.search).get('page') || 1;
    let userName = new URLSearchParams(location.search).get('name') || '';
    let userGender = new URLSearchParams(location.search).get('gender') || '';
    let species = new URLSearchParams(location.search).get('species') || '';

    if (numberPage || userName || userGender || species ) {
        usersFetch(numberPage, userName, userGender, species)
            .then(res => {
                if (res.status === 200 && res.data) {
                    dispatch(setUsers(res.data));
                }
            })
            .catch((err) => {
                dispatch(setUsers({ results: [], info: {} }));
            });
    } 
}

export const getUserThunk = (id) => (dispatch) => {
    userFetch(id)
        .then(res => {
            if (res.status === 200 && res.data) {
                dispatch(setUser(res.data));
            }
        })
        .catch((err) => {
            dispatch(setUser({}));
        });
}

// // const currentUsersId = useSelector(state => state.users_reducer.currentUsersId);
// export const currentUsersId = (state) => state.users_reducer.currentUsersId;

export default counterSlice.reducer
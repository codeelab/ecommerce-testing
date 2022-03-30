import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { User } from "~/models/user.model";



export const actionTypes = {
  RefreshStore: "REFRESH_STORE",
  SetUserDataSignUp: "SET_USER_DATA_SIGN_UP",
  SetUserDataLogIn: "SET_USER_DATA_LOG_IN",
  SetUserData: "SET_USER_DATA",
};

let initialState:User = {
  fullName:'',
  email:'',
  favoriteProducts:[],
  isLogged: false


  
};

const userDataReducer = (state = initialState, action:any) => {

  
  switch (action.type) {


    case actionTypes.SetUserData:
      return {
        ...state,
        ...action.payload
        
      };

    default:
      return state;
  }
};

export const userDataActions = {
 
  setUserData: (data) => ({
    type: actionTypes.SetUserData,
    payload: data,
  }),

};

const persistConfig = {
  keyPrefix: "riode-",
  key: "user",
  storage,
};

export default userDataReducer;

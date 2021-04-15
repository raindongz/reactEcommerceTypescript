import React from "react";
import { LOGIN, LOGOUT } from "./Actions/AuthActionTypes";
import {authAction, role} from "../Type";

const initialState: role[] = [];

function authReducer(state = initialState, action: authAction) {
  switch (action.type) {
    /* case GETINFO:{
            return [
                ...state,
                {
                    token:action.token,
                    role:action.userRole,
                }
            ];
        }
        */
    case LOGIN: {
      return [
        ...state,
        {
          role: action.userRole,
        },
      ];
    }

    case LOGOUT: {
      return [];
    }

    default:
      return state;
  }
}
export default authReducer;

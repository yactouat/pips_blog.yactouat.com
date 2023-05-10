import AppDataAction from "@/lib/interfaces/state/app-data/app-data-action";
import AppDataState from "@/lib/interfaces/state/app-data/app-data-state";

const appDataReducer = (
  state: AppDataState,
  action: AppDataAction
): AppDataState => {
  switch (action.type) {
    case "SET_APP_DATA":
      return {
        ...state,
        data: action.payload!.data,
      };
    default:
      return state;
  }
};

export default appDataReducer;

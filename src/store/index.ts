import { Instance, onSnapshot, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { ForecastStore } from "store/WeatherModel";
import { UserStore } from "store/UserModel";
import { getLocalStorageItem } from "utils/localstorageUtils";
import { IS_LOGIN, TRUE } from "constants/variablesConstant";

const RootModel = types.model({
  userStore: UserStore,
  forecastStore: ForecastStore,
});

const InitialValue = {
  userStore: {
    user: null,
    isLogin: getLocalStorageItem(IS_LOGIN) === TRUE ? true : false,
  },
  forecastStore: {
    data: null,
    isLoading: true,
    error: null,
    selectedDate: null,
  },
};

export const store = RootModel.create(InitialValue);

onSnapshot(store, (snapshot) => {
  console.log("Snapshot: ", snapshot);
});

export interface IRootState extends Instance<typeof RootModel> {}

const RootStoreContext = createContext<null | IRootState>(null);

export const MstProvider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

import { Instance, types } from "mobx-state-tree";

export interface IUserModel extends Instance<typeof UserModel> {}

export const UserModel = types.model({
  username: types.string, // username of login user
});

export const UserStore = types
  .model({
    data: types.maybeNull(UserModel),
    isLogin: types.boolean, // state to check if user is logged in
  })
  .actions((self) => ({
    login(username: string) {
      self.data = { username };
      self.isLogin = true;
    },
    logout() {
      self.isLogin = false;
    },
  }));

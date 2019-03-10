import * as types from './type';
import { getToken } from '@/utils/auth';

export const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],

};

export const mutations = {
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },
  [types.SET_NAME](state, name) {
    state.name = name;
  },
  [types.SET_AVATAR](state, avatar) {
    state.avatar = avatar;
  },
  [types.SET_ROLES](state, roles) {
    state.roles = roles;
  },
};

import * as types from './type';
import { login, logout, getInfo } from '@/api/login';
import { setToken, removeToken } from '@/utils/auth';

const actions = {
  // 登录
  [types.LOGIN]({ commit }, userInfo) {
    const username = userInfo.username.trim();
    return new Promise((resolve, reject) => {
      login(username, userInfo.password).then(response => {
        const { data } = response;
        console.log('response', response);
        setToken(data.token);
        commit(types.SET_TOKEN, data.token);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 获取用户信息
  [types.GETINFO]({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response;
        if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit(types.SET_ROLES, data.roles);
        } else {
          reject(new Error('getInfo: roles must be a non-null array !'));
        }
        commit(types.SET_NAME, data.name);
        commit(types.SET_AVATAR, data.avatar);
        console.log('getinfo end');
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 登出
  [types.LOGOUT]({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit(types.SET_TOKEN, '');
        commit(types.SET_ROLES, []);
        removeToken();
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 前端 登出
  [types.FED_LOG_OUT]({ commit }) {
    return new Promise(resolve => {
      commit(types.SET_TOKEN, '');
      removeToken();
      resolve();
    });
  },
};
export default actions;

import router from './router';
import store from '@/store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth'; // getToken from cookie
import * as type from '@/store/user/type';

NProgress.configure({ showSpinner: false });// NProgress configuration

const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done(); // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else if (store.getters.roles.length === 0) {
      store.dispatch(type.GETINFO).then(() => { // 拉取用户信息
        next();
      }).catch((err) => {
        store.dispatch(type.FED_LOG_OUT).then(() => {
          Message.error(err || 'Verification failed, please login again');
          next({ path: '/' });
        });
      });
    } else {
      next();
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

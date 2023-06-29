import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//引入store, 因为要在路由守卫中使用
import store from "@/store";

//push和replace方法的重写
{
  //1.先把VueRouter原型对象中的push和replace方法备份一份
  let originPush = VueRouter.prototype.push;
  let originReplace = VueRouter.prototype.replace;
  //2.重写push|replace
  VueRouter.prototype.push = function (location, onResolve, onReject) {
    //如果调用push或replace方法时传入了onResolve和onReject方法,则将其作为返回的Promise的onResolve和onReject
    if (onResolve && onReject) {
      originPush.call(this, location, onResolve, onReject);
    }
    //如果调用push或replace方法时未传入onResolve和onReject方法,则默认传入空的onResolve和onReject
    else {
      originPush.call(
        this,
        location,
        () => {},
        () => {}
      );
    }
  };
  VueRouter.prototype.replace = function (location, onResolve, onReject) {
    if (onResolve && onReject) {
      originReplace.call(this, location, onResolve, onReject);
    } else {
      originReplace.call(
        this,
        location,
        () => {},
        () => {}
      );
    }
  };
}

const router = new VueRouter({
  routes: [
    //重定向:访问网站时默认跳转至home首页
    {
      path: "/", //使用/或*皆可
      redirect: "/home", //注意:重定向要用路径而非组件名称
    },
    {
      path: "/home",
      component: () => import("@/pages/Home"),
      //show用于控制是否显示Footer组件
      meta: { show: true },
    },
    {
      path: "/search/:keyword?",
      name: "search",
      component: () => import("@/pages/Search"),
      meta: { show: true },
    },
    {
      path: "/login",
      component: () => import("@/pages/Login"),
      meta: { show: false },
      beforeEnter: (to, from, next) => {
        //如果用户已经登陆了(未登录时userInfo是空对象,name属性不存在),则阻止用户通过修改URL进入login界面
        if (store.state.user.userInfo?.name) {
          next({ path: "/home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      component: () => import("@/pages/Register"),
      meta: { show: false },
    },
    {
      path: "/detail/:skuid",
      component: () => import("@/pages/Detail"),
      name: "detail",
      meta: { show: true },
    },
    {
      path: "/addcartsuccess",
      component: () => import("@/pages/AddCartSuccess"),
      name: "addcartsuccess",
      meta: { show: false },
    },
    {
      path: "/shopcart",
      component: () => import("@/pages/ShopCart"),
      name: "shopcart",
      meta: { show: false },
    },
    {
      path: "/trade",
      component: () => import("@/pages/Trade"),
      name: "trade",
      meta: { show: false },
      beforeEnter: (to, from, next) => {
        //进入订单页面,只能从购物车点击结算而来,其它方式进入订单页面会被阻止(停留在当前页面)
        if (from.path == "/shopcart") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/pay",
      component: () => import("@/pages/Pay"),
      name: "pay",
      meta: { show: false },
      beforeEnter: (to, from, next) => {
        //进入支付页面,只能从订单页面而来,其它方式进入支付页面会被阻止(停留在当前页面)
        if (from.path == "/trade") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/paysuccess",
      component: () => import("@/pages/PaySuccess"),
      name: "paysuccess",
      meta: { show: false },
      beforeEnter: (to, from, next) => {
        //进入支付成功页面,只能从支付页面而来,其它方式进入支付成功页面会被阻止(停留在当前页面)
        if (from.path == "/pay") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/center",
      component: () => import("@/pages/Center"),
      name: "center",
      meta: { show: false },
      children: [
        {
          path: "myorder",
          component: () => import("@/pages/Center/myOrder"),
        },
        {
          path: "grouporder",
          component: () => import("@/pages/Center/groupOrder"),
        },
        //重定向: 当进入个人中心页面时默认展示""个人订单页面"
        {
          path: "/center",
          redirect: "/center/myorder",
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 };
  },
});

//全局前置守卫
router.beforeEach((to, from, next) => {
  //进行登录鉴权
  //未登录时不允许进入的路由:"/trade"、"/pay"、"/paysuccess"
  //未登录时进入会跳转至登录页面,登录成功后跳转至目标路由:'/shopcart'、'/center'
  //如果vuex中的token不为空,则代表用户登录了
  if (store.state.user?.token) {
    next();
    //未登录:
  } else {
    let toPath = to.path;
    if (
      toPath.includes("/trade") ||
      toPath.includes("/pay") ||
      toPath.includes("/center")
    ) {
      next(false);
    } else if (toPath.includes("/shopcart") || toPath.includes("/center")) {
      //将目标路由的path用query参数传递给login路由,以达到在登录成功后跳转至目标路由的目的
      next(`/login?redirect=${toPath}`);
    } else {
      next();
    }
  }
});

export default router;

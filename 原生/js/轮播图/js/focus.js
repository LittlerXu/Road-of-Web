window.addEventListener("load", () => {
  //nowCircle是显示的轮播图索引,序号-1
  let nowCircle = 0;
  // 1.获取元素
  const focus = document.querySelector(".focus");
  const arrow_l = document.querySelector(".arrow-l");
  const arrow_r = document.querySelector(".arrow-r");
  const focusWidth = focus.offsetWidth;
  // 2.1鼠标移动到focus上时显示左右按钮,停止轮播图的自动播放(定时器)
  focus.addEventListener("mouseenter", () => {
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";

    //停止定时器
    clearInterval(timer);
    timer = null; //清除定时器变量
  });
  //2.2鼠标移走时隐藏左右按钮,开始轮播图的自动播放(定时器)
  focus.addEventListener("mouseleave", () => {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";

    //开启定时器
    timer = setInterval(function () {
      arrow_r.click();
    }, 2000);
  });

  // 3.依据轮播图个数动态生成小圆圈
  const ul = focus.querySelector("ul");
  const ol = focus.querySelector(".circle");
  Array.from(ul.children).forEach((element, index) => {
    //创建一个小圆圈
      let li = document.createElement("li");

    // 把li插入到ol中
      ol.append(li);
      
    //4.在生成小圆圈的同时给其绑定点击事件
    li.addEventListener("click", (e) => {
      //排它思想,先使所有的小圆圈都变为无色
      Array.from(ol.children).forEach((element) => {
        element.className = "";
      });
      //然后使别点击的小圆圈背景变为白色
      e.target.className = "current";

      //点击小圆圈轮播如滚动至对应图片
      //index就是被点击的小圆圈索引
      animate(ul, -index * focusWidth);
      //滚动之后更新nowCircle
      nowCircle = index;
    });
  });

  //给第一个小圆圈设置current类
  ol.children[0].className = "current";

  //5无缝滚动原理: 将第一张图片复制后放到ul最后面,当到达最后一张(复制的第一张)后,再次点击跳转会先无动画地变到第一张,然后从第一张缓动到第二张
  //复制第一张放到最后,由于是在小圆圈创建之后插入ul的,所以ol中不会多生成一个小圆圈
  ul.append(ul.children[0].cloneNode(true));

  //flag节流阀,防止按钮频繁被点击,当滚动动画执行时关闭(false),当动画执行完毕时打开(true)
  let flag = true;

  //6.点击右侧按钮
  arrow_r.addEventListener("click", () => {
    if (flag) {
      //注意: 是否到达最后一张的判断必须加到滚动动画之前
      if (nowCircle == ul.children.length - 1) {
        ul.style.left = 0;
        nowCircle = 0;
      }

      //开始执行动画时关闭节流阀
      flag = false;

      //nowCircle需要先加一,再滚动
      animate(ul, -++nowCircle * focusWidth, () => {
        //执行次函数代表着滚动动画执行完毕了,在此打开节流阀
        flag = true;
      });

      circleChange();
    }
  });

  //7.点击左侧按钮
  arrow_l.addEventListener("click", () => {
    if (flag) {
      //注意: 是否到达第一张的判断必须加到滚动动画之前
      if (nowCircle == 0) {
        nowCircle = ul.children.length - 1;
        ul.style.left = -nowCircle * focusWidth + "px";
      }

      //开始执行动画时关闭节流阀
      flag = false;

      //nowCircle需要先加一,再滚动
      animate(ul, -(--nowCircle) * focusWidth, () => {
        //执行次函数代表着滚动动画执行完毕了,在此打开节流阀
        flag = true;
      });

      //滚动后调用小圆圈改变的函数
      circleChange();
    }
  });

  //8.点击按钮后小圆圈跟随变化函数
  function circleChange() {
    //排它思想,先使所有的小圆圈都变为无色
    Array.from(ol.children).forEach((element) => {
      element.className = "";
    });
    // 留下当前的小圆圈的current类名
    //nowCircle%ol.children.length是为了当滚动到最后一张时第一个小圆圈改变(循环队列思想)
    ol.children[nowCircle % ol.children.length].className = "current";
  }

  //9.自动播放轮播图
  let timer = setInterval(() => {
    //手动调用右侧按钮的点击事件
    arrow_r.click();
    //滚动间隔时间为2秒
  }, 2000);
});

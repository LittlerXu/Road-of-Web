//参数说明: obj为要设置缓动动画的元素,target是动画停止的位置,callback是动画完成后调用的函数,在定时器完成后调用
      function animate(obj, target, callback) {
        //清除以前的定时器,防止创建多个定时器
        clearInterval(obj.timer);
        //通过obj.timer给不同的元素指定不同的定时器
        obj.timer = setInterval(() => {
          //停止动画本质是停止定时器
          if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //如果传入了回调函数,则定时器结束后调用
            callback && callback(); //短路运算
          }
          //缓动原理: 每单位时间移动距离逐渐减小
          //移动距离要向上/下取整,不然无法准确达到目标位置,导致定时器无法停止
          let step = (target - obj.offsetLeft) / 10;
          //向右移动时step为正值,向上取整,向右移动时step为负值,向下取整
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          //offsetLeft只读,修改元素的left值要使用style.left,值为字符串类型,要拼接"px"
          obj.style.left = obj.offsetLeft + step + "px";
          //定时器的执行间隔一般设置为15ms
        }, 15);
      }
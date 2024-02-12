// func倒计时回调,number倒计时时间（单位秒
// 还可以优化的地方，超过1s后才触发func
const countdown = (func = () => {}, number = 60) => {
  let _t;
  const clear = () => clearInterval(_t);
  const exec = () => {
    const endTime = new Date().getTime() + number * 1000;
    _t = setInterval(() => {
      const now = new Date().getTime();
      const count = Math.floor((endTime - now) / 1000);
      if (count < 0) {
        clear();
      }
      func(count, clear);
    }, 500);
  };
  return [exec, clear];
};

export default countdown;
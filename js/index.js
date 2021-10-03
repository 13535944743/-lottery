/*
 * 这个抽奖只支持概率最低可以设置到0.01%，通过概率相加等于1，把所有的概率*100，得到一个整数
 * 然后通过分段之后，再使用random()在[1, 10000]随机抽
 * 例子：默认概率设置都为12.5%
 * 所以[0, 1250)是sequence[0]的，[1250, 2500)是sequence[1]的, ... ,sequence是一个数组，用来按顺序存放转盘的数字(从起始点开始，顺时针)
 */

const setting = document.querySelector(".luck-setting .special");
const ipts = document.querySelectorAll(".ipt");
const start = document.querySelector(".luck-box .special");
const probabilityUpper = 10000;
const items = document.querySelectorAll(".luck-box .item");
const result = document.querySelector(".result ul");
const sequence = [0, 1, 2, 4, 7, 6, 5, 3];

let probability = [];
let flag_setting = false;
let timer = null;

ipts.forEach((i) => {
  i.onchange = () => {
    i.value = i.value >= 0 ? i.value : 0; //使概率不会出现负数
    // console.log(i.value.substring(i.value.indexOf('.') + 1));

    if (i.value.substring(i.value.indexOf('.') + 1).length > 2) { //最小概率只支持0.01%
      i.value = i.value.substring(0, 5);
    }
  };
});

setting.addEventListener("click", () => {
  let sumProbability = 0;
  ipts.forEach((i) => {
    sumProbability += parseFloat(i.value);
    sumProbability = Number(sumProbability.toFixed(2));

    if (!flag_setting) {
      probability.push(sumProbability * 100);
    }
  });
  if (sumProbability != 100) {
    alert("总概率不等于100%，请重新设置");
    probability = [];
  }
  flag_setting = true;
});

start.addEventListener("click", () => {
  clearInterval(timer); //每一次点击按钮都清除之前的定时器
  if (!flag_setting) {
    setting.click(); //防止抽奖者不设置概率或设置概率后忘记点击确定了
  }

  let rand = judge(Math.floor(Math.random() * probabilityUpper + 1));

  let index = 0;
  let time = 100;
  timer = setInterval(count, time);

  function count() {
    change();
    items[sequence[index]].className = "item skyblue";
    if (time === 200 && index === rand) {
      clearInterval(timer);
      let li = document.createElement("li");
      li.innerHTML = rand + 1;
      result.insertBefore(li, result.children[0]);
      return;
    }
    index++;
    if (index === sequence.length) {
      time += 50;
      clearInterval(timer); //实现转速变慢，先清除之前的，再开新的定时器
      timer = setInterval(count, time);
      index = 0; //转完一圈回到起始点
    }
  }

  probability = [];
  flag_setting = false;
});

function judge(rand) {
  for (let i = 0; i < probability.length; i++) {
    if (rand <= probability[i]) {
      return i;
    }
  }
}

function change() {
  for (let i = 0; i < items.length; i++) {
    items[i].className = "item";
  }
}

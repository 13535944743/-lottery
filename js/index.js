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
        i.value = i.value >= 0 ? i.value : 0;
    }
})

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
})


start.addEventListener("click", () => {
    clearInterval(timer);
    if (!flag_setting) {
        setting.click();
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
            clearInterval(timer);
            timer = setInterval(count, time);
            index = 0;
        }
    }

    probability = [];
    flag_setting = false;
})

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
const fortunes = [
  "今日は挑戦が幸運を呼ぶ日",
  "思わぬ臨時収入に期待",
  "人との縁が運気アップの鍵",
  "小さな決断が大きな幸運へ",
  "直感を信じると吉",
  "金運上昇中",
  "焦らず待てば好機到来",
  "笑顔が運を引き寄せる",
  "今日は攻めの姿勢が大吉",
  "意外な場所に幸運が潜む"
];

function showFortune() {

const date =
    document.getElementById("birthdate").value;
if (!date) {
    alert("生年月日を入力してください");
    return;
}
let seed = 0;
for (let c of date) {
    seed += c.charCodeAt(0);
}
const fortune =
    fortunes[seed % fortunes.length];
document.getElementById("fortune").textContent =
    "🔮 " + fortune;

}

function sleep(ms) {
return new Promise(resolve =>
setTimeout(resolve, ms)
);
}

async function flash(type) {
    
    const layer =
        document.getElementById(
            "flashLayer"
        );
    
    layer.className = "";
    
    if (type === "red") {
        layer.classList.add(
            "flash-red"
        );
    }
    
    if (type === "gold") {
        layer.classList.add(
            "flash-gold"
        );
    }
    
    if (type === "rainbow") {
        layer.classList.add(
            "flash-rainbow"
        );
    }
    
    await sleep(1200);
    
    layer.className = "";
}

async function showCutin(type) {

const cutin =
    document.getElementById("cutin");
const title =
    document.getElementById("cutinTitle");
const sub =
    document.getElementById("cutinSub");
    
    // Android向けバイブレーション
if ("vibrate" in navigator) {
    
    if (type === "jackpot") {
        flash("rainbow");
        navigator.vibrate([
            200, 100,
            200, 100,
            200, 100,
            600
        ]);
        
    } else if (type === "super") {
        flash("gold");
        navigator.vibrate([
            100, 50,
            100, 50,
            300
        ]);
        
    } else {
        flash("red");
        navigator.vibrate(300);
        
    }
}
cutin.style.display = "flex";
document.body.classList.add("shake");
if (type === "jackpot") {
    title.textContent =
        "🌈 RAINBOW CHANCE 🌈";
    sub.textContent =
        "超激熱演出発生";
} else if (type === "super") {
    title.textContent =
        "🔥 激熱 🔥";
    sub.textContent =
        "超幸運の予感";
} else {
    title.textContent =
        "⚠ WARNING ⚠";
    sub.textContent =
        "幸運演出発生";
}
await sleep(2000);
document.body.classList.remove("shake");
cutin.style.display = "none";

}

async function countdown() {

const count =
    document.getElementById("countdown");
count.textContent = "3";
await sleep(700);
count.textContent = "2";
await sleep(700);
count.textContent = "1";
await sleep(700);
count.textContent = "START!";
await sleep(700);
count.textContent = "";

}

async function startLottery() {

const btn =
    document.getElementById("startBtn");
const status =
    document.getElementById("statusText");
const message =
    document.getElementById("specialMessage");
const balls = [
    document.getElementById("n1"),
    document.getElementById("n2"),
    document.getElementById("n3"),
    document.getElementById("n4"),
    document.getElementById("n5")
];
btn.disabled = true;
message.innerHTML = "&nbsp;";
balls.forEach(ball => {
    ball.textContent = "?";
    ball.classList.remove(
        "revealed",
        "lucky"
    );
});
await countdown();
status.textContent =
    "抽選中...";
let interval = setInterval(() => {
    balls.forEach(ball => {
        ball.textContent =
            Math.floor(
                Math.random() * 31
            ) + 1;
    });
}, 70);
await sleep(2500);
clearInterval(interval);
let nums = [];
while (nums.length < 5) {
    let n =
        Math.floor(
            Math.random() * 31
        ) + 1;
    if (!nums.includes(n)) {
        nums.push(n);
    }
}
nums.sort((a, b) => a - b);
const r = Math.random();
let resultType = "normal";
/*resultType = "jackpot";
*/
if (r < 0.03) {
    resultType = "jackpot";
} else if (r < 0.13) {
    resultType = "super";
} else if (r < 0.33) {
    resultType = "lucky";
}

balls.forEach(ball => {
    ball.textContent = "?";
});
for (let i = 0; i < 5; i++) {
    await sleep(700);
   if (i === 3 &&
    resultType !== "normal") {
    
    if ("vibrate" in navigator) {
        navigator.vibrate(100);
    }
    
    status.textContent =
        "何かが起こる予感...";
    
    await showCutin(
        resultType
    );
}
    if (i === 4) {
        status.textContent =
            "運命の数字を抽選中...";
    }
    
    if (i === 4) {
    
    status.textContent =
        "運命の数字を確定中...";
    
    for (let j = 0; j < 10; j++) {
        
        balls[i].textContent =
            Math.floor(
                Math.random() * 31
            ) + 1;
        
        await sleep(80);
    }
    
    await sleep(300);
}

balls[i].style.transform =
    "scale(1.5)";

await sleep(200);

balls[i].style.transform =
    "scale(1)";
    balls[i].textContent =
        nums[i];
    balls[i].classList.add(
        "revealed"
    );
}
status.textContent =
    "抽選完了！";
if (resultType === "jackpot") {
    message.textContent =
        "🌈 JACKPOT!!! 🌈";
    balls.forEach(ball => {
        ball.classList.add(
            "lucky"
        );
    });
} else if (
    resultType === "super"
) {
    message.textContent =
        "👑 超幸運!!! 👑";
    balls.forEach(ball => {
        ball.classList.add(
            "lucky"
        );
    });
} else if (
    resultType === "lucky"
) {
    message.textContent =
        "✨ 幸運!!! ✨";
    balls.forEach(ball => {
        ball.classList.add(
            "lucky"
        );
    });
}
btn.disabled = false;

}
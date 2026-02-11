const cfg = {
  to: "Ульяшке",
  from: "от Лёши",
  msg: "Ты самый светлый человек в моей жизни. Каждый день рядом с тобой — подарок.",
};

const noStages = [
  {
    text: "Ты уверена? 🥺", yesText: "Да 💖", noText: "Нет…",
    title: "Ну будешь? 💗",
    fx(y, n) {
      shakeCard();
    }
  },
  {
    text: "А если я буду очень-очень просить? 🥹", yesText: "Ну ладно 💗", noText: "Неа",
    title: "Пожааалуйста? 🥺",
    fx(y, n) {
      y.style.padding = "18px 38px";
      n.style.fontSize = "14px";
      $("card").style.background = "rgba(30,5,50,.92)";
      setTimeout(() => $("card").style.background = "", 800);
    }
  },
  {
    text: "Моё сердце сейчас разобьётся на кусочки 💔", yesText: "Не плачь, да! 🥺", noText: "Ну нет",
    title: "Ну скажи «Да»! 💖",
    fx(y, n) {
      shakeCard();
      document.body.style.filter = "grayscale(.6)";
      setTimeout(() => document.body.style.filter = "", 2000);
    }
  },
  {
    text: "А что если я приготовлю ужин? 🍝👨‍🍳", yesText: "Уговорил! 💘", noText: "Нет…",
    title: "Ну Ульяшка… 💘",
    fx(y, n) {
      y.style.fontSize = "19px";
      n.style.opacity = ".65";
      const card = $("card");
      card.style.transform = "perspective(900px) rotateX(10deg)";
      setTimeout(() => card.style.transform = "", 500);
    }
  },
  {
    text: "Даже наш будущий кот расстроился! 🐱💧", yesText: "Ради кота — да! 🐱", noText: "Мяу нет",
    title: "Нажми уже «Да»! 💝",
    fx(y, n) {
      n.style.transform = "rotate(10deg)";
      shakeCard();
      n.style.borderColor = "rgba(255,77,166,.4)";
    }
  },
  {
    text: "Окей, я погуглил «как уговорить девушку»… 📱", yesText: "Ахаха, ДА 😂💖", noText: "Лол нет",
    title: "Серьёзно, жми «Да» 😏",
    fx(y, n) {
      const card = $("card");
      card.style.transition = "transform .4s";
      card.style.transform = "perspective(900px) rotateY(180deg)";
      setTimeout(() => { card.style.transform = ""; }, 600);
      y.style.fontSize = "21px";
      y.style.padding = "20px 42px";
    }
  },
  {
    text: "Сейчас позвоню твоей маме и спрошу совета 📞", yesText: "СТОЙ! Да! 😱💖", noText: "НЕТ!!!",
    title: "Мама в курсе! 📞",
    fx(y, n) {
      shakeCard();
      document.body.style.filter = "hue-rotate(40deg)";
      setTimeout(() => document.body.style.filter = "", 1500);
      n.style.transform = "rotate(-12deg) scale(.85)";
      y.style.fontSize = "22px";
    }
  },
  {
    text: "Кнопка «Нет» переворачивается от стыда 🙃", yesText: "Спасём кнопку! Да! 💖", noText: "ʇǝн",
    title: "Даааа? 💕",
    fx(y, n) {
      n.style.transform = "rotate(180deg) scale(.8)";
      n.style.opacity = ".5";
      y.style.padding = "22px 46px";
      y.style.fontSize = "23px";
    }
  },
  {
    text: "Кнопка «Нет» подаёт заявление на увольнение 📝", yesText: "ДА ДА ДА! 💖💖💖", noText: "...",
    title: "БУДЕШЬ. МОЕЙ. ВАЛЕНТИНКОЙ. ❤️‍🔥",
    fx(y, n) {
      n.style.textDecoration = "line-through";
      n.style.opacity = ".35";
      n.style.fontSize = "11px";
      n.style.transform = "rotate(20deg) scale(.6)";
      y.style.fontSize = "25px";
      y.style.padding = "24px 52px";
      shakeCard();
    }
  },
  {
    text: "Всё, я забираю кнопку «Нет» 🗑️ Прощай!", yesText: "ДААААА!!! 🎉💖", noText: "бай",
    title: "Последний шанс! ❤️‍🔥",
    fx(y, n) {
      n.style.transition = "all 1s ease";
      n.style.transform = "translateX(300px) rotate(90deg) scale(0)";
      n.style.opacity = "0";
      setTimeout(() => { n.style.display = "none"; }, 1000);
      y.style.fontSize = "26px";
      y.style.padding = "26px 56px";
    }
  },
];

let noCount = 0;
let accepted = false;

function $(id) { return document.getElementById(id); }

function applyParams() {
  const p = new URLSearchParams(window.location.search);
  if (p.get("to")) cfg.to = p.get("to");
  if (p.get("from")) cfg.from = p.get("from");
  if (p.get("msg")) cfg.msg = p.get("msg");
  $("toText").textContent = cfg.to;
  $("fromText").textContent = cfg.from;
  $("msgText").textContent = cfg.msg;
}

// ── Envelope ──
function initEnvelope() {
  const screen = $("envelopeScreen");
  for (let i = 0; i < 20; i++) {
    const s = document.createElement("div");
    s.className = "env-sparkle";
    s.style.setProperty("--x", Math.random() * 100 + "%");
    s.style.setProperty("--y", Math.random() * 100 + "%");
    s.style.setProperty("--d", (2 + Math.random() * 3) + "s");
    s.style.setProperty("--dx", (Math.random() - .5) * 100 + "px");
    s.style.setProperty("--dy", (Math.random() - .5) * 100 + "px");
    $("envelopeSparkles").appendChild(s);
  }

  screen.addEventListener("click", () => {
    screen.classList.add("opened");
    spawnHeartBurst(25);
    setTimeout(() => {
      screen.style.display = "none";
      $("mainScreen").style.display = "flex";
    }, 700);
  });
}

// ── Typewriter ──
let typeTimer = null;
function showDialogue(text) {
  const d = $("dialogue");
  const dt = $("dialogueText");
  const bubble = $("dialogueBubble");
  d.style.display = "block";
  dt.textContent = "";
  if (typeTimer) clearTimeout(typeTimer);
  bubble.style.animation = "none";
  void bubble.offsetHeight;
  bubble.style.animation = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      dt.textContent += text[i++];
      typeTimer = setTimeout(type, 22);
    }
  }
  type();
}

// ── Shake card ──
function shakeCard() {
  const card = $("card");
  card.classList.remove("shake");
  void card.offsetHeight;
  card.classList.add("shake");
  setTimeout(() => card.classList.remove("shake"), 600);
}

// ── No handler ──
function handleNo() {
  if (noCount >= noStages.length) {
    showDialogue("Всё, кнопка «Нет» сломалась! Остался только один вариант 😇");
    $("noBtn").style.display = "none";
    $("titleText").textContent = "Будешь моей валентинкой? 💕";
    return;
  }

  const stage = noStages[noCount];
  showDialogue(stage.text);

  $("titleText").textContent = stage.title;

  const yesBtn = $("yesBtn");
  const noBtn = $("noBtn");
  yesBtn.textContent = stage.yesText;
  noBtn.textContent = stage.noText;

  stage.fx(yesBtn, noBtn);

  spawnHeartBurst(3 + noCount);
  noCount++;
}

// ── No button dodge (gentle) ──
function initNoDodge() {
  const noBtn = $("noBtn");
  if (window.matchMedia("(pointer:coarse)").matches) return;

  noBtn.addEventListener("mouseenter", () => {
    if (noCount < 5 || accepted) return;
    const dx = (Math.random() - .5) * 120;
    const dy = (Math.random() - .5) * 40;
    noBtn.classList.add("dodge");
    noBtn.style.transform = `translate(${dx}px, ${dy}px)`;
    setTimeout(() => noBtn.classList.remove("dodge"), 300);
  });
}

// ── Yes handler ──
function handleYes() {
  if (accepted) return;
  accepted = true;

  $("buttons").style.display = "none";
  const d = $("dialogue");
  if (d) d.style.display = "none";
  const cd = $("countdown");
  if (cd) cd.style.display = "none";
  $("titleText").style.display = "none";
  $("msgText").style.display = "none";
  const svgHeart = document.querySelector(".svg-heart-wrap");
  if (svgHeart) svgHeart.style.display = "none";

  const boy = $("charBoy");
  const girl = $("charGirl");
  const together = $("charTogether");
  if (boy) boy.classList.add("merge");
  if (girl) girl.classList.add("merge");
  setTimeout(() => {
    if (boy) boy.style.display = "none";
    if (girl) girl.style.display = "none";
    if (together) together.classList.add("show");
  }, 700);

  $("result").style.display = "block";

  const flash = document.createElement("div");
  flash.className = "screen-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 700);

  for (let i = 0; i < 3; i++) {
    setTimeout(launchConfetti, i * 300);
  }

  spawnHeartBurst(20);
  setTimeout(() => spawnHeartBurst(15), 600);
  setTimeout(() => spawnHeartBurst(10), 1200);

  startFireworks();
  startComplimentCarousel();
}

// ── Confetti ──
function launchConfetti() {
  const colors = ["#ff4da6","#a855f7","#4df0ff","#fbbf24","#ff6b6b","#34d399","#f472b6","#fff"];
  for (let i = 0; i < 30; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    const c = colors[Math.floor(Math.random() * colors.length)];
    const w = 5 + Math.random() * 10;
    const h = 5 + Math.random() * 10;
    el.style.cssText = `
      background:${c};
      left:${35 + Math.random() * 30}vw;
      top:${25 + Math.random() * 25}vh;
      width:${w}px;height:${h}px;
      border-radius:${Math.random() > .5 ? "50%" : Math.random() > .5 ? "2px" : "0"};
      --tx:${(Math.random() - .5) * 800}px;
      --ty:${(Math.random() - .3) * 900}px;
      --rot:${Math.random() * 1440}deg;
      --dur:${1.5 + Math.random() * 2.5}s;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4500);
  }
}

// ── Floating heart burst ──
function spawnHeartBurst(count) {
  const hearts = ["💖","💕","💗","💓","❤️","🩷","💘","💝","✨","🌸","⭐"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "floating-heart";
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    const delay = Math.random() * 400;
    setTimeout(() => {
      el.style.cssText = `
        left:${Math.random() * 100}vw;
        top:${55 + Math.random() * 45}vh;
        --size:${14 + Math.random() * 28}px;
        --dur:${2.5 + Math.random() * 3.5}s;
        --dy:${-(250 + Math.random() * 550)}px;
        --dx:${(Math.random() - .5) * 250}px;
        --rot:${(Math.random() - .5) * 120}deg;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6500);
    }, delay);
  }
}

// ── Card 3D tilt ──
function initCardTilt() {
  const card = $("card");
  if (!card || window.matchMedia("(pointer:coarse)").matches) return;
  card.addEventListener("mousemove", (e) => {
    if (accepted) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
}

// ── Cursor sparkle trail ──
function initCursorTrail() {
  if (window.matchMedia("(pointer:coarse)").matches) return;
  const container = $("cursorTrail");
  let last = 0;
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - last < 40) return;
    last = now;
    const spark = document.createElement("div");
    spark.className = "sparkle";
    spark.style.left = (e.clientX - 3) + "px";
    spark.style.top = (e.clientY - 3) + "px";
    const size = 3 + Math.random() * 5;
    spark.style.width = size + "px";
    spark.style.height = size + "px";
    container.appendChild(spark);
    setTimeout(() => spark.remove(), 800);
  });
}

// ── Background canvas (hearts + stars + aurora) ──
function initBgCanvas() {
  const canvas = $("bgCanvas");
  const ctx = canvas.getContext("2d");
  let W, H;
  const hearts = [];
  const stars = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function makeHeart() {
    return {
      x: Math.random() * W,
      y: H + 30,
      size: 6 + Math.random() * 18,
      speed: .2 + Math.random() * .7,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: .008 + Math.random() * .02,
      opacity: .08 + Math.random() * .2,
      hue: 310 + Math.random() * 50,
    };
  }

  function makeStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      size: .5 + Math.random() * 2,
      twinkleSpeed: .005 + Math.random() * .02,
      twinklePhase: Math.random() * Math.PI * 2,
      baseOpacity: .2 + Math.random() * .5,
    };
  }

  for (let i = 0; i < 30; i++) {
    const h = makeHeart();
    h.y = Math.random() * H;
    hearts.push(h);
  }
  for (let i = 0; i < 80; i++) stars.push(makeStar());

  function drawHeart(x, y, size, opacity, hue) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = `hsl(${hue},75%,60%)`;
    ctx.shadowColor = `hsl(${hue},80%,50%)`;
    ctx.shadowBlur = size;
    ctx.translate(x, y);
    ctx.beginPath();
    const s = size / 2;
    ctx.moveTo(0, s * .3);
    ctx.bezierCurveTo(-s, -s * .6, -s * 2, s * .15, 0, s * 1.6);
    ctx.moveTo(0, s * .3);
    ctx.bezierCurveTo(s, -s * .6, s * 2, s * .15, 0, s * 1.6);
    ctx.fill();
    ctx.restore();
  }

  let t = 0;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    t += .01;

    for (const star of stars) {
      star.twinklePhase += star.twinkleSpeed;
      const op = star.baseOpacity * (.5 + .5 * Math.sin(star.twinklePhase));
      ctx.globalAlpha = op;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const grad1 = ctx.createRadialGradient(W * .3, H * .2, 0, W * .3, H * .2, W * .5);
    grad1.addColorStop(0, `rgba(255,77,166,${.04 + .02 * Math.sin(t)})`);
    grad1.addColorStop(1, "transparent");
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, W, H);

    const grad2 = ctx.createRadialGradient(W * .7, H * .8, 0, W * .7, H * .8, W * .4);
    grad2.addColorStop(0, `rgba(168,85,247,${.03 + .02 * Math.sin(t * 1.3)})`);
    grad2.addColorStop(1, "transparent");
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, W, H);

    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.y -= h.speed;
      h.wobble += h.wobbleSpeed;
      h.x += Math.sin(h.wobble) * .6;
      if (h.y < -40) { hearts[i] = makeHeart(); continue; }
      drawHeart(h.x, h.y, h.size, h.opacity, h.hue);
    }

    requestAnimationFrame(animate);
  }
  animate();
}

// ── Fireworks on canvas after "Yes" — behind the card, sides only ──
function startFireworks() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener("resize", () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const particles = [];
  let launches = 0;
  const maxLaunches = 8;

  function explode(x, y) {
    const count = 35 + Math.random() * 25;
    const hue = 280 + Math.random() * 80;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: .006 + Math.random() * .012,
        size: 2 + Math.random() * 3.5,
        hue: hue + Math.random() * 40,
        brightness: 55 + Math.random() * 30,
      });
    }
  }

  function launchOne() {
    if (launches >= maxLaunches) return;
    launches++;
    const side = Math.random() > .5;
    const x = side ? W * (.02 + Math.random() * .2) : W * (.78 + Math.random() * .2);
    const y = H * (.08 + Math.random() * .55);
    explode(x, y);
    setTimeout(launchOne, 250 + Math.random() * 500);
  }

  launchOne();
  setTimeout(launchOne, 80);
  setTimeout(launchOne, 200);

  function animate() {
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,.1)";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += .035;
      p.vx *= .99;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }

      ctx.globalAlpha = p.life;
      ctx.fillStyle = `hsl(${p.hue},85%,${p.brightness}%)`;
      ctx.shadowColor = `hsl(${p.hue},85%,${p.brightness}%)`;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }

    if (particles.length > 0 || launches < maxLaunches) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  animate();
}

// ── Compliment carousel after "Yes" ──
function startComplimentCarousel() {
  const compliments = [
    "Ты самая милая милотулька 💖",
    "Рядом с тобой я чувствую себя дома 🏡",
    "Твоя улыбка освещает даже самый серый день ☀️",
    "Я люблю, как ты смеёшься 🥰",
    "Ты делаешь каждый момент особенным ✨",
    "С тобой хочется мечтать о будущем 🌟",
    "Ты красивая, умная и невероятная 💖",
    "Мне повезло, что ты есть у меня 🍀",
    "Ты вдохновляешь меня быть лучше 💪",
    "Ты — мой любимый человек на всей планете 🌍",
    "Ты самая красивая красотулька 💖",
  ];
  let idx = 0;
  const el = $("complimentText");
  function showNext() {
    el.style.animation = "none";
    void el.offsetHeight;
    el.textContent = compliments[idx % compliments.length];
    el.style.animation = "";
    idx++;
  }
  showNext();
  setInterval(showNext, 3500);
}

// ── Typewriter effect for message ──
function typewriterMessage() {
  const el = $("msgText");
  const text = el.textContent;
  el.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "msg-cursor";
  el.appendChild(cursor);
  let i = 0;
  function type() {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      setTimeout(type, 30);
    } else {
      setTimeout(() => cursor.remove(), 1500);
    }
  }
  setTimeout(type, 800);
}

// ── Countdown to Feb 14 ──
function initCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  let valentine = new Date(year, 1, 14);
  if (now > valentine) valentine = new Date(year + 1, 1, 14);
  const diff = valentine - now;
  if (diff <= 0 || diff > 30 * 24 * 60 * 60 * 1000) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  const el = $("countdown");
  const text = $("countdownText");
  if (days === 0) {
    text.textContent = `До Дня святого Валентина ${hours} ч — уже скоро! 💕`;
  } else {
    const dWord = days === 1 ? "день" : days < 5 ? "дня" : "дней";
    text.textContent = `До 14 февраля: ${days} ${dWord} ${hours} ч 💕`;
  }
  el.style.display = "flex";
}

// ── Secret easter egg ──
function initSecretNote() {
  const heart = $("heartEasterEgg");
  const note = $("secretNote");
  const close = $("secretClose");
  const text = $("secretText");

  const secrets = [
    "Знаешь, о чём я мечтаю? О том, чтобы каждое утро начиналось с твоей улыбки. И я сделаю всё, чтобы так и было. ",
    "Если бы мне дали выбрать кого угодно во всей вселенной — я бы снова выбрал тебя. Без раздумий. ",
    "Я тебя бесконечно сильно люблю, Уляшечка-милашечка. 💖"
  ];
  let secretIdx = 0;

  heart.addEventListener("click", (e) => {
    e.stopPropagation();
    text.textContent = secrets[secretIdx % secrets.length];
    secretIdx++;
    note.style.display = "flex";
    note.style.animation = "none";
    void note.offsetHeight;
    note.style.animation = "";
    spawnHeartBurst(10);
  });

  close.addEventListener("click", (e) => {
    e.stopPropagation();
    note.style.display = "none";
  });

  note.addEventListener("click", (e) => {
    if (e.target === note) note.style.display = "none";
  });
}

// ── Falling rose petals canvas ──
function initPetalCanvas() {
  const canvas = $("petalCanvas");
  const ctx = canvas.getContext("2d");
  let W, H;
  const petals = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function makePetal() {
    return {
      x: Math.random() * W,
      y: -20 - Math.random() * 60,
      size: 6 + Math.random() * 10,
      speedY: .4 + Math.random() * .8,
      speedX: (Math.random() - .5) * .4,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: .015 + Math.random() * .025,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - .5) * .03,
      opacity: .3 + Math.random() * .4,
      hue: 330 + Math.random() * 30,
      lightness: 70 + Math.random() * 15,
    };
  }

  for (let i = 0; i < 18; i++) {
    const p = makePetal();
    p.y = Math.random() * H;
    petals.push(p);
  }

  function drawPetal(p) {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.scale(1, 0.6);
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${p.hue},60%,${p.lightness}%)`;
    ctx.shadowColor = `hsl(${p.hue},60%,${p.lightness}%)`;
    ctx.shadowBlur = 4;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.speedY;
      p.wobble += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.wobble) * .5;
      p.rotation += p.rotSpeed;
      if (p.y > H + 30) { petals[i] = makePetal(); continue; }
      drawPetal(p);
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ── Init ──
function init() {
  applyParams();
  initEnvelope();
  initCardTilt();
  initNoDodge();
  initCursorTrail();
  initBgCanvas();
  initPetalCanvas();
  initSecretNote();
  initCountdown();

  $("yesBtn").addEventListener("click", handleYes);
  $("noBtn").addEventListener("click", handleNo);

  setTimeout(typewriterMessage, 1200);
}

init();

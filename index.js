const passwordInput = document.getElementById("password");
const progressBar = document.getElementById("progressBar");
const strengthE1 = document.getElementById("strength");
const lcE1 = document.getElementById("lc");
const ucE1 = document.getElementById("uc");
const numE1 = document.getElementById("num");
const symE1 = document.getElementById("sym");
const charsE1 = document.getElementById("chars");

const passwordStrengths = [
  { difficulty: "weak", color: "red" },
  { difficulty: "medium", color: "orange" },
  { difficulty: "Strong", color: "green" },
];

const hasNumber = /\d/; /// checking if the password contains at least one number
const hasUpperCase = /[A-Z]/;
const hasLowerCase = /[a-z]/;
const hasSpecial = /[^A-Za-z0-9]/;

function getPasswordStrength(strength) {
  if (strength > 8) {
    return passwordStrengths[2];
  }

  if (strength > 5) {
    return passwordStrengths[1];
  }

  return passwordStrengths[0];
}

function getPasswordScore(text) {
  let score = 0;
  if (text.length > 3) {
    score = Math.min(6, Math.floor(text.length / 3));
    score +=
      hasNumber.test(text) +
      hasUpperCase.test(text) +
      hasLowerCase.test(text) +
      hasSpecial.test(text);
  }
  return score;
}

function updateUI(strength, score, length, indicators) {
  strengthE1.textContent = strength.difficulty;
  progressBar.style.backgroundColor = strength.color;
  progressBar.style.width = score * 10 + "%";
  lcE1.className = indicators.lc;
  ucE1.className = indicators.uc;
  numE1.className = indicators.num;
  symE1.className = indicators.sym;
  charsE1.textContent = length;
}

passwordInput.addEventListener("input", function () {
  const password = passwordInput.value;
  const score = getPasswordScore(passwordInput.value);
  const strength = getPasswordStrength(score);
  const [lc, uc, num, sym] = [
    hasLowerCase.test(password),
    hasUpperCase.test(password),
    hasNumber.test(password),
    hasSpecial.test(password),
  ];

  updateUI(strength, score, password.length, { lc, uc, num, sym });
});

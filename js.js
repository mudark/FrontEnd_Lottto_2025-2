document.getElementById('input-btn').addEventListener('click', () => {
  const inputs = document.querySelectorAll('#input-ball input');
  getNumbers(inputs); 
});

function getNumbers(balls) {
  for (ball of balls) {
    const n = Math.floor(Math.random() * 99) + 1;
    ball.value = n;
  }
}

var quantity;
var matchCount;
var bonusMatch;
document.getElementById('buy-btn').addEventListener('click', () => {
  const input = document.getElementById('quantity');
  quantity = parseInt(input.value);
  if (isNaN(quantity) || quantity <= 0) {
    alert('잘못된 수량 입력');
    return;
  }
  const winning = document.querySelectorAll('#winning-ball input');
  getNumbers(winning);

  const myNumbers = document.querySelectorAll('#buy-ball input');
  const inputs = document.querySelectorAll('#input-ball input');
  const numbers = [];
  for (n of inputs) numbers.push(n.value);
  myNumbers.forEach((btn, i) => {btn.value = numbers[i];});

  const winningNumbers = Array.from(winning).map(btn => parseInt(btn.value));
  const myLotto = Array.from(myNumbers).map(btn => parseInt(btn.value));

  const bonus = winningNumbers[6];
  const mainWinning = winningNumbers.slice(0, 6);

  matchCount = myLotto.slice(0, 6).filter(n => mainWinning.includes(n)).length;
  bonusMatch = myLotto.includes(bonus);
});

document.getElementById('result-btn').addEventListener('click',() => {
  document.getElementById("result").style.display="flex";
  let price=0;
  switch (matchCount) {
    case 3: price=5000; break;
    case 4: price=50000; break;
    case 5:
      if (bonusMatch) price=15000000;
      else price=150000;
      break;
    case 6: price=200000000; break;
  }
  const resultText = document.getElementById('result-text');
  resultText.textContent = `당신의 당첨금은 총 ${price.toLocaleString()}원 입니다.`;
});

document.getElementById('close-btn').addEventListener('click',() => {
  document.getElementById("result").style.display="none";
});
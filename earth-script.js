// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let numbers = [];
let operations = [];
let currentIndex = 0;
let total = 0;
let interval;
let isShowingNumbers = false;

//ОБРАБОТЧИКИ СОБЫТИЙ

// Обработчик события после загрузки документа
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll("#razryadnost-container .toggle-option")
    .forEach((option) => {
      option.addEventListener("click", function () {
        document
          .querySelectorAll("#razryadnost-container .toggle-option")
          .forEach((opt) => {
            opt.classList.remove("active");
          });
        this.classList.add("active");
        document.getElementById("razryadnost").value =
          this.getAttribute("data-value");
      });
    });

  // Активация значения по умолчанию для разрядности
  const defaultRazryadnost = document.querySelector(
    "#razryadnost-container .toggle-option[data-value='1']"
  );
  if (defaultRazryadnost) {
    defaultRazryadnost.click();
  }

  // Активация значения по умолчанию для помощников
  const defaultHelper = document.querySelector(
    "#helperLevel-container .toggle-option[data-value='9']"
  );
  if (defaultHelper) {
    defaultHelper.click();
  }

  // Проверка и вывод текущего значения helperLevel
  var helperLevel = parseInt(
    document.getElementById("helperLevel").value,
    10
  );

  document.getElementById("currentHelperLevel").textContent = helperLevel;
});

document.addEventListener("DOMContentLoaded", function () {
  // Восстанавливаем счетчик правильных ответов
  const savedScore = localStorage.getItem("correctAnswers") || 0;
  document.getElementById("correctAnswersDisplay").textContent =
    savedScore;

  // Добавляем обработчик на изменение разрядности
  document
    .querySelectorAll("#razryadnost-container .toggle-option")
    .forEach((option) => {
      option.addEventListener("click", function () {
        // Сбросить счетчик правильных ответов
        localStorage.setItem("correctAnswers", 0);
        document.getElementById("correctAnswersDisplay").textContent = 0;

        // Логика изменения разрядности
        document
          .querySelectorAll("#razryadnost-container .toggle-option")
          .forEach((opt) => {
            opt.classList.remove("active");
          });
        this.classList.add("active");
        document.getElementById("razryadnost").value =
          this.getAttribute("data-value");
      });
    });

  const defaultRazryadnost = document.querySelector(
    "#razryadnost-container .toggle-option[data-value='1']"
  );
  if (defaultRazryadnost) {
    defaultRazryadnost.click();
  }
});

document
  .querySelectorAll("#helperLevel-container .toggle-option")
  .forEach((option) => {
    option.addEventListener("click", function () {
      // Сбросить счетчик правильных ответов
      localStorage.setItem("correctAnswers", 0);
      document.getElementById("correctAnswersDisplay").textContent = 0;
      document
        .querySelectorAll("#helperLevel-container .toggle-option")
        .forEach((opt) => {
          opt.classList.remove("active");
        });
      this.classList.add("active");
      const helperLevelValue = this.getAttribute("data-value");
      document.getElementById("helperLevel").value = helperLevelValue;
      document.getElementById("currentHelperLevel").textContent =
        helperLevelValue;
    });
  });

// Увеличение скорости показа чисел
document
  .getElementById("increaseSpeed")
  .addEventListener("click", function () {
    var speedInput = document.getElementById("speed");
    var currentSpeed = parseFloat(speedInput.value);
    var maxSpeed = parseFloat(speedInput.max);
    if (currentSpeed < maxSpeed) {
      speedInput.value = (currentSpeed + 0.1).toFixed(1);
      updateSpeedDisplay(speedInput.value);
    }
  });

// Уменьшение скорости показа чисел
document
  .getElementById("decreaseSpeed")
  .addEventListener("click", function () {
    var speedInput = document.getElementById("speed");
    var currentSpeed = parseFloat(speedInput.value);
    var minSpeed = parseFloat(speedInput.min);
    if (currentSpeed > minSpeed) {
      speedInput.value = (currentSpeed - 0.1).toFixed(1);
      updateSpeedDisplay(speedInput.value);
    }
  });

// Сохранение настроек при изменении
document.getElementById("speed").addEventListener("change", saveSettings);
document
  .getElementById("actions")
  .addEventListener("change", saveSettings);

// Восстановление настроек при загрузке страницы
document.addEventListener("DOMContentLoaded", restoreSettings);

// Увеличение количества действий
document
  .getElementById("increaseActions")
  .addEventListener("click", function () {
    var actionsInput = document.getElementById("actions");
    var currentActions = parseInt(actionsInput.value);
    var maxActions = parseInt(actionsInput.max);
    if (currentActions < maxActions) {
      actionsInput.value = currentActions + 1;
      updateActionsDisplay(actionsInput.value);
    }
  });

// Уменьшение количества действий
document
  .getElementById("decreaseActions")
  .addEventListener("click", function () {
    var actionsInput = document.getElementById("actions");
    var currentActions = parseInt(actionsInput.value);
    var minActions = parseInt(actionsInput.min);
    if (currentActions > minActions) {
      actionsInput.value = currentActions - 1;
      updateActionsDisplay(actionsInput.value);
    }
  });

//ФУНКЦИИ УПРАВЛЕНИЯ ИНТЕРФЕЙСОМ

//Функция для управления размерами генерируемых чисел
function adjustFontSize() {
  if (window.innerWidth <= 480) {
    var numberDisplay = document.getElementById("numberDisplay");
    var numberText = numberDisplay.textContent.length;

    if (numberText === 2) {
      numberDisplay.style.fontSize = "3em";
    } else if (numberText === 3) {
      numberDisplay.style.fontSize = "2.5em";
    } else if (numberText === 4) {
      numberDisplay.style.fontSize = "1.8em";
    } else if (numberText === 5) {
      numberDisplay.style.fontSize = "1.5em";
    }
  } else if (window.innerWidth >= 481 && window.innerWidth <= 1080) {
    var numberDisplay = document.getElementById("numberDisplay");
    var numberText = numberDisplay.textContent.length;

    if (numberText === 2) {
      numberDisplay.style.fontSize = "3em";
    } else if (numberText === 3) {
      numberDisplay.style.fontSize = "3em";
    } else if (numberText === 4) {
      numberDisplay.style.fontSize = "3em";
    } else if (numberText === 5) {
      numberDisplay.style.fontSize = "3em";
    }
  }
}

window.addEventListener("load", adjustFontSize);

var numberDisplay = document.getElementById("numberDisplay");
var observer = new MutationObserver(adjustFontSize);

observer.observe(numberDisplay, {
  childList: true,
  characterData: true,
  subtree: true,
});

// Обработчик нажатия Enter в поле ввода ответа пользователя
let enterPressCount = 0;
let enterPressed = false;
let enterTimer = null;

document
  .getElementById("userAnswer")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!enterPressed && !enterTimer) {
        enterPressed = true;

        let input = document.getElementById("userAnswer").value.trim();
        if (!input && enterPressCount === 0) {
          alert(
            "Пожалуйста, введите ответ перед тем как перейти к следующему вопросу."
          );
          enterPressed = false;
          return;
        }

        if (enterPressCount === 0) {
          checkAnswer();
          enterPressCount = 1;
        } else {
          restartTraining();
          enterPressCount = 0;
        }

        enterTimer = setTimeout(() => {
          enterTimer = null;
        }, 1000);
      }
    }
  });

document
  .getElementById("userAnswer")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      enterPressed = false;
    }
  });

//Адаптирует заголовок в зависимости от размера экрана.
document.addEventListener("DOMContentLoaded", function () {
  function adjustHeader() {
    var screenWidth = window.innerWidth;
    var header = document.querySelector("h1");
    if (screenWidth <= 1080) {
      header.innerHTML = "Русский Дом<br>ментальной арифметики";
    } else {
      header.innerHTML = "Русский Дом ментальной арифметики";
    }
  }
  adjustHeader();
  window.addEventListener("resize", adjustHeader);
});

//Обновляет уровень помощника в интерфейсе.
function updateHelperLevelDisplay(helperLevel) {
  document
    .querySelectorAll("#helperLevel-container .toggle-option")
    .forEach((option) => {
      if (option.getAttribute("data-value") === helperLevel) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
}

//Обновляет разрядность в интерфейсе.
function updateRazryadnostDisplay(value) {
  document
    .querySelectorAll("#razryadnost-container .toggle-option")
    .forEach((option) => {
      if (option.getAttribute("data-value") === value) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
}

//Обновляет отображение количества действий в интерфейсе.
function updateActionsDisplay(value) {
  document.getElementById("actionsDisplay").textContent = value;
}

//Обновляет отображение скорости в интерфейсе.
function updateSpeedDisplay(value) {
  const range = document.getElementById("speed");
  const valueDisplay = document.getElementById("speedDisplay");
  const background = range.parentNode.querySelector(".slider-background");

  valueDisplay.textContent = value;

  if (background) {
    const max = parseFloat(range.max);
    const min = parseFloat(range.min);
    const percentage = ((value - min) / (max - min)) * 100;
    background.style.width = `${percentage}%`;
  }
}

//Отображает расчёты на экране.
function displayCalculations() {
  var calculationsDisplay = document.getElementById(
    "displayCalculations"
  );
  clearNotification();
  calculationsDisplay.textContent = window.sessionCalculations.join("\n");
  document
    .getElementById("calculationResults")
    .classList.remove("hidden");

  var showCalculationsBtn = document.getElementById("showCalculations");
  if (showCalculationsBtn) {
    showCalculationsBtn.classList.add("hidden");
  }
  document.getElementById("userAnswer").focus();
}

//Очищает уведомления на экране.
function clearNotification() {
  var notification = document.getElementById("notification");
  notification.innerText = "";
  notification.classList.add("hidden");
}

//Возвращает пользователя к настройкам.
function goBack() {
  clearInputAndCalculations();
  clearNotification();
  document.getElementById("baseSettings").classList.remove("hidden");
  document
    .querySelector(".settings-container")
    .classList.remove("hidden");
  document.getElementById("trainingScreen").classList.add("hidden");
  var showCalculationsBtn = document.getElementById("showCalculations");
  if (showCalculationsBtn) {
    showCalculationsBtn.classList.add("hidden");
  }
}

//Очищает поля ввода и расчёты.
function clearInputAndCalculations() {
  document.getElementById("userAnswer").value = "";
  document.getElementById("displayCalculations").textContent = "";
  document.getElementById("calculationResults").classList.add("hidden");
  var showCalculationsBtn = document.getElementById("showCalculations");
  if (showCalculationsBtn) {
    showCalculationsBtn.classList.add("hidden");
  }
  document.getElementById("notification").classList.add("hidden");
  numbers = [];
  total = 0;
  currentIndex = 0;
}

//Обновляет текстовое отображение количества действий на интерфейсе пользователя.
function updateActionsDisplay(value) {
  document.getElementById("actionsDisplay").textContent = value;
}

//ФУНКЦИИ УПРАВЛЕНИЯ ДАННЫМИ

//Изменяет значение в элементе input.
function changeValue(id, step) {
  var input = document.getElementById(id);
  var value = parseFloat(input.value) || 0;
  var newValue = value + step;
  if (newValue >= parseFloat(input.min)) {
    if (input.step && input.step % 1 === 0) {
      input.value = Math.round(newValue);
    } else {
      input.value = newValue.toFixed(1);
    }
  }
}

//Увеличивает значение на определённый шаг.
function increaseValue(id, step) {
  var input = document.getElementById(id);
  var value = parseFloat(input.value);
  var max = parseFloat(input.max);
  if (value + step <= max) {
    input.value = value + step;
  }
}

//Сохраняет текущие настройки в локальное хранилище.
function saveSettings() {
  const speed = document.getElementById("speed").value;
  const actions = document.getElementById("actions").value;
  const helperLevel = document.getElementById("helperLevel").value;
  const razryadnost = document.getElementById("razryadnost").value;
  localStorage.setItem("speed", speed);
  localStorage.setItem("actions", actions);
  localStorage.setItem("helperLevel", helperLevel);
  localStorage.setItem("razryadnost", razryadnost);
  updateSpeedDisplay(speed);
  updateActionsDisplay(actions);
  updateHelperLevelDisplay(helperLevel);
  updateRazryadnostDisplay(razryadnost);
}

//Восстанавливает сохранённые настройки из локального хранилища.
function restoreSettings() {
  const savedSpeed = localStorage.getItem("speed");
  const savedActions = localStorage.getItem("actions");
  const savedHelperLevel = localStorage.getItem("helperLevel");
  const savedRazryadnost = localStorage.getItem("razryadnost");
  if (savedSpeed) {
    document.getElementById("speed").value = savedSpeed;
    updateSpeedDisplay(savedSpeed);
  }
  if (savedActions) {
    document.getElementById("actions").value = savedActions;
    updateActionsDisplay(savedActions);
  }
  if (savedHelperLevel) {
    document.getElementById("helperLevel").value = savedHelperLevel;
    updateHelperLevelDisplay(savedHelperLevel);
    document.getElementById("currentHelperLevel").textContent =
      savedHelperLevel;
  }
  if (savedRazryadnost) {
    document.getElementById("razryadnost").value = savedRazryadnost;
    updateRazryadnostDisplay(savedRazryadnost);
  }
}

//ФУНКЦИИ ЛОГИКИ ТРЕНИРОВКИ

//   МНОГОЗНАЧНЫЕ
let minValue, maxValue;
function isGreenSubtraction(x, y, digitRange, ruleHelper) {
  const xStr = x.toString().padStart(digitRange, "0");
  const yStr = y.toString().padStart(digitRange, "0");

  const validDigits = {
    1: [0],
    2: [0, 1],
    3: [0, 1, 2],
    4: [0, 1, 2, 3],
    5: [0, 1, 2, 3, 4],
    6: [0, 5],
    7: [0, 1, 5, 6],
    8: [0, 1, 2, 5, 6, 7],
    9: [0, 1, 2, 3, 5, 6, 7, 8],
  };

  const checkGreen = (xDigit, yDigit, validDigitsForY) => {
    return (
      yDigit === parseInt(ruleHelper) && validDigitsForY.includes(xDigit)
    );
  };

  switch (digitRange) {
    case 2: {
      const unitsX = parseInt(xStr.slice(-1));
      const unitsY = parseInt(yStr.slice(-1));
      return checkGreen(unitsX, unitsY, validDigits[ruleHelper]);
    }
    case 3: {
      const tensX = parseInt(xStr.slice(-2, -1));
      const unitsX = parseInt(xStr.slice(-1));
      const tensY = parseInt(yStr.slice(-2, -1));
      const unitsY = parseInt(yStr.slice(-1));
      return (
        checkGreen(unitsX, unitsY, validDigits[ruleHelper]) ||
        checkGreen(tensX, tensY, validDigits[ruleHelper])
      );
    }
    case 4: {
      const hundredsX = parseInt(xStr.slice(-3, -2));
      const tensX = parseInt(xStr.slice(-2, -1));
      const unitsX = parseInt(xStr.slice(-1));
      const hundredsY = parseInt(yStr.slice(-3, -2));
      const tensY = parseInt(yStr.slice(-2, -1));
      const unitsY = parseInt(yStr.slice(-1));
      return (
        checkGreen(unitsX, unitsY, validDigits[ruleHelper]) ||
        checkGreen(tensX, tensY, validDigits[ruleHelper]) ||
        checkGreen(hundredsX, hundredsY, validDigits[ruleHelper])
      );
    }
    default:
      return false;
  }
}
function isGreenAddition(x, y, digitRange, ruleHelper) {
  const xStr = x.toString().padStart(digitRange, "0");
  const yStr = y.toString().padStart(digitRange, "0");

  const validDigits = {
    1: [9],
    2: [8, 9],
    3: [7, 8, 9],
    4: [6, 7, 8, 9],
    5: [5, 6, 7, 8, 9],
    6: [4, 9],
    7: [3, 4, 8, 9],
    8: [2, 3, 4, 7, 8, 9],
    9: [1, 2, 3, 4, 6, 7, 8, 9],
  };

  const checkGreen = (xDigit, yDigit, validDigitsForY) => {
    return (
      yDigit === parseInt(ruleHelper) && validDigitsForY.includes(xDigit)
    );
  };

  switch (digitRange) {
    case 2: {
      const unitsX = parseInt(xStr.slice(-1));
      const unitsY = parseInt(yStr.slice(-1));
      return checkGreen(unitsX, unitsY, validDigits[ruleHelper]);
    }
    case 3: {
      const tensX = parseInt(xStr.slice(-2, -1));
      const unitsX = parseInt(xStr.slice(-1));
      const tensY = parseInt(yStr.slice(-2, -1));
      const unitsY = parseInt(yStr.slice(-1));
      return (
        checkGreen(unitsX, unitsY, validDigits[ruleHelper]) ||
        checkGreen(tensX, tensY, validDigits[ruleHelper])
      );
    }
    case 4: {
      const hundredsX = parseInt(xStr.slice(-3, -2));
      const tensX = parseInt(xStr.slice(-2, -1));
      const unitsX = parseInt(xStr.slice(-1));
      const hundredsY = parseInt(yStr.slice(-3, -2));
      const tensY = parseInt(yStr.slice(-2, -1));
      const unitsY = parseInt(yStr.slice(-1));
      return (
        checkGreen(unitsX, unitsY, validDigits[ruleHelper]) ||
        checkGreen(tensX, tensY, validDigits[ruleHelper]) ||
        checkGreen(hundredsX, hundredsY, validDigits[ruleHelper])
      );
    }
    default:
      return false;
  }
}
function isForbiddenAddition(x, y, digitRange, ruleHelper) {
  const xStr = x.toString().padStart(digitRange, "0");
  const yStr = y.toString().padStart(digitRange, "0");

  const validDigits = {
    1: [9],
    2: [8, 9],
    3: [7, 8, 9],
    4: [6, 7, 8, 9],
    5: [5, 6, 7, 8, 9],
    6: [4, 9],
    7: [3, 4, 8, 9],
    8: [2, 3, 4, 7, 8, 9],
    9: [1, 2, 3, 4, 6, 7, 8, 9],
  };

  const checkForbidden = (xDigit, yDigit, validDigitsForY) => {
    return (
      xDigit + yDigit >= 10 &&
      !(
        yDigit === parseInt(ruleHelper) &&
        validDigitsForY.includes(xDigit)
      )
    );
  };

  switch (digitRange) {
    case 2: {
      const unitsX = parseInt(xStr.slice(-1));
      const unitsY = parseInt(yStr.slice(-1));
      return checkForbidden(unitsX, unitsY, validDigits[ruleHelper]);
    }
    case 3: {
      const tensX = parseInt(xStr.slice(-2, -1));
      const unitsX = parseInt(xStr.slice(-1));
      const tensY = parseInt(yStr.slice(-2, -1));
      const unitsY = parseInt(yStr.slice(-1));
      return (
        checkForbidden(unitsX, unitsY, validDigits[ruleHelper]) ||
        checkForbidden(tensX, tensY, validDigits[ruleHelper])
      );
    }
    case 4: {
      const hundredsX = parseInt(xStr.slice(-3, -2));
      const tensX = parseInt(xStr.slice(-2, -1));
      const unitsX = parseInt(xStr.slice(-1));
      const hundredsY = parseInt(yStr.slice(-3, -2));
      const tensY = parseInt(yStr.slice(-2, -1));
      const unitsY = parseInt(yStr.slice(-1));
      return (
        checkForbidden(unitsX, unitsY, validDigits[ruleHelper]) ||
        checkForbidden(tensX, tensY, validDigits[ruleHelper]) ||
        checkForbidden(hundredsX, hundredsY, validDigits[ruleHelper])
      );
    }
    default:
      return false;
  }
}
function isForbiddenSubtraction(x, y, digitRange, ruleHelper) {
  const xStr = x.toString().padStart(digitRange, "0");
  const yStr = y.toString().padStart(digitRange, "0");

  const validDigits = {
    1: [0],
    2: [0, 1],
    3: [0, 1, 2],
    4: [0, 1, 2, 3],
    5: [0, 1, 2, 3, 4],
    6: [0, 5],
    7: [0, 1, 5, 6],
    8: [0, 1, 2, 5, 6, 7],
    9: [0, 1, 2, 3, 5, 6, 7, 8, 9],
  };

  const checkForbidden = (xDigit, yDigit, validDigitsForY) => {
    return (
      xDigit < yDigit &&
      !(
        yDigit === parseInt(ruleHelper) &&
        validDigitsForY.includes(xDigit)
      )
    );
  };

  switch (digitRange) {
    case 2: {
      const unitsX = parseInt(xStr.slice(-1));
      const unitsY = parseInt(yStr.slice(-1));
      return checkForbidden(unitsX, unitsY, validDigits[ruleHelper]);
    }
    case 3: {
      const tensX = parseInt(xStr.slice(-2, -1));
      const unitsX = parseInt(xStr.slice(-1));
      const tensY = parseInt(yStr.slice(-2, -1));
      const unitsY = parseInt(yStr.slice(-1));
      return (
        checkForbidden(unitsX, unitsY, validDigits[ruleHelper]) ||
        checkForbidden(tensX, tensY, validDigits[ruleHelper])
      );
    }
    case 4: {
      const hundredsX = parseInt(xStr.slice(-3, -2));
      const tensX = parseInt(xStr.slice(-2, -1));
      const unitsX = parseInt(xStr.slice(-1));
      const hundredsY = parseInt(yStr.slice(-3, -2));
      const tensY = parseInt(yStr.slice(-2, -1));
      const unitsY = parseInt(yStr.slice(-1));
      return (
        checkForbidden(unitsX, unitsY, validDigits[ruleHelper]) ||
        checkForbidden(tensX, tensY, validDigits[ruleHelper]) ||
        checkForbidden(hundredsX, hundredsY, validDigits[ruleHelper])
      );
    }
    default:
      return false;
  }
}

function findGreenOperation(
  currentValue,
  operation,
  digitRange,
  ruleHelper
) {
  const maxOperandAddition = maxValue - currentValue;
  const maxOperandSubtraction = currentValue - minValue;
  let operands = [];

  if (operation === "+") {
    operands = Array.from(
      { length: maxOperandAddition - minValue + 1 },
      (_, i) => i + minValue
    );
    operands = operands.sort(() => Math.random() - 0.5);
    for (let operand of operands) {
      let result = currentValue + operand;
      if (digitRange == 2 && Math.random() > 0.5) {
        if (
          isGreenAddition(
            currentValue,
            operand,
            digitRange,
            ruleHelper
          ) &&
          !isForbiddenAddition(
            currentValue,
            operand,
            digitRange,
            ruleHelper
          ) &&
          result <= maxValue
        ) {
          return { operand, result, operation: "+", isGreen: true };
        }
      } else if (digitRange != 2) {
        if (
          isGreenAddition(
            currentValue,
            operand,
            digitRange,
            ruleHelper
          ) &&
          !isForbiddenAddition(
            currentValue,
            operand,
            digitRange,
            ruleHelper
          ) &&
          result <= maxValue
        ) {
          return { operand, result, operation: "+", isGreen: true };
        }
      }
    }
  }

  if (operation === "-") {
    operands = Array.from(
      { length: maxOperandSubtraction - minValue + 1 },
      (_, i) => i + minValue
    );
    operands = operands.sort(() => Math.random() - 0.5);
    for (let operand of operands) {
      let result = currentValue - operand;
      if (digitRange == 2 && Math.random() > 0.5) {
        if (
          isGreenSubtraction(
            currentValue,
            operand,
            digitRange,
            ruleHelper
          ) &&
          !isForbiddenSubtraction(
            currentValue,
            operand,
            digitRange,
            ruleHelper
          ) &&
          result >= minValue
        ) {
          return { operand, result, operation: "-", isGreen: true };
        }
      } else if (digitRange != 2) {
        if (
          isGreenSubtraction(
            currentValue,
            operand,
            digitRange,
            ruleHelper
          ) &&
          !isForbiddenSubtraction(
            currentValue,
            operand,
            digitRange,
            ruleHelper
          ) &&
          result >= minValue
        ) {
          return { operand, result, operation: "-", isGreen: true };
        }
      }
    }
  }

  return null;
}

function findBlackOperation(
  currentValue,
  operation,
  digitRange,
  ruleHelper
) {
  const maxOperandAddition = maxValue - currentValue;
  const maxOperandSubtraction = currentValue - minValue;
  let operands = [];

  if (operation === "+") {
    operands = Array.from(
      { length: maxOperandAddition - minValue + 1 },
      (_, i) => i + minValue
    );
    operands = operands.sort(() => Math.random() - 0.5);
    for (let operand of operands) {
      let result = currentValue + operand;
      if (
        !isForbiddenAddition(
          currentValue,
          operand,
          digitRange,
          ruleHelper
        ) &&
        result <= maxValue
      ) {
        return { operand, result, operation: "+", isGreen: false };
      }
    }
  }

  if (operation === "-") {
    operands = Array.from(
      { length: maxOperandSubtraction - minValue + 1 },
      (_, i) => i + minValue
    );
    operands = operands.sort(() => Math.random() - 0.5);
    for (let operand of operands) {
      let result = currentValue - operand;
      if (
        !isForbiddenSubtraction(
          currentValue,
          operand,
          digitRange,
          ruleHelper
        ) &&
        result >= minValue
      ) {
        return { operand, result, operation: "-", isGreen: false };
      }
    }
  }

  return null;
}

const predefinedExamples = [
  [
    +19, +21, +59, -79, +39, +31, -11, -59, +29, -24, +73, -38, +29, -39,
    +19, -59, +72, -42, +31, -71, +99, -39, -51, +11, +75, -56, +51, -61,
    +31, +14, -65, +71, -61, +45, -12, +18, +29, -39, -21, +51, -61, +11,
    -27, +13, +73, -39, -21, -29, +39, -35,
  ],
  [
    +99, -44, -46, +11, +44, +35, -89, +59, -39, +65, -75, +39, +31, -11,
    -59, +49, +21, -31, -19, -11, +31, +39, -89, +83, -54, +55, -85, +73,
    -42, +49, -29, -31, +11, +59, -79, +55, -46, +31, -29, +35, -26, -31,
    +76, +14, -89, +79, -39, -41, +75, -74,
  ],
  [
    +59, +31, -71, +11, -21, +51, -31, +41, +19, -49, +34, +21, -56, +31,
    -41, +63, -13, -29, +49, -84, +14, +61, -21, -58, +88, -39, -31, +35,
    +25, -19, -61, +66, -11, -23, +58, -29, -59, +49, +37, -29, +31, -33,
    -56, +29, +21, +39, -46, -23, +69, -96,
  ],
  [
    +59, -36, +76, -89, +19, +41, +29, -59, +49, -19, +29, -68, +49, -41,
    +51, -61, +41, +29, -79, +19, -29, +69, -39, +59, -29, -61, +11, +79,
    -74, +71, -67, +51, -77, +37, +59, -28, -32, +31, -11, -19, -31, +81,
    -61, +31, -51, +61, -41, +31, +34, -75,
  ],
  [
    +99, -19, +15, -56, +51, -11, -59, +19, +25, -34, +53, -63, +69, -53,
    +61, -27, +14, -34, +29, -19, -31, -11, +18, +34, +29, -88, +69, -61,
    +28, -15, +67, -69, +49, -39, -35, +94, -15, -74, +89, -29, -11, -52,
    +73, +19, -29, -11, +12, -31, +59, -67, +38,
  ],
  [
    +59, -53, +54, +19, -49, +29, +11, +19, -69, +79, -89, +39, -19, +69,
    -37, +32, -35, +31, -68, +48, +29, -89, +13, +76, -49, +29, -54, +74,
    -79, +25, +53, -48, +49, -39, +23, -24, +11, -41, -19, +49, -39, +79,
    -31, -38, +62, -73, +41, +39, -93, +83,
  ],
  [
    +99, -55, -13, +49, -61, +21, +59, -29, -51, +71, -12, -55, +56, -49,
    +69, -29, -61, +11, +79, -49, +38, -28, +39, -75, -15, +18, +32, -29,
    +19, -39, +29, +31, -41, +51, -61, +71, -31, +21, +19, -24, -66, +27,
    +63, -39, -31, +11, -15, +44, +11, -51,
  ],
  [
    +59, -49, +89, -69, -21, +71, -61, +41, +39, -89, +18, +71, -63, +24,
    +39, -79, +74, -54, +59, -19, -71, +21, +69, -79, -11, +51, +33, -63,
    -11, +41, -31, +11, +59, -79, -11, +51, +39, -19, -71, +51, +39, -79,
    +49, +21, -81, +89, -76, +27, -19, +59,
  ],
  [
    +99, -29, -31, -24, +84, -68, +48, -59, +39, +31, -71, +11, +69, -79,
    +77, -27, +29, -59, -11, +61, -75, +55, -11, +14, -23, -11, -29, +89,
    -86, +85, -79, -19, +97, -87, +69, -43, +44, -51, -21, +41, -47, +77,
    -48, +68, -14, -16, +11, -51, +31, +39,
  ],
  [
    +59, +21, -41, +53, -33, -49, +89, -29, -51, +21, +59, -56, +52, -76,
    +21, +59, -49, -31, +51, +29, -19, -71, +75, +15, -47, -12, -31, +81,
    -32, -48, +49, +21, -61, +11, +38, +21, -49, +39, -58, +49, -11, +31,
    -61, +11, +59, -69, +19, -39, +89, -19,
  ],
  [
    +98, -69, +61, -81, +51, -21, +41, +19, -79, +71, -72, +61, -68, +28,
    -21, +15, +63, -18, -69, +12, +67, -79, +29, +41, +13, -65, +71, -23,
    -67, +11, +59, -19, -21, -38, +89, -21, -22, -27, +39, +11, +23, -83,
    +89, -69, -21, +33, -13, -28, +35, +63,
  ],
  [
    +99, -19, -11, -39, +69, -19, -11, -29, +59, -19, -21, +31, -71, +41,
    -51, +57, -16, -19, +58, -29, +39, -24, -36, -12, +72, -29, -39, +68,
    -49, -11, -19, +29, -39, +81, -52, -19, +79, -69, +29, -52, +22, +31,
    +39, -69, -11, +71, -51, +31, +29, -79,
  ],
  [
    +32, +67, -42, -27, +63, -23, -41, +61, -31, -14, -15, +64, -75, +41,
    -21, +46, +14, -13, -56, +64, -74, +71, -22, +21, -11, -17, +31, -33,
    -21, +31, -41, +61, -51, -19, -11, +51, +39, -49, -31, +61, +19, -79,
    +39, +21, +17, -47, -41, +61, -31, -29,
  ],
  [
    +69, -37, +48, +11, -81, +34, +55, -39, +21, -28, +17, -57, +67, +19,
    -89, +29, +21, -31, +41, -51, +71, -21, -48, +78, -31, -39, +41, -51,
    +21, +59, -49, +29, +11, -71, +41, +39, -49, -11, -19, +48, -18, +46,
    -27, +11, -41, -19, -11, +51, -48, +87,
  ],
  [
    +31, +59, -81, +21, -11, +71, -21, +11, +19, -29, -11, +31, -21, -59,
    +33, -14, +19, +11, +21, -71, +31, +59, -29, -51, +21, +59, -89, +69,
    -39, +19, +11, +22, -42, +49, -19, +14, -74, -11, +51, -31, -19, +29,
    -23, +44, +37, -78, +22, -32, +78, -58,
  ],
  [
    +99, -19, -71, +81, -67, +46, +21, -71, +41, -21, -14, +74, -59, -11,
    -19, +79, -69, -11, +21, +69, -79, +49, -19, -21, +51, -68, +37, -48,
    +98, -83, +82, -88, +89, -19, -18, +37, -47, +27, -69, +89, -64, +54,
    -69, +71, -82, +51, +19, +11, -81, +61,
  ],
  [
    +99, -59, -21, +11, +69, -79, +49, +11, +19, -49, -21, +31, -51, +12,
    +39, +33, -43, -21, +61, -11, -43, +33, +11, -45, +64, -51, -31, +82,
    -89, +49, +21, +19, -59, +39, -65, +35, -29, +79, -59, +19, +31, -71,
    +61, -51, +31, +29, -69, +79, -92, +62,
  ],
  [
    +59, +23, -13, -19, +49, -29, -11, +31, -51, +39, +21, -19, -11, -22,
    +12, -39, +79, -13, -27, -49, +83, -14, -59, +74, -64, +69, -29, +18,
    -69, +71, -31, -19, +59, -79, +49, -38, +68, -39, -31, +11, +36, -17,
    -29, -21, +11, +29, -28, +48, -39, -21,
  ],
  [
    +39, +51, -31, +11, +29, -49, -21, +51, -61, +41, -31, +51, +19, -69,
    -21, +61, +29, -49, -41, +11, +79, -43, +29, -65, +79, -29, +19, -83,
    +93, -39, +35, -52, +56, -69, +59, -29, +37, -78, +61, -24, -47, +71,
    -61, +51, -41, -19, +82, -22, +29, -54,
  ],
  [
    +48, +11, -39, +74, -64, +39, +22, -27, +25, -19, -11, +31, -51, +41,
    +19, -56, -23, +79, -33, -45, -12, +56, +15, -71, +31, +19, +38, -57,
    +49, -19, -31, -29, +89, -59, -21, +41, +39, -89, +49, -39, +79, -59,
    -12, +71, -89, +69, -49, -11, +51, +23,
  ],
  [
    +19, +71, -51, +21, +19, -33, +53, -89, +34, +55, -29, -62, +12, +79,
    -89, +83, -84, +31, -21, +51, -11, -29, +69, -49, +29, +11, -71, +21,
    -18, -12, +89, -29, -41, +11, -21, +51, -31, -29, +89, -19, -61, +44,
    -13, -11, -29, +39, -42, +62, +11, -71,
  ],
  [
    +99, -79, +39, +11, -41, -27, +81, -33, -31, +13, +67, -89, +69, -44,
    +24, +31, -61, +41, +29, -13, -26, +39, -75, +65, -19, +29, -61, -28,
    +89, -39, -37, +56, -69, +29, +51, -58, +37, -19, +49, -39, +13, -52,
    +78, -29, +28, -78, +51, +27, -88, +89,
  ],
  [
    +89, -19, -31, +21, +39, -19, -49, +68, -39, -21, -19, +76, -66, +69,
    -29, -49, +78, -36, -34, +31, +39, -32, -38, +41, +19, -49, -11, -19,
    +35, +54, -29, -41, +31, +39, -49, -41, +51, -31, +32, +29, -61, +41,
    -11, +31, -71, +41, +29, -78, +36, -37,
  ],
  [
    +39, +31, +29, -96, +67, +24, -54, +59, -29, -31, +21, +19, -77, +38,
    +49, -19, -11, +21, -51, +41, -11, -34, -16, +38, -17, +29, +21, -61,
    +24, -33, +59, -29, -27, +26, +31, -41, -19, +81, -38, +46, -49, +47,
    -68, +31, +39, -89, +27, +22, -29, +49,
  ],
  [
    +53, +27, +19, -14, -46, -29, +89, -58, +51, -62, +69, -39, -51, +61,
    -18, +47, -29, -41, -19, +89, -79, -13, +92, -59, -13, +22, -29, +69,
    -39, -41, +81, -31, -19, -21, +71, -22, -28, +39, -29, +49, -79, +19,
    +41, -42, +61, -69, +66, -27, -39, +69,
  ],
  [
    +99, -44, -45, +89, -59, -17, -13, +87, -58, -29, +69, -48, +59, -51,
    +41, -71, +51, +29, -85, +95, -79, +39, +11, +29, -66, +36, +21, -51,
    +31, -41, +11, +39, -19, +34, -55, +41, -61, +51, -31, +41, -51, +11,
    +19, +31, -71, +21, -11, +56, -58, +52,
  ],
  [
    +19, +21, -31, +51, +39, -79, +29, -38, +88, -95, +55, +21, +19, -72,
    +52, -13, +33, -89, +39, -19, +69, -44, +14, -29, +49, -84, +54, +31,
    -15, +24, -92, +33, -21, +11, +19, -29, +75, -55, -21, +24, +56, -59,
    -31, +51, +33, -43, +19, -35, +37, +28,
  ],
  [
    +79, +13, -22, +29, -49, +19, +21, -11, -69, +19, +61, -31, +21, +19,
    -28, -42, +51, -55, +15, +49, -85, +45, -29, -11, +61, +19, -82, +23,
    +52, -73, +71, -41, +21, +16, -36, +29, -23, -46, +89, -29, -51, +11,
    +69, -19, -31, +21, -51, +71, +19, -49,
  ],
  [
    +99, -69, -21, +72, +18, -59, +12, +24, -14, -52, +29, +51, -61, +46,
    -66, +11, +79, -19, -21, -52, +92, -88, +28, +29, +31, -33, -37, +41,
    -11, -39, +49, -59, +89, -39, -31, +11, +59, -83, +14, +69, -19, -51,
    +61, -21, -59, +89, -19, +12, -83, +71,
  ],
  [
    +39, +51, -21, -29, +59, -79, +29, -39, +32, +57, -39, +19, -43, +54,
    -81, +21, +19, -39, +59, -29, -21, +51, -31, -19, +79, -99, +59, +31,
    -21, -11, +32, -21, -59, +89, -39, -28, +57, -19, -35, +54, -49, +59,
    -79, -11, +31, +57, -58, +21, +39, -61,
  ],
  [
    +99, -89, +49, +29, +11, -27, -42, +69, -19, -17, -52, +68, +11, -71,
    +57, -47, +31, +39, -43, -36, +79, -59, +29, +21, -84, +23, +31, +39,
    -89, +23, +66, -19, +16, -29, -28, +55, -65, +41, +24, -54, +19, +31,
    -61, -19, +89, -39, +29, -65, +75, -92,
  ],
  [
    +79, -59, +67, -57, +59, -25, +35, -89, +79, -29, -51, +81, -71, +11,
    +69, -39, -21, +41, -48, -23, +71, -61, +11, +49, -59, +79, -69, -11,
    -16, +96, -73, +31, +42, -19, -51, +41, -61, +21, +39, -14, +15, +29,
    -69, +53, -44, +21, +39, -55, -34, +89,
  ],
  [
    +29, +11, +19, +21, -51, +31, +39, -29, -41, +61, -51, +21, +39, -69,
    +19, -39, +89, -72, +48, -36, +41, +16, -26, -31, -12, +72, -69, +66,
    -56, +59, -19, -41, +51, -25, +34, -49, +36, +13, -19, -21, +11, +19,
    -79, +14, +75, -59, +38, +12, -85, +93,
  ],
  [
    +89, -29, +14, +21, -55, +59, -29, -31, +21, +22, -72, +89, -29, -57,
    +46, +11, -51, +21, +59, -19, -28, +47, -89, +83, -74, +27, +53, -33,
    -16, +19, +11, -21, -25, +65, -29, -41, +54, -33, +49, -39, +36, -28,
    +31, -39, -25, +64, -19, -21, +31, -71,
  ],
  [
    +99, -89, +69, -59, +75, -15, +19, -49, +39, -55, +65, -79, +26, -37,
    +81, -11, -49, +12, +47, -39, -31, +51, -61, +31, +19, +21, +12, -13,
    -38, -21, +59, -39, +19, +13, +26, -18, -51, +41, +29, -59, -11, +31,
    -21, -29, +87, -17, -11, -55, +32, -27,
  ],
  [
    +69, -59, +89, -98, +95, -21, +24, -82, +32, -29, +47, +32, -19, -41,
    +42, -52, +61, -81, +51, -32, +71, -59, +49, -29, +39, -89, +69, -39,
    +19, -29, -21, +65, -24, +49, -59, +24, -63, +19, +79, -69, -11, +21,
    +55, -26, -29, -31, +51, +38, -68, +47,
  ],
  [
    +99, -33, -57, +21, +69, -49, +39, -19, -41, +31, +39, -19, -21, -29,
    +69, -65, -24, +72, +17, -49, -21, +31, +39, -69, +28, +12, -11, -29,
    -17, +86, -19, -69, +79, -21, +11, +19, -39, -38, +77, -49, +45, -53,
    -33, +61, -51, +62, +18, -74, +73, -91,
  ],
  [
    +38, +54, -33, -29, +62, -72, +19, +51, -31, +28, -13, -43, -22, +35,
    -25, +71, -51, +21, +26, -47, +21, -31, +61, -69, +56, -47, -11, +51,
    -61, +21, +59, -49, -21, +11, +19, -39, +59, -29, -11, -19, +89, -29,
    -11, -32, +22, -25, +35, +16, +22, -18,
  ],
  [
    +94, -84, +39, -19, -11, +61, -41, -29, +89, -59, +49, -51, +61, -19,
    -71, +51, +39, -69, +41, -32, +31, -41, -29, +92, -83, +71, -61, +22,
    +53, -74, +73, -43, +44, -14, +19, -79, +39, -49, +59, -19, -31, +11,
    +69, -39, +31, -85, +63, +21, -81, +62,
  ],
  [
    +89, -68, +28, -29, +69, -39, +49, -29, +25, -35, -31, +11, -37, +92,
    -36, +31, -61, +11, +56, -14, +17, -69, -11, +71, -34, +33, -49, -21,
    +11, +39, -29, -31, +71, -41, +23, -32, +69, -19, -11, +21, -61, +51,
    -21, -29, -11, +21, -31, +61, +29, -19,
  ],
];

function getPredefinedSequence(startIndex, numberOfOperations) {
  return predefinedExamples.slice(
    startIndex,
    startIndex + numberOfOperations
  );
}

function generateOperationSequence() {
  const digitRange = parseInt(
    document.getElementById("razryadnost").value
  );
  const ruleHelper = document.getElementById("helperLevel").value;

  switch (digitRange) {
    case 2:
      minValue = 10;
      maxValue = 99;
      break;
    case 3:
      minValue = 100;
      maxValue = 999;
      break;
    case 4:
      minValue = 1000;
      maxValue = 9999;
      break;
    default:
      throw new Error("Invalid digit range");
  }

  let startValue;
  let predefinedArray = null;

  if (ruleHelper === "1" && digitRange === 2) {
    const randomArrayIndex = Math.floor(
      Math.random() * predefinedExamples.length
    );
    predefinedArray = predefinedExamples[randomArrayIndex];
    startValue = predefinedArray[0];
  } else {
    startValue =
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }

  const numberOfOperations = 10;
  generateRandomOperationSequence(
    startValue,
    numberOfOperations,
    digitRange,
    ruleHelper,
    predefinedArray
  );
}

function generateRandomOperationSequence(
  startValue,
  numberOfOperations,
  digitRange,
  ruleHelper,
  predefinedArray = null
) {
  let currentValue = startValue;
  window.sessionCalculations = [];
  numbers = [];
  const displayCalculations = document.getElementById(
    "displayCalculations"
  );
  displayCalculations.innerHTML = "";

  window.sessionCalculations.push(`Начальное число: ${currentValue}`);
  numbers.push(`${currentValue}`);

  let operationsCount = 0;

  if (predefinedArray) {
    for (let i = 1; i < numberOfOperations; i++) {
      const operand = predefinedArray[i];
      const operation = operand > 0 ? "+" : "-";
      const result = currentValue + operand;
      const resultString = `${currentValue} ${operation} ${Math.abs(
        operand
      )} = ${result}`;
      const resultElement = document.createElement("div");
      resultElement.textContent = resultString;
      resultElement.classList.add("normal");
      displayCalculations.appendChild(resultElement);
      window.sessionCalculations.push(resultString);
      numbers.push(`${operation}${Math.abs(operand)}`);

      currentValue = result;
      operationsCount++;
      if (operationsCount >= numberOfOperations) break;
    }
  } else {
    let usedOperands = new Set();
    while (operationsCount < numberOfOperations - 1) {
      let operationResult = null;
      let attempts = 0;
      const maxAttempts = 1000;

      while (attempts < maxAttempts) {
        attempts++;

        operationResult = findGreenOperation(
          currentValue,
          "+",
          digitRange,
          ruleHelper
        );
        if (!operationResult) {
          operationResult = findGreenOperation(
            currentValue,
            "-",
            digitRange,
            ruleHelper
          );
        }
        if (
          !operationResult ||
          usedOperands.has(operationResult.operand)
        ) {
          operationResult = findBlackOperation(
            currentValue,
            "+",
            digitRange,
            ruleHelper
          );
        }
        if (
          !operationResult ||
          usedOperands.has(operationResult.operand)
        ) {
          operationResult = findBlackOperation(
            currentValue,
            "-",
            digitRange,
            ruleHelper
          );
        }

        if (
          operationResult &&
          !usedOperands.has(operationResult.operand)
        ) {
          break;
        }

        operationResult = null;
      }

      if (operationResult) {
        const { operand, result, operation, isGreen } = operationResult;
        const resultString = `${currentValue} ${operation} ${operand} = ${result}`;
        const resultElement = document.createElement("div");
        resultElement.textContent = resultString;

        if (isGreen) {
          resultElement.classList.add("highlight");
        } else {
          resultElement.classList.add("normal");
        }

        displayCalculations.appendChild(resultElement);
        window.sessionCalculations.push(resultString);
        numbers.push(`${operation}${operand}`);
        usedOperands.add(operand);
        currentValue = result;
        operationsCount++;
      } else {
        usedOperands.clear();

        operationResult =
          findBlackOperation(currentValue, "+", digitRange, ruleHelper) ||
          findBlackOperation(currentValue, "-", digitRange, ruleHelper);

        if (operationResult) {
          const { operand, result, operation, isGreen } = operationResult;
          const resultString = `${currentValue} ${operation} ${operand} = ${result}`;
          const resultElement = document.createElement("div");
          resultElement.textContent = resultString;
          resultElement.classList.add("normal");

          displayCalculations.appendChild(resultElement);
          window.sessionCalculations.push(resultString);
          numbers.push(`${operation}${operand}`);
          usedOperands.add(operand);
          currentValue = result;
          operationsCount++;
        } else {
          const errorElement = document.createElement("div");
          errorElement.textContent =
            "Не удалось найти подходящую операцию. Генерация завершена. Все возможные комбинации использованы.";
          errorElement.classList.add("forbidden");
          displayCalculations.appendChild(errorElement);
          break;
        }
      }
    }
  }

  const finalResultElement = document.createElement("div");
  finalResultElement.textContent = `Итоговое число: ${currentValue}`;
  displayCalculations.appendChild(finalResultElement);
  window.sessionCalculations.push(`Итоговое число: ${currentValue}`);
  total = currentValue;
}

//КОНЕЦ МНОГОЗНАЧНЫХ

//Массивы значений земного счета

const newExamplesHelper9 = [
  [1, "+", 9],
  [2, "+", 9],
  [3, "+", 9],
  [4, "+", 9],
  [6, "+", 9],
  [7, "+", 9],
  [8, "+", 9],
  [9, "+", 9],
  [10, "-", 9],
  [11, "-", 9],
  [12, "-", 9],
  [13, "-", 9],
  [15, "-", 9],
  [16, "-", 9],
  [17, "-", 9],
  [18, "-", 9],
];
const newExamplesHelper8 = [
  [2, "+", 8],
  [3, "+", 8],
  [4, "+", 8],
  [7, "+", 8],
  [8, "+", 8],
  [8, "+", 9],
  [10, "-", 8],
  [11, "-", 8],
  [12, "-", 8],
  [15, "-", 8],
  [16, "-", 8],
  [17, "-", 8],
];

const newExamplesHelper7 = [
  [3, "+", 7],
  [4, "+", 7],
  [8, "+", 7],
  [9, "+", 7],
  [10, "-", 7],
  [11, "-", 7],
  [15, "-", 7],
  [16, "-", 7],
];

const newExamplesHelper6 = [
  [4, "+", 6],
  [9, "+", 6],
  [10, "-", 6],
  [15, "-", 6],
];

const newExamplesHelper5 = [
  [5, "+", 5],
  [6, "+", 5],
  [7, "+", 5],
  [8, "+", 5],
  [9, "+", 5],
  [10, "-", 5],
  [11, "-", 5],
  [12, "-", 5],
  [13, "-", 5],
  [14, "-", 5],
];
const newExamplesHelper4 = [
  [6, "+", 4],
  [7, "+", 4],
  [8, "+", 4],
  [9, "+", 4],
  [10, "-", 4],
  [11, "-", 4],
  [12, "-", 4],
  [13, "-", 4],
];

const newExamplesHelper3 = [
  [7, "+", 3],
  [8, "+", 3],
  [9, "+", 3],
  [10, "-", 3],
  [11, "-", 3],
  [12, "-", 3],
];

const newExamplesHelper2 = [
  [8, "+", 2],
  [9, "+", 2],
  [10, "-", 2],
  [11, "-", 2],
];

const newExamplesHelper1 = [
  [9, "+", 1],
  [10, "-", 1],
];

// Глобальные переменные для отслеживания использованных ожидаемых комбинаций
let usedExpectedExamples = [];

function getExpectedValues(helperLevel) {
  switch (helperLevel) {
    case 1:
      return [9, 10];
    case 2:
      return [8, 9, 10, 11];
    case 3:
      return [7, 8, 9, 10, 11, 12];
    case 4:
      return [6, 7, 8, 9, 10, 11, 12, 13];
    case 5:
      return [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    case 6:
      return [4, 9, 10, 15];
    case 7:
      return [3, 4, 8, 9, 10, 11, 15, 16];
    case 8:
      return [2, 3, 4, 7, 8, 9, 10, 11, 12, 15, 16, 17];
    case 9:
      return [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18];
    default:
      return [];
  }
}

function generateEarthLevel() {
  window.sessionCalculations = [];
  numbers = [];
  usedExpectedExamples = [];
  availableExpectedValues = [];
  previousAdjustedValue = null;
  currentIndex = 0;
  total = 0;

  var speed = parseFloat(document.getElementById("speed").value) * 1000;
  var actions = parseInt(document.getElementById("actions").value);
  var razryadnost = parseInt(
    document.getElementById("razryadnost").value
  );
  var helperLevel = parseInt(
    document.getElementById("helperLevel").value
  );
  var rangeValue = parseInt(
    document
      .querySelector(".toggle-option.active")
      .getAttribute("data-value")
  );

  if (isNaN(helperLevel)) {
    console.error("Ошибка: Некорректное значение helperLevel");
    return;
  }

  if (razryadnost === 1) {
    window.sessionCalculations = [];
    numbers = [];
    const min = 1;
    const max = 9;
    total = Math.floor(Math.random() * (max - min + 1)) + min;

    let currentNumber = total;
    numbers.push(currentNumber);
    window.sessionCalculations.push("Начальное число: " + currentNumber);

    let validActionCount = 1;
    let lastWasExpected = true;
    let previousAdjustedValue = null;

    let availableExpectedValues = getExpectedValues(helperLevel);

    let iterationLimit = 100; // Лимит итераций для главного цикла
    let iterations = 0; // Счётчик итераций
    let attemptsLog = []; // Массив для хранения попыток

    let actionSource = ""; // "newExample", "adjustment", или "validOperation"
    let num = null; // Инициализируем с нейтральным значением
    let operation = "none"; // Значение по умолчанию, указывающее на отсутствие операции

    while (validActionCount < actions) {
      console.log(
        `Итерация ${iterations}: currentNumber = ${currentNumber}, validActionCount = ${validActionCount}`
      );

      if (iterations >= iterationLimit) {
        console.error(
          `Достигнут лимит итераций в главном цикле для currentValue: ${currentNumber}, ` +
            `выполнено действий: ${validActionCount}, итераций: ${iterations}, ` +
            `последние num: ${num}, операция: ${operation}, доступных значений: ${availableExpectedValues.length}, ` +
            `последнее ожидаемое: ${lastWasExpected}, последнее корректировочное значение: ${previousAdjustedValue}`
        );

        console.error("Попытки до достижения лимита:", attemptsLog);
        break;
      }

      iterations++;

      // Логирование текущей попытки
      let attemptInfo = {
        currentNumber,
        validActionCount,
        lastWasExpected,
        previousAdjustedValue,
      };

      attemptsLog.push(attemptInfo);

      if (lastWasExpected) {
        let newExample = getNewExample(
          currentNumber,
          helperLevel,
          razryadnost
        );

        //пробуй найти НУЖНОЕ значение в getNewExample для текущего числа
        if (newExample) {
          operation = newExample[1];
          num = newExample[2];
          // console.log(`Выбрано из getNewExample: ${currentNumber} ${operation} ${num}`);
          usedExpectedExamples.push(
            `${newExample[0]}${newExample[1]}${newExample[2]}`
          );
          availableExpectedValues = availableExpectedValues.filter(
            (value) => value !== newExample[2]
          );
          lastWasExpected = false;
          actionSource = "0";
          //пробуй найти НУЖНОЕ значение в getNewExample для текущего числа
          console.log("1.1");
        } else if (validActionCount + 1 < actions) {
          //Проверка возможности выполнения дополнительных действий
          let adjustedValue = adjustToExpected(
            currentNumber,
            helperLevel,
            previousAdjustedValue,
            availableExpectedValues
          );
          actionSource = "1";

          if (
            //Попытка корректировки текущего значения
            adjustedValue !== currentNumber &&
            adjustedValue >= 1 &&
            adjustedValue <= 9
          ) {
            let correction = adjustedValue - currentNumber;
            actionSource = "2";
            if (
              Math.abs(correction) >= 1 &&
              Math.abs(correction) <= 9 &&
              !checkForRepeatingOrOpposite(numbers, correction)
            ) {
              actionSource = "3";
              numbers.push(
                correction >= 0 ? "+" + correction : correction.toString()
              );
              window.sessionCalculations.push(
                `${currentNumber} ${
                  correction >= 0 ? "+ " : "- "
                }${Math.abs(correction)} = ${adjustedValue}
                (${actionSource})
                `
              );
              currentNumber = adjustedValue;
              validActionCount++;
            }
          }

          newExample = getNewExample(
            currentNumber,
            helperLevel,
            razryadnost
          );

          if (newExample) {
            operation = newExample[1];
            num = newExample[2];
            actionSource = "4";
            usedExpectedExamples.push(
              `${newExample[0]}${newExample[1]}${newExample[2]}`
            );
            availableExpectedValues = availableExpectedValues.filter(
              (value) => value !== newExample[2]
            );
            lastWasExpected = true;
            actionSource = "5";
          } else {
            lastWasExpected = false;
            let validOperations = [];
            let sum = getValidSum(currentNumber, razryadnost);
            let difference = getValidDifference(
              currentNumber,
              razryadnost
            );
            actionSource = "6";
            if (
              sum !== null &&
              sum >= 1 &&
              sum <= 9 &&
              !isExpectedCombination(currentNumber, "+", sum, helperLevel)
            ) {
              validOperations.push({ op: "+", num: sum });
              actionSource = "7";
            }
            if (
              difference !== null &&
              difference >= 1 &&
              difference <= 9 &&
              !isExpectedCombination(
                currentNumber,
                "-",
                difference,
                helperLevel
              )
            ) {
              validOperations.push({ op: "-", num: difference });
              actionSource = "8";
            }
            console.log(
              `validOperations на шаге 3 с currentNumber ${currentNumber}:`,
              validOperations
            );
            if (validOperations.length > 0) {
              let choice =
                validOperations[
                  Math.floor(Math.random() * validOperations.length)
                ];
              operation = choice.op;
              num = choice.num;
              lastWasExpected = false;
              actionSource = "9";
            } else {
              console.error(
                `Не удалось найти допустимое значение для операции: ${currentNumber}`
              );
              break;
            }
            console.log("1.4");
          }
        } else {
          lastWasExpected = false;
          let validOperations = [];
          let sum = getValidSum(currentNumber, razryadnost);
          let difference = getValidDifference(currentNumber, razryadnost);
          console.log(
            `Текущее число: ${currentNumber}, Полученная сумма: ${sum}, Полученная разность: ${difference}`
          );

          if (
            sum !== null &&
            sum >= 1 &&
            sum <= 9 &&
            !isExpectedCombination(currentNumber, "+", sum, helperLevel)
          ) {
            validOperations.push({ op: "+", num: sum });
          }
          if (
            difference !== null &&
            difference >= 1 &&
            difference <= 9 &&
            !isExpectedCombination(
              currentNumber,
              "-",
              difference,
              helperLevel
            )
          ) {
            validOperations.push({ op: "-", num: difference });
          }
          console.log(
            `validOperations на шаге 1 с currentNumber ${currentNumber}:`,
            validOperations
          );
          if (validOperations.length > 0) {
            let choice =
              validOperations[
                Math.floor(Math.random() * validOperations.length)
              ];
            operation = choice.op;
            num = choice.num;
            lastWasExpected = false;
          } else {
            console.error(
              `Не удалось найти допустимое значение для операции: ${currentNumber}`
            );
            break;
          }
          console.log("1.5");
        }
        console.log("1 finish");
      } else {
        let validOperations = [];
        let sum = getValidSum(currentNumber, razryadnost);
        let difference = getValidDifference(currentNumber, razryadnost);
        console.log(
          `Текущее число: ${currentNumber}, Полученная сумма: ${sum}, Полученная разность: ${difference}`
        );

        if (
          sum !== null &&
          sum >= 1 &&
          sum <= 9 &&
          !isExpectedCombination(currentNumber, "+", sum, helperLevel)
        ) {
          validOperations.push({ op: "+", num: sum });
        }
        if (
          difference !== null &&
          difference >= 1 &&
          difference <= 9 &&
          !isExpectedCombination(
            currentNumber,
            "-",
            difference,
            helperLevel
          )
        ) {
          validOperations.push({ op: "-", num: difference });
        }
        console.log(
          `validOperations на шаге 2 с currentNumber ${currentNumber}:`,
          validOperations
        );

        if (validOperations.length > 0) {
          let choice =
            validOperations[
              Math.floor(Math.random() * validOperations.length)
            ];
          operation = choice.op;
          num = choice.num;
          lastWasExpected = true;
          actionSource = "10";
        } else {
          console.error(
            `Не удалось найти допустимое значение для операции: ${currentNumber}`
          );
          break;
        }
      }

      if (num !== null) {
        let operationResult;
        if (operation === "+") {
          operationResult = currentNumber + num;
          if (
            !checkForRepeatingOrOpposite(numbers, num) &&
            num >= 1 &&
            num <= 9
          ) {
            window.sessionCalculations.push(
              `${currentNumber} + ${num} = ${operationResult} (${actionSource})`
            );
            currentNumber += num;
            numbers.push("+" + num);
            lastWasExpected = true;
            validActionCount++;
          } else {
            let validSum = getValidSum(currentNumber, razryadnost);

            if (
              validSum !== null &&
              !checkForRepeatingOrOpposite(numbers, validSum) &&
              validSum >= 1 &&
              validSum <= 9
            ) {
              num = validSum;
              operationResult = currentNumber + num;
              window.sessionCalculations.push(
                `${currentNumber} + ${num} = ${operationResult} (${actionSource})`
              );
              currentNumber += num;
              numbers.push("+" + num);
              lastWasExpected = true;
              validActionCount++;
            }
          }
        } else {
          operationResult = currentNumber - num;
          if (
            !checkForRepeatingOrOpposite(numbers, -num) &&
            num >= 1 &&
            num <= 9
          ) {
            window.sessionCalculations.push(
              `${currentNumber} - ${num} = ${operationResult} (${actionSource})`
            );
            currentNumber -= num;
            numbers.push("-" + num);
            lastWasExpected = false;
            validActionCount++;
          } else {
            let validDifference = getValidDifference(
              currentNumber,
              razryadnost
            );

            if (
              validDifference !== null &&
              !checkForRepeatingOrOpposite(numbers, -validDifference) &&
              validDifference >= 1 &&
              validDifference <= 9
            ) {
              num = validDifference;

              operationResult = currentNumber - num;
              window.sessionCalculations.push(
                `${currentNumber} - ${num} = ${operationResult} (${actionSource})`
              );
              currentNumber -= num;
              numbers.push("-" + num);
              lastWasExpected = false;
              validActionCount++;
            }
          }
        }
        previousOperation = operation;
        previousNum = num;
      } else {
        console.error(
          `Не удалось найти допустимое значение для операции: ${currentNumber} ${operation}`
        );
      }

      if (availableExpectedValues.length === 0) {
        availableExpectedValues = getExpectedValues(helperLevel);
      }
    }

    window.sessionCalculations.push("Итоговое число: " + currentNumber);
    total = currentNumber;

    document.getElementById("baseSettings").classList.add("hidden");
    document.getElementById("trainingScreen").classList.remove("hidden");
    var showCalculationsBtn = document.getElementById("showCalculations");
    if (showCalculationsBtn) {
      showCalculationsBtn.classList.add("hidden");
    }

    currentIndex = 0;
    document.getElementById("countdown").innerText = "3";
    setTimeout(() => {
      document.getElementById("countdown").innerText = "2";
      setTimeout(() => {
        document.getElementById("countdown").innerText = "1";
        setTimeout(() => {
          document.getElementById("countdown").innerText = "";
          showNumbers(speed);
        }, 1000);
      }, 1000);
    }, 1000);

    console.log("Массив:", numbers);
  } else {
    let startValue, predefinedArray;
    switch (razryadnost) {
      case 2:
        minValue = 10;
        maxValue = 99;
        break;
      case 3:
        minValue = 100;
        maxValue = 999;
        break;
      case 4:
        minValue = 1000;
        maxValue = 9999;
        break;
      default:
        throw new Error("Invalid digit range");
    }

    if (helperLevel === 1 && razryadnost === 2) {
      const randomArrayIndex = Math.floor(
        Math.random() * predefinedExamples.length
      );
      predefinedArray = predefinedExamples[randomArrayIndex];
      startValue = predefinedArray[0];
    } else {
      startValue =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    }

    generateRandomOperationSequence(
      startValue,
      actions,
      razryadnost,
      helperLevel,
      predefinedArray
    );

    document.getElementById("baseSettings").classList.add("hidden");
    document.getElementById("trainingScreen").classList.remove("hidden");
    var showCalculationsBtn = document.getElementById("showCalculations");
    if (showCalculationsBtn) {
      showCalculationsBtn.classList.add("hidden");
    }

    currentIndex = 0;
    document.getElementById("countdown").innerText = "3";
    setTimeout(() => {
      document.getElementById("countdown").innerText = "2";
      setTimeout(() => {
        document.getElementById("countdown").innerText = "1";
        setTimeout(() => {
          document.getElementById("countdown").innerText = "";
          showNumbers(speed);
        }, 1000);
      }, 1000);
    }, 1000);
  }
}

//ЗЕМНОЙ ОДНОЗНАЧНЫЕ
function isExpectedCombination(
  currentValue,
  operation,
  num,
  helperLevel
) {
  let expectedExamples;
  switch (helperLevel) {
    case 1:
      expectedExamples = newExamplesHelper1;
      break;
    case 2:
      expectedExamples = newExamplesHelper2;
      break;
    case 3:
      expectedExamples = newExamplesHelper3;
      break;
    case 4:
      expectedExamples = newExamplesHelper4;
      break;
    case 5:
      expectedExamples = newExamplesHelper5;
      break;
    case 6:
      expectedExamples = newExamplesHelper6;
      break;
    case 7:
      expectedExamples = newExamplesHelper7;
      break;
    case 8:
      expectedExamples = newExamplesHelper8;
      break;
    case 9:
      expectedExamples = newExamplesHelper9;
      break;
    default:
      expectedExamples = [];
      break;
  }

  return expectedExamples.some(
    (example) =>
      example[0] === currentValue &&
      example[1] === operation &&
      example[2] === num
  );
}

function getNewExample(currentValue, helperLevel, razryadnost) {
  let newExamples;
  switch (helperLevel) {
    case 1:
      newExamples = newExamplesHelper1;
      break;
    case 2:
      newExamples = newExamplesHelper2;
      break;
    case 3:
      newExamples = newExamplesHelper3;
      break;
    case 4:
      newExamples = newExamplesHelper4;
      break;
    case 5:
      newExamples = newExamplesHelper5;
      break;
    case 6:
      newExamples = newExamplesHelper6;
      break;
    case 7:
      newExamples = newExamplesHelper7;
      break;
    case 8:
      newExamples = newExamplesHelper8;
      break;
    case 9:
      newExamples = newExamplesHelper9;
      break;
    default:
      newExamples = [];
      break;
  }

  const digits = currentValue.toString().split("");
  const minDigitValue = 1;
  const maxDigitValue =
    razryadnost === 1 ? 19 : Math.pow(10, razryadnost) - 1;

  for (let example of newExamples) {
    let [digit, operation, num] = example;

    if (operation === "+" && digit === currentValue) {
      if (currentValue + num <= maxDigitValue) {
        return [currentValue, operation, num];
      }
    }

    if (operation === "-" && digit === currentValue) {
      if (currentValue - num >= minDigitValue) {
        return [currentValue, operation, num];
      }
    }
  }

  return null;
}

// Функция проверки повторяющихся или противоположных операций
function checkForRepeatingOrOpposite(numbers, newNumber) {
  if (numbers.length === 0) return false;
  let lastNumber = parseInt(numbers[numbers.length - 1]);
  return lastNumber === newNumber || lastNumber === -newNumber;
}

// Функция проверки повторяющихся или противоположных операций
function checkForRepeatingOrOpposite(numbers, newNumber) {
  if (numbers.length === 0) return false;
  let lastNumber = parseInt(numbers[numbers.length - 1]);
  return lastNumber === newNumber || lastNumber === -newNumber;
}

function adjustToExpected(
  currentValue,
  helperLevel,
  previousAdjustedValue,
  availableExpectedValues
) {
  let iterationLimit = 100; // Лимит итераций
  let iterations = 0; // Счётчик итераций

  if (!availableExpectedValues || availableExpectedValues.length === 0) {
    usedExpectedExamples = [];
    availableExpectedValues = getExpectedValues(helperLevel).filter(
      (value) =>
        !usedExpectedExamples.includes(`${currentValue}+${value}`) &&
        !usedExpectedExamples.includes(`${currentValue}-${value}`)
    );
  } else {
    availableExpectedValues = availableExpectedValues.filter(
      (value) =>
        !usedExpectedExamples.includes(`${currentValue}+${value}`) &&
        !usedExpectedExamples.includes(`${currentValue}-${value}`)
    );
  }

  let newValue;
  do {
    if (iterations >= iterationLimit) {
      console.error(
        `Достигнут лимит итераций в adjustToExpected для currentValue: ${currentValue}`
      );
      break;
    }
    iterations++;
    newValue =
      availableExpectedValues[
        Math.floor(Math.random() * availableExpectedValues.length)
      ];
  } while (
    newValue === currentValue ||
    newValue === previousAdjustedValue
  );

  return newValue;
}

function getValidSum(currentValue, razryadnost) {
  let helperLevel = parseInt(
    document.getElementById("helperLevel").value
  );

  let invalidSums;

  switch (helperLevel) {
    case 1:
      invalidSums = [
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 6],
        [6, 7],
        [6, 8],
        [7, 6],
        [7, 7],
        [8, 6],
      ].map((combination) => [...combination, "+"]);
      break;
    case 2:
      invalidSums = [
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 6],
        [6, 7],
        [6, 8],
        [7, 6],
        [7, 7],
        [8, 6],
        [9, 1],
      ].map((combination) => [...combination, "+"]);
      break;
    case 3:
      invalidSums = [
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 6],
        [6, 7],
        [6, 8],
        [7, 6],
        [7, 7],
        [8, 2],
        [8, 6],
        [9, 1],
        [9, 2],
      ].map((combination) => [...combination, "+"]);
      break;
    case 4:
      invalidSums = [
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 6],
        [6, 7],
        [6, 8],
        [7, 3],
        [7, 6],
        [7, 7],
        [8, 2],
        [8, 3],
        [8, 6],
        [9, 1],
        [9, 2],
        [9, 3],
      ].map((combination) => [...combination, "+"]);
      break;
    case 5:
      invalidSums = [
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 4],
        [6, 6],
        [6, 7],
        [6, 8],
        [7, 3],
        [7, 4],
        [7, 6],
        [7, 7],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 6],
        [9, 1],
        [9, 2],
        [9, 3],
        [9, 4],
      ].map((combination) => [...combination, "+"]);
      break;
    case 6:
      invalidSums = [
        [5, 5],
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 4],
        [6, 5],
        [6, 6],
        [6, 7],
        [6, 8],
        [7, 3],
        [7, 4],
        [7, 5],
        [7, 6],
        [7, 7],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 5],
        [8, 6],
        [9, 1],
        [9, 2],
        [9, 3],
        [9, 4],
        [9, 5],
      ].map((combination) => [...combination, "+"]);
      break;
    case 7:
      invalidSums = [
        [4, 6],
        [5, 5],
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 4],
        [6, 5],
        [6, 6],
        [6, 7],
        [6, 8],
        [7, 3],
        [7, 4],
        [7, 5],
        [7, 6],
        [7, 7],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 5],
        [8, 6],
        [9, 1],
        [9, 2],
        [9, 3],
        [9, 4],
        [9, 5],
        [9, 6],
      ].map((combination) => [...combination, "+"]);
      break;
    case 8:
      invalidSums = [
        [3, 7],
        [4, 6],
        [4, 7],
        [5, 5],
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 4],
        [6, 5],
        [6, 6],
        [6, 7],
        [6, 8],
        [7, 3],
        [7, 4],
        [7, 5],
        [7, 6],
        [7, 7],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 5],
        [8, 6],
        [8, 7],
        [9, 1],
        [9, 2],
        [9, 3],
        [9, 4],
        [9, 5],
        [9, 6],
        [9, 7],
      ].map((combination) => [...combination, "+"]);
      break;
    case 9:
      invalidSums = [
        [2, 8],
        [3, 7],
        [3, 8],
        [4, 6],
        [4, 7],
        [4, 8],
        [5, 5],
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 4],
        [6, 5],
        [6, 6],
        [6, 7],
        [6, 8],
        [7, 3],
        [7, 4],
        [7, 5],
        [7, 6],
        [7, 7],
        [7, 8],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 5],
        [8, 6],
        [8, 7],
        [8, 8],
        [9, 1],
        [9, 2],
        [9, 3],
        [9, 4],
        [9, 5],
        [9, 6],
        [9, 7],
        [9, 8],
      ].map((combination) => [...combination, "+"]);
      break;
    default:
      invalidSums = [];
      console.error("Неизвестный helperLevel: " + helperLevel);
      break;
  }

  console.log(
    "Текущий массив недопустимых сумм после инициализации:",
    invalidSums
  );

  let validSums = []; //пустой массив ?
  const max = razryadnost === 1 ? 19 : Math.pow(10, razryadnost) - 1;

  const iterationLimit = 20; // Лимит итераций
  let iterations = 0; // Счётчик итераций

  for (let num = 1; num <= max; num++) {
    if (iterations >= iterationLimit) {
      console.error(
        `Достигнут лимит итераций в getValidSum на числе ${num}`
      );
      return null;
    }
    iterations++;

    if (razryadnost === 1 && num > 9) continue;
    if (
      !isExpectedCombination(currentValue, "+", num, helperLevel) &&
      !isInvalidCombination(currentValue, num, invalidSums, "+") &&
      isValidTransition(currentValue, num, razryadnost)
    ) {
      validSums.push(num);
    } else {
    }
  }

  return validSums.length > 0
    ? validSums[Math.floor(Math.random() * validSums.length)]
    : null;
  console.log("Текущий массив недопустимых сумм:", invalidSums);
}

function getValidDifference(currentValue, razryadnost) {
  let helperLevel = parseInt(
    document.getElementById("helperLevel").value
  );

  let invalidDifferences;

  switch (helperLevel) {
    case 1:
      invalidDifferences = [
        [11, 6],
        [12, 6],
        [12, 7],
        [13, 6],
        [13, 7],
        [13, 8],
        [14, 6],
        [14, 7],
        [14, 8],
        [14, 9],
      ].map((combination) => [...combination, "-"]);
      break;
    case 2:
      invalidDifferences = [
        [10, 1],
        [11, 6],
        [12, 6],
        [12, 7],
        [13, 6],
        [13, 7],
        [13, 8],
        [14, 6],
        [14, 7],
        [14, 8],
        [14, 9],
      ].map((combination) => [...combination, "-"]);
      break;
    case 3:
      invalidDifferences = [
        [10, 1],
        [10, 2],
        [11, 2],
        [11, 6],
        [12, 6],
        [12, 7],
        [13, 6],
        [13, 7],
        [13, 8],
        [14, 6],
        [14, 7],
        [14, 8],
        [14, 9],
      ].map((combination) => [...combination, "-"]);
      break;
    case 4:
      invalidDifferences = [
        [10, 1],
        [10, 2],
        [10, 3],
        [11, 2],
        [11, 3],
        [11, 6],
        [12, 3],
        [12, 6],
        [12, 7],
        [13, 6],
        [13, 7],
        [13, 8],
        [14, 6],
        [14, 7],
        [14, 8],
        [14, 9],
      ].map((combination) => [...combination, "-"]);
      break;
    case 5:
      invalidDifferences = [
        [10, 1],
        [10, 2],
        [10, 3],
        [10, 4],
        [11, 2],
        [11, 3],
        [11, 4],
        [11, 6],
        [12, 3],
        [12, 4],
        [12, 6],
        [12, 7],
        [13, 4],
        [13, 6],
        [13, 7],
        [13, 8],
        [14, 6],
        [14, 7],
        [14, 8],
        [14, 9],
      ].map((combination) => [...combination, "-"]);
      break;
    case 6:
      invalidDifferences = [
        [10, 1],
        [10, 2],
        [10, 3],
        [10, 4],
        [10, 5],
        [11, 2],
        [11, 3],
        [11, 4],
        [11, 5],
        [11, 6],
        [12, 3],
        [12, 4],
        [12, 5],
        [12, 6],
        [12, 7],
        [13, 4],
        [13, 5],
        [13, 6],
        [13, 7],
        [13, 8],
        [14, 5],
        [14, 6],
        [14, 7],
        [14, 8],
        [14, 9],
      ].map((combination) => [...combination, "-"]);
      break;
    case 7:
      invalidDifferences = [
        [10, 1],
        [10, 2],
        [10, 3],
        [10, 4],
        [10, 5],
        [10, 6],
        [11, 2],
        [11, 3],
        [11, 4],
        [11, 5],
        [11, 6],
        [12, 3],
        [12, 4],
        [12, 5],
        [12, 6],
        [12, 7],
        [13, 4],
        [13, 5],
        [13, 6],
        [13, 7],
        [13, 8],
        [14, 5],
        [14, 6],
        [14, 7],
        [14, 8],
        [14, 9],
        [15, 6],
      ].map((combination) => [...combination, "-"]);
      break;
    case 8:
      invalidDifferences = [
        [10, 1],
        [10, 2],
        [10, 3],
        [10, 4],
        [10, 5],
        [10, 6],
        [10, 7],
        [11, 2],
        [11, 3],
        [11, 4],
        [11, 5],
        [11, 6],
        [11, 7],
        [12, 3],
        [12, 4],
        [12, 5],
        [12, 6],
        [12, 7],
        [13, 4],
        [13, 5],
        [13, 6],
        [13, 7],
        [13, 8],
        [14, 5],
        [14, 6],
        [14, 7],
        [14, 8],
        [14, 9],
        [15, 6],
        [15, 7],
        [16, 7],
      ].map((combination) => [...combination, "-"]);
      break;
    case 9:
      invalidDifferences = [
        [10, 1],
        [10, 2],
        [10, 3],
        [10, 4],
        [10, 5],
        [10, 6],
        [10, 7],
        [10, 8],
        [11, 2],
        [11, 3],
        [11, 4],
        [11, 5],
        [11, 6],
        [11, 7],
        [11, 8],
        [12, 3],
        [12, 4],
        [12, 5],
        [12, 6],
        [12, 7],
        [12, 8],
        [13, 4],
        [13, 5],
        [13, 6],
        [13, 7],
        [13, 8],
        [14, 5],
        [14, 6],
        [14, 7],
        [14, 8],
        [14, 9],
        [15, 6],
        [15, 7],
        [15, 8],
        [16, 7],
        [16, 8],
        [17, 8],
      ].map((combination) => [...combination, "-"]);
      break;
    default:
      invalidDifferences = [];
      console.error("Неизвестный helperLevel: " + helperLevel);
      break;
  }

  console.log(
    "Текущий массив недопустимых разностей после инициализации:",
    invalidDifferences
  );

  let validDifferences = [];
  const max = razryadnost === 1 ? 19 : Math.pow(10, razryadnost) - 1;

  const iterationLimit = 20;
  let iterations = 0;

  for (let num = 1; num <= currentValue; num++) {
    if (iterations >= iterationLimit) {
      console.error(
        `Достигнут лимит итераций в getValidSum на числе ${num}`
      );
      return null;
    }
    iterations++;

    if (razryadnost === 1 && num > 9) continue;
    if (
      !isExpectedCombination(currentValue, "-", num, helperLevel) &&
      !isInvalidCombination(currentValue, num, invalidDifferences, "-") &&
      isValidTransition(currentValue, -num, razryadnost)
    ) {
      validDifferences.push(num);
    } else {
    }
  }

  return validDifferences.length > 0
    ? validDifferences[
        Math.floor(Math.random() * validDifferences.length)
      ]
    : null;
}

function isValidTransition(currentValue, transitionValue, razryadnost) {
  const newValue = currentValue + transitionValue;
  const max = razryadnost === 1 ? 19 : Math.pow(10, razryadnost) - 1;
  const min = 0;
  const isValid = newValue <= max && newValue >= min;
  return isValid;
}

function isInvalidCombination(
  currentValue,
  num,
  invalidCombinations,
  operation
) {
  const isInvalid = invalidCombinations.some(
    (combination) =>
      combination[0] === currentValue &&
      combination[1] === num &&
      combination[2] === operation
  );

  return isInvalid;
}

//КОНЕЦ

//Останавливает тренировку и перезагружает страницу.
function stopTraining() {
  clearInterval(interval);
  saveSettings();
  location.reload();
}

//Запускает тренировку.
function startTraining() {
  generateEarthLevel();
  document.getElementById("showCalculations").classList.add("hidden");
}

let startTime;
let previousNumber = null;
let previousColor = "alternate-color-1";

function showNumbers(speed) {
  if (isShowingNumbers) return;
  isShowingNumbers = true;

  currentIndex = 0;

  startTime = Date.now();

  // Показываем первое число немедленно
  showNumber();

  const interval = setInterval(() => {
    if (currentIndex >= numbers.length) {
      clearInterval(interval);
      document.getElementById("numberDisplay").innerText = "";
      isShowingNumbers = false;

      const endTime = Date.now();
      const totalTime = (endTime - startTime) / 1000;

      finishDisplay();
    } else {
      showNumber();
    }
  }, speed);

  function showNumber() {
    if (currentIndex < numbers.length) {
      let displayText = numbers[currentIndex];
      displayText =
        currentIndex === 0 && displayText >= 0
          ? `+${displayText}`
          : displayText;
      const displayElement = document.getElementById("numberDisplay");

      displayElement.innerText = displayText;
      displayElement.classList.remove(
        "alternate-color-1",
        "alternate-color-2"
      );
      if (
        previousNumber !== null &&
        numbers[currentIndex] === previousNumber
      ) {
        previousColor =
          previousColor === "alternate-color-1"
            ? "alternate-color-2"
            : "alternate-color-1";
      } else {
        previousColor = "alternate-color-1";
      }
      displayElement.classList.add(previousColor);

      previousNumber = numbers[currentIndex];
      currentIndex++;
    }
  }
}

//Подготавливает экран для тренировки.
function prepareTrainingScreen() {
  const goal = parseInt(localStorage.getItem("goal")) || 5;
  isAnswerChecked = false;
  document.getElementById("goalDisplay").textContent = goal;

  var speed = parseFloat(document.getElementById("speed").value) * 1000;
  generateEarthLevel();
  document.getElementById("baseSettings").classList.add("hidden");
  document.querySelector(".settings-container").classList.add("hidden");
  document
    .getElementById("numberDisplayScreen")
    .classList.remove("hidden");
  document
    .getElementById("numberDisplayScreen")
    .classList.add("fullscreen");

  currentIndex = 0;
  startCountdown(speed);
}

//Заканчивает отображение чисел.
function finishDisplay() {
  document.getElementById("numberDisplay").innerText = "";
  document
    .getElementById("numberDisplayScreen")
    .classList.remove("fullscreen");
  document.getElementById("numberDisplayScreen").classList.add("hidden");
  document.getElementById("trainingScreen").classList.remove("hidden");

  document.getElementById("userAnswer").disabled = false;
  document.getElementById("checkAnswerButton").disabled = false;
  document.getElementById("userAnswer").focus();
}

//Перезапускает тренировку.
function restartTraining() {
  clearInputAndCalculations();
  clearNotification();

  isAnswerChecked = false;

  prepareTrainingScreen();
  enterPressCount = 0;
}

//Запускает обратный отсчёт перед началом показа чисел.
function startCountdown(speed) {
  let countdown = 3;
  document.getElementById("countdown").innerText = countdown;
  let countdownTimer = setInterval(() => {
    countdown--;
    document.getElementById("countdown").innerText =
      countdown > 0 ? countdown : "";
    if (countdown === 3) {
      generateEarthLevel();
    }
    if (countdown <= 0) {
      clearInterval(countdownTimer);
      showNumbers(speed);
    }
  }, 1000);
}

//Проверяет ответ пользователя на правильность.
let isAnswerChecked = false;
function checkAnswer() {
  var notification = document.getElementById("notification");
  var showCalculationsBtn = document.getElementById("showCalculations");
  var userAnswer = document.getElementById("userAnswer").value;

  if (isAnswerChecked) {
    notification.className = "alert alert-warning";
    notification.innerText =
      "Вы уже проверили этот ответ. Начните новый пример.";
    notification.classList.remove("hidden");
    return;
  }

  if (currentIndex < numbers.length) {
    notification.className = "alert alert-warning";
    notification.innerText = "Подождите окончания показа чисел!";
    notification.classList.remove("hidden");
    return;
  }

  if (userAnswer === "") {
    notification.className = "alert alert-warning";
    notification.innerText =
      "Пожалуйста, введите ваш ответ перед проверкой.";
  } else {
    var parsedAnswer = parseInt(userAnswer, 10);
    if (parsedAnswer === total) {
      let correctAnswers =
        parseInt(localStorage.getItem("correctAnswers")) || 0;
      correctAnswers++;
      localStorage.setItem("correctAnswers", correctAnswers);
      document.getElementById("correctAnswersDisplay").textContent =
        correctAnswers;

      const goal = parseInt(localStorage.getItem("goal")) || 0;
      if (goal > 0 && correctAnswers >= goal) {
        notification.className = "alert alert-success";
        notification.innerText = `Молодец! Ты смог решить ${goal} ${getCorrectWordForm(
          goal
        )}!`;

        localStorage.setItem("correctAnswers", 0);
        document.getElementById("correctAnswersDisplay").textContent = 0;
      } else {
        notification.className = "alert alert-success";
        notification.innerText = "Верно!";
      }

      isAnswerChecked = true;
    } else {
      notification.className = "alert alert-danger";
      notification.innerText = "Неверно. Правильный ответ: " + total;
    }

    if (showCalculationsBtn) {
      showCalculationsBtn.classList.remove("hidden");
    }
  }
  notification.classList.remove("hidden");
}

//ПОДСЧЕТ ОЧКОВ
// Сохранение цели при изменении значения слайдера
document
  .getElementById("goalInput")
  .addEventListener("change", function () {
    const goal = parseInt(this.value);
    if (goal && goal > 0) {
      localStorage.setItem("goal", goal);
      updateGoalDisplay(goal);
    }
  });

function updateGoalDisplay(value) {
  document.getElementById("goalDisplay").textContent = value;
}

// Увеличение и уменьшение цели
document
  .getElementById("increaseGoal")
  .addEventListener("click", function () {
    var goalInput = document.getElementById("goalInput");
    var currentGoal = parseInt(goalInput.value);
    if (currentGoal < 50) {
      goalInput.value = currentGoal + 1;
      localStorage.setItem("goal", goalInput.value);
      updateGoalDisplay(goalInput.value);
    }
  });

document
  .getElementById("decreaseGoal")
  .addEventListener("click", function () {
    var goalInput = document.getElementById("goalInput");
    var currentGoal = parseInt(goalInput.value);
    if (currentGoal > 1) {
      goalInput.value = currentGoal - 1;
      localStorage.setItem("goal", goalInput.value);
      updateGoalDisplay(goalInput.value);
    }
  });

//Функцию для склонения слов
function getCorrectWordForm(number) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return "пример";
  } else if (
    [2, 3, 4].includes(number % 10) &&
    ![12, 13, 14].includes(number % 100)
  ) {
    return "примера";
  } else {
    return "примеров";
  }
}
function updateGoalDisplay(value) {
  document.getElementById("goalDisplay").textContent = value;
}
function showCustomAlert() {
  document.getElementById("customAlert").style.display = "flex";
}

function closeCustomAlert() {
  document.getElementById("customAlert").style.display = "none";
}

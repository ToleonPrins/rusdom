//MARK: Функция для управления размерами генерируемых чисел

export function adjustFontSize() {
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

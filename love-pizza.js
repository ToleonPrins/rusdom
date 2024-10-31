// document.addEventListener("DOMContentLoaded", function () {
//     const isMobile = window.innerWidth <= 768;

//     if (isMobile) {
//       const mobileMenu = document.createElement("div");
//       mobileMenu.id = "mobileMenu";
//       mobileMenu.style.position = "fixed";
//       mobileMenu.style.bottom = "0";
//       mobileMenu.style.left = "0";
//       mobileMenu.style.right = "0";
//       mobileMenu.style.backgroundColor = "#374A37";
//       mobileMenu.style.color = "white";
//       mobileMenu.style.padding = "20px";
//       mobileMenu.style.display = "flex";
//       mobileMenu.style.flexDirection = "column";
//       mobileMenu.style.alignItems = "center";
//       mobileMenu.style.justifyContent = "center";
//       mobileMenu.style.zIndex = "1000";
//       mobileMenu.style.fontFamily = "Apple Braille, sans-serif";

//       const buttonContainer = document.createElement("div");
//       buttonContainer.style.display = "flex";
//       buttonContainer.style.alignItems = "center";
//       buttonContainer.style.justifyContent = "center";

//       const lovePizzaLogo = document.createElement("img");
//       lovePizzaLogo.src =
//         "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/love-pizza-logo.jpg";
//       lovePizzaLogo.style.width = "50px";
//       lovePizzaLogo.style.height = "50px";
//       lovePizzaLogo.style.marginRight = "20px";

//       const downloadButton = document.createElement("a");
//       downloadButton.id = "downloadButton";
//       downloadButton.style.backgroundColor = "white";
//       downloadButton.style.color = "#374A37";
//       downloadButton.style.padding = "10px 20px";
//       downloadButton.style.borderRadius = "30px";
//       downloadButton.style.textDecoration = "none";
//       downloadButton.style.fontSize = "16px";
//       downloadButton.style.cursor = "pointer";
//       downloadButton.style.display = "flex";
//       downloadButton.style.alignItems = "center";
//       downloadButton.textContent = "Скачать приложение";

//       const mobileLogo = document.createElement("img");
//       mobileLogo.style.filter =
//         "invert(0%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)";

//       mobileLogo.id = "mobileLogo";
//       mobileLogo.style.width = "24px";
//       mobileLogo.style.height = "24px";
//       mobileLogo.style.marginRight = "10px";
//       mobileLogo.src =
//         "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/apple-logo-white.svg";
//       downloadButton.insertBefore(mobileLogo, downloadButton.firstChild);

//       const userAgent =
//         navigator.userAgent || navigator.vendor || window.opera;
//       if (/android/i.test(userAgent)) {
//         downloadButton.href =
//           "https://play.google.com/store/apps/details?id=ru.smartofood.lovepizza";
//         mobileLogo.src =
//           "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/google-play-logo-white.svg";
//       } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
//         downloadButton.href =
//           "https://apps.apple.com/app/love-pizza-доставка-самовывоз/id6468884114";
//       } else {
//         downloadButton.href = "#";
//         downloadButton.onclick = function () {
//           alert("Платформа не поддерживается.");
//         };
//       }

//       buttonContainer.appendChild(lovePizzaLogo);
//       buttonContainer.appendChild(downloadButton);

//       mobileMenu.appendChild(buttonContainer);

//       const closeButton = document.createElement("div");
//       closeButton.id = "closeButton";
//       closeButton.style.position = "absolute";
//       closeButton.style.top = "10px";
//       closeButton.style.right = "10px";
//       closeButton.style.cursor = "pointer";
//       closeButton.style.fontSize = "24px";
//       closeButton.style.color = "white";
//       closeButton.innerHTML = `
// <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
//     <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//     <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
// `;

//       closeButton.onclick = function () {
//         mobileMenu.style.display = "none";
//       };

//       mobileMenu.appendChild(closeButton);

//       document.body.appendChild(mobileMenu);
//     } else {
//       const widget = document.createElement("div");
//       widget.style.position = "fixed";
//       widget.style.bottom = "0";
//       widget.style.right = "20px";
//       widget.style.zIndex = "1000";
//       widget.style.cursor = "pointer";
//       widget.classList.add("widget");

//       const phoneContainer = document.createElement("div");
//       phoneContainer.style.position = "relative";
//       phoneContainer.style.zIndex = "999";
//       widget.appendChild(phoneContainer);

//       const phoneImage = document.createElement("img");
//       phoneImage.src =
//         "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/phone-green.png";
//       phoneImage.style.width = "220px";
//       phoneImage.style.height = "auto";
//       phoneImage.style.display = "block";
//       phoneImage.style.position = "relative";
//       phoneContainer.appendChild(phoneImage);

//       const closeButton = document.createElement("div");
//       closeButton.textContent = "✖";
//       closeButton.style.position = "absolute";
//       closeButton.style.top = "0";
//       closeButton.style.right = "0";
//       closeButton.style.cursor = "pointer";
//       closeButton.style.fontSize = "15px";
//       closeButton.style.color = "white";
//       closeButton.style.backgroundColor = "#35C759";
//       closeButton.style.borderRadius = "50%";
//       closeButton.style.width = "30px";
//       closeButton.style.height = "30px";
//       closeButton.style.display = "flex";
//       closeButton.style.alignItems = "center";
//       closeButton.style.justifyContent = "center";
//       closeButton.style.zIndex = "1000";
//       phoneContainer.appendChild(closeButton);

//       const popup = document.createElement("div");
//       popup.style.display = "block";
//       popup.style.position = "absolute";
//       popup.style.right = "100%";
//       popup.style.backgroundColor = "rgba(255, 0, 0, 0)";
//       popup.style.width = "230px";
//       popup.style.transform = "translateX(100%)";
//       popup.style.transition = "transform 0.3s ease, opacity 0.3s ease";
//       popup.style.opacity = "0";
//       popup.style.zIndex = "800";
//       widget.appendChild(popup);

//       phoneImage.onload = function () {
//         popup.style.height = phoneImage.clientHeight * 0.8 + "px";
//         popup.style.bottom = "15px";
//       };

//       const appStoreLink = document.createElement("a");
//       appStoreLink.href =
//         "https://apps.apple.com/app/love-pizza-доставка-самовывоз/id6468884114";
//       appStoreLink.style.display = "flex";
//       appStoreLink.style.alignItems = "center";
//       appStoreLink.style.marginBottom = "10px";
//       appStoreLink.style.backgroundColor = "#35C759";
//       appStoreLink.style.color = "white";
//       appStoreLink.style.padding = "10px";
//       appStoreLink.style.borderRadius = "30px";
//       appStoreLink.style.textDecoration = "none";
//       appStoreLink.style.fontFamily = "Apple Braille, sans-serif";
//       appStoreLink.style.fontSize = "16px";
//       popup.appendChild(appStoreLink);

//       const appleLogo = document.createElement("img");
//       appleLogo.src =
//         "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/apple-logo-white.svg";
//       appleLogo.style.width = "20px";
//       appleLogo.style.height = "20px";
//       appleLogo.style.marginRight = "10px";
//       appStoreLink.appendChild(appleLogo);

//       const appStoreText = document.createElement("span");
//       appStoreText.textContent = "Скачать в App Store";
//       appStoreLink.appendChild(appStoreText);

//       const googlePlayLink = document.createElement("a");
//       googlePlayLink.href =
//         "https://play.google.com/store/apps/details?id=ru.smartofood.lovepizza";
//       googlePlayLink.style.display = "flex";
//       googlePlayLink.style.alignItems = "center";
//       googlePlayLink.style.marginBottom = "10px";
//       googlePlayLink.style.backgroundColor = "#35C759";
//       googlePlayLink.style.color = "white";
//       googlePlayLink.style.padding = "10px";
//       googlePlayLink.style.borderRadius = "30px";
//       googlePlayLink.style.textDecoration = "none";
//       googlePlayLink.style.fontFamily = "Apple Braille, sans-serif";
//       googlePlayLink.style.fontSize = "16px";
//       popup.appendChild(googlePlayLink);

//       const googlePlayLogo = document.createElement("img");
//       googlePlayLogo.src =
//         "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/google-play-logo-white.svg";
//       googlePlayLogo.style.width = "20px";
//       googlePlayLogo.style.height = "20px";
//       googlePlayLogo.style.marginRight = "10px";
//       googlePlayLink.appendChild(googlePlayLogo);

//       const googlePlayText = document.createElement("span");
//       googlePlayText.textContent = "Скачать в Google Play";
//       googlePlayLink.appendChild(googlePlayText);

//       widget.addEventListener("mouseenter", function () {
//         popup.style.transform = "translateX(0)";
//         popup.style.opacity = "1";
//       });

//       widget.addEventListener("mouseleave", function () {
//         popup.style.transform = "translateX(100%)";
//         popup.style.opacity = "0";
//       });

//       const originalPhoneImageSrc = phoneImage.src;

//       widget.addEventListener("mouseenter", function () {
//         popup.style.transform = "translateX(0)";
//         popup.style.opacity = "1";
//         phoneImage.src =
//           "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/after-focus.png";
//       });

//       widget.addEventListener("mouseleave", function () {
//         popup.style.transform = "translateX(100%)";
//         popup.style.opacity = "0";
//         phoneImage.src = originalPhoneImageSrc;
//       });

//       closeButton.addEventListener("click", function () {
//         widget.style.display = "none";
//       });

//       closeButton.addEventListener("mouseenter", function () {
//         closeButton.style.backgroundColor = "#EA0001";
//       });

//       closeButton.addEventListener("mouseleave", function () {
//         closeButton.style.backgroundColor = "#35C759";
//       });

//       appStoreLink.addEventListener("mouseenter", function () {
//         appStoreLink.style.backgroundColor = "#374A37";
//       });

//       appStoreLink.addEventListener("mouseleave", function () {
//         appStoreLink.style.backgroundColor = "#35C759";
//       });

//       googlePlayLink.addEventListener("mouseenter", function () {
//         googlePlayLink.style.backgroundColor = "#374A37";
//       });

//       googlePlayLink.addEventListener("mouseleave", function () {
//         googlePlayLink.style.backgroundColor = "#35C759";
//       });

//       document.body.appendChild(widget);
//     }
//   });

document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.innerWidth <= 768;

  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isInSmartFoodApp =
    userAgent.includes("SmartoFood WebApp") || userAgent.includes("SFWebApp");
  const isInWebView =
    /wv|Version\/.*Chrome/.test(userAgent) ||
    (/iPhone|iPad|iPod/.test(userAgent) && !window.MSStream);

  // Объединяем условия для определения WebView или приложения SmartoFood
  const shouldHideWidget = isInSmartFoodApp || isInWebView;

  if (isMobile && !shouldHideWidget) {
    const mobileMenu = document.createElement("div");
    mobileMenu.id = "mobileMenu";
    mobileMenu.style.position = "fixed";
    mobileMenu.style.bottom = "0";
    mobileMenu.style.left = "0";
    mobileMenu.style.right = "0";
    mobileMenu.style.backgroundColor = "#374A37";
    mobileMenu.style.color = "white";
    mobileMenu.style.padding = "20px";
    mobileMenu.style.display = "flex";
    mobileMenu.style.flexDirection = "column";
    mobileMenu.style.alignItems = "center";
    mobileMenu.style.justifyContent = "center";
    mobileMenu.style.zIndex = "1000";
    mobileMenu.style.fontFamily = "Apple Braille, sans-serif";

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.justifyContent = "center";

    const lovePizzaLogo = document.createElement("img");
    lovePizzaLogo.src =
      "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/love-pizza-logo.jpg";
    lovePizzaLogo.style.width = "50px";
    lovePizzaLogo.style.height = "50px";
    lovePizzaLogo.style.marginRight = "20px";

    const downloadButton = document.createElement("a");
    downloadButton.id = "downloadButton";
    downloadButton.style.backgroundColor = "white";
    downloadButton.style.color = "#374A37";
    downloadButton.style.padding = "10px 20px";
    downloadButton.style.borderRadius = "30px";
    downloadButton.style.textDecoration = "none";
    downloadButton.style.fontSize = "16px";
    downloadButton.style.cursor = "pointer";
    downloadButton.style.display = "flex";
    downloadButton.style.alignItems = "center";
    downloadButton.textContent = "Скачать приложение";

    const mobileLogo = document.createElement("img");
    mobileLogo.style.filter =
      "invert(0%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)";

    mobileLogo.id = "mobileLogo";
    mobileLogo.style.width = "24px";
    mobileLogo.style.height = "24px";
    mobileLogo.style.marginRight = "10px";
    mobileLogo.src =
      "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/apple-logo-white.svg";
    downloadButton.insertBefore(mobileLogo, downloadButton.firstChild);

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      downloadButton.href =
        "https://play.google.com/store/apps/details?id=ru.smartofood.lovepizza";
      mobileLogo.src =
        "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/google-play-logo-white.svg";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      downloadButton.href =
        "https://apps.apple.com/app/love-pizza-доставка-самовывоз/id6468884114";
    } else {
      downloadButton.href = "#";
      downloadButton.onclick = function () {
        alert("Платформа не поддерживается.");
      };
    }

    buttonContainer.appendChild(lovePizzaLogo);
    buttonContainer.appendChild(downloadButton);

    mobileMenu.appendChild(buttonContainer);

    const closeButton = document.createElement("div");
    closeButton.id = "closeButton";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "24px";
    closeButton.style.color = "white";
    closeButton.innerHTML = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

    closeButton.onclick = function () {
      mobileMenu.style.display = "none";
    };

    mobileMenu.appendChild(closeButton);

    document.body.appendChild(mobileMenu);

    const userAgentText = document.createElement("p");
    userAgentText.style.color = "yellow";
    userAgentText.style.fontSize = "12px";
    userAgentText.textContent = `User-Agent: ${userAgent}`;
    userAgentText.style.position = "absolute"; // Устанавливаем абсолютное позиционирование
    userAgentText.style.bottom = "10px"; // Расположение внизу меню
    userAgentText.style.left = "10px"; // Отступ слева для видимости
    userAgentText.style.zIndex = "10000"; // Высокий z-index для переднего плана
    mobileMenu.appendChild(userAgentText);
    
  } else if (!shouldHideWidget) {
    const widget = document.createElement("div");
    widget.style.position = "fixed";
    widget.style.bottom = "0";
    widget.style.right = "20px";
    widget.style.zIndex = "1000";
    widget.style.cursor = "pointer";
    widget.classList.add("widget");

    const phoneContainer = document.createElement("div");
    phoneContainer.style.position = "relative";
    phoneContainer.style.zIndex = "999";
    widget.appendChild(phoneContainer);

    const phoneImage = document.createElement("img");
    phoneImage.src =
      "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/phone-green.png";
    phoneImage.style.width = "220px";
    phoneImage.style.height = "auto";
    phoneImage.style.display = "block";
    phoneImage.style.position = "relative";
    phoneContainer.appendChild(phoneImage);

    const closeButton = document.createElement("div");
    closeButton.textContent = "✖";
    closeButton.style.position = "absolute";
    closeButton.style.top = "0";
    closeButton.style.right = "0";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "15px";
    closeButton.style.color = "white";
    closeButton.style.backgroundColor = "#35C759";
    closeButton.style.borderRadius = "50%";
    closeButton.style.width = "30px";
    closeButton.style.height = "30px";
    closeButton.style.display = "flex";
    closeButton.style.alignItems = "center";
    closeButton.style.justifyContent = "center";
    closeButton.style.zIndex = "1000";
    phoneContainer.appendChild(closeButton);

    const popup = document.createElement("div");
    popup.style.display = "block";
    popup.style.position = "absolute";
    popup.style.right = "100%";
    popup.style.backgroundColor = "rgba(255, 0, 0, 0)";
    popup.style.width = "230px";
    popup.style.transform = "translateX(100%)";
    popup.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    popup.style.opacity = "0";
    popup.style.zIndex = "800";
    widget.appendChild(popup);

    phoneImage.onload = function () {
      popup.style.height = phoneImage.clientHeight * 0.8 + "px";
      popup.style.bottom = "15px";
    };

    const appStoreLink = document.createElement("a");
    appStoreLink.href =
      "https://apps.apple.com/app/love-pizza-доставка-самовывоз/id6468884114";
    appStoreLink.style.display = "flex";
    appStoreLink.style.alignItems = "center";
    appStoreLink.style.marginBottom = "10px";
    appStoreLink.style.backgroundColor = "#35C759";
    appStoreLink.style.color = "white";
    appStoreLink.style.padding = "10px";
    appStoreLink.style.borderRadius = "30px";
    appStoreLink.style.textDecoration = "none";
    appStoreLink.style.fontFamily = "Apple Braille, sans-serif";
    appStoreLink.style.fontSize = "16px";
    popup.appendChild(appStoreLink);

    const appleLogo = document.createElement("img");
    appleLogo.src =
      "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/apple-logo-white.svg";
    appleLogo.style.width = "20px";
    appleLogo.style.height = "20px";
    appleLogo.style.marginRight = "10px";
    appStoreLink.appendChild(appleLogo);

    const appStoreText = document.createElement("span");
    appStoreText.textContent = "Скачать в App Store";
    appStoreLink.appendChild(appStoreText);

    const googlePlayLink = document.createElement("a");
    googlePlayLink.href =
      "https://play.google.com/store/apps/details?id=ru.smartofood.lovepizza";
    googlePlayLink.style.display = "flex";
    googlePlayLink.style.alignItems = "center";
    googlePlayLink.style.marginBottom = "10px";
    googlePlayLink.style.backgroundColor = "#35C759";
    googlePlayLink.style.color = "white";
    googlePlayLink.style.padding = "10px";
    googlePlayLink.style.borderRadius = "30px";
    googlePlayLink.style.textDecoration = "none";
    googlePlayLink.style.fontFamily = "Apple Braille, sans-serif";
    googlePlayLink.style.fontSize = "16px";
    popup.appendChild(googlePlayLink);

    const googlePlayLogo = document.createElement("img");
    googlePlayLogo.src =
      "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/google-play-logo-white.svg";
    googlePlayLogo.style.width = "20px";
    googlePlayLogo.style.height = "20px";
    googlePlayLogo.style.marginRight = "10px";
    googlePlayLink.appendChild(googlePlayLogo);

    const googlePlayText = document.createElement("span");
    googlePlayText.textContent = "Скачать в Google Play";
    googlePlayLink.appendChild(googlePlayText);

    widget.addEventListener("mouseenter", function () {
      popup.style.transform = "translateX(0)";
      popup.style.opacity = "1";
    });

    widget.addEventListener("mouseleave", function () {
      popup.style.transform = "translateX(100%)";
      popup.style.opacity = "0";
    });

    const originalPhoneImageSrc = phoneImage.src;

    widget.addEventListener("mouseenter", function () {
      popup.style.transform = "translateX(0)";
      popup.style.opacity = "1";
      phoneImage.src =
        "https://raw.githubusercontent.com/ToleonPrins/rusdom/main/after-focus.png";
    });

    widget.addEventListener("mouseleave", function () {
      popup.style.transform = "translateX(100%)";
      popup.style.opacity = "0";
      phoneImage.src = originalPhoneImageSrc;
    });

    closeButton.addEventListener("click", function () {
      widget.style.display = "none";
    });

    closeButton.addEventListener("mouseenter", function () {
      closeButton.style.backgroundColor = "#EA0001";
    });

    closeButton.addEventListener("mouseleave", function () {
      closeButton.style.backgroundColor = "#35C759";
    });

    appStoreLink.addEventListener("mouseenter", function () {
      appStoreLink.style.backgroundColor = "#374A37";
    });

    appStoreLink.addEventListener("mouseleave", function () {
      appStoreLink.style.backgroundColor = "#35C759";
    });

    googlePlayLink.addEventListener("mouseenter", function () {
      googlePlayLink.style.backgroundColor = "#374A37";
    });

    googlePlayLink.addEventListener("mouseleave", function () {
      googlePlayLink.style.backgroundColor = "#35C759";
    });

    document.body.appendChild(widget);

    const userAgentText = document.createElement("p");
    userAgentText.style.color = "yellow";
    userAgentText.style.fontSize = "12px";
    userAgentText.textContent = `User-Agent: ${userAgent}`;
    userAgentText.style.zIndex = "10000";
    userAgentText.style.position = "absolute"; // Обязательно для позиционирования
    userAgentText.style.bottom = "10px"; // Расположим текст внизу
    userAgentText.style.left = "10px"; // Отступ слева для видимости
    widget.appendChild(userAgentText);
  }
});

// Проверка заголовка страницы
if (document.title) {
    console.log("Заголовок страницы:", document.title);
} else {
    console.warn("Не удалось получить заголовок страницы — возможно, нет доступа к DOM.");
}

// Проверка наличия элемента <body>
const bodyElement = document.querySelector("body");
if (bodyElement) {
    console.log("Элемент <body> найден:", bodyElement);
} else {
    console.warn("Не удалось найти элемент <body> — возможно, нет доступа к DOM.");
}

// Дополнительная проверка, чтобы понять, работает ли создание и добавление элементов на страницу
try {
    const testDiv = document.createElement("div");
    testDiv.textContent = "Тестовый элемент для проверки доступа";
    testDiv.style.position = "fixed";
    testDiv.style.bottom = "10px";
    testDiv.style.left = "10px";
    testDiv.style.backgroundColor = "red";
    testDiv.style.color = "white";
    document.body.appendChild(testDiv);
    console.log("Тестовый элемент добавлен на страницу.");
} catch (error) {
    console.error("Ошибка при попытке добавить элемент на страницу:", error);
}



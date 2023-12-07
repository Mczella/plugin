document.body.addEventListener("redux-me", async (e) => {
  console.log("posta prisla do web.js", e.detail);
  if (e.detail.action === "open-modal") {
    await window.__NEXT_REDUX_STORE__.dispatch({
      type: "SHOW_MODAL",
      modalType: "PRODUCT_DETAIL_MODAL",
      softAdd: false,
    });
    await window.__NEXT_REDUX_STORE__.dispatch({
      type: "SET_APP_PRODUCT_DETAIL_MODAL_URL",
      productDetailModalUrl:
        "https://www.rohlik.cz/me-oblibene?productPopup=1294559-okurka-hadovka-cca-300-g&itemPosition=2&source=%7B%22touchpoint%22%3A%22Favorites%22%2C%22favorite%22%3Atrue%7D",
    });
    console.log("ahoj modal");
    open();
  }
});

const open = () => {
  const modal = document.querySelector('[data-test*="modal-body"]');
  const url = "https://www.rohlik.cz/1356285";

  if (modal) {
    // if (modal) {
    //   chakraModal.style.display = "none";
    // } else {
    //   chakraModal.style.display = "flex";
    // }

    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = data;
        const elementsToRemove = tempElement.querySelectorAll(
          ".sc-8013b97d-0.kRZbmg, .sc-59a55ac9-0.kdiCxc",
        );
        elementsToRemove.forEach((element) => {
          element.parentNode.removeChild(element);
        });
        const allElements = tempElement.querySelectorAll("*");
        allElements.forEach((element) => {
          if (
            element.id !== "productDetail" &&
            !element.closest("#productDetail")
          ) {
            element.style.backgroundColor = "none";
            element.style.background = "none";
            element.style.border = "none";
            element.style.boxShadow = "none";
          }
        });

        const productDetailElement =
          tempElement.querySelector("#productDetail");

        if (productDetailElement) {
          productDetailElement.style.border = "none";
          productDetailElement.style.boxShadow = "none";
        }
        modal.appendChild(tempElement);
        modal.style.display = "block";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};

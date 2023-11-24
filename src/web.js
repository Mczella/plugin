console.log("hello z web.js");

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
  }
});

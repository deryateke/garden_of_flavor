import getMenu from "./api.js";
import {
  renderDetailPage,
  renderLoader,
  renderMenuCard,
  renderNotFound,
  uiElements,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Make an Api request
  const menuData = await getMenu();

  // Determine which page we are on. If we are on the main page, we will perform operations accordingly. If we are on the
  // Hangi sayfada olduğumuza karar ver.Eğer ana sayfadaysak buna göre işlemler detay sayfasında ise buna göre işlemler yapacağız
  if (window.location.pathname.includes("/index.html")) {
    // render the Loader

    renderLoader();

    setTimeout(() => {
      // Render the menu elements dynamically.
      renderMenuCard(menuData);
    }, 2000);
    // Since uiElements.categoryButtons is a NodeList, we cannot add an addEventListener directly to it. Therefore, we will access each element inside the NodeList one by one and add an addEventListener to each of them.
    // uiElements.categoryButtons bir nodeList olduğundan buna addEventListener ekleyemeyiz.Bunun için nodeList içerisindeki her bir elemana teker teker erişip addEventListener ekleyeceğiz.
    uiElements.categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // When the button is clicked, access the button's id and assign it to selectedCategory.
        // butona tıklanınca butonun id'sine eriş ve bunu selectedCategory'e aktar

        const selectedCategory = button.id;

        // Access the elements in menuData that have the selectedCategory.
        // menuData içerisindeki selectedCategory'e sahip elemanlara eriş

        const filtredMenu = menuData.filter(
          (item) => item.category == selectedCategory,
        );
        // Render the menu list according to the filtered products. If selectedCategory is equal to "all", render all products. But if selectedCategory is equal to a value other than "all", render the products in that category.
        // Filtrelenen ürünlere göre menuListesini renderla.Eğer selectedCategory all'a eşitse tüm ürünleri renderla ama selectedCategory all değeri haricinde bir değere eşitse o kategorideki ürünleri renderla

        if (selectedCategory == "all") {
          // if selectedCategory is all
          renderMenuCard(menuData);
        } else {
          //if  selectedCategory all haricinde bir değere sahipse
          renderMenuCard(filtredMenu);
        }
      });
    });
  } else {
    // Access the parameter in the URL.
    // Url'deki parametreye eriş

    // ! URLSearchParams is a class in JavaScript. It allows us to easily manage the parameters passed to the URL.
    // ! URLSearchParams javascript içerisinde yer alan bir classtır.Url'e geçilen parametreleri kolay bir şekilde yönetmemizi sağlar.
    const params = new URLSearchParams(window.location.search);

    // Convert the product's id to the number data type and assign it to a variable.
    // Ürünün id'sini number veri  tipine dönüştür ve bir değişkene aktar
    const itemId = +params.get("id");
    // Find the element with the itemId in the menuData.
    // menuData içerisinde itemId'e sahip elemanı bul
    const product = menuData.find((item) => item.id == itemId);

    // If the product does not exist, render the not-found page.
    // Eğer product yoksa not-found sayfası renderla
    if (!product) {
      renderNotFound();
    } else {
      // Render the interface according to the found product.
      // Bulunan product'a göre arayüzü renderla

      renderDetailPage(product);
    }
  }
});

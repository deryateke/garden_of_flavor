// the function that makes a request to API
// Api'a istek atacak fonksiyon
const getMenu = async () => {
  try {
    // Make a request to API
    // Api'a istek at
    const response = await fetch("../db.json");

    // Convert the data coming from the API from JSON to a JavaScript object.
    // Api'dan gelen veriyi JSON'dan Js nesnesine çevir
    const data = await response.json();

    // Return the menu from the data received.
    // Gelen veri içerisindeki menu'yü return et

    return data.menu;
  } catch (error) {
    // Notify the user in case of an error.
    //  Hata durumunda kullanıcıya bildirimde bulun
    console.log(`Apı Hatası: ${error}`);

    // If there is an error, return an empty array.
    // Eğer hata varsa geriye boş bir dizi dönder
    return [];
  }
};

export default getMenu;

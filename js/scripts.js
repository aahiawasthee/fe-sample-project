function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'product-payload.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
loadJSON(function (response) {
    var jsonresponse = JSON.parse(response);
    var productsdata = jsonresponse.products;
    var forsale = function (num) {
        var outerdiv = document.createElement("div");
        outerdiv.setAttribute("class", "col-md-3");
        document.getElementById("product_boxes").appendChild(outerdiv);
        var innerdiv = document.createElement("div");
        innerdiv.setAttribute("class", "productbox");
        innerdiv.setAttribute("id", "product" + num);
        var img = document.createElement("img");
        img.setAttribute("src", "images/" + productsdata[num].filename);
        img.setAttribute("class", "clothes_image");
        var productname = document.createElement("div");
        productname.setAttribute("class", "clothes_name");
        var price = document.createElement("div");
        price.setAttribute("class", "clothes_price");
        var cart = document.createElement("input");
        cart.setAttribute("class", "add_to_cart");
        cart.setAttribute("type", "submit");
        cart.setAttribute("value", "Add to cart");
        outerdiv.appendChild(innerdiv);
        innerdiv.appendChild(img);
        innerdiv.appendChild(productname);
        productname.innerHTML = productsdata[num].name;
        innerdiv.appendChild(price);
        price.innerHTML = "$" + (productsdata[num].price / 100).toFixed(2);
        innerdiv.appendChild(cart);
    };
    var loadup = function () {
        for (var i = 0; i < productsdata.length; i++) {
            forsale(i);
        }
    };
    loadup();
});
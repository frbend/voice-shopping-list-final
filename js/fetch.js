//banana
fetch("https://api.spoonacular.com/food/ingredients/search?apiKey=2490261d526c47f2ad669812ae39c9ac&number=1&query=banana")
.then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);
    //title
    const p = document.createElement('p');
    p.innerHTML = data.results[0].name;
    console.log('Title: ', p );
    document.getElementById("one").innerHTML = data.results[0].name;
    //image
    const img = document.createElement('img');
    img.setAttribute("id", "img")
    img.src = basePath + data.results[0].image;
    console.log('image ', img );
    document.getElementById("one").appendChild(img);
});
//beef
fetch("https://api.spoonacular.com/food/ingredients/search?apiKey=2490261d526c47f2ad669812ae39c9ac&number=1&query=beef")
.then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);
    //title
    const p = document.createElement('p');
    p.innerHTML = data.results[0].name;
    console.log('Title: ', p );
    document.getElementById("two").innerHTML = data.results[0].name;
    //image
    const img = document.createElement('img');
    img.setAttribute("id", "img")
    img.src = basePath + data.results[0].image;
    console.log('image ', img );
    document.getElementById("two").appendChild(img);
});
//chicken
fetch("https://api.spoonacular.com/food/ingredients/search?apiKey=2490261d526c47f2ad669812ae39c9ac&number=1&query=chicken")
.then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);
    //title
    const p = document.createElement('p');
    p.innerHTML = data.results[0].name;
    console.log('Title: ', p );
    document.getElementById("three").innerHTML = data.results[0].name;
    //image
    const img = document.createElement('img');
    img.setAttribute("id", "img")
    img.src = basePath + data.results[0].image;
    console.log('image ', img );
    document.getElementById("three").appendChild(img);
});
//milk
fetch("https://api.spoonacular.com/food/ingredients/search?apiKey=2490261d526c47f2ad669812ae39c9ac&number=1&query=milk")
.then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);
    //title
    const p = document.createElement('p');
    p.innerHTML = data.results[0].name;
    console.log('Title: ', p );
    document.getElementById("four").innerHTML = data.results[0].name;
    //image
    const img = document.createElement('img');
    img.setAttribute("id", "img")
    img.src = basePath + data.results[0].image;
    console.log('image ', img );
    document.getElementById("four").appendChild(img);
});
//bread
fetch("https://api.spoonacular.com/food/ingredients/search?apiKey=2490261d526c47f2ad669812ae39c9ac&number=1&query=bread")
.then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);
    //title
    const p = document.createElement('p');
    p.innerHTML = data.results[0].name;
    console.log('Title: ', p );
    document.getElementById("five").innerHTML = data.results[0].name;
    //image
    const img = document.createElement('img');
    img.setAttribute("id", "img")
    img.src = basePath + data.results[0].image;
    console.log('image ', img );
    document.getElementById("five").appendChild(img);
});


links = document.getElementsByClassName("nav-link");
arrlinks = [...links];
for (i in arrlinks) {
  arrlinks[i].addEventListener("click", function (e) {
    apiData(e.target.innerHTML);
    str = "";
  });
}

str = "";
function display() {
  for (var i = 0; i < alldata.length; i++) {
    str += `
       <div class="col-md-3 my-5">
       <img data-bs-toggle="modal" data-bs-target="#exampleModal" src="${alldata[i].image_url}"
       class="img-fluid h-50 w-100" onclick="singleData('${alldata[i].recipe_id}')">
       <h1>${alldata[i].title}</h1>
       <p>${alldata[i].publisher}</p>
       <p>${alldata[i].recipe_id}</p>
       </div>
    `;
  }
  document.getElementById("add").innerHTML = str;
}

async function apiData(x) {
  req = await fetch(`https:forkify-api.herokuapp.com/api/search?q=${x}`);
  response = await req.json();
  alldata = response.recipes;
  display();
}

async function singleData(id) {
  req = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
  res = await req.json();
  sdata = res.recipe;

  displaySingleData();
}

function displaySingleData() {
  list = "";
  for (i = 0; i < sdata.ingredients.length; i++) {
    list += `<li>${sdata.ingredients[i]}</li>`;
  }
  str = `
  <div">
  <img src="${sdata.image_url}" class="img-fluid h-50 w-100">
  <h1>${sdata.title}</h1>
  <p>ingredients : <br> <ol>${list}</ol> </p>
  <p>${sdata.social_rank}</p>
  </div>
`;
  document.getElementById("singledata").innerHTML = str;
}
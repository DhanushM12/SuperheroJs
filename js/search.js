var search = document.getElementById("search");
var ul = document.getElementById("result");
var li = document.getElementsByTagName("li");
var matches = new Array();
var flag;

function removePrevious() {
  while (ul.firstChild) ul.removeChild(ul.firstChild);
}

function displayDetails(data) {
  localStorage.setItem(
    "hero-id",
    data.lastElementChild.previousElementSibling.innerText
  );
  window.document.location = "../html/hero.html";
}

function removeFav(data) {
  var item = data.parentNode;

  item.parentNode.removeChild(item);
}

function addToFav(data) {
  var li = document.createElement("li");
  data.lastElementChild.className += " color-change";
  li.className = "fav-li";
  var element = document.getElementById("fav-ul").appendChild(li);
  element.innerHTML =
    data.firstChild.innerText +
    "<i class='far fa-trash-alt' onclick=removeFav(this)></i>";
  console.log(element);
}

function addItem(res) {
  removePrevious();
  if (res) {
    for (var i = 0; i < res.length; i++) {
      const li = document.createElement("li");
      li.classList.add("card");
      if (res) {
        li.innerHTML =
          "<div id='left'>" +
          "<img src=" +
          res[i].image.url +
          ">" +
          "</div>" +
          "<div id='right'>" +
          "<p id='name'onclick='displayDetails(this.parentElement)'>" +
          res[i].name +
          "</p>" +
          "<p id='name'>" +
          res[i].biography["first-appearance"] +
          "</p>" +
          "</span>" +
          "<span style='display:none;'>" +
          res[i].id +
          "</span>" +
          "<div>" +
          '<button class="add-fav-btn" onclick="addToFav(this.parentElement.parentElement)">' +
          "Add To Favourites" +
          "</button>" +
          "</div>";
        ul.appendChild(li);
      }
    }
  }
}

function srch() {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var res = JSON.parse(xhrRequest.response);
    addItem(res.results);
  };
  if (flag == undefined) flag = matches.pop();
  xhrRequest.open(
    "get",
    "https://www.superheroapi.com/api.php/3078862828893622/search/" + flag
  );
  xhrRequest.send();
}

function fecthData(value) {
  matches.push(value);
  flag = undefined;
  setTimeout(srch, 400);
}

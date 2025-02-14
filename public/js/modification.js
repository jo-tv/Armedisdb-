// search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");

searchBox.addEventListener("click", ()=>{
  navbar.classList.toggle("showInput");
  if(navbar.classList.contains("showInput")){
    searchBox.classList.replace("bx-search" ,"bx-x");
  }else {
    searchBox.classList.replace("bx-x" ,"bx-search");
  }
});

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}


// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
 navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function() {
 navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
 navLinks.classList.toggle("show3");
}

// input chercher

function searchTable() {
  let input = document.getElementById('searchInput');
  let filter = input.value.toUpperCase();
  let table = document.getElementById('dataTable');
  let tr = table.getElementsByTagName('tr');
  
  for (let i = 1; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName('td');
    let found = false;
    
    for (let j = 0; j < td.length; j++) {
      if (td[j]) {
        if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
          found = true;
          break;
        }
      }
    }
    
    if (found) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}
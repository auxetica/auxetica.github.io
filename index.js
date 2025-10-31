const var1title = document.getElementById("var1");
const var2title = document.getElementById("var2");
var titles = [var1title, var2title];

for (let i = 0; i < titles.length; i++) {
    for (let i = 0; i < localStorage.getItem(titles[i].id); i++ ){
        titles[i].innerText = "star" + titles[i].innerHTML;
        console.log("hey");
    }
}


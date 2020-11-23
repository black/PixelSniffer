let sse = new EventSource("https://pixelxniffer.herokuapp.com/updates");
// let sse = new EventSource("http://localhost:1000/updates");
sse.onmessage = (res) => {
    let elm = document.getElementById("myUl")
    let data = res.data.split(",")
    elm.innerHTML = "";
    data.forEach(function (item, i) {
        var li = document.createElement("li");
        var text = document.createTextNode(item);
        li.appendChild(i + " : " + text);
        elm.appendChild(li);
    });
};
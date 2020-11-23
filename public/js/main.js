let sse = new EventSource("https://pixelxniffer.herokuapp.com/updates");
sse.onmessage = (res) => {
    for (id of res.data) {
        console.log(id);
        document.getElementById("data-container").textContent = id;
    }
};
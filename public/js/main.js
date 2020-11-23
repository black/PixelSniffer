let sse = new EventSource("https://pixelxniffer.herokuapp.com/updates");
sse.onmessage = (res) => {
    document.getElementById("data-container").textContent = res.data;
};
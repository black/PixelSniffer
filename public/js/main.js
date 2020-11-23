let sse = new EventSource("https://pixelxniffer.herokuapp.com/updates");
sse.onmessage = (res) => {
    console.log('new Data', res.data);
    $('#data-container').text(res.data);
};
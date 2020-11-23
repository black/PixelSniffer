let sse = new EventSource("http://localhost:1000/updates");
console.log("loggind");
sse.onmessage = (res) => {
    console.log('new Data', res.data);
    $('#data-container').text(res.data);
};
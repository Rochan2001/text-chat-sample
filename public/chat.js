var socket = io.connect("http://localhost:3000");

var message = document.querySelector("#message");
var handle = document.querySelector("#handle");
var btn = document.querySelector("#send");
var output  = document.querySelector("#output");
var feedback  = document.querySelector("#feedback");

btn.addEventListener("click", function () {
    socket.emit('chat', {
        handle: handle.value,
        message:message.value
    });
});

message.addEventListener("keydown", function () {
    socket.emit("typing", handle.value);
});

//Listen event
socket.on("chat", function (data) {
    output.innerHTML += "<p><strong>" + data.handle +":</strong>" + data.message + "</p>";
    feedback.innerHTML = "";
});

socket.on("typing", function (data) {
    feedback.innerHTML = "<p> <em>" + data + " is typing a message... </em> </p>";
});
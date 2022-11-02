// const messageList = document.querySelector("ul");
// const messageForm = document.querySelector("#message");
// const nicknameForm = document.querySelector("#nickname");

// const socket = new WebSocket(`ws://${window.location.host}`);

// function makeMessage(type, payload) {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// }
// socket.addEventListener("open", () => {
//   console.log("Connected to Server 🤙");
// });

// socket.addEventListener("message", (message) => {
//   const li = document.createElement("li");
//   li.innerText = message.data;
//   messageList.append(li);
// });

// socket.addEventListener("close", () => {
//   console.log("Connected from Server X");
// });
// function handleSubmit(event) {
//   event.preventDefault();
//   const input = messageForm.querySelector("input");
//   socket.send(makeMessage("new_message", input.value));

//   const li = document.createElement("li");
//   li.innerText = `you: ${input.value}`;
//   messageList.append(li);
//   input.value = "";
// }
// function handleNickSubmit(event) {
//   event.preventDefault();
//   const input = nicknameForm.querySelector("input");
//   socket.send(makeMessage("nickname", input.value));
//   input.value = "";
// }
// messageForm.addEventListener("submit", handleSubmit);
// nicknameForm.addEventListener("submit", handleNickSubmit);
/**
 *  socket.io vs webSocket
 *  1. 개선사항 내가원하는 이벤트명을 사용해서  보낼 수 있다.
 *  2. object를 보낼수없었는데 보낼 수 있게 됬다.
 */
const socket = io();
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
room.hidden = true;

let roomName;

const backendDone = (msg) => {
  console.log(msg);
};
function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () => {
    addMessage(`You: ${value} `);
  });
  input.value = "";
  return;
}

function handleNickNameSubmit(event) {
  event.preventDefault();
  const input = welcome.querySelector("#nickName");
  const value = input.value;
  console.log(input.value);
  socket.emit("nickname", input.value);
  input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const messageForm = room.querySelector("#msg");
  messageForm.addEventListener(
    "submit",
    handleMessageSubmit,
    handleNickNameSubmit
  );
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const roomname = welcome.querySelector("#roomName");
  const nickname = welcome.querySelector("#nickName");
  socket.emit("nickname", nickname.value);
  socket.emit("enter_room", roomname.value, showRoom);
  roomName = roomname.value;
  roomname.value = "";
}

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.append(li);
}

form.addEventListener("submit", handleRoomSubmit);
socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`user:${user} arrived!`);
});

socket.on("bye", (left) => {
  addMessage(left + "someone left ㅠㅠ");
});

socket.on("new_message", (msg) => {
  addMessage(msg);
});

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerText = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

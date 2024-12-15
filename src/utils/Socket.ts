import { io } from "socket.io-client";

// সার্ভার URL এ কানেক্ট
const socket = io("http://localhost:5000", {
  autoConnect: true,
  reconnection: true,
  withCredentials: true, // CORS সমস্যা এড়ানোর জন্য
  transports: ["websocket"], // Transport মেথড নির্দিষ্ট করা
});

// // কানেকশন সফল হলে লগ দেখানো
// socket.on("connect", () => {
//   console.log("Connected to the server!");
//   console.log("Socket ID:", socket.id);

//   // মেসেজ পাঠানো
//   //   socket.emit("message", "Hello from client!");
// });

// // সার্ভার থেকে মেসেজ গ্রহণ করা
// socket.on("message", (msg) => {
//   console.log("Message from server:", msg);
// });

// // সংযোগ বিচ্ছিন্ন হলে লগ দেখানো
// socket.on("disconnect", () => {
//   console.log("Disconnected from server.");
// });

export default socket;

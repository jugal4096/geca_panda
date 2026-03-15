const input = document.getElementById("input");
const messages = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const pandaGif = document.getElementById("pandaGif");

const GIFS = {

idle:"https://media.tenor.com/p6xH6l1p6KAAAAAC/panda-eating.gif",

thinking:"https://media.tenor.com/zZ6bQ9n7JxAAAAAC/panda-thinking.gif"

};


/* ENTER KEY */

input.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){
sendMessage();
}

});


sendBtn.addEventListener("click",sendMessage);



async function sendMessage(){

const text = input.value.trim();

if(!text) return;


/* USER MESSAGE */

const userMsg = document.createElement("div");

userMsg.className="user";

userMsg.innerText=text;

messages.appendChild(userMsg);

messages.scrollTop = messages.scrollHeight;

input.value="";


/* PANDA THINKING */

pandaGif.src = GIFS.thinking;


/* BOT MESSAGE */

const botMsg = document.createElement("div");

botMsg.className="bot";

botMsg.innerText="Panda is thinking... 🐼";

messages.appendChild(botMsg);

messages.scrollTop = messages.scrollHeight;


try{

const res = await fetch("http://localhost:3000/ai",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:text
})

});


const data = await res.json();

botMsg.innerText = data.reply || "No response from AI";


}catch{

botMsg.innerText="AI server not reachable";

}


/* PANDA BACK TO IDLE */

pandaGif.src = GIFS.idle;

messages.scrollTop = messages.scrollHeight;

}



/* INTRO VIDEO */

const intro = document.getElementById("introScreen");
const video = document.getElementById("introVideo");
const chatUI = document.getElementById("chatUI");

video.onended = ()=>{

intro.style.opacity="0";

setTimeout(()=>{

intro.style.display="none";

chatUI.classList.remove("hidden");

},800);

};
async function getMarkup() {
  const markup = await fetch("library/cliobot.html");
  if (!markup.ok) throw new Error(`Invalid status code ${markup.status}`);
  return await markup.text();
}

function displayUserMsg(msg) {
  const conversationLog = document.getElementById("conversation");
  if (conversationLog == null) throw new Error("Convesation log not found");

  const template = document.getElementsByTagName("template")[0];
  const msgBubble = template.content.cloneNode(true);
  msgBubble.querySelector("div").classList.add("user-message");
  const textNode = document.createTextNode(msg);
  msgBubble.querySelector("span").appendChild(textNode);
  conversationLog.appendChild(msgBubble);
}

function displayClioMsg(msg) {
  const conversationLog = document.getElementById("conversation");
  if (conversationLog == null) throw new Error("Convesation log not found");

  const template = document.getElementsByTagName("template")[0];
  const msgBubble = template.content.cloneNode(true);
  msgBubble.querySelector("div").classList.add("clio-message");
  const textNode = document.createTextNode(msg);
  msgBubble.querySelector("span").appendChild(textNode);
  conversationLog.appendChild(msgBubble);
}

async function sendMessage() {
  var input = document.getElementById("chat-input-field");
  const msg = input.value;
  if (msg === "") return;
  input.value = "";
  displayUserMsg(msg);

  const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
    method: "POST",
    body: JSON.stringify({
      sender: "test_user",
      message: msg,
    }),
  });
  if (!response.ok) throw new Error(`Invalid status code ${response.status}`);
  const data = await response.json();

  displayClioMsg(data[0].text);

  // change idle to talking animation
  var x = document.getElementById("placeholder");
  x.src = "./library/assets/clio_talking.gif";
  setTimeout(function () {
    x.src = "./library/assets/clio_idle.gif";
  }, 2000);

  console.log(data);
}

function toggleChatbox() {
  var x = document.getElementById("clio-chat-box");

  if (x.style.opacity === "1") {
    x.classList.add("chatboxFadeOut");
    setTimeout(function () {
      x.classList.remove("chatboxFadeOut");
    }, 300);
    x.style.opacity = "0";
  } else {
    x.classList.add("chatboxFadeIn");
    setTimeout(function () {
      x.classList.remove("chatboxFadeIn");
    }, 300);
    x.style.opacity = "1";
  }
}

function hideChatbox() {
  var x = document.getElementById("clio-chat-box");
  x.style.opacity = "0";
}

class Cliobot {
  constructor() {
    const body = document.querySelector("body");
    if (null) throw new Error("Body not found");

    getMarkup()
      .then((markup) => {
        var container = document.createElement("div");
        container.innerHTML = markup;
        body.appendChild(container);
        var input = document.getElementById("chat-input-field");
        document.addEventListener("keypress", (e) => {
          if (e.key == "Enter" && document.activeElement.id == input.id)
            sendMessage();
        });
      })
      .catch((err) => console.error(err));
  }
}

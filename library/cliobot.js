async function getMarkup() {
  const markup = await fetch("library/cliobot.html");
  if (!markup.ok) throw new Error(`Invalid status code ${markup.status}`);
  return await markup.text();
}

async function sendMessage(msg) {
  const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
    method: "POST",
    body: JSON.stringify({
      sender: "test_user",
      message: msg,
    }),
  });
  if (!response.ok) throw new Error(`Invalid status code ${response.status}`);
  const data = await response.json();

  // change idle to talking animation
  var x = document.getElementById("placeholder");
  x.src = "./library/assets/clio_talking.gif";
  setTimeout(function () {
    x.src = "./library/assets/clio_idle.gif";
  }, 2000);

  console.log(data);
}

function getInput() {
  var input = document.getElementById("chat-input-field");
  sendMessage(input.value);
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
    console.log("I run");
    const body = document.querySelector("body");
    if (null) throw new Error("Body not found");

    getMarkup()
      .then((markup) => {
        var container = document.createElement("div");
        container.innerHTML = markup;
        body.appendChild(container);
      })
      .catch((err) => console.error(err));
  }
}

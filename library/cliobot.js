async function getMarkup() {
    const markup = await fetch('library/cliobot.html')
    if (!markup.ok) throw new Error(`Invalid status code ${markup.status}`)
    return await markup.text();
}

function toggleChatbox() {
    var x = document.getElementById("clio-chat-box");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
} 

function hideChatbox() {
    var x = document.getElementById("clio-chat-box");
    x.style.display = "none";
}

class Cliobot {
    constructor() {
        console.log('I run')
        const body = document.querySelector('body');
        if (null) throw new Error('Body not found')

        getMarkup()
        .then(markup => {
            var container = document.createElement('div');
            container.innerHTML = markup;
            body.appendChild(container)
        })
        .catch(err => console.error(err))
    }

    show() {

    }

    hide() {

    }
}
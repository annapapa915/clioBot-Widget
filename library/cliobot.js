async function getMarkup() {
    const markup = await fetch('library/cliobot.html')
    if (!markup.ok) throw new Error(`Invalid status code ${markup.status}`)
    return await markup.text();
}

function toggleChatbox() {
    var x = document.getElementById("clio-chat-box");
    
    if (x.style.opacity === "1") {
        x.classList.add("chatboxFadeOut");
        setTimeout(function(){x.classList.remove("chatboxFadeOut");}, 300);
        x.style.opacity = "0";
    } else {
        x.classList.add("chatboxFadeIn");
        setTimeout(function(){x.classList.remove("chatboxFadeIn");}, 300);
        x.style.opacity = "1";
    }
    
} 

function hideChatbox() {
    var x = document.getElementById("clio-chat-box");
    x.style.opacity = "0";
}

function displayUserMessage(){
    var t = document.getElementById("chat-input-field").value;
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
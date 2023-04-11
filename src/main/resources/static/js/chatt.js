/**
 * web socket
 */

function getId(id){
    return document.getElementById(id);
}

var data = {};//전송 데이터(JSON)

var ws ;
var mid = getId('mid');
var btnLogin = getId('btnLogin');
var btnSend = getId('btnSend');
var talk = getId('talk');
var msg = getId('name');

btnLogin.onclick = function(){
    ws = new WebSocket("ws://" + location.host + "/chatt");

    ws.onmessage = function(msg){
        var data = JSON.parse(msg.data);
        var css;

        if(data.mid == mid.value){
            css = 'class=me';
        }else{
            css = 'class=other';
        }

        var item = `<div ${css} >
		                <span><b>${data.mid}</b></span> [ ${data.date} ]<br/>
                      <span>${data.msg}</span>
						</div>`;

        talk.innerHTML += item;
        talk.scrollTop=talk.scrollHeight;//스크롤바 하단으로 이동
    }
}

msg.onkeyup = function(ev){
    if(ev.keyCode == 13){
        send();
    }
}

btnSend.onclick = function(){
    send();
}

function send(){
    if(msg.value.trim() != ''){
        data.mid = getId('mid').value;
        data.msg = msg.value;
        data.date = new Date().toLocaleString();
        var temp = JSON.stringify(data);
        ws.send(temp);
    }
    msg.value ='';

}



// SeungTae
(function(){

    var chat = {
        messageToSend: '',
        messageResponses: [
            'Why did the web developer leave the restaurant? Because of the table layout.',
            'How do you comfort a JavaScript bug? You console it.',
            'An SQL query enters a bar, approaches two tables and asks: "May I join you?"',
            'What is the most used language in programming? Profanity.',
            'What is the object-oriented way to become wealthy? Inheritance.',
            'An SEO expert walks into a bar, bars, pub, tavern, public house, Irish pub, drinks, beer, alcohol'
        ],
        init: function() {
            this.cacheDOM();
            this.bindEvents();
            this.render();
        },
        cacheDOM: function() {
            this.$chatHistory = $('.chat-history');
            this.$button = $('button');
            this.$textarea = $('#message-to-send');
            this.$chatHistoryList =  this.$chatHistory.find('ul');
        },
        bindEvents: function() {
            this.$button.on('click', this.addMessage.bind(this));
            this.$textarea.on('keyup', this.addMessageEnter.bind(this));
        },
        render: function() {
            this.scrollToBottom();
            if (this.messageToSend.trim() !== '') {
                var template = Handlebars.compile( $("#message-template").html());
                var context = {
                    messageOutput: this.messageToSend,
                    time: this.getCurrentTime()
                };

                this.$chatHistoryList.append(template(context));
                this.scrollToBottom();
                this.$textarea.val('');

                // responses
                var templateResponse = Handlebars.compile( $("#message-response-template").html());
                var contextResponse = {
                    response: this.getRandomItem(this.messageResponses),
                    time: this.getCurrentTime()
                };

                setTimeout(function() {
                    this.$chatHistoryList.append(templateResponse(contextResponse));
                    this.scrollToBottom();
                }.bind(this), 1500);

            }

        },

        addMessage: function() {
            this.messageToSend = this.$textarea.val()
            this.render();
        },
        addMessageEnter: function(event) {
            // enter was pressed
            if (event.keyCode === 13) {
                this.addMessage();
            }
        },
        scrollToBottom: function() {
            this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
        },
        getCurrentTime: function() {
            return new Date().toLocaleTimeString().
            replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        },
        getRandomItem: function(arr) {
            return arr[Math.floor(Math.random()*arr.length)];
        }

    };

    chat.init();

    var searchFilter = {
        options: { valueNames: ['name'] },
        init: function() {
            var userList = new List('people-list', this.options);
            var noItems = $('<li id="no-items-found">No items found</li>');

            userList.on('updated', function(list) {
                if (list.matchingItems.length === 0) {
                    $(list.list).append(noItems);
                } else {
                    noItems.detach();
                }
            });
        }
    };

    searchFilter.init();

})();

const toggleList = document.querySelectorAll(".toggleSwitch");

toggleList.forEach(($toggle) => {
    $toggle.onclick = () => {
        $toggle.classList.toggle('active');
    }
});


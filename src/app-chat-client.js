let ws = new WebSocket('ws://localhost:3000/ws/chat');
ws.onmessage = function (event) {
	let data = event.data;
	console.log(data);
	let msg = JSON.parse(data);
	if (msg.type === 'list') {

	}
}

var vmMessageList = new Vue({
    el: '#message-list',
    data: {
        messages: []
    }
});

var vmUserList = new Vue({
    el: '#user-list',
    data: {
        users: []
    }
})
const socket = io('http://192.168.65.77:3002'); 


const loginContainer = document.getElementById('login-container');
const chatContainer = document.querySelector('.chat-container');
const usernameInput = document.getElementById('username');
const loginButton = document.getElementById('login-btn');
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-btn');

let currentUser; 

loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        socket.emit('new user', username);
        loginContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        chatInput.focus();
    } else {
        alert('Please enter a username');
    }
});


sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        socket.emit('chat message', { username: currentUser, message });
        chatInput.value = '';
    }
}


socket.on('chat message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.classList.add(data.username === currentUser ? 'right' : 'left');

    const usernameElement = document.createElement('p');
    usernameElement.classList.add('username');
    usernameElement.textContent = data.username;

    const messageTextElement = document.createElement('p');
    messageTextElement.classList.add('message-text');
    messageTextElement.textContent = data.message;

    messageElement.append(usernameElement, messageTextElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

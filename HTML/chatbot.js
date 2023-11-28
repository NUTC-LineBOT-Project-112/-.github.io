// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = inputField.value;

  // Clear input field
  inputField.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add user input to conversation
  let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  conversation.appendChild(message);

  // Generate chatbot response
  const response = generateResponse(input);

  // Add chatbot response to conversation
  message = document.createElement('div');
  message.classList.add('chatbot-message','chatbot');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
  conversation.appendChild(message);
  message.scrollIntoView({behavior: "smooth"});
});

// Generate chatbot response function
function generateResponse(input) {
  // 使用 fetch 或其他 HTTP 請求庫呼叫 LINE Bot Messaging API
  const url = 'https://d088-123-240-92-160.ngrok-free.app'; // 修改為正確的 Messaging API 端點
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': '/sjWWuRh9ezGl2wedIw4o9T3UBjkikGONVoswIpI0Xy7DHUFTIv0DGn9q8Qd2EC40/onNR1/0qSNHM8yTjIE3OTrXlojPEY8HDy/0poZjMn6aHSrNIrWUwRG067r0VHYefas0iw3EvFUXKbdWKVRwgdB04t89/1O/w1cDnyilFU=', // 將 YOUR_CHANNEL_ACCESS_TOKEN 替換為您的 Channel Access Token
  };

  // 準備要發送的消息
  const data = {
    replyToken: 'REPLY_TOKEN', // 從 LINE Bot 的 Webhook 事件中取得 replyToken
    messages: [
      {
        type: 'text',
        text: input,
      },
    ],
  };

  // 使用 fetch 函數發送 POST 請求
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('LINE Bot Response:', data);
    // 在這裡處理 LINE Bot 的回應，並顯示在網頁上
    const responseMessage = data.messages && data.messages[0] && data.messages[0].text;
    if (responseMessage) {
      displayChatbotResponse(responseMessage);
    } else {
      console.error('Invalid response from LINE Bot:', data);
    }
  })
  
  .catch(error => {
    console.error('Error sending message to LINE Bot:', error);
  });
}

// 顯示 LINE Bot 的回應在網頁上
function displayChatbotResponse(response) {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const message = document.createElement('div');
  message.classList.add('chatbot-message', 'chatbot');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
  conversation.appendChild(message);
  message.scrollIntoView({ behavior: 'smooth' });
}

// app.js

document.addEventListener('DOMContentLoaded', function () {
    // 初始化 LIFF
    initializeLiff();
});

function initializeLiff() {
    liff.init({
        liffId: '2001879251-zOk9bLB8' // 請替換為您的 LIFF ID
    })
    .then(() => {
        if (liff.isLoggedIn()) {
            // LIFF 初始化成功且用戶已登入
            initializeApp();
        } else {
            // 用戶尚未登入，顯示登入按鈕
            liff.login();
        }
    })
    .catch((err) => {
        console.error(err);
    });
}

function initializeApp() {
    // 用戶已登入，為按鈕添加點擊事件
    document.getElementById('sendMessageButton').addEventListener('click', function () {
        // 設定要發送的消息
        var message = {
            text: 'Hello, Line Bot!'
        };

        // 使用 fetch 發送 POST 請求到 Line Bot Webhook
        fetch('https://3511-123-240-92-160.ngrok-free.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Line Bot Response:', data);
            // 在 LIFF 中顯示 Line Bot 的回應
            alert('Line Bot Response: ' + JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error sending message to Line Bot:', error);
        });
    });
}

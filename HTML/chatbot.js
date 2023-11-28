// app.js

document.addEventListener('DOMContentLoaded', function () {
    // 初始化 LIFF
    liff.init({
        liffId: '2001879251-zOk9bLB8'
    })
    .then(() => {
        console.log('LIFF initialized');
        // LIFF 初始化成功後的其他初始化邏輯
        if (liff.isLoggedIn()) {
            // 用戶已登入，執行相關邏輯
            initializeApp();
        } else {
            // 用戶尚未登入，您可以顯示登入按鈕或進行其他處理
        }
    })
    .catch((err) => {
        console.error(err);
    });
});

function initializeApp() {
    // 在這裡可以執行用戶已登入時的其他初始化邏輯
    // 例如綁定按鈕點擊事件等

    // 監聽按鈕點擊事件
    document.getElementById('openChatButton').addEventListener('click', function () {
        // 使用 liff.openWindow 打開 Line Bot 聊天畫面
        liff.openWindow({
            url: 'https://liff.line.me/1645278921-kWRPP32q/?accountId=355gslah' // 替換為您的 Line Bot ID
        });
    });
}

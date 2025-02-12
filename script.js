document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Kiểm tra xem Puter.js đã được tải chưa
        if (typeof puter !== "undefined" && puter.system?.ping) {
            await puter.system.ping();
            console.log("✅ Puter.js đã sẵn sàng!");
        } else {
            throw new Error("❌ Puter.js chưa được tải hoặc không hợp lệ.");
        }
    } catch (error) {
        console.error("❌ Lỗi kết nối Puter.js:", error);
    }

    // 🔥 Kiểm tra và xử lý API Token
    const apiKey = "YOUR_VALID_API_KEY"; // 🔴 Thay bằng API Key hợp lệ
    try {
        const response = await fetch("https://api.puter.com/wisp/relay-token/create", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`Lỗi API: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Token được tạo:", data);
    } catch (error) {
        console.error("❌ Lỗi khi tạo token:", error);
    }

    // 🔥 Kiểm tra kết nối WebSocket
    const websocketUrl = "wss://phamvannguyenquy.github.io/DAO-TAO-AI-CHAT-GPT-GEMS/socket";

    if (!websocketUrl || websocketUrl.includes("undefined")) {
        console.error("❌ Lỗi: URL WebSocket bị undefined!");
    } else {
        const socket = new WebSocket(websocketUrl);
        
        socket.onopen = () => console.log("✅ Kết nối WebSocket thành công!");
        socket.onerror = (error) => console.error("❌ Lỗi WebSocket:", error);
    }
});

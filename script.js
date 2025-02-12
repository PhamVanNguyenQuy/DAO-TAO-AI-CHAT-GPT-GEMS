function testPuter() {
    if (typeof Puter !== "undefined") {
        document.getElementById("status").innerText = "✅ Puter.js đã sẵn sàng!";
    } else {
        document.getElementById("status").innerText = "❌ Lỗi: Puter.js chưa hoạt động!";
    }
}

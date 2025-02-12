document.addEventListener("DOMContentLoaded", async () => {
    try {
        await puter.system.ping();
        console.log("✅ Puter.js đã sẵn sàng!");
    } catch (error) {
        console.error("❌ Lỗi kết nối Puter.js:", error);
    }
});

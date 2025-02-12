document.addEventListener("DOMContentLoaded", async () => {
    try {
        await puter.system.ping();
        console.log("✅ Puter.js đã sẵn sàng!");
    } catch (error) {
        console.error("❌ Lỗi kết nối Puter.js:", error);
    }
});
async function registerUser() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        await puter.auth.signup(email, password);
        alert("🎉 Đăng ký thành công! Hãy kiểm tra email của bạn.");
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        alert("❌ Đăng ký thất bại, vui lòng thử lại.");
    }
}

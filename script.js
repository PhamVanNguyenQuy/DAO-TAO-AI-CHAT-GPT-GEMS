document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Kiểm tra xem puter đã được khởi tạo chưa
        if (typeof puter !== "undefined" && puter.system && puter.system.ping) {
            await puter.system.ping();
            console.log("✅ Puter.js đã sẵn sàng!");
        } else {
            throw new Error("Puter.js chưa được tải hoặc không hợp lệ.");
        }
    } catch (error) {
        console.error("❌ Lỗi kết nối Puter.js:", error);
    }
});

async function registerUser() {
    let email = document.getElementById("email")?.value;
    let password = document.getElementById("password")?.value;

    // Kiểm tra email và password có hợp lệ không
    if (!email || !password) {
        alert("⚠️ Vui lòng nhập đầy đủ email và mật khẩu!");
        return;
    }

    try {
        // Kiểm tra xem puter.auth.signup có tồn tại không
        if (typeof puter !== "undefined" && puter.auth && puter.auth.signup) {
            await puter.auth.signup(email, password);
            alert("🎉 Đăng ký thành công! Hãy kiểm tra email của bạn.");
        } else {
            throw new Error("Hàm đăng ký không tồn tại hoặc Puter.js chưa tải.");
        }
    } catch (error) {
        console.error("Lỗi đăng ký:", error);

        // Xử lý lỗi API 401 (Unauthorized)
        if (error.message.includes("401")) {
            alert("🔒 Lỗi xác thực! Vui lòng kiểm tra lại tài khoản.");
        } else {
            alert("❌ Đăng ký thất bại, vui lòng thử lại.");
        }
    }
}

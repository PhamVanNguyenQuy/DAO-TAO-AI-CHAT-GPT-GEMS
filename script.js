document.addEventListener("DOMContentLoaded", async () => {
    try {
        await puter.system.ping();
        console.log("✅ Puter.js đã sẵn sàng!");
    } catch (error) {
        console.error("❌ Lỗi kết nối Puter.js:", error);
    }
});
async function registerUser() {
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    try {
        await puter.auth.signup(email, password);
        alert("🎉 Đăng ký thành công! Hãy đăng nhập để bắt đầu.");
    } catch (error) {
        console.error("❌ Lỗi đăng ký:", error);
        alert("❌ Đăng ký thất bại, vui lòng thử lại.");
    }
}
async function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    try {
        await puter.auth.login(email, password);
        alert("✅ Đăng nhập thành công!");
        showWelcome(email);
    } catch (error) {
        console.error("❌ Lỗi đăng nhập:", error);
        alert("❌ Email hoặc mật khẩu không đúng!");
    }
}
function showWelcome(email) {
    document.getElementById("authSection").style.display = "none";
    document.getElementById("welcomeSection").style.display = "block";
    document.getElementById("userEmail").innerText = email;
}
async function logoutUser() {
    try {
        await puter.auth.logout();
        alert("👋 Đã đăng xuất thành công!");
        location.reload(); // Load lại trang
    } catch (error) {
        console.error("❌ Lỗi đăng xuất:", error);
    }
}

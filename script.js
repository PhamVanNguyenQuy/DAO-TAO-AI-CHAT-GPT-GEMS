// 🕒 Chờ tài liệu HTML tải xong
document.addEventListener("DOMContentLoaded", async function () {
    try {
        if (typeof puter !== "undefined") {
            console.log("✅ Puter.js đã sẵn sàng!");

            // 📌 Kiểm tra danh sách phương thức có sẵn
            console.log("📌 Danh sách các phương thức của Puter.js:", Object.keys(puter));

            // 🔐 Đặt API Key nếu cần thiết
            if (typeof puter.setAuthToken === "function") {
                const API_KEY = "YOUR_API_KEY_HERE"; // 🔑 Thay thế bằng API Key thật
                if (API_KEY !== "YOUR_API_KEY_HERE") {
                    puter.setAuthToken(API_KEY);
                    console.log("🔑 API Key đã được thiết lập.");
                } else {
                    console.warn("⚠️ API Key chưa được đặt!");
                }
            }

            // 🔍 Kiểm tra trạng thái đăng nhập
            await checkUserStatus();
        } else {
            throw new Error("Puter.js chưa tải hoặc không tồn tại.");
        }
    } catch (error) {
        console.error("❌ Lỗi khởi tạo Puter.js:", error);
    }
});

// ✅ Đăng ký tài khoản
async function registerUser() {
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    if (!puter.auth || typeof puter.auth.signup !== "function") {
        console.error("❌ API `puter.auth.signup` không tồn tại!");
        alert("⚠️ Đăng ký không khả dụng do lỗi hệ thống!");
        return;
    }

    try {
        await puter.auth.signup(email, password);
        alert("🎉 Đăng ký thành công! Hãy đăng nhập để bắt đầu.");
    } catch (error) {
        console.error("❌ Lỗi đăng ký:", error);
        alert("❌ Đăng ký thất bại, vui lòng thử lại.");
    }
}

// ✅ Đăng nhập tài khoản
async function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (!puter.auth || typeof puter.auth.login !== "function") {
        console.error("❌ API `puter.auth.login` không tồn tại!");
        alert("⚠️ Đăng nhập không khả dụng do lỗi hệ thống!");
        return;
    }

    try {
        let response = await puter.auth.login(email, password);
        console.log("✅ Đăng nhập thành công:", response);
        alert("✅ Đăng nhập thành công!");
        showWelcome(email);
    } catch (error) {
        console.error("❌ Lỗi đăng nhập:", error);

        if (error.status === 401) {
            alert("❌ Email hoặc mật khẩu không đúng!");
        } else {
            alert("⚠️ Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.");
        }
    }
}

// ✅ Hiển thị chào mừng sau khi đăng nhập
function showWelcome(email) {
    document.getElementById("authSection").style.display = "none";
    document.getElementById("welcomeSection").style.display = "block";
    document.getElementById("userEmail").innerText = email;
}

// ✅ Đăng xuất tài khoản
async function logoutUser() {
    if (!puter.auth || typeof puter.auth.logout !== "function") {
        console.error("❌ API `puter.auth.logout` không tồn tại!");
        alert("⚠️ Không thể đăng xuất do lỗi hệ thống!");
        return;
    }

    try {
        await puter.auth.logout();
        alert("👋 Đã đăng xuất thành công!");
        location.reload(); // Load lại trang để cập nhật trạng thái đăng nhập
    } catch (error) {
        console.error("❌ Lỗi đăng xuất:", error);
    }
}

// ✅ Kiểm tra trạng thái đăng nhập
async function checkUserStatus() {
    try {
        if (!puter.auth || typeof puter.auth.getUser !== "function") {
            console.error("❌ API `puter.auth.getUser` không tồn tại!");
            return;
        }

        let user = await puter.auth.getUser();
        console.log("✅ Người dùng đã đăng nhập:", user);
        showWelcome(user.email);
    } catch (error) {
        console.error("⚠️ Không thể lấy thông tin người dùng:", error);

        // 🛑 Nếu lỗi là 401 (Unauthorized), yêu cầu người dùng đăng nhập lại
        if (error.status === 401) {
            alert("🔑 Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        }
    }
}

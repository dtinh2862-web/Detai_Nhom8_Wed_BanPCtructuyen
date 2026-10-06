// Chuyển thể phần auth.js từ DeTaiBanQuanAo(3).rar; giữ luồng đồng bộ của mẫu.
// Dữ liệu password dạng rõ đúng mẫu chỉ phục vụ demo; không nhập mật khẩu thật.
const USERS_KEY = "users";
const AUTH_KEY = "currentUser";

// Đọc users, JSON hỏng trả mảng rỗng; giữ nguyên dữ liệu bản cũ.
function loadUsers() {
    try {
        const value = JSON.parse(localStorage.getItem(USERS_KEY));
        return Array.isArray(value) ? value.filter(u => u && typeof u === "object") : [];
    } catch {
        return [];
    }
}

// Lưu mảng users như auth.js mẫu; chỉ dùng tài khoản giả để học.
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Đọc session currentUser như nhóm mẫu.
function getCurrentUser() {
    try {
        const user = JSON.parse(localStorage.getItem(AUTH_KEY));
        return user && user.id && typeof user.name === "string" && typeof user.email === "string" ? user : null;
    } catch {
        return null;
    }
}

// Lưu object phiên đăng nhập vào LocalStorage.
function setCurrentUser(user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

// Xóa session, cập nhật navbar và tùy chọn về trang chủ.
function logout({
    redirect = false
} = {}) {
    localStorage.removeItem(AUTH_KEY);
    syncNavUser();
    syncUserLink();
    if (redirect) window.location.href = "trang-chu.html";
}

// Đăng ký theo từng bước: chuẩn hóa, kiểm tra regex, kiểm tra trùng email rồi lưu tài khoản.
function register({
    name,
    email,
    password,
    confirmPassword
} = {}) {
    const n = cleanText(name);
    const e = String(email || "").trim().toLowerCase();
    const p = String(password || "");
    const p2 = String(confirmPassword || "");

    if (!n) return {
        ok: false,
        field: "name",
        message: "Vui lòng nhập họ tên."
    };
    if (!isValidName(n))
        return {
            ok: false,
            field: "name",
            message: "Họ tên cần 2–50 ký tự, chỉ gồm chữ, khoảng trắng, dấu nháy hoặc gạch nối.",
        };
    if (!e) return {
        ok: false,
        field: "email",
        message: "Vui lòng nhập email."
    };
    if (!isValidEmail(e))
        return {
            ok: false,
            field: "email",
            message: "Email không đúng định dạng.",
        };

    const pwErr = validatePassword(p);
    if (pwErr) return {
        ok: false,
        field: "password",
        message: pwErr
    };

    if (!p2 || p !== p2)
        return {
            ok: false,
            field: "confirmPassword",
            message: "Mật khẩu nhập lại không khớp.",
        };

    const users = loadUsers();
    const exists = users.some(
        (u) => String(u.email || "").toLowerCase() === e.toLowerCase(),
    );
    if (exists)
        return {
            ok: false,
            field: "email",
            message: "Email này đã được đăng ký."
        };

    const user = {
        id: Date.now(),
        name: n,
        email: e,
        password: p,
        createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers(users);
    return {
        ok: true,
        user,
        message: "Đăng ký thành công!"
    };
}

// Đăng nhập: tìm email/họ tên, kiểm tra mật khẩu, lưu phiên rồi cập nhật thanh điều hướng.
function login({
    loginId,
    password
} = {}) {
    const input = String(loginId || "").trim();
    const p = String(password || "");

    if (!input)
        return {
            ok: false,
            field: "loginId",
            message: "Vui lòng nhập email hoặc tên đăng nhập.",
        };
    if (!p)
        return {
            ok: false,
            field: "password",
            message: "Vui lòng nhập mật khẩu."
        };

    const users = loadUsers();
    const user = users.find((u) => {
        const matchEmail =
            String(u.email || "").toLowerCase() === input.toLowerCase();
        const matchName =
            String(u.name || "").toLowerCase() === input.toLowerCase();
        return matchEmail || matchName;
    });

    if (!user)
        return {
            ok: false,
            field: "loginId",
            message: "Email hoặc tên đăng nhập không đúng.",
        };
    // Không dùng tài khoản băm của bản cũ để so sánh password dạng rõ.
    if (typeof user.password !== "string") return {
        ok: false,
        field: "loginId",
        message: "Tài khoản cần được cập nhật. Vui lòng đăng ký tài khoản mới."
    };
    if (String(user.password) !== p)
        return {
            ok: false,
            field: "password",
            message: "Mật khẩu không đúng."
        };

    setCurrentUser({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
    });
    syncNavUser();
    syncUserLink();
    window.dispatchEvent(new Event("auth:changed"));
    return {
        ok: true,
        message: "Đăng nhập thành công!"
    };
}

// Chặn thao tác cần tài khoản và chuyển đến trang đăng nhập khi chưa có phiên.
function requireLogin() {
    if (getCurrentUser()) return true;
    window.alert("Vui lòng đăng nhập để tiếp tục.");
    location.href = "dang-nhap.html";
    return false;
}

function requireLoginOrRedirect({
    redirectTo = "dang-nhap.html"
} = {}) {
    if (getCurrentUser()) return true;
    window.alert("Vui lòng đăng nhập để tiếp tục.");
    location.href = redirectTo;
    return false;
}
// Các hàm hỗ trợ liên kết tài khoản trên đầu trang.
function getUsers() {
    return loadUsers();
}

function syncUserLink() {
    const link = document.getElementById("account-link");
    if (link) link.setAttribute("href", getCurrentUser() ? "tai-khoan.html" : "dang-nhap.html");
}
// Xóa trạng thái lỗi cũ, dùng alert/is-invalid của Bootstrap và đưa focus tới ô cần sửa.
function showFormResult(form, messageId, result) {
    form.querySelectorAll(".is-invalid").forEach(function(input) {
        input.classList.remove("is-invalid");
        input.removeAttribute("aria-invalid");
    });
    const message = document.getElementById(messageId);
    message.hidden = false;
    message.className = "alert " + (result.ok ? "alert-success" : "alert-danger");
    message.textContent = result.message || "Thành công.";
    if (result.field && form.elements[result.field]) {
        const input = form.elements[result.field];
        input.classList.add("is-invalid");
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", messageId);
        input.focus();
    }
}
// Gắn form sau DOMContentLoaded để hàm chung đã nạp xong.
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector("#register-form");
    if (registerForm) registerForm.addEventListener("submit", event => {
        event.preventDefault();
        document.querySelector("#registration-result").hidden = true;
        try {
            const result = register(Object.fromEntries(new FormData(registerForm)));
            showFormResult(registerForm, "register-message", result);
            if (result.ok) {
                document.getElementById("registered-name").textContent = result.user.name;
                document.getElementById("registered-email").textContent = result.user.email;
                document.querySelector("#registration-result").hidden = false;
                // Giống mẫu: email đăng ký được điền sẵn khi chuyển sang form đăng nhập.
                document.querySelector("#login-after-register").href = "dang-nhap.html?email=" + encodeURIComponent(result.user.email);
                registerForm.reset();
            }
        } catch {
            showFormResult(registerForm, "register-message", {
                ok: false,
                message: "Không lưu được tài khoản."
            });
        }
    });
    const loginForm = document.querySelector("#login-form");
    if (loginForm) {
        loginForm.elements.loginId.value = new URLSearchParams(location.search).get("email") || "";
        loginForm.addEventListener("submit", event => {
            event.preventDefault();
            try {
                const result = login(Object.fromEntries(new FormData(loginForm)));
                showFormResult(loginForm, "login-message", result);
                if (result.ok) {
                    loginForm.reset();
                    location.href = "trang-chu.html";
                }
            } catch {
                showFormResult(loginForm, "login-message", {
                    ok: false,
                    message: "Không lưu được phiên đăng nhập."
                });
            }
        });
    }
    document.querySelector("#logout")?.addEventListener("click", () => logout({
        redirect: true
    }));
    syncUserLink();
});
// Cùng cách xuất window.auth của nhóm mẫu để trang khác gọi lại, không lặp auth.
window.auth = {
    loadUsers,
    saveUsers,
    getCurrentUser,
    setCurrentUser,
    register,
    login,
    logout,
    isValidEmail,
    isValidName,
    validatePassword,
    requireLogin,
    requireLoginOrRedirect
};

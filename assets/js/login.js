// Tài khoản demo (frontend-only)
const ACCOUNTS = [
  { username: "sinhvien", password: "123456", role: "user", redirect: "user-home.html" },
  { username: "admin", password: "admin123", role: "admin", redirect: "admin.html" }
];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-login-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();

    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu.");
      return;
    }

    const account = ACCOUNTS.find(
      (a) => a.username === username && a.password === password
    );

    if (!account) {
      alert("Tên đăng nhập hoặc mật khẩu không đúng.\n\nTài khoản demo:\n- Sinh viên: sinhvien / 123456\n- Admin: admin / admin123");
      return;
    }

    // Lưu thông tin phiên làm việc
    sessionStorage.setItem("currentUser", JSON.stringify({ username: account.username, role: account.role }));
    alert("Đăng nhập thành công!");
    window.location.href = account.redirect;
  });
});


# PTIT Exam - Hệ thống Thi Trắc Nghiệm Trực Tuyến

Dự án giao diện người dùng cho hệ thống thi trắc nghiệm trực tuyến của Học viện Công nghệ Bưu chính Viễn thông (PTIT). Đây là bản demo frontend thuần túy (HTML, CSS, JavaScript), không có backend.

## Cách chạy

**Cách 1 - Python (khuyên dùng):**
```
python -m http.server 8080
```
Mở trình duyệt và truy cập: http://localhost:8080

**Cách 2 - VS Code Live Server:**
Cài extension "Live Server", click phải vào `index.html`, chọn "Open with Live Server".

## Tài khoản demo

| Vai trò   | Tên đăng nhập | Mật khẩu  | Trang sau đăng nhập  |
|-----------|---------------|-----------|----------------------|
| Sinh viên | sinhvien      | 123456    | user-home.html       |
| Quản trị  | admin         | admin123  | admin.html           |

## Các trang chính

| Trang                | Đường dẫn             | Mô tả                          |
|----------------------|-----------------------|--------------------------------|
| Đăng nhập sinh viên  | index.html            | Trang đăng nhập chính          |
| Đăng nhập quản trị   | admin-login.html      | Trang đăng nhập quản trị viên  |
| Trang chủ sinh viên  | user-home.html        | Danh sách kỳ thi               |
| Làm bài thi          | exam-taking.html      | Giao diện làm bài trắc nghiệm  |
| Kết quả bài thi      | exam-result.html      | Xem điểm và chi tiết bài làm   |
| Dashboard quản trị   | admin.html            | Tổng quan hệ thống             |
| Chỉnh sửa kỳ thi     | admin-edit-exam.html  | Thêm, sửa kỳ thi và câu hỏi   |
| Đăng ký              | register.html         | Đăng ký tài khoản sinh viên    |

## Luồng sử dụng

**Sinh viên:**
1. Vào `index.html`, đăng nhập bằng `sinhvien` / `123456`
2. Chọn kỳ thi luyện tập và nhấn "Bắt đầu" hoặc "Làm lại"
3. Làm bài, nộp bài, xem kết quả

**Quản trị viên:**
1. Vào `index.html`, nhấn liên kết "Đăng nhập Admin"
2. Đăng nhập bằng `admin` / `admin123`
3. Xem Dashboard, Thống kê hoặc chỉnh sửa kỳ thi

## Ghi chú

- Đây là giao diện tĩnh (frontend-only), không có backend hay cơ sở dữ liệu thật.
- Dữ liệu câu hỏi được định nghĩa trong `assets/js/exam-taking.js`.
- Kết quả bài thi được lưu tạm trong `localStorage` của trình duyệt.

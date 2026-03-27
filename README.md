# 🎓 EnglishMaster - English Learning Platform

EnglishMaster là một nền tảng học tiếng Anh trực tuyến hiện đại, được xây dựng với mục tiêu cung cấp lộ trình học tập bài bản, các bài thi thử chất lượng (TOEIC, IELTS) và hệ thống quản lý tiến độ thông minh.

---

## ✨ Các Tính Năng Đã Hoàn Thiện

### 🔑 1. Hệ Thống Tài Khoản & Bảo Mật
*   **Đăng ký & Đăng nhập:** Hệ thống xác thực người dùng dựa trên `localStorage`.
*   **Phân quyền (RBAC):** Phân biệt rõ rệt giữa tài khoản **User** (Học viên) và **Admin** (Quản trị viên).
*   **ProtectedRoute:** Chỉ người dùng đã đăng nhập mới có thể truy cập các nội dung học tập và bài thi.
*   **Thông tin cá nhân:** Trang Profile cho phép người dùng cập nhật Họ tên và thay đổi Mật khẩu.

### 📝 2. Luyện Thi & Học Tập (Learning Hub)
*   **Tests Hub:** Kho đề thi phong phú bao gồm TOEIC, IELTS, HSK...
*   **Giao diện làm bài chuyên nghiệp:** 
    *   Đồng hồ đếm ngược (Timer) với tính năng tự động nộp bài khi hết giờ.
    *   Thanh tiến độ (Progress Bar) theo dõi số câu đã trả lời.
    *   Bảng điều hướng câu hỏi nhanh.
*   **Kết quả chi tiết:** Hiển thị điểm số, thời gian làm bài, và giải thích chi tiết cho từng câu hỏi đúng/sai.
*   **Lessons Hub:** Các chuyên mục học tập riêng biệt:
    *   *Vocabulary:* Học từ vựng theo chủ đề.
    *   *Grammar:* Hệ thống kiến thức ngữ pháp trọng tâm.
    *   *Flashcards:* Luyện trí nhớ với bộ thẻ từ vựng tương tác.

### 📊 3. Tính Năng Tương Tác & Thống Kê
*   **Hồ sơ năng lực (Dashboard):** Thống kê tổng số bài đã làm, độ chính xác trung bình và tổng thời gian học ngay tại trang cá nhân.
*   **Bảng xếp hạng (Leaderboard):** Vinh danh các học viên có điểm số cao nhất toàn hệ thống với giao diện Podium (Bục nhận giải) hiện đại.
*   **Thông báo (Notifications):** Hệ thống thông báo thời gian thực về nội dung mới, lời chào mừng và kết quả học tập.

### 🛡️ 4. Quản Trị Hệ Thống (Admin Dashboard)
*   **Thống kê tổng quan:** Theo dõi tổng lượng người dùng, số bài thi và lượt làm bài của toàn sàn.
*   **Quản lý người dùng:** Xem danh sách, tìm kiếm và có quyền xóa tài khoản học viên.
*   **Quản lý bài thi:** Xem và quản lý danh sách đề thi hiện có trên hệ thống.

### 🎨 5. Giao Diện & Trải Nghiệm (UI/UX)
*   **Dark Mode:** Hỗ trợ giao diện Tối hoàn hảo, bảo vệ mắt khi học ban đêm.
*   **Responsive Design:** Tương thích hoàn toàn trên Desktop, Tablet và Mobile.
*   **Modern Navbar:** Thanh công cụ đục (Opaque), phân nhóm chức năng gọn gàng, tích hợp hiệu ứng Hover và Divider tinh tế.

---

## 🛠 Công Nghệ Sử Dụng
*   **Frontend:** React 19, TypeScript
*   **Build Tool:** Vite
*   **Styling:** CSS Modules (Global & Component-scoped)
*   **Icons:** Lucide React
*   **Routing:** React Router DOM v7

---

## 🚀 Thông Tin Đăng Nhập Mẫu

Hệ thống đã được cài đặt sẵn 2 tài khoản mặc định để bạn trải nghiệm nhanh:

1.  **Tài khoản Quản trị (Admin):**
    *   Email: `admin@example.com`
    *   Password: `admin123`
2.  **Tài khoản Học viên (User):**
    *   Email: `user@example.com`
    *   Password: `password123`

---

## 📂 Cấu Trúc Thư Mục Chính
*   `src/components/`: Các thành phần dùng chung (Navbar, ProtectedRoute, Layout...).
*   `src/pages/`: Các trang chính (Home, TestTaking, AdminDashboard, Profile...).
*   `src/hooks/`: Các logic tùy chỉnh (useTimer, useTheme...).
*   `src/data/`: Chứa Mock Data (Đề thi, từ vựng, ngữ pháp).
*   `src/types/`: Định nghĩa kiểu dữ liệu TypeScript cho toàn dự án.

---
*Dự án được phát triển với sự hỗ trợ của Gemini CLI.*

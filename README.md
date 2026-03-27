# EnglishMaster Frontend

Một ứng dụng học tiếng Anh hiện đại giúp luyện thi TOEIC, IELTS, HSK và cung cấp các tài liệu học tập như Flashcards, Từ vựng, Ngữ pháp.

## 📁 Cấu trúc thư mục (Project Structure)

Dự án được tổ chức theo cấu trúc module hóa để dễ dàng bảo trì và mở rộng:

- **`src/assets/`**: Chứa các tài nguyên tĩnh như hình ảnh (logo, hero image), icons và fonts.
- **`src/components/`**: Các thành phần giao diện (UI Components) nhỏ và có tính tái sử dụng cao.
  - *Ví dụ*: `Navbar`, `Sidebar`, `QuestionCard`. Mỗi component nằm trong thư mục riêng kèm CSS Module.
- **`src/pages/`**: Các trang chính của ứng dụng. Mỗi trang là một folder chứa logic (`.tsx`) và phong cách riêng (`.module.css`).
  - *Ví dụ*: `Home`, `Login`, `TestsHub`, `LessonsHub`.
- **`src/data/`**: Chứa dữ liệu mẫu (Mock Data) phục vụ cho việc hiển thị khi chưa có API thực tế.
- **`src/hooks/`**: Các React Custom Hooks dùng để xử lý logic nghiệp vụ (Business Logic) độc lập.
  - *Ví dụ*: `useTimer.ts` xử lý đếm ngược thời gian làm bài.
- **`src/styles/`**: Chứa các định nghĩa CSS toàn cục, biến môi trường CSS (Variables), hoặc các quy tắc style dùng chung cho toàn bộ ứng dụng.
- **`src/types/`**: Nơi quản lý tập trung các định nghĩa kiểu dữ liệu (TypeScript Interfaces/Types) để đảm bảo tính an toàn và nhất quán về dữ liệu.

## 🚀 Công nghệ sử dụng

- **React 19** & **Vite**: Môi trường phát triển nhanh và hiện đại.
- **TypeScript**: Đảm bảo code rõ ràng, ít lỗi.
- **React Router 7**: Quản lý điều hướng trang.
- **Lucide React**: Bộ icon đẹp và nhẹ.
- **CSS Modules**: Tránh xung đột CSS và quản lý style theo từng component.

## 🛠 Hướng dẫn phát triển

1. Cài đặt thư viện: `npm install`
2. Chạy dự án: `npm run dev`
3. Xây dựng bản production: `npm run build`

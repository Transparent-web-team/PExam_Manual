// exam-taking.js - Bản gọn gàng, siêu nhẹ và bắt lỗi nộp bài

const questions = [
  { text: "Ngôn ngữ nào định dạng giao diện trang web?", options: ["HTML", "CSS", "JavaScript", "PHP"] },
  { text: "Thẻ HTML nào dùng để tạo liên kết?", options: ["&lt;a&gt;", "&lt;link&gt;", "&lt;p&gt;", "&lt;href&gt;"] },
  { text: "CSS là viết tắt của từ gì?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"] },
  { text: "Từ khóa nào khai báo biến trong JavaScript không thể thay đổi giá trị?", options: ["var", "let", "const", "static"] },
  { text: "Đâu là một Framework của JavaScript?", options: ["React", "Laravel", "Django", "Spring"] },
  { text: "Giao thức nào dùng để truyền tải dữ liệu trên web an toàn?", options: ["HTTP", "HTTPS", "FTP", "SMTP"] },
  { text: "Thẻ HTML nào dùng để chèn hình ảnh vào trang web?", options: ["<img>", "<image>", "<pic>", "<src>"] },
  { text: "Thuộc tính nào dùng để đổi màu chữ trong CSS?", options: ["color", "text-color", "bg-color", "font-color"] },
  { text: "Khung bố cục (Layout) phổ biến nhất hiện nay trong CSS là?", options: ["Table", "Float", "Flexbox & Grid", "Absolute Position"] },
  { text: "JavaScript có thể chạy trên môi trường nào?", options: ["Chỉ trình duyệt web", "Chỉ trình duyệt và Node.js", "Tất cả các môi trường hỗ trợ runtime", "Chỉ hệ điều hành Windows"] }
];

const optionLetters = ["A", "B", "C", "D"];
const userAnswers = new Array(questions.length).fill(null);
const markedQuestions = new Array(questions.length).fill(false); // Lưu trạng thái đánh dấu 

// 1. Render Toàn bộ câu hỏi
function renderQuestions() {
  const container = document.getElementById("questions-container");

  container.innerHTML = questions.map((q, qIdx) => `
    <article class="question-item" id="q-${qIdx}">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
         <div class="question-num" style="margin-bottom: 0;">Câu ${qIdx + 1}</div>
         <label style="cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: #ff9800;">
           <input type="checkbox" onchange="toggleMark(${qIdx})" ${markedQuestions[qIdx] ? 'checked' : ''} style="accent-color: #ff9800; width: 16px; height: 16px;">
           Đánh dấu xem lại
         </label>
      </div>
      <div class="question-text">${q.text}</div>
      <div class="options-list">
        ${q.options.map((opt, optIdx) => `
          <label class="option-label">
            <input type="radio" name="q-${qIdx}" value="${optIdx}" onchange="selectOption(${qIdx}, ${optIdx})">
            <span class="option-letter">${optionLetters[optIdx]}.</span>
            <span class="option-text">${opt}</span>
          </label>
        `).join('')}
      </div>
    </article>
  `).join('');
}

// 2. Chức năng chọn đáp án
window.selectOption = function (qIdx, optIdx) {
  userAnswers[qIdx] = optIdx;
  renderPalette(); // Cập nhật lại màu trên palette bên phải
};

// 2b. Chức năng đánh dấu câu hỏi
window.toggleMark = function (qIdx) {
  markedQuestions[qIdx] = !markedQuestions[qIdx];
  renderPalette();
};

// 3. Render khối palette bên phải
function renderPalette() {
  const grid = document.getElementById("palette-grid");
  const answeredCount = userAnswers.filter(a => a !== null).length;

  // Render các nút (Thêm class "marked" màu cam)
  grid.innerHTML = questions.map((_, idx) => `
    <button type="button" 
            class="palette-btn ${userAnswers[idx] !== null ? 'answered' : ''} ${markedQuestions[idx] ? 'marked' : ''}" 
            onclick="document.getElementById('q-${idx}').scrollIntoView({behavior: 'smooth'})">
      ${idx + 1}
    </button>
  `).join('');

  // Cập nhật số câu đã làm
  document.getElementById("answered-count").innerText = answeredCount;
}

// 4. Custom Modal Nộp Bài (Tránh lỗi trình duyệt chặn window.confirm)
const modal = document.getElementById("submit-modal");

function showSubmitModal() {
  const answeredCount = userAnswers.filter(a => a !== null).length;
  const msgEl = document.getElementById("modal-message");

  if (answeredCount < questions.length) {
    msgEl.innerHTML = `Bạn mới trả lời <strong style="color:#d0200d">${answeredCount}/${questions.length}</strong> câu hỏi.<br/>Bạn có chắc chắn muốn nộp bài sớm không?`;
  } else {
    msgEl.innerHTML = `Bạn đã hoàn thành tất cả câu hỏi.<br/>Xác nhận nộp bài?`;
  }

  modal.classList.remove("hidden");
}

// Bắt sự kiện cho nút nộp bài phần Header
document.getElementById("submit-btn").addEventListener("click", showSubmitModal);

// Nếu có nút trong bảng Palette thì bắt sự kiện
const paletteSubmit = document.getElementById("submit-btn-palette");
if (paletteSubmit) {
  paletteSubmit.addEventListener("click", showSubmitModal);
}

document.getElementById("cancel-submit").addEventListener("click", () => {
  modal.classList.add("hidden");
});

document.getElementById("confirm-submit").addEventListener("click", () => {
  const answeredCount = userAnswers.filter(a => a !== null).length;
  // Lưu kết quả giả lập
  localStorage.setItem("examResult", JSON.stringify({
    score: answeredCount,
    total: questions.length,
    answers: userAnswers
  }));

  // Chuyển trang
  window.location.href = "exam-result.html";
});

// 5. Đồng hồ đếm ngược
function startTimer(durationSeconds) {
  let timer = durationSeconds;
  const display = document.getElementById("countdown");

  const interval = setInterval(() => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    display.innerText = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    if (--timer < 0) {
      clearInterval(interval);
      // Hết giờ tự động click nộp bài
      document.getElementById("confirm-submit").click();
    }
  }, 1000);
}

// KHỞI CHẠY ỨNG DỤNG
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("total-count").innerText = questions.length;
  renderQuestions();
  renderPalette();
  startTimer(60 * 60); // 60 phút
});

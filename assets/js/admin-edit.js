// admin-edit.js

const mockQuestions = [
    { id: 1, text: "Ngôn ngữ nào định dạng giao diện trang web?", ans: "B" },
    { id: 2, text: "Thẻ HTML nào dùng để tạo liên kết?", ans: "A" },
    { id: 3, text: "CSS là viết tắt của từ gì?", ans: "A" }
];

document.addEventListener("DOMContentLoaded", () => {
    renderQuestions();
});

function renderQuestions() {
    const tbody = document.getElementById("question-list");
    document.getElementById("q-count").textContent = mockQuestions.length;
    tbody.innerHTML = "";

    mockQuestions.forEach((q, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
         <td>${idx + 1}</td>
         <td>${q.text}</td>
         <td><strong>${q.ans}</strong></td>
         <td class="action-links">
            <button class="btn-edit" onclick="editQuestion(${q.id})">Sửa</button>
            <button class="btn-del" onclick="delQuestion(${q.id})">Xóa</button>
         </td>
      `;
        tbody.appendChild(tr);
    });
}

function importExcel() {
    alert("Chức năng MOCK: Giả lập quá trình đọc file theo template Excel...");
    mockQuestions.push({
        id: Date.now(),
        text: "Câu hỏi import từ file Excel thành công #" + Math.floor(Math.random() * 100),
        ans: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)]
    });
    renderQuestions();
}

function addQuestion() {
    const title = prompt("Nhập nội dung câu hỏi trắc nghiệm mới:");
    if (title) {
        mockQuestions.push({
            id: Date.now(),
            text: title,
            ans: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)] // Giả lập chọn đáp án đúng ngẫu nhiên trong mockup
        });
        renderQuestions();
    }
}

function delQuestion(id) {
    if (confirm("Bạn có chắc chắn muốn xóa câu hỏi này khỏi đề thi?")) {
        const idx = mockQuestions.findIndex(q => q.id === id);
        if (idx > -1) mockQuestions.splice(idx, 1);
        renderQuestions();
    }
}

function editQuestion(id) {
    const q = mockQuestions.find(q => q.id === id);
    if (q) {
        const newText = prompt("Sửa nội dung câu hỏi:", q.text);
        if (newText) {
            q.text = newText;
            renderQuestions();
        }
    }
}

function saveExam() {
    alert("Đã lưu thông tin kỳ thi và danh sách câu hỏi thành công!");
}

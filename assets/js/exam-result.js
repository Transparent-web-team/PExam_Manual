// exam-result.js

const allQuestions = [
    { id: 1, text: "Ngôn ngữ nào định dạng giao diện trang web?", options: ["HTML", "CSS", "JavaScript", "PHP"], correct: 1 },
    { id: 2, text: "Thẻ HTML nào dùng để tạo liên kết?", options: ["<a>", "<link>", "<p>", "<href>"], correct: 0 },
    { id: 3, text: "CSS là viết tắt của từ gì?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correct: 0 },
    { id: 4, text: "Từ khóa nào khai báo biến trong JavaScript không thể thay đổi giá trị?", options: ["var", "let", "const", "static"], correct: 2 },
    { id: 5, text: "Đâu là một Framework của JavaScript?", options: ["React", "Laravel", "Django", "Spring"], correct: 0 },
    { id: 6, text: "Giao thức nào dùng để truyền tải dữ liệu trên web an toàn?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], correct: 1 },
    { id: 7, text: "Thẻ HTML nào dùng để chèn hình ảnh vào trang web?", options: ["<img>", "<image>", "<pic>", "<src>"], correct: 0 },
    { id: 8, text: "Thuộc tính nào dùng để đổi màu chữ trong CSS?", options: ["color", "text-color", "bg-color", "font-color"], correct: 0 },
    { id: 9, text: "Khung bố cục (Layout) phổ biến nhất hiện nay trong CSS là?", options: ["Table", "Float", "Flexbox & Grid", "Absolute Position"], correct: 2 },
    { id: 10, text: "JavaScript có thể chạy trên môi trường nào?", options: ["Chỉ trình duyệt web", "Chỉ trình duyệt và Node.js", "Tất cả các môi trường hỗ trợ runtime", "Chỉ hệ điều hành Windows"], correct: 2 }
];

let userAnswers = [];

document.addEventListener("DOMContentLoaded", () => {
    // Attempt to load from storage or use mock
    const resultData = JSON.parse(localStorage.getItem("examResult"));
    if (resultData && resultData.answers) {
        userAnswers = resultData.answers;
    } else {
        // Mock data
        userAnswers = [1, 2, 0, 2, null, 1, 0, null, 2, 0];
    }

    renderSummary();
    renderReviewCards();
    setupFilters();
});

function renderSummary() {
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    allQuestions.forEach((q, idx) => {
        const uAns = userAnswers[idx];
        if (uAns === null || uAns === undefined) {
            unansweredCount++;
        } else if (uAns === q.correct) {
            correctCount++;
        } else {
            wrongCount++;
        }
    });

    const total = allQuestions.length;
    document.getElementById("final-score").textContent = `${correctCount}/${total}`;
    document.getElementById("correct-count").textContent = correctCount;
    document.getElementById("wrong-count").textContent = wrongCount;
    document.getElementById("unanswered-count").textContent = unansweredCount;

    document.getElementById("filter-correct-count").textContent = correctCount;
    document.getElementById("filter-wrong-count").textContent = wrongCount;
    document.getElementById("filter-unanswered-count").textContent = unansweredCount;

    // Optional: add class to score circle based on grade
    const circle = document.querySelector(".score-circle");
    const ratio = correctCount / total;
    if (ratio < 0.5) {
        circle.classList.add("bad");
    } else if (ratio < 0.8) {
        circle.classList.add("medium");
    }
}

function renderReviewCards(filter = 'all') {
    const list = document.getElementById("review-list");
    list.innerHTML = "";

    allQuestions.forEach((q, idx) => {
        const uAns = userAnswers[idx];
        const isUnanswered = (uAns === null || uAns === undefined);
        const isCorrect = (!isUnanswered && uAns === q.correct);
        const isWrong = (!isUnanswered && uAns !== q.correct);

        // check filter
        if (filter === 'correct' && !isCorrect) return;
        if (filter === 'wrong' && !isWrong) return;
        if (filter === 'unanswered' && !isUnanswered) return;

        let statusClass = "status-unanswered";
        let badgeClass = "badge-unanswered";
        let badgeText = "Chưa làm";

        if (isCorrect) {
            statusClass = "status-correct";
            badgeClass = "badge-correct";
            badgeText = "Đúng";
        } else if (isWrong) {
            statusClass = "status-wrong";
            badgeClass = "badge-wrong";
            badgeText = "Sai";
        }

        const card = document.createElement("div");
        card.className = `review-card ${statusClass}`;

        const optionsHTML = q.options.map((opt, oIdx) => {
            let optClass = "review-option";
            if (oIdx === q.correct) {
                optClass += " is-correct";
            }
            if (!isUnanswered && oIdx === uAns && !isCorrect) {
                optClass += " is-wrong-ans"; // User chose this and it's wrong
            }

            const letters = ['A', 'B', 'C', 'D', 'E'];
            const markerClass = (oIdx === uAns) ? "option-marker option-chosen" : "option-marker";

            return `
                <div class="${optClass}">
                    <div class="${markerClass}">${letters[oIdx] || ''}</div>
                    <div class="opt-text">${opt}</div>
                </div>
            `;
        }).join("");

        card.innerHTML = `
            <div class="review-header">
                <div class="review-title">Câu ${idx + 1}</div>
                <div class="review-badge ${badgeClass}">${badgeText}</div>
            </div>
            <div class="review-question">${q.text}</div>
            <div class="review-options">
                ${optionsHTML}
            </div>
        `;
        list.appendChild(card);
    });
}

function setupFilters() {
    const btns = document.querySelectorAll(".btn-filter");
    btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            btns.forEach(b => b.classList.remove("active"));
            const target = e.currentTarget;
            target.classList.add("active");
            const filterType = target.getAttribute("data-filter");
            renderReviewCards(filterType);
        });
    });
}

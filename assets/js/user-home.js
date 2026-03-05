document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const typeFilter = document.getElementById("type-filter");
  const statusFilter = document.getElementById("status-filter");
  const cards = Array.from(document.querySelectorAll(".exam-card"));
  const resultText = document.querySelector(".filters-result-text");

  function applyFilters() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const typeValue = typeFilter.value;
    const statusValue = statusFilter.value;

    let visibleCount = 0;

    cards.forEach((card) => {
      const title = card
        .querySelector(".exam-title")
        .textContent.toLowerCase();
      const type = card.dataset.type;
      const status = card.dataset.status;

      const matchesSearch = title.includes(searchValue);
      const matchesType = typeValue === "all" || type === typeValue;
      const matchesStatus =
        statusValue === "all" ||
        status === statusValue ||
        (statusValue === "available" && status === "done");

      const shouldShow = matchesSearch && matchesType && matchesStatus;
      card.style.display = shouldShow ? "block" : "none";
      if (shouldShow) visibleCount += 1;
    });

    if (resultText) {
      resultText.textContent = `Tìm thấy ${visibleCount} kỳ thi`;
    }
  }

  if (searchInput && typeFilter && statusFilter) {
    searchInput.addEventListener("input", applyFilters);
    typeFilter.addEventListener("change", applyFilters);
    statusFilter.addEventListener("change", applyFilters);
    applyFilters();
  }
});


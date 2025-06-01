document.querySelector("#editBtn").addEventListener("click", edit);
document.querySelector("#deleteBtn").addEventListener("click", remove);
boardListTag.addEventListener("dblclick", showViewModal);

let currentViewIdx = -1;
let preventViewCount = false;

function showViewModal(event) {
    if (preventViewCount) {
        preventViewCount = false; // 플래그 초기화
        return;
    }

    const tr = event.target.closest("tr");

    if (!tr) return;

    const idx = Array.from(boardListTag.children).indexOf(tr);
    const list = JSON.parse(localStorage.getItem("LIST")) || [];
    const item = list[idx];

    if (!item) return;

    item.viewCount = (item.viewCount || 0) + 1;
    localStorage.setItem("LIST", JSON.stringify(list));

    document.querySelector("#viewTitle").innerHTML = item.title;
    document.querySelector("#viewWriter").innerHTML = item.writer;
    document.querySelector("#viewDate").innerHTML = item.date;
    document.querySelector("#viewCount").innerHTML = item.viewCount.toLocaleString();
    document.querySelector("#viewContent").innerHTML = item.content;

    const editBtn = document.querySelector("#editBtn");
    const deleteBtn = document.querySelector("#deleteBtn");
    const btns = document.querySelector(".viewModalBtns");

    if (item.serialNo && item.serialNo === userSerialNo) {
        editBtn.disabled = false;
        deleteBtn.disabled = false;
        btns.classList.remove("btn-disabled");
    } else {
        editBtn.disabled = true;
        deleteBtn.disabled = true;
        btns.classList.add("btn-disabled");
    }

    viewModal.style.display = "flex";
    currentViewIdx = idx;
};

function onCloseViewModal() {
    refreshList();
    viewModal.style.display = "none";
}

function edit() {
    if (currentViewIdx < 0) return;

    const list = JSON.parse(localStorage.getItem("LIST")) || [];
    const item = list[currentViewIdx];

    if (!item) return;

    isEditMode = true;
    document.querySelector("#title").value = item.title;
    document.querySelector("#content").value = item.content;
    document.querySelector(".editModal h2").textContent = "글 수정";

    editModal.style.display = "flex";
    viewModal.style.display = "none";
}

function remove() {
    if (currentViewIdx < 0) return;

    const list = JSON.parse(localStorage.getItem("LIST")) || [];
    const item = list[currentViewIdx];

    if (!item) return;

    if (confirm("정말로 삭제하시겠습니까?")) {
        list.splice(currentViewIdx, 1);
        localStorage.setItem("LIST", JSON.stringify(list));
        onCloseViewModal();
    }
}   
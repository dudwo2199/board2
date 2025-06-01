String.prototype.isEmpty = function () {
    return this.trim().length === 0;
}

Date.prototype.toDateString = function () {
    return this.getFullYear() + '-' + String(this.getMonth() + 1).padStart(2, '0') + '-' + String(this.getDate()).padStart(2, '0');
};

const params = new URLSearchParams(window.location.search);
const userSerialNo = params.get("userSerialNo");
const userNick = params.get("userNick");

const editModal = document.querySelector(".editModal");
const viewModal = document.querySelector(".viewModal");

const writer = document.querySelector("#writer");
const boardListTag = document.querySelector("#boardList");

let SEQ_BOARD = 1;
let isEditMode = false;

document.querySelector("#writeBtn").addEventListener("click", (e) => {
    isEditMode = false; // 작성 모드
    writer.innerHTML = `작성자: ${userNick}`;
    document.querySelector("#title").value = "";
    document.querySelector("#content").value = "";
    document.querySelector(".editModal h2").textContent = "글 작성";

    editModal.style.display = "flex";
});

document.querySelector("#logoutBtn").addEventListener("click", () => {
    if (confirm("로그아웃 하시겠습니까?")) {
        window.location.href = "../index.html";
    }
});

onload = () => {
    const h1Tag = document.querySelector('h1');

    console.log("userNick:", userNick);

    if (userNick) {
        h1Tag.innerHTML = `${userNick}님, 환영합니다!`;
    }

    refreshList();
};

function refreshList() {
    SEQ_BOARD = localStorage.getItem("SEQ_BOARD") || 1;
    const list = JSON.parse(localStorage.getItem("LIST")) || [];

    boardListTag.innerHTML = ""; // 기존 내용 초기화

    if (Array.isArray(list) && list.length > 0) {
        list.forEach((element, idx) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${element.No ?? idx + 1}</td>
                <td>${element.title}</td>
                <td>${element.writer}</td>
                <td>${element.date}</td>
                <td>${(element.viewCount ?? 0).toLocaleString()}</td>
            `;
            boardListTag.appendChild(tr);
        });
    }
};

window.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        if (editModal.style.display === "flex") {
            if (isEditMode) {
                preventViewCount = true;
            }
            onCloseEditModal();
            return;
        }

        if (viewModal.style.display === "flex") {
            onCloseViewModal();
        }
    }
});
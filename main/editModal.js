String.prototype.isEmpty = function () {
    return this.trim().length === 0;
}

function onCloseEditModal() {
    if (editModal) {
        editModal.style.display = "none";
        
        if (isEditMode) {
            // 수정 모드 취소 시 viewModal 다시 띄우기
            viewModal.style.display = "flex";
        }
    }
};

document.querySelector("#saveBtn").addEventListener("click", () => {
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();

    if (title.isEmpty()) {
        alert("제목을 입력해주세요.");
        return;
    }
    if (content.isEmpty()) {
        alert("내용을 입력해주세요.");
        return;
    }

    const list = JSON.parse(localStorage.getItem("LIST")) || [];

    if (isEditMode) {
        // 수정 모드
        const item = list[currentViewIdx];
        if (!item) return;

        item.title = title;
        item.content = content;
        alert("글이 수정되었습니다.");
    } else {
        SEQ_BOARD = localStorage.getItem("SEQ_BOARD") || 1;
        // 작성 모드
        const newItem = {
            No: SEQ_BOARD++,
            title: title,
            writer: userNick,
            date: new Date().toDateString(),
            viewCount: 0,
            content: content,
            serialNo: userSerialNo,
        };
        localStorage.setItem("SEQ_BOARD", SEQ_BOARD);
        list.push(newItem);
        alert("글이 작성되었습니다.");
    }

    localStorage.setItem("LIST", JSON.stringify(list));
    editModal.style.display = "none";
    refreshList();
});

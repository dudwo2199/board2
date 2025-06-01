const modal = document.querySelector(".joinModal");
const inputId = document.querySelector("#userId");
const inputPw = document.querySelector("#userPw");

function join() {
    modal.style.display = "flex";
}

window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

function onLogin() {
    const id = inputId.value;
    const pw = inputPw.value;

    if (id.isEmpty()) {
        alert("아이디를 입력해주세요.");
        inputId.value = "";
        inputId.focus();
        return false;
    }
    if (pw.isEmpty()) {
        alert("비밀번호를 입력해주세요.");
        inputPw.value = "";
        inputPw.focus();
        return false;
    }

    const userList = JSON.parse(localStorage.getItem("USERs")) || [];
    const user = userList.find(user => user.userId === id && user.userPw === pw);

    if (user) {
        alert(`환영합니다, ${user.userNick}님!`);
        const url = `main/main.html?userNick=${encodeURIComponent(user.userNick)}&userSerialNo=${user.serialNo}`;
        window.location.href = url;
    } else {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
}
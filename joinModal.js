String.prototype.isEmpty = function () {
    return this.trim().length === 0;
};

const userId = document.querySelector("#newUserId");
const userPw = document.querySelector("#newUserPw");
const userNick = document.querySelector("#userNick");

const idRegExp = /^[a-zA-Z0-9]{4,20}$/;
const pwRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
const nickRegExp = /^[a-zA-Z0-9가-힣]{2,10}$/;

function closeModal() {
    modal.style.display = "none";
}

function onRegister() {
    const id = userId.value;
    const pw = userPw.value;
    const nick = userNick.value;

    if (id.isEmpty()) {
        alert("아이디를 입력해주세요.");
        userId.focus();
        return false;
    }
    if (!idRegExp.test(id)) {
        alert("아이디는 4~20자의 영문 대소문자와 숫자만 사용할 수 있습니다.");
        userId.focus();
        return false;
    }
    if (pw.isEmpty()) {
        alert("비밀번호를 입력해주세요.");
        userPw.focus();
        return false;
    }
    if (!pwRegExp.test(pw)) {
        alert("비밀번호는 8~16자의 영문 대소문자와 숫자를 조합하여 사용해야 합니다.");
        userPw.focus();
        return false;
    }
    if (nick.isEmpty()) {
        alert("닉네임을 입력해주세요.");
        userNick.focus();
        return false;
    }
    if (!nickRegExp.test(nick)) {
        alert("닉네임은 2~10자의 영문 대소문자, 숫자, 한글을 사용할 수 있습니다.");
        userNick.focus();
        return false;
    }

    const data = {
        userId: id,
        userPw: pw,
        userNick: nick,
        serialNo: new Date().getTime()
    };

    const users = JSON.parse(localStorage.getItem("USERs")) || [];

    const duplicatedId = users.find(user => user.userId === id) !== undefined;
    if (duplicatedId) {
        alert("이미 사용 중인 아이디입니다.");
        userId.value = "";
        userId.focus();
        return false;
    }

    const duplicatedNick = users.find(user => user.userNick === nick) !== undefined;
    if (duplicatedNick) {
        alert("이미 사용 중인 닉네임입니다.");
        userNick.value = "";
        userNick.focus();
        return false;
    }

    users.push(data);
    localStorage.setItem("USERs", JSON.stringify(users));
    alert("회원가입이 완료되었습니다.");
    
    closeModal();
    return false;
}
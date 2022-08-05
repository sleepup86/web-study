// 내 pc에서 실행된 json-server 포트로 접근
const JSON_URL = "http://localhost:3000";

// 회원 등록 form 태그의 submit 이벤트리스너에 saveMember 함수 세팅
function initRegistPage() {
  const registForm = document.querySelector("form");
  registForm.addEventListener("submit", saveMember);
}

// submit 동작시 해당 함수 실행
function saveMember(e) {
  e.preventDefault();
  formData = new FormData(e.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  fetch(`${JSON_URL}/member`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"content-type": "application/json; charset=UTF-8"}
  })
  .then( (response) => response.json() )
  .then( (json) => console.log(json) );
  // location.href = "member.html";
  alert("정상 등록처리 되었습니다.");
}

// 회원목록 페이지 오픈시 해당 함수 실행
function getMemberList() {
  fetch(`${JSON_URL}/member`)
  .then( (response) => response.json() )
  .then( (json) => initMemberPage(json) );
}

let jsonArray;

// 회원목록 페이지가 로드되면 실행
function initMemberPage(json) {
  jsonArray = json;
  console.log(jsonArray)

  // 회원목록이 0건이면 회원등록 페이지로 이동
  if (jsonArray.length === 0) {
    alert("회원목록이 존재하지 않습니다.");
    location.href = "regist.html";
    return;
  }

  const container = document.querySelector(".container");

  // 조회된 회원목록 수만큼 반복해서 카드 생성 및 html작성
  jsonArray.forEach((jsonData) => {
    container.innerHTML += 
      `<div class="card">
        <div class="imgBx"><img src=images/${jsonData.avatar}></img></div>
        <h3>${jsonData.firstName}${jsonData.lastName}</h3>
        <h5>${jsonData.team}</h5>
      </div>`;
  });
}


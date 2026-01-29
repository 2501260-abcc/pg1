function displayDiary(){
    if(localStorage.getItem("diary") != undefined)
    {
        diary = JSON.parse(localStorage.getItem("diary"));
    }
    else
    {
        diary = [{title:"見本",date:"2006-06-03",weather:"雨",content:"見本"}];
    }
    let container = document.getElementById("diarylist");
    while(container.firstChild)
        container.removeChild(container.firstChild);
    for(let i = 0;i <= diary.length - 1;i++)
    {
        let head = document.createElement("h4");
        head.className = "heading";
        head.textContent = diary[i]["title"] + " " + diary[i]["date"] + " 天気：" + diary[i]["weather"];
        let content = document.createElement("p");
        content.className = "content";
        content.textContent = diary[i]["content"];
        let button = document.createElement("button");
        button.className = "button_delete";
        button.textContent = "日記を削除";
        button.setAttribute("onclick", "deleteDiary(this)");
        button.value = i;
        let card = document.createElement("div");
        card.className = "card";
        card.appendChild(head);
        card.appendChild(content);
        card.appendChild(button);
        container.appendChild(card);
        console.log(diary[i])
    }
    let count = document.createElement("p");
    count.textContent = "記録日記数：" + diary.length + "件";
    container.appendChild(count);
}
    

function addDiary(){
    let calendar = document.getElementById("date");
    if(calendar.value == "")
    {
        alert("日付が入力されていません");
        return;
    }
    let button = document.getElementsByName("weather");
    let name = document.getElementById("title");
    if(name.value == "")
    {
        alert("題名が入力されていません");
        return;
    }
    let textarea = document.getElementById("overview");
    if(textarea.value == "")
    {
        alert("内容が入力されていません");
        return;
    }
    let weather
    for(let i = 0;i <= button.length - 1;i++)
    {
        if(button[i].checked)
        {
            weather = button[i].value;
            break;
        }
    }
    let container = {"date":calendar.value,"weather":weather,"title":name.value,"content":textarea.value};
    diary.push(container);
    localStorage.setItem("diary",JSON.stringify(diary));
    displayDiary()
}

function deleteDiary(button){
    if(localStorage.getItem("diary") != undefined)
    {
        diary = JSON.parse(localStorage.getItem("diary"));
    }
    else
    {
        diary = [{title:"見本",date:"2006-06-03",weather:"雨",content:"見本"}];
    }
    diary.splice(button.value,1);
    localStorage.setItem("diary",JSON.stringify(diary));
    displayDiary()
}

let diary;
let now = new Date();
now.setDate(now.getDate());
let yyyy = now.getFullYear();
let mm = ("0" + (now.getMonth() + 1)).slice(-2);
let dd = ("0" + now.getDate()).slice(-2);
document.getElementById("date").value = yyyy + "-" + mm + "-" + dd;
displayDiary()
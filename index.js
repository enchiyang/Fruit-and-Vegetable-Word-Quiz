let qaStr= "花椰菜=broccoli, 洋蔥=onion, 南瓜=pumpkin,胡蘿蔔=carrot,高麗菜=cabbage";
      
let qa = qaStr.split(",");//將一個String對象分割成子字符串數組，以一個指定的分割字串來決定每個拆分的位置。 

// rand(n) 會產生 0 ~ (n-1) 其中一個整數
function rand(n) {
  return Math.floor(Math.random()*n)//Math.floor() 函式會回傳小於等於所給數字的最大整數。
                                    //Math.random() 會回傳一個偽隨機小數 (pseudo-random) 介於0到1之間(包含 0，不包含1) 
}

/*!! Math.floor(值):回傳比值大中，最接近的整數
這個方法可以回傳從0~1間(不包含0跟1)的隨機小數，
利用這個方法可以來取各種隨機值。*/

function selectQA() {/*隨機題目*/
  let g = qa.length;/*a=5*/
  let gg = rand(g);/*0 ~ (a-1) 其中一個整數*/
  return qa[gg];
}

function Q(s) {
   /* 若s是 "洋=on"
   * 按照 "=" 去切格子變成下面
   * 格子編號: | 0  | 1  | 
   * 格子內容: | 洋 | on |
   */
    return s.split("=")[0]; // 回傳編號0號格字內容: 洋 
  //}
}

function A(s) { 
  /* 若s是 "洋=on"
   * 按照 "=" 去切格子變成下面
   * 格子編號: | 0  | 1  | 
   * 格子內容: | 洋 | on |
   */
    return s.split("=")[1];  // 回傳編號1號格字內容: on
  //}
}

let question=null, answers=[], choice=null, q=null, msg=null;
let audioControlQ = null, audioControlA = null;
let correct=0, wrong=0, isChecked = false;
let total=0, button_stat=true;
let test_set = {}; //已經出現過的題目


function load() {
  question = document.getElementById("question");
 
 //陣列(選項)
  answers = [];
  answers[1]  = document.getElementById("answer1");
  answers[2]  = document.getElementById("answer2");
  answers[3]  = document.getElementById("answer3");
  answers[4]  = document.getElementById("answer4");

  choice = document.getElementById("choice");
  msg = document.getElementById("msg");
  isAudio = document.getElementById("isAudio");
  isSwap = document.getElementById("isSwap");
  quizData=document.getElementById('quiz');
}

//顯示所選單字選項
function chooseA(obj) {
  choice.innerHTML = obj.innerHTML;
}


function test() {
  button_stat=true;  //將按鈕狀態設成確定 
  document.getElementById("submit").value="確定";
  isChecked = false; //當選項被點擊時
  choice.innerHTML = "";//顯示選擇的答案，並在下題時在未選擇的時候變為初始狀態(空白)
  msg.innerHTML = "";
  
  
  //初步不複的題目
  for(;;) {
    q = selectQA();
    if (test_set[q] == "") continue; 
    else {
      test_set[q] = "";
      break; 
    } 
  }

  question.innerHTML = Q(q);
  answer = A(q);
  let set = {};
  set[q] = "";/*舉例q="花=br"是該題答案*/
  for (i=1; i<=4; ) {
    a = selectQA();
    answers[i].innerHTML = A(a);
    if (set[a] == "") continue; else i++;
    set[a] = "";/*讓錯誤答案不斷迴圈直到所有錯誤答案都進到選項，但應answers只有四個 */
  }
  answers[1+rand(4)].innerHTML = A(q);/* 所以要隨機選一個錯誤的答案 用真正答案(q)把該錯誤的答案取代
  *rand(n) 會產生 0 ~ (n-1) 其中一個整數 
  rand(n)=rand(4) 0~3其中一個整數
  但answers的編號只有1~4原本的0~3會出現錯誤
  所以要 1+rand(4)才會是1~4*/
}


function check() {
  if (isChecked) return (choice.innerHTML == A(q));  //當選項被點擊時顯示你的答案，答對才會跳下一題
  
  //檢查有沒有做選擇
  if (choice.innerHTML == "") {
    msg.innerHTML = "請作答";
    return false;
  }

  isChecked = true;
  if (choice.innerHTML == A(q)) {
    msg.innerHTML = "答對了！"+Q(q)+"="+A(q);
    correct ++;
  } else {
    msg.innerHTML = "答錯了！"+Q(q)+"="+A(q)+"喔!";
    wrong ++;
  }

  total++;
  button_stat = false;
  document.getElementById("submit").value="下一題";
  return (choice.innerHTML == A(q));
  //當選項被點擊時顯示你的答案，答對才會跳下一題
}


function pass() {

 if (button_stat) {
   check();
 } else {
   if(total<4) {
   test();
 } else {
   quizData.innerHTML=`<div class="box"></div>
 <h1 class="ss"> 你總共答對了${correct}題！</h1> <button onclick="location.reload()">Reload</button>
`}
 }

}

function loadQuiz(){
    noSelected();
    if (isChecked) return (choice.innerHTML == A(q));
    isChecked = true;
    if (choice.innerHTML == A(q)) {
    msg.innerHTML = "答對了！"+Q(q)+"="+A(q);
    correct ++;
    } else {
    msg.innerHTML = "答錯了！"+Q(q)+"="+A(q)+"喔!";
    wrong ++;
    }

    return (choice.innerHTML == A(q));
    
}



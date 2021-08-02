//ileride iyileştirmek için, notları silmedim.
//Ödev'e 13/07/2021 tarihinde başlandı
//Ödev'e 19/07/2021 2. kez başlandı
// örnek dosyadan alındı, close simgeleri eklenmesi yapılıyor
// her li elemanı içine html de verilmiş olan close adında close simgesi eklenir
// burada ilk 5 task html kaynak koddan getiriliyor
// ??bunun yerine localstorageden getirilmeli.
//****************************************************************** */

//19/07/2021 2. kez başlandı. T.AYDIN
//local storage için ders24-26 ya göre yürüyelim..
// json obje dizisi iki property den oluşacak, 
//task ve taskın clasına eklenen işaret bilgisi olacak
//her listeye bir id verildi, ileride değerlendirilmek üzere...
let idCounter = localStorage.getItem('idCounter') ? Number(localStorage.getItem('idCounter')) : 5
let taskInfo=[]

taskInfo=localStorage.getItem('taskInfo') ? JSON.parse(localStorage.getItem('taskInfo')) : []


/**local storage denemesi 1 19/07/2021 */

let list = document.querySelector("ul");

for(let i=0; i<taskInfo.length;i++){
  //taskInfo objeler dizisi 20/07/2021
  //taskInfo dan bir obje alıp, bunu bir liste child olarak ekleyeceğiz.
  let li=document.createElement("li"); 
  li.textContent=taskInfo[i]["task"];
  li.className=taskInfo[i]["isChecked"];
  li.id=taskInfo[i]["id"];
  list.appendChild(li);
  
//Input ile gelen veriyi "li" içerisine metin olarak giriyoruz.
 //appendChild ile oluşturduğumuz elementi "liste" isimli değişkenimizin içerisine ekliyoruz.

 
}


let taskList = document.getElementsByTagName("li");
for (let i = 0; i < taskList.length; i++) {
  let span = document.createElement("span");
  let txt = document.createTextNode("-Vazgeç?");
  span.className = "close";
  span.appendChild(txt);
  taskList[i].appendChild(span);
 
}

//******************************************************************** */

//örnek dosya incelendi, revize edildi, taskları gizlemek yerine silme işlemi test edildi.
let close = document.getElementsByClassName("close");
close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    let div = this.parentElement;
    // div.style.display = "none";
    console.log(div.id)
    //array içinde bir elemanı hole bırakmadan silme işlemi, stackoverflowdan bulundu
 var filtered = taskInfo.filter(function(el) { return el.id != div.id; }); 
taskInfo=filtered
div.remove()
};
}

//liste elemanına tıklandığında checked clası ile css fonksiyonları tetiklenir 
//tested calisiyor//
// bu blok çalışınca kendimle gurur duydum :)) 20/07/2021

list.addEventListener("click", TaskCheckedOrUnchecked)
function TaskCheckedOrUnchecked (task) {
    if (task.target.tagName == "LI") {
      task.target.classList.toggle("checked");
    }
    //  console.log(task.target.id)
    // console.log(taskInfo)
    for( let i in taskInfo){
      // console.log(taskInfo[i])
      for (let j in taskInfo[i]){
        if(task.target.id==taskInfo[i]["id"]){
          taskInfo[i]["isChecked"]="checked";
          break;
        }
      }

    }
    localStorage.setItem('taskInfo', JSON.stringify(taskInfo) );
  }
  
  // localStorage.setItem('taskInfo', JSON.stringify(taskInfo) );
//Ödev'e 13/07/2021 tarihinde başlandı T.AYDIN
// çok zor geldiği için, javascript dersleri tekrar edildi.
  //ekle yazısına tıklandığında bu fonksiyon çalışır 
function newElement(){
  idCounter++;
  localStorage.setItem('idCounter', idCounter)
  let task = document.querySelector("#task"); 
  // console.log("ekleye tıklandı if şartından önce")
  if(task.value!=""){
    $(".success").toast("show");
    // console.log("ekleye tıklandı if şartından sonra")
  // createElement ile yeni bir listItem (li) oluşturuyoruz
  let li=document.createElement("li"); 
    // Input ile gelen veriyi "li" içerisine metin olarak giriyoruz.
  li.textContent=task.value; 
  li.id=idCounter;
   // appendChild ile oluşturduğumuz elementi "liste" isimli değişkenimizin içerisine ekliyoruz.
  list.appendChild(li);
  /**local storage denemesi 1 19/07/2021 */

  
  let obj={};
  obj["task"]=task.value;
  obj["isChecked"]="";
  obj["id"]=li.id;
  taskInfo.push(obj);
 
  localStorage.setItem('taskInfo', JSON.stringify(taskInfo) );
  // Veri inputu içerisindeki metni siliyoruz.
  document.getElementById("task").value = "";
  // urun.value = "";

  //// örnek dosya incelendi, revize edilecek local storage revizyonu yapılacak**********
    let span = document.createElement("span");
    let txt = document.createTextNode("-Vazgeç?");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    //// örnek dosya incelendi, sil butonu ile gizleme yapılıyordu bunun yerine silinmesi saglandı
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement;
      // div.style.display = "none";
      var filtered = taskInfo.filter(function(el) { return el.id != div.id; }); 
      taskInfo=filtered
      div.remove()
    };
  }
//************************************************************************** */

} else{
  $(".error").toast("show");
}
}





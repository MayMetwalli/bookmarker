var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.getElementById("submitBtn");
var closeBtn = document.getElementById("close-btn");
var popup = document.getElementById("popup");
var popupContainer = document.getElementById("container");

if(localStorage.getItem("allBookmarks")){  
    allBookmarks=JSON.parse(localStorage.getItem("allBookmarks"));
    displayBookmark(allBookmarks) 
}else{
    allBookmarks=[]
}


function checkForDuplicate(){
var term=siteName.value;
for(i=0;i<allBookmarks.length;i++){
    if(allBookmarks[i].name.toLowerCase()===(term.toLowerCase())
    ){
     return true
    }
    return false
}
}

function addNewBookmark(){
    var isDuplicate = checkForDuplicate();
    checkForDuplicate()
    console.log(isDuplicate)
    if (!isDuplicate){

        var bookmark= {
            name: siteName.value,
            link: siteURL.value
        }
        allBookmarks.push(bookmark);
        console.log(allBookmarks);
        clearForm()
        displayBookmark()
        saveToLocalStorage()
        
    }
    

}

submitBtn.addEventListener('click',function(){
    if(siteName.classList.contains("is-invalid") || siteURL.classList.contains("is-invalid")){
        popupContainer.classList.remove("d-none");
        popup.classList.remove("d-none");
       
    }
    else{
        addNewBookmark()
        checkForDuplicate()
    }
})


function clearForm(){
    siteName.value = "";
    siteURL.value = "";
}

function displayBookmark(){
    var element= " ";

    for(i=0;i<allBookmarks.length;i++){
        element = element + 
        `         <tr>
                  <td>${i+1}</td>
                  <td>${allBookmarks[i].name}</td>
                  <td><a href="${allBookmarks[i].link}" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                  <td><button onclick=deleteBookmark(${i}) class="btn btn-danger "><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
                </tr>`
    }
    document.getElementById("table-body").innerHTML=element
}


function deleteBookmark(index){
    allBookmarks.splice(index,1);
    displayBookmark()
    saveToLocalStorage()

}


function saveToLocalStorage(){
    localStorage.setItem("allBookmarks",JSON.stringify(allBookmarks))
}



function checkInput() {
    var nameRegex = /^.{3,}$/;
  if (nameRegex.test(siteName.value)) {
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
  } else {
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
  }
}

siteName.addEventListener("input", checkInput)



function checkURL() {
    var siteRegex =  /^www\.[a-zA-Z0-9]{2,}$/;
  if (siteRegex.test(siteURL.value)) {
    siteURL.classList.remove("is-invalid");
    siteURL.classList.add("is-valid");
  } else {
    siteURL.classList.remove("is-valid");
    siteURL.classList.add("is-invalid");
  }
}

siteURL.addEventListener("input", checkURL)





function closePopup(){
    popup.classList.add("d-none");
    popupContainer.classList.add("d-none");
    
}
closeBtn.addEventListener("click", closePopup)

document.addEventListener('click', function(e){
    var clickedArea= e.target
    if (clickedArea == popupContainer){
        closePopup()
    }
})


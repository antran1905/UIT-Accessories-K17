function sendContact(){
    let email = document.getElementById("email").value;
    let name = document.getElementById("username").value;
    let phone = document.getElementById("phone").value;
    let content = document.getElementById("content").value;

    let validEmail = document.getElementById("email").validity.valid;
    let validName = document.getElementById("username").validity.valid;
    let validPhone = document.getElementById("phone").validity.valid;
    let validContent = document.getElementById("content").validity.valid;

    if(isNaN(validPhone)){
        validPhone = false
    }
    let contact = {
        email : email,
        name : name,
        phone : phone,
        content : content,
    }
    if(validEmail && validName && validContent && validPhone){
        axios.post(`${host}/post_contact`,contact).then(()=>{
            alert("Send contact success ! Thank you !")
            location.replace('./home.html')
        }).catch((error)=>{
            
        })
    } 
}
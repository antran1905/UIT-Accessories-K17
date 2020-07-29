function handleSubmit() {
    var name = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var confirmpw = document.getElementById('repassword').value;

    //console.log(confirmpw)


    //Kiểm tra input true hay false
    var validName = document.getElementById('username').validity.valid;
    var validEmail = document.getElementById('email').validity.valid;
    var validPassword = document.getElementById('password').validity.valid;
    var validPhone = document.getElementById('phone').validity.valid;
    var validAddress = document.getElementById('address').validity.valid;
    var validConfirmpw = document.getElementById('repassword').validity.valid;
    
    if(isNaN(phone))
        validPhone = false;
    if(password === confirmpw)
        validConfirmpw = true;
    else
        validConfirmpw = false;
    var register = {    
        name: name,
        email: email,
        password: password,
        phone : phone,
        address : address,
        role : 'khachhang',

    }
    if(validName && validEmail && validPassword && validPhone && validAddress && validConfirmpw){
        axios.post(`${host}/signup`, register)
        .then((result) => {
            //console.log(result.data.message);
            if (result.data.success) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sign Up Success!',
                    showConfirmButton: false,
                    timer: 1200
                })
                setTimeout(function(){
                    location.replace('./login.html#login');
                }, 1200)
                
            }
            else{
                Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Registration Failed!!!',
                text : 'Account already exists!',
                showConfirmButton: false,
                timer: 1200
            })
            }
        })
    }
    
}
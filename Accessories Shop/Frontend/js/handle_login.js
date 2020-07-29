function handleLogin() {     
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var idEmail  = document.getElementById('email').validity.valid;
    var idPass = document.getElementById('password').validity.valid;

    var login = {
        email: email,
        password: password
    };
    
    if(idEmail && idPass){
        axios.post(`${host}/login`, login).then((result) => {
        ////console.log(result.data.message.token);
        //console.log(result.data.success);
        if(result.data.success && result.data.message.user.role[0] === 'khachhang'){
            localStorage.setItem("token", result.data.message.token);
            var userInfo = {
                userEmail: result.data.message.user.email,
                userName: result.data.message.user.name,
                userAddress: result.data.message.user.address,
                userPhone: result.data.message.user.phone
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            
            setTimeout(function(){
                location.assign(document.referrer);
            }, 1200)
        }
        else{
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Login failed!',
                text : 'Wrong Email or Password !',
                showConfirmButton: false,
                timer: 2000
            })
        }
        
    });
    }
    

}
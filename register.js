
const firebaseConfig = {
    apiKey: "AIzaSyCQ_eHMDVAOGVVFf6Cm7WnZn65LIOLZK-I",
    authDomain: "demologin-8015f.firebaseapp.com",
    projectId: "demologin-8015f",
    storageBucket: "demologin-8015f.appspot.com",
    messagingSenderId: "770973797537",
    appId: "1:770973797537:web:43e5aff7c18e964f7534e0",
    measurementId: "G-GB2EWCFBD5"
  };


  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
  //Khởi tạo biến
const auth = firebase.auth()
const $ =document.querySelector.bind(document)
const $$ =document.querySelectorAll.bind(document)

const inputUsername = $('#username input')
const inputEmail = $('#email input')
const inputPassword = $('#password input')
const inputConfPassword = $('#confirmpassword input')

function register() {
    email = inputEmail.value
    username = inputUsername.value
    password = inputPassword.value
    confirmpass = inputConfPassword.value
    auth.createUserWithEmailAndPassword(email, password)
    
    // if(check_username(user_name)==false || check_email(email)==false){
    //     var user = auth.currentUser
    //     writePostUser('user1',user.uid,user,email,password)
    //     alert('User Created!!')
    // }      
}

writePostUser = function(PostName,idPost,user_name,email,password) {
    firebase.database().ref(PostName + idPost).set({
        user_name : user_name,
        email : email,
        password : password,
        last_login : Date.now()
    })
}
check_username = function(valueinput) {
    
    format = /^[A-Za-z0-9]+$/;
    if (valueinput.length ===0)
    {
        $('#username .conten-error').innerText ="Tên đăng nhập không được để trống" 
        return false;
    }
    else if(valueinput.length <3) {
        $('#username .conten-error').innerText ="Tên đăng nhập không được ít hơn 2 kí tự" 
        return false;
    }
    else if(format.test(valueinput)===false) {
        $('#username .conten-error').innerText = "Tên đăng nhập không chứa kí tự đặc biệt"
        return false;
    }
    else {
        $('#username .conten-error').innerText = ""
        return true
    }
}
check_email = function(valueinput) {

    expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (valueinput.length ===0)
    {
        $('#email .conten-error').innerText ="Email không được để trống" 
        return false;
    }
    if (expression.test(valueinput)===false)
    {
        $('#email .conten-error').innerText ="Email không đúng định dạng" 
        return false
    }
    else {
        $('#email .conten-error').innerText = ""
        return true
    }
}
//Mở thông báo khi ấn vào input mật khẩu
inputPassword.onfocus = function() {
    $('#message').style.display = "block";
  }
//đóng thông báo khi ấn ra bên ngoài input mật khẩu
inputPassword.onblur = function() {
    $('#message').style.display = "none";
}
// Khi người dùng bắt đầu nhập vào bên trong ô input mật khẩu
inputPassword.onkeyup = function() {
    letter = $("#message #letter");
    capital = $("#message #capital");
    number = $("#message #number");
    length = $("#message #length");
    myInput = inputPassword
    lowerCaseLetters = /[a-z]/g;
    // Xác thực các chữ cái viết thường
    if(myInput.value.match(lowerCaseLetters)) {  
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Xác thực chữ in hoa
    upperCaseLetters = /[A-Z]/g;
    if(myInput.value.match(upperCaseLetters)) {  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }
    // Xác thực chữ số
    numbers = /[0-9]/g;
    if(myInput.value.match(numbers)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }
    // Xác thực độ dài
    if(myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}
$('#confirmpassword input').onkeyup = function() {
    if(inputPassword.value !== $('#confirmpassword input').value ) {
        $('#confirmpassword .conten-error').innerText ="Mật khẩu không khớp" 
        return false
    }
    else {
        $('#confirmpassword .conten-error').innerText =""
    }
}
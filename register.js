const firebaseConfig = {
    apiKey: "AIzaSyBm7rrM_hAALUJ5Df-cXxSaceQwD7ws0lo",
    authDomain: "baocaocuoikitest.firebaseapp.com",
    databaseURL: "https://baocaocuoikitest-default-rtdb.firebaseio.com",
    projectId: "baocaocuoikitest",
    storageBucket: "baocaocuoikitest.appspot.com",
    messagingSenderId: "498648859175",
    appId: "1:498648859175:web:92ff5c6b0fb6e38e164402",
    measurementId: "G-Z678PC4M4D"
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
    username = inputUsername.value
    email = inputEmail.value
    password = inputPassword.value
    confirmpass = inputConfPassword.value
    auth.createUserWithEmailAndPassword(email, password)
    var user = auth.currentUser
    alert('User Created!!') 
    firebase.database().ref('user1' + user.uid).set({
        user_name : username,
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
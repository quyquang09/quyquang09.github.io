
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

const $ =document.querySelector.bind(document)
const $$ =document.querySelectorAll.bind(document)
var h1=0, h2 = 0,h3=0, h_set=null; // Giờ
var m1=0, m2 = 0,m3=0, m_set=null; // Phút
var s1=0, s2 = 0,s3=0;				// Giây
var d_h,d_m; 				
var timeoutLamp1,timeoutLamp2,timeoutLamp3 ;
const btn_Submit=$('.form-submit')
const btnLogin =$('.login-button a')
const btnClose = $('.close-icon')
const btnLoginForm = $('.form-submit')
const btnHide=$('.form-pass span')

const statustLamp1=$('.switch-toggle1')
const statustLamp2 =$('.switch-toggle2')
const statustLamp3 =$('.switch-toggle3')
//Điều hoà
const statustHarnomic1 = $('#statust-harnomic1')
const statustHarnomic2 = $('#statust-harnomic2')
const ChooseDewHr1 = $('#harnomic-bedroom .dew')
const ChooseColdHr1 = $('#harnomic-bedroom .cold')
const ChooseWindHr1 = $('#harnomic-bedroom .wind')
const ChooseDriedHr1 = $('#harnomic-bedroom .dried')
const togglePlusHr1 =$('#harnomic-bedroom .icon-plus')
const toggleMinusHr1 = $('#harnomic-bedroom .icon-minus')
// Quạt
const statusFan1 = $('#statust-Fan1')
const statusFan2 = $('#statust-Fan2')
const chooseturnFan1 = $('#Fan-bedroom .turn')
const choosedewFan1 = $('#Fan-bedroom .dew')
const choosedriedFan1 = $('#Fan-bedroom .driedFan')
const speedFan1 = document.getElementsByName("Fan1-speed")
var valueSpeedFan1="";
const toggleSetTimer =$('#save-timer')
const NavDevicce = $('#nav-device')
const toggleLamp =$('#toggle-lamp')
const toggleHarnomic =$('#toggle-harnomic')
const toggleFan = $('#toggle-fan')
const toggleTv = $('#toggle-tv')
const device = $$('#device')
var codes
var delayInMilliseconds = 1000; //1 second
let s=0,m=0,h=0
var updates ={}
const app = {
	//Trạng thái đèn
    isStartusLamp1:true,
	isStartusLamp2:true,
	isStartusLamp3:true,
	
	//Trạng thái điều hoà
	isStartusHarnomic1:false,
	isStartusHarnomic2:true,
	// Trang thai quat
	isStartusFan1:false,

	tempHarnomic: parseInt(document.getElementById('valueHanomic1').innerHTML)
	,
	//Xử lí sự kiện login
	handleEventLogin: function() {
		// Xử lí khi ấn login
        btnLogin.onclick =function(){
			$('#wapper-login').classList.add('open')
		 },
		 //xử lí khi close
		 btnClose.onclick = function() {
			 $('#wapper-login').classList.remove('open')
		 }
		 // Xử lí khi nhấn ẩn hiện mật khẩu
		 btnHide.onclick =function() {
			 if($('.form-pass input').type==="password"){
				 $('.fa-solid').classList.add('fa-eye')
				 $('.fa-solid').classList.remove('fa-eye-slash')
				 btnHide.lastChild.data= 'Show'
				 $('.form-pass input').type = 'text'
			 }else {
				 
				 $('.fa-solid').classList.remove('fa-eye')
				 $('.fa-solid').classList.add('fa-eye-slash')
				 btnHide.lastChild.data= 'Hide'
				 $('.form-pass input').type = 'password'  
			 }
			 
		 }
	},
	// Xử lí các sự kiện của đèn
	handleEventLamp: function() {
		//Xử lí sự kiện chọn thiết bị đèn
		toggleLamp.onclick = function() {
			NavDevicce.childNodes.forEach(element=>{
				if(element.className !=='undefined'){
					element.className =""
				}
			})
			device.forEach(element=>{
				if(element.className !=='undefined'){
					element.className ="close"
				}
			})
			toggleLamp.classList.add('active')
			device[0].classList.add('open')	
		},
		// Bắt sự kiện bật đèn phòng ngủ
        statustLamp1.addEventListener('click',function(){
            var firebaseRef = firebase.database().ref('isStatusLamp/').child('isStartusLamp1')
			
            if(app.isStartusLamp1){
                $('.device-lamp img').src="./acsset/img/denon.jfif"
                $('#lamp-bedroom .status').lastChild.data= 'Đang Bật'
                app.isStartusLamp1 =false
				firebaseRef.set("Lamp1on");
				app.startTimeLamp1()
            }
            else {
				$('.device-lamp img').src="./acsset/img/denof.png"
                $('#lamp-bedroom  span').lastChild.data= 'Đang Tắt'
				app.stopTimeLamp1();
                app.isStartusLamp1 =true
				firebaseRef.set("Lamp1off");
            }
        }),
		// Bắt sự kiện bật đèn phòng khách
		statustLamp2.addEventListener('click',function(){
            var firebaseRef = firebase.database().ref('isStatusLamp/').child('isStartusLamp2')

            if(app.isStartusLamp2){
                app.startTimeLamp2()
                $('#lamp-guestRoom span').lastChild.data= 'Đang Bật'
                app.isStartusLamp2 =false
				firebaseRef.set("Lamp2on");
            }
            else {
				app.stopTimeLamp2();
                $('#lamp-guestRoom span').lastChild.data= 'Đang Tắt'
                app.isStartusLamp2 =true
				firebaseRef.set("Lamp2off");
            }
        }),
		//Bắt sự kiện bật tắt đèn phòng bếp
		statustLamp3.addEventListener('click',function(){
            var firebaseRef = firebase.database().ref('isStatusLamp/').child('isStartusLamp3')
            if(app.isStartusLamp3){
                app.startTimeLamp3()
                $('#Lamp-kitchen span').lastChild.data= 'Đang Bật'
                app.isStartusLamp3 =false
				firebaseRef.set("Lamp3on");
            }
            else {
                app.stopTimeLamp3()
                $('#Lamp-kitchen span').lastChild.data= 'Đang Tắt'
                app.isStartusLamp3 =true
				firebaseRef.set("Lamp3off");
            }
        })
	},
	// Xử lí các sự kiện của điều hoà
	handleEventHarnomic: function() {
		//Xử lí sự kiện chọn thiết bị điều hoà
		toggleHarnomic.onclick = function() {
			
			NavDevicce.childNodes.forEach(element=>{
				if(element.className !=='undefined'){
					element.className =""
				}
			})
			device.forEach(element=>{
				if(element.className !=='undefined'){
					element.className ="close"
				}
			})
			toggleHarnomic.classList.add('active')
			device[1].classList.add('open')
		},
		// xử lí khi bật điều hoà phòng ngủ
		statustHarnomic1.addEventListener('click',function(){
            if(app.isStartusHarnomic1===false){
                app.isStartusHarnomic1 =true
				app.writePostHarnomic('Harnomic1/',1,'On','Off','Off','Off','Off')
				
            }
            else {
                app.isStartusHarnomic1 =false
				app.writePostHarnomic('Harnomic1/',1,'Off','Off','Off','Off','Off')
				$$('#harnomic-bedroom .active-btn').forEach(element =>{
					element.classList.remove('active-btn')
				})
            }
        }),
		// xử lí khi bật điều hoà phòng khách
		statustHarnomic2.addEventListener('click',function(){
            var firebaseRef = firebase.database().ref('isStatusHarnomic/').child('Harnomic2')
            if(app.isStartusHarnomic2){
                app.isStartusHarnomic2 =false
				firebaseRef.set("On");
            }
            else {
                app.isStartusHarnomic2 =true
				firebaseRef.set("Off");
				
            }
        }),
		//Xử lí sự kiện bật tạo độ ẩm
		isChosseDew =true,
		ChooseDewHr1.onclick =function() {
			var updates ={}
			if(app.isStartusHarnomic1){
				if(isChosseDew ){	
					updates['Harnomic1/1/' + 'dew'] = 'On';
					firebase.database().ref().update(updates);
					isChosseDew =false;
					$('#harnomic-bedroom .dew .icon-btn').classList.toggle('active-btn')
				}
				else if(isChosseDew===false ) {
					updates['Harnomic1/1/' + 'dew'] = 'Off';
					firebase.database().ref().update(updates);
					isChosseDew =true;
					$('#harnomic-bedroom .dew .icon-btn').classList.toggle('active-btn')
				}
			}
			else {
				alert('Vui lòng bật thiết bị trước !')
			}
		},
		//xử lí sự kiện bật làm lạnh nhanh
		isChosseCold =true,
		ChooseColdHr1.onclick =function() {
			var updates ={}
			if(app.isStartusHarnomic1){
				if(isChosseCold){	
					updates['Harnomic1/1/' + 'cold'] = 'On';
					firebase.database().ref().update(updates);
					isChosseCold =false;
					$('#harnomic-bedroom .cold .icon-btn').classList.toggle('active-btn')
				}
				else {
					updates['Harnomic1/1/' + 'cold'] = 'Off';
					firebase.database().ref().update(updates);
					isChosseCold =true;
					$('#harnomic-bedroom .cold .icon-btn').classList.toggle('active-btn')
				}
			}
			else {
				alert('Vui lòng bật thiết bị trước !')
			}
		}
		//Xử lí sự kiện bật nút quạt
		isChosseWind =true,
		ChooseWindHr1.onclick =function() {
			var updates ={}
			if(app.isStartusHarnomic1){
				if(isChosseWind){	
					updates['Harnomic1/1/' + 'wind'] = 'On';
					firebase.database().ref().update(updates);
					isChosseWind =false;
					$('#harnomic-bedroom .wind .icon-btn').classList.toggle('active-btn')
				}
				else {
					updates['Harnomic1/1/' + 'wind'] = 'Off';
					firebase.database().ref().update(updates);
					isChosseWind =true;
					$('#harnomic-bedroom .wind .icon-btn').classList.toggle('active-btn')
				}
			}
			else {
				alert('Vui lòng bật thiết bị trước !')
			}
		}
		//Xử lí sự kiện bật nút Sưởi
		isChosseDried =true,
		ChooseDriedHr1.onclick =function() {
			var updates ={}
			if(app.isStartusHarnomic1){
				if(isChosseDried){	
					updates['Harnomic1/1/' + 'dried'] = 'On';
					firebase.database().ref().update(updates);
					isChosseDried =false;
					$('#harnomic-bedroom .dried .icon-btn').classList.toggle('active-btn')
				}
				else {
					updates['Harnomic1/1/' + 'dried'] = 'Off';
					firebase.database().ref().update(updates);
					isChosseDried =true;
					$('#harnomic-bedroom .dried .icon-btn').classList.toggle('active-btn')
				}
			}
			else {
				alert('Vui lòng bật thiết bị trước !')
			}
		}
		//Xử lí sự kiện bật nút Tăng nhiệt độ
		togglePlusHr1.onclick = function() {
			if(app.tempHarnomic!==32){
				app.tempHarnomic++;
				app.settemperatureHarnomic();
			}
			else {
				app.tempHarnomic =app.tempHarnomic
			}
		}
		//Xử lí sự kiện bật nút Tăng nhiệt độ 
		toggleMinusHr1.onclick = function() {
			if(app.tempHarnomic>10){
				app.tempHarnomic--;
				app.settemperatureHarnomic();
			}
			else {
				app.tempHarnomic =app.tempHarnomic
			}
		}
	},
	// Xử lí các sự kiện của quạt
	handleEventFan: function() {
		//Xử lí sự kiện chọn thiết bị quạt
		toggleFan.onclick = function() {
			
			NavDevicce.childNodes.forEach(element=>{
				if(element.className !=='undefined'){
					element.className =""
				}
			})
			device.forEach(element=>{
				if(element.className !=='undefined'){
					element.className ="close"
				}
			})
			toggleFan.classList.add('active')
			device[2].classList.add('open')
		}
		//Xử lí khi ấn bật quạt
		statusFan1.addEventListener('click',function(){
			var updates ={}
			app.getValueSpeedFan1();
			if(app.isStartusFan1===false){
					app.isStartusFan1 =true
					app.writePostFan('Fan-bedroom/',1,'On','Off','Off','Off',valueSpeedFan1)
			}
			else {
				app.isStartusFan1 =false
				app.writePostFan('Fan-bedroom/',1,'Off','Off','Off','Off','0')
				$$('#Fan-bedroom .active-btn').forEach(element =>{
					element.classList.remove('active-btn')
				})
			}
        })
		// Xử lí sự kiện ấn xoay quạt
		isChosseTurnFan1 =false,
		chooseturnFan1.onclick = function() {
			var updates ={}
			if(app.isStartusFan1){
				if(isChosseTurnFan1===false){	
					updates['Fan-bedroom/1/' + 'turn'] = 'On';
					firebase.database().ref().update(updates);
					isChosseTurnFan1 =true;
					$('#Fan-bedroom .turn .icon-btn').classList.toggle('active-btn')
				}
				else {
					updates['Fan-bedroom/1/' + 'turn'] = 'Off';
					firebase.database().ref().update(updates);
					isChosseTurnFan1 =false;
					$('#Fan-bedroom .turn .icon-btn').classList.toggle('active-btn')
				}
			}
			else {
				alert('Vui lòng bật thiết bị trước !')
			}
		}

		//Xử lí khi ấn nút phun sương
		ischossedewFan1 =false,
		choosedewFan1.onclick = function() {
			var updates ={}
			if(app.isStartusFan1){
				if(ischossedewFan1===false){	
					updates['Fan-bedroom/1/' + 'dew'] = 'On';
					firebase.database().ref().update(updates);
					ischossedewFan1 =true;
					$('#Fan-bedroom .dew .icon-btn').classList.toggle('active-btn')
				}
				else {
					updates['Fan-bedroom/1/' + 'dew'] = 'Off';
					firebase.database().ref().update(updates);
					ischossedewFan1 =false;
					$('#Fan-bedroom .dew .icon-btn').classList.toggle('active-btn')
				}
			}
			else {
				alert('Vui lòng bật thiết bị trước !')
			}
		}
		//Xử lí sự kiện bật nút sưởi
		isChosseDriedFan1 =false,
		choosedriedFan1.onclick = function() {
			var updates ={}
			console.log('a')
			if(app.isStartusFan1){
				if(isChosseDriedFan1===false){	
					updates['Fan-bedroom/1/' + 'dried'] = 'On';
					firebase.database().ref().update(updates);
					isChosseDriedFan1 =true;
					$('#Fan-bedroom .driedFan .icon-btn').classList.toggle('active-btn')
				}
				else {
					updates['Fan-bedroom/1/' + 'dried'] = 'Off';
					firebase.database().ref().update(updates);
					isChosseDriedFan1 =false;
					$('#Fan-bedroom .driedFan .icon-btn').classList.toggle('active-btn')
				}
			}
			else {
				alert('Vui lòng bật thiết bị trước !')
			}
		}
		// Chọn tốc độ quạt 
			

	},
	handleEventTivi: function() {
		//Xử lí sự kiện chọn thiết bị Tivi
		toggleTv.onclick = function() {
			
			NavDevicce.childNodes.forEach(element=>{
				if(element.className !=='undefined'){
					element.className =""
				}
			})
			device.forEach(element=>{
				if(element.className !=='undefined'){
					element.className ="close"
				}
			})
			toggleTv.classList.add('active')
			device[3].classList.add('open')
		}
	},
    handleEventSetTime: function() {
		//Bắt sự kiện đặt giờ
		toggleSetTimer.onclick =function() {
			h_set = parseInt($('.timer-val input:first-child').value);
			m_set = parseInt($('.timer-val input:nth-child(2)').value);
		}

    },
    startTimeLamp1: function() {
		if (s1 === 59){
			m1 += 1;
			s1 = 0;
		}
		if (m1 === 59){
			h1 += 1;
			m1 = 0;
		}
		/* HIỂN THỊ ĐỒNG HỒ*/
		document.getElementById('displayTime1').innerHTML = (h1 < 10 ? '0'+ h1 : h1) + ":" + (m1 < 10 ?  '0'+m1 : m1)  + ":" + (s1 < 10 ?  '0'+ s1 : s1);
		timeoutLamp1 = setTimeout(function(){
			s1++;
			app.startTimeLamp1()
		}, 1000);
	},
	stopTimeLamp1:function(){
		clearTimeout(timeoutLamp1)
	},
	startTimeLamp2: function() {
		if (s2 === 59){
			m2 += 1;
			s2 = 0;
		}
		if (m2 === 59){
			h2 += 1;
			m2 = 0;
		}
		/* HIỂN THỊ ĐỒNG HỒ*/
		document.getElementById('displayTime2').innerHTML = (h2 < 10 ? '0'+ h2 : h2) + ":" + (m2 < 10 ?  '0'+m2 : m2)  + ":" + (s2 < 10 ?  '0'+ s2 : s2);
		timeoutLamp2 = setTimeout(function(){
			s2++;
			app.startTimeLamp2()
		}, 1000);
		
	},
	stopTimeLamp2:function(){
		clearTimeout(timeoutLamp2)
	},
	startTimeLamp3: function() {
		
		;
		if (s3 === 59){
			m3 += 1;
			s3 = 0;
		}
		if (m3 === 59){
			h3 += 1;
			m3 = 0;
		}
		/* HIỂN THỊ ĐỒNG HỒ*/
		document.getElementById('displayTime3').innerHTML = (h3 < 10 ? '0'+ h3 : h3) + ":" + (m3 < 10 ?  '0'+m3 : m3)  + ":" + (s3 < 10 ?  '0'+ s3 : s3);

		timeoutLamp3 = setTimeout(function(){
			s3++;
			app.startTimeLamp3()
		}, 1000);
		
	},
	stopTimeLamp3:function(){
		clearTimeout(timeoutLamp3)
	},
	writePostHarnomic: function(PostName,idPost,status,dew,wind,cold,dried) {
		firebase.database().ref(PostName + idPost).set({
			status : status,
			dew : dew,
			wind: wind,
			cold: cold,
			dried: dried 
		})
	},
	writePostFan: function(PostName,idPost,status,turn,dew,dried,speed) {
		firebase.database().ref(PostName + idPost).set({
			status : status,
			turn : turn,
			dew: dew,
			dried: dried,
			speed: speed 
		})
	}
	,
	settemperatureHarnomic:function() {
			$('.control-temp .progress-bar').style.width = 3.125 *app.tempHarnomic +'%';
			document.getElementById('valueHanomic1').innerHTML = app.tempHarnomic +''
			if(app.tempHarnomic <=17) {
				$('.control-temp .progress-bar').style.background = '#26c248'
			}
			if(app.tempHarnomic >17 && app.tempHarnomic <=21) {
				$('.control-temp .progress-bar').style.background = '#a0c226'
			}
			else if(app.tempHarnomic >21 && app.tempHarnomic <=26) {
				$('.control-temp .progress-bar').style.background = '#ece13a'
			}
			else if(app.tempHarnomic >26 && app.tempHarnomic <=32) {
				$('.control-temp .progress-bar').style.background = '#e23517'
			}
	},
	getRealTime: function() {
			
			d_h=+new Date().getHours();
			d_m=+new Date().getMinutes();
			if(h_set==d_h &&m_set==d_m) {
					statustLamp1.click();
					app.isgetTime=false;
			}	
			
		time = setTimeout(function(){
			app.getRealTime()
		}, 60000);
	},
	getValueSpeedFan1: function() {
		speedFan1.forEach(element=>{
			if(element.checked===true)
			{	
				valueSpeedFan1= element.value;
			}
			else {
				valueSpeedFan1 ="0"
			}
		})
	},
    Start: function() {
        this.handleEventLogin();
		this.handleEventLamp();
		this.handleEventHarnomic();
		this.handleEventFan();
		this.handleEventTivi();
		this.handleEventSetTime();
        this.getRealTime();
		
    }
}
app.Start();

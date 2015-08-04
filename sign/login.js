window.onload = function (){
	var sign = document.getElementById("sign");
	var close = document.getElementById("close");
	var signUp = document.getElementById("signUp");
	var aInput = sign.getElementsByTagName("input");
	var userName = aInput[0];
	var pwd = aInput[1];
	var pwd2 = aInput[2];
	var aP = document.getElementsByTagName("p");
	var name_msg = aP[0];
	var pwd_msg = aP[1];
	var pwd2_msg =aP[2];
	var count = document.getElementById("count");
	var aEm = document.getElementsByTagName("em");
	var name_length = 0;

	//界面的出现于隐藏
		signUp.onclick = function() {
			sign.style.display = "block";
		}
		close.onclick = function() {
			sign.style.display = "none";
		}
	
	//用户名验证
	
	userName.onfocus = function(){
		name_msg.style.display = "block";
	}

	userName.onkeyup = function(){
		count.style.display = "block";
		name_length = getLenght(this.value);
		count.innerHTML = name_length + "个字符";
		if (name_length == 0) {
			count.style.display = "none";
		};
	}

	userName.onblur =function(){
		//含有非法字符
		var re = /[^\w\u4e00-\u9fa5]/g;
		if (re.test(this.value)) {
			name_msg.innerHTML = "含有非法字符";
			name_msg.style.color = "red";
		}
		// 不能为空
		else if(this.value == ""){
			name_msg.innerHTML = "不能为空";
			name_msg.style.color = "red";
		}
		//长度判断
		else if (name_length>25) {
			name_msg.innerHTML = "长度超过25个字符";
			name_msg.style.color = "red";
		}
		else if (name_length<5) {
			name_msg.innerHTML = "长度少于6个字符";
			name_msg.style.color = "red";
		}
		//OK
		else{
			name_msg.innerHTML = "OK";
			name_msg.style.color = "green";
		}


	}


	//密码输入的验证
	pwd.onfocus = function(){
		pwd_msg.style.display = "block";
	}

	pwd.onkeyup = function(){
		if (this.value.length > 0) {
			aEm[0].className = "active";
			pwd2_msg.style.display = "block";
		} else{
			aEm[0].className = "";
			pwd2_msg.style.display = "none";
		} 

		//大于5个为中
		if (this.value.length > 5) {
			aEm[1].className = "active";
			pwd2_msg.style.display = "block";
		} else{
			aEm[1].className = "";
		} 
	 	//大于10个为强
	 	if (this.value.length > 10) {
			aEm[2].className = "active";
			pwd2_msg.style.display = "block";
		} else{
			aEm[2].className = "";
		} 
	}

	pwd.onblur = function(){
		var m = sameStr(pwd.value,pwd.value[0]);
		var re_n = /[^\d]/g;
		var re_t = /[^\a-zA-Z]/g;
		//不能为空
		if(this.value == ""){
			pwd_msg.innerHTML = "不能为空";
			pwd_msg.style.color = "red";
		}
		//不能用相同字符
		else if (m == pwd.value.length) {
			pwd_msg.innerHTML = "不能用相同字符";
			pwd_msg.style.color = "red";
		}
		// 长度判断
		else if (this.value.length>16) {
			pwd_msg.innerHTML = "长度超过16个字符";
			pwd_msg.style.color = "red";

		}
		else if (this.value.length<6) {
			pwd_msg.innerHTML = "长度少于6个字符";
			pwd_msg.style.color = "red";

		}
		// 不能全为数字
		else if (!re_n.test(this.value)){
			pwd_msg.innerHTML = "不能全为数字";
			pwd_msg.style.color = "red";
		}
		// 不能全为字母
		else if (!re_t.test(this.value)){
			pwd_msg.innerHTML = "不能全为字母";
			pwd_msg.style.color = "red";
		}

		// ok
		else {
			pwd_msg.innerHTML = "OK";
			pwd_msg.style.color = "green";
		}

	}


	//确认密码
	pwd2.onblur = function(){
		if (this.value != pwd.value) {
			pwd2_msg.innerHTML = "两次输入不一致";
			pwd2_msg.style.color = "red";
		}else {
			pwd2_msg.innerHTML = "OK";
			pwd2_msg.style.color = "green";
		}
	}




	function getLenght(str){
		return str.replace(/[^\x00,-xff]/g,"xx").length;
	}

	function sameStr(str,n){
		var tmp = 0;
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i)  == n) {
				tmp++;
			}
		}
		return tmp;
	}

}
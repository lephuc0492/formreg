for(let i = 0; i < $("label").length; i++)
{
var label = $("label")[i].innerText
label = label.replace(":","")
id = $("input")[i].name;
$($("input")[i]).attr("id",id)
$($("input")[i]).attr("placeholder",label)
//$($("input")[i]).attr("required","required")		//validate của html5
//neu dung validate bằng javascripts rồi thì bỏ cái này đi vậy
}
///reg https://viblo.asia/p/bieu-thuc-chinh-quy-regex-trong-javascript-QpmleQ9mlrd
var inValid = false;
////////////function phù hợp với kiểu table form
function check_Text(selector)
{
	var inputValue = selector + " input";
	var inputAppend = selector + " span";
if ($(inputValue).val().match(/[a-zA-Z]/) == null || !$(inputValue).val().match(/[0-9]/) == false || !$(inputValue).val().match(/[\.\,\/\'\;\[\]\-\=\!\@\$\%\^\&\*\(\)\+\_]/) == false) 
//Không có giá trị nào trong cái inputVALUE có chứa số là sai (Tức là có giá trị trong cái inputValue kia có chứa số)
// dùng hàm match để check xem có ký tự khác ngoài chữ
// trong đó ko, \w = a-zA-Z_0-9 (chữ)
{
$(inputValue).next().text("Trường thông tin chỉ chấp nhận chữ - có 1 số hoặc ký tự đặc biệt cũng không được! ok?")
$(inputAppend).css("color","red")
$(inputAppend).css("font-style","italic")
//return inValid;
}
else
{
	inValid = true;
	$(inputAppend).remove();
//return inValid;
}
}
////////////Check xem có bỏ trống không
function check_trim(selector)
{
	var inputValue = selector + " input";
	var inputAppend = selector + " span";
	if ($(inputValue).val().trim().length >= 1) 
	{
	inValid = true;
	$(inputAppend).remove();
	return inValid;		
	}
	else
	{
	$(inputValue).next().text("Trường thông tin không được bỏ trống!")
	$(inputAppend).css("color","red")
	$(inputAppend).css("font-style","italic")
	return inValid;		
	}	
}
////////////////Check loại bỏ ký tự đặc biệt
function check_Special(selector)
{
	var inputValue = selector + " input";
	var inputAppend = selector + " span";
	var z = /[\.\,\/\'\;\[\]\-\=\!\@\$\%\^\&\*\(\)\+\_]/.test($(inputValue).val());
	if (z == true) 
	{
	$(inputValue).next().text("Trường thông tin tồn tại giá trị đặc biệt")
	$(inputAppend).css("color","red")
	$(inputAppend).css("font-style","italic")
	return false;
	}

	else
	{
	inValid = true;
	$(inputAppend).remove();
		return inValid;			
	}

}
////////////////////////////Check xem đúng kiểu ngày tháng năm không
/////https://kipalog.com/posts/30-doan-bieu-thuc-chinh-quy-ma-lap-trinh-vien-web-nen-biet
var d = new Date();
function check_Date(selector)
{
	var inputValue = selector + " input";
	var inputAppend = selector + " span";
	var haisodau = $(inputValue).val().slice(0,2);
	var giatri23 = $(inputValue).val().slice(2,3);
	var thang = $(inputValue).val().slice(3,5);
	var giatri67 = $(inputValue).val().slice(5,6);
	var nam = $(inputValue).val().slice(6,10)
	if (Number(haisodau) <= 31 && giatri23 == "/" && Number(thang) <= 12 && giatri67 == "/" && nam <= d.getFullYear()) 
	{
	inValid = true;
	$(inputAppend).remove();
	return inValid;			
	}
	else
	{
$(inputValue).next().text("Ngày tháng năm điền theo định dạng dd/mm/yyyy")
$(inputAppend).css("color","red")
$(inputAppend).css("font-style","italic")
return inValid;		
	}
}
///////////////////////Check email
{
	function check_Email(selector)
	{
	var inputValue = selector + " input";
	var inputAppend = selector + " span";
	if (/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm.test($(inputValue).val()) == true) //cái này mượn google cái regex
	{
	inValid = true;
	$(inputAppend).remove();
	return inValid;	
	}
	else
	{
$(inputValue).next().text("Không đúng định dạng email")
$(inputAppend).css("color","red")
$(inputAppend).css("font-style","italic")
return inValid;			
	}
	}
}
//////////////////////Check số điện thoại
function check_Sdt(selector)
{
	var inputValue = selector + " input";
	var inputAppend = selector + " span";
	if ($(inputValue).val().trim().length != 10 || /[a-zA-Z]/.test($(inputValue).val()) == true || check_Special(selector) == false)
	{
$(inputValue).next().text("Không đúng định dạng số điện thoại (Gồm 10 số)")
$(inputAppend).css("color","red")
$(inputAppend).css("font-style","italic")
return inValid;			
	}	
	else	
	{
	inValid = true;
	$(inputAppend).remove();
	return inValid;			
	}
}
////////////////////////Check mật khẩu
function check_Pass(selector)
{
	var inputValue = selector + " input";
	var inputAppend = selector + " span";
	if ($(inputValue).val().trim().length >=6 && $(inputValue).val().trim().length <= 10 && /[0-9]/.test($(inputValue).val()) == true && /[\.\,\/\'\;\[\]\-\=\!\@\$\%\^\&\*\(\)\+\_]/.test($(inputValue).val()) == true) 
	{
	inValid = true;
	$(inputAppend).remove();
	return inValid;			
	}	
	else
	{
$(inputValue).next().text("Mật khẩu gồm 6 - 10 ký tự, phải có ít nhất 1 số và 1 ký tự đặc biệt")
$(inputAppend).css("color","red")
$(inputAppend).css("font-style","italic")
return inValid;			
	}
}
////////////////Submit form validate
var hoten = "body > form > table > tbody > tr:nth-child(1) > td:nth-child(2)"
var ngaysinh = "body > form > table > tbody > tr:nth-child(2) > td:nth-child(2)"
var gioitinh = "body > form > table > tbody > tr:nth-child(3) > td:nth-child(2)"
var diachi = "body > form > table > tbody > tr:nth-child(4) > td:nth-child(2)"
var email = "body > form > table > tbody > tr:nth-child(5) > td:nth-child(2)"
var dienthoai = "body > form > table > tbody > tr:nth-child(6) > td:nth-child(2)"
var matkhau = "body > form > table > tbody > tr:nth-child(7) > td:nth-child(2)"
var facebook = "body > form > table > tbody > tr:nth-child(8) > td:nth-child(2)"
$("#formdangky").on("submit",
function()

{
	var isvalid = true;
if ($("#hoten").val().match(/[a-zA-Z_0-9]/) == null) 
{
$("#hoten").next().text("Trường thông tin ko để trống")	
isvalid = false;
}
else
{
$("#hoten").next().text("")	
}
if ($("#ngaysinh").val().match(/[a-zA-Z_0-9]/) == null) 
{
$("#ngaysinh").next().text("Trường thông tin ko để trống")	
isvalid = false;
}
else
{
$("#ngaysinh").next().text("")	
}
if ($("#gioitinh").val().match(/[a-zA-Z_0-9]/) == null) 
{
$("#gioitinh").next().text("Trường thông tin ko để trống")	
isvalid = false;
}
else
{
$("#gioitinh").next().text("")	
}
/////////////
if ($("#diachi").val().match(/[a-zA-Z_0-9]/) == null) 
{
$("#diachi").next().text("Trường thông tin ko để trống")	
isvalid = false;
}
else
{
$("#diachi").next().text("")	
}
//////////////
if ($("#email").val().match(/[a-zA-Z_0-9]/) == null) 
{
$("#email").next().text("Trường thông tin ko để trống")	
isvalid = false;
}
else
{
$("#email").next().text("")	
}
///////////////////
if ($("#dienthoai").val().match(/[a-zA-Z_0-9]/) == null) 
{
$("#dienthoai").next().text("Trường thông tin ko để trống")	
isvalid = false;
}
else
{
$("#dienthoai").next().text("")	
}

if ($("#matkhau").val().match(/[a-zA-Z_0-9]/) == null) 
{
$("#matkhau").next().text("Trường thông tin ko để trống")	
isvalid = false;
}
else
{
$("#matkhau").next().text("")	
}


if ($("#facebook").val().match(/[a-zA-Z_0-9]/) == null) 
{
$("#facebook").next().text("Trường thông tin ko để trống")	
isvalid = false;
}
else
{
$("#facebook").next().text("")	
}
/*
else
{
check_Text(hoten);
check_Date(ngaysinh);
check_Text(gioitinh);
check_trim(diachi)
check_Email(email)
check_Sdt(dienthoai) 
check_Pass(matkhau)
check_trim(facebook)
isvalid = false;
}
*/
return isvalid;
})
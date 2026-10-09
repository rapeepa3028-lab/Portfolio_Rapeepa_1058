// =============================================================================
// MDT312 Assignment 6 register.js
// Modernized: ES6 (const/let), event.preventDefault(), and localStorage
// =============================================================================

window.onload = pageLoad;
 
function pageLoad() {
    // ผูกฟังก์ชัน validateForm เข้ากับ event submit ของฟอร์ม myRegister
    const form = document.getElementById("myRegister");
    if (form) {
        form.onsubmit = validateForm;
        // หาฟอร์มด้วย id="myRegister" แล้วผูกให้เรียก validateForm ทุกครั้งที่กด submit 
        // (ไม่ใส่วงเล็บ validateForm เพราะเป็นการส่งฟังก์ชันไปเก็บไว้ ไม่ใช่เรียกทันที)
    }
}
 
function validateForm(event) {
    const errorMsg = document.getElementById("errormsg");
    const form = document.forms["myRegister"];
 
    const firstname = form["firstname"].value.trim();
    const lastname = form["lastname"].value.trim();
    const bday = form["bday"].value;
    const email = form["email"].value.trim();
    const username = form["username"].value.trim();
 
    const passwords = form["password"];
    const password = passwords[0].value;
    const retypePassword = passwords[1].value;
    // เพราะใน HTML มี input ชื่อ password ซ้ำกัน 2 ตัว (ช่องรหัสผ่าน + ช่องยืนยัน) 
    // เบราว์เซอร์เลยให้ form["password"] เป็น array/collection แทนค่าเดียว ต้องแยก index [0] กับ [1]
 
    // หา radio button "gender" ตัวที่ถูกเลือก
    const genderRadios = form["gender"];
    let gender = "";
    for (let i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
            gender = genderRadios[i].value;
            break;
            // radio button ชื่อเดียวกันหลายตัวก็ถูกรวมเป็น collection เหมือนกัน ไม่มี .value ตรงๆ ให้เลย ต้องใช้ for loop 
            // วนหาตัวที่ .checked === true แล้ว break ออกทันทีที่เจอ ไม่ต้องวนต่อให้เสียเวลา
        }
    }
 
    // 0. ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบทุกช่องหรือไม่ ถ้าไม่ครบให้แจ้งเตือน และคงอยู่ที่หน้าลงทะเบียน
    if (!firstname || !lastname || !gender || !bday || !email || !username || !password || !retypePassword) {
        errorMsg.innerHTML = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
        event.preventDefault();
        return false;
        //เครื่องหมาย ! หน้าตัวแปร string ว่างเปล่า ("") จะได้ true (เพราะ string ว่างเป็น falsy) 
        // ถ้าช่องไหนว่างแม้แต่ช่องเดียว เงื่อนไขนี้จะเป็น true ทันที → แจ้ง error, preventDefault() 
        // กันไม่ให้ฟอร์ม submit ออกไป, return false ออกจากฟังก์ชันเลย ไม่ทำงานต่อ   
    }
 
    // 1. ตรวจสอบว่า Password ทั้ง 2 ช่องตรงกันหรือไม่ ถ้าไม่ตรงกันให้แจ้งเตือน และให้ return false
    if (password !== retypePassword) {
        errorMsg.innerHTML = "รหัสผ่านและรหัสผ่านยืนยันไม่ตรงกัน กรุณากรอกใหม่";
        event.preventDefault();
        return false;
        // ถ้าผ่านการเช็กช่องว่างมาแล้ว แต่รหัสผ่าน 2 ช่องไม่ตรงกัน ก็หยุดเหมือนกัน
    }
    errorMsg.innerHTML = "";
 
    // 3. บันทึกข้อมูลลงใน localStorage ทีละตัว
    // เพื่อความปลอดภัย: รหัสผ่านไม่ปรากฏบน Browser Address Bar และ Browser History
    
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
 
    alert("ลงทะเบียนสำเร็จ! ระบบบันทึกข้อมูลเรียบร้อย กำลังไปที่หน้า Login");
 
    // 4. นำทางไปหน้า login.html
    event.preventDefault();
    window.location.href = "login.html";
    return true;
    // แจ้งเตือนสำเร็จ แล้ว preventDefault() อีกครั้งเพื่อกันไม่ให้ฟอร์ม submit จริง 
    // (ถ้าไม่กัน ข้อมูลรวมถึงรหัสผ่านจะติดไปเป็น query string บน URL) จากนั้นค่อยสั่งเปลี่ยนหน้าไป login.html ด้วยโค้ดเอง
    // preventDefault();ไม่ให้ไปหน้าถัดไป
}
// =============================================================================
// MDT312 Assignment 6 login.js
// Modernized: ES6 (const/let), event.preventDefault(), and for loop
// =============================================================================


window.onload = loginLoad;
 
function loginLoad(){
    // ผูกฟังก์ชัน checkLogin เข้ากับ event submit ของฟอร์ม myLogin
    const form = document.getElementById("myLogin");
    if (form) {
        form.onsubmit = checkLogin;
    }
}
 
function checkLogin(event) {
    // 1. ป้องกันหน้าเว็บรีเฟรชเองทันทีเมื่อกดปุ่ม Submit
    if (event) {
        event.preventDefault();
    }
 
    // 2. ดึงข้อมูลจาก localStorage ทีละตัว แล้วนำมาใส่ใน Array
    const users = [{ username: "admin", password: "123456" }]; // เพิ่มผู้ใช้ default ไว้แล้ว
 
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
 
    // ถ้ามีข้อมูลใน localStorage ให้นำมาเก็บใส่ Array of Objects
    if (storedUsername && storedPassword) {
        users.push({ username: storedUsername, password: storedPassword });
    // เริ่มด้วย user default (admin/123456) ในรูปแบบ Array of Objects
    // ดึงข้อมูลที่เก็บไว้ตอน register กลับมาด้วย getItem
    // ถ้ามีข้อมูลจริง (ไม่ใช่ null) ก็ push เพิ่มเข้า array — ทำให้ตอนนี้มี user 2 คนให้เช็ก
    }
 
    // 3. ตรวจสอบว่ามีข้อมูลผู้ใช้ในระบบหรือไม่
    if (users.length === 0) {
        alert("ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาลงทะเบียนที่หน้า Register ก่อน");
        window.location.href = "register.html";
        return false;
    }
 
    // 4. ดึงค่าที่ผู้ใช้กรอกในฟอร์ม Login ปัจจุบัน
    const usernameInput = document.forms["myLogin"]["username"].value.trim();
    const passwordInput = document.forms["myLogin"]["password"].value;
 
    // 5. ใช้ for loop วนหาใน Array ว่ามี username และ password ที่ตรงกับที่เรากรอกหรือไม่
    let isLoginSuccess = false;
 
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === usernameInput && users[i].password === passwordInput) {
            isLoginSuccess = true;
            break;
        //วน for loop ผ่าน array users ทีละคน เทียบทั้ง username และ password ต้องตรงกันทั้งคู่ (&&) ถึงจะนับว่าใช่ ถ้าเจอก็ตั้งค่า true แล้ว break หยุดค้นทันที   
        }
    }
 
    // 6. ตรวจสอบผลลัพธ์จากการวนลูป
    if (isLoginSuccess) {
        alert("Login success! ยินดีต้อนรับเข้าสู่ระบบ");
        return true;
    } else {
        alert("Username หรือ password ไม่ถูกต้อง");
        return false;
    }
//     จุดเชื่อมสำคัญระหว่าง 2 ไฟล์

// register.js เขียน ข้อมูลลง localStorage → login.js อ่าน ข้อมูลกลับมาเช็ก — ทั้งสองไฟล์คุยกันผ่าน localStorage ของเบราว์เซอร์ ไม่ได้ส่งข้อมูลกันตรงๆ แบบ function call เพราะเป็นคนละหน้าเว็บ (คนละ HTML file) กัน localStorage จึงทำหน้าที่เป็น "ที่เก็บข้อมูลกลาง" ที่ทั้งสองหน้าเข้าถึงร่วมกันได้ ตราบใดที่อยู่ domain เดียวกัน
}
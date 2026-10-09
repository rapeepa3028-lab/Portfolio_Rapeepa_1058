// =============================================================================
// Portfolio - ใช้ร่วมกันทั้ง index.html และ project.html
// 1. ปุ่ม hamburger เปิด/ปิดเมนูบนมือถือ
// 2. กดลิงก์ในเมนูแล้วปิดเมนูอัตโนมัติ
// 3. ใส่ปีปัจจุบันใน footer
// =============================================================================

window.onload = pageLoad;

function pageLoad() {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    // กดปุ่ม ☰ แล้วสลับ class open (CSS จะแสดง/ซ่อนเมนูให้)
    menuBtn.onclick = function () {
        navLinks.classList.toggle("open");
    };

    // กดลิงก์ในเมนูแล้วปิดเมนู
    const links = navLinks.querySelectorAll("a");
    for (const link of links) {
        link.onclick = function () {
            navLinks.classList.remove("open");
        };
    }

    // ใส่ปีปัจจุบันใน footer
    document.getElementById("year").textContent = new Date().getFullYear();
}

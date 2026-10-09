// =============================================================================
// Pizza Dip
// 1. คลิกที่ส่วนผสมเพื่อขีดฆ่าว่ามีแล้ว
// 2. ปุ่ม Top จะโผล่มาเมื่อเลื่อนลง กดแล้วกลับขึ้นบนสุด
// =============================================================================

window.onload = pageLoad;

function pageLoad() {
    // ผูก onclick ให้ส่วนผสมทุกตัว
    const items = document.querySelectorAll(".card li");
    for (const item of items) {
        item.onclick = toggleItem;
    }

    // ปุ่มกลับขึ้นบน
    const topBtn = document.getElementById("topBtn");
    topBtn.onclick = goTop;
    window.onscroll = showTopBtn;
}

function toggleItem() {
    this.classList.toggle("checked");
}

function showTopBtn() {
    const topBtn = document.getElementById("topBtn");
    // เลื่อนลงมาเกิน 300px ค่อยแสดงปุ่ม
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

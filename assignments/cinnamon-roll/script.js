// =============================================================================
// Cinnamon Roll Wreath - คลิกที่ขั้นตอนเพื่อติ๊กว่าทำเสร็จแล้ว
// =============================================================================

window.onload = pageLoad;

function pageLoad() {
    const steps = document.querySelectorAll(".step");

    // ผูก onclick ให้ทุกขั้นตอน
    for (const step of steps) {
        step.onclick = toggleStep;
    }

    updateProgress();
}

function toggleStep() {
    // this = ขั้นตอนที่ถูกคลิก, toggle = ถ้ามี class done อยู่แล้วจะเอาออก ถ้าไม่มีจะใส่ให้
    this.classList.toggle("done");
    updateProgress();
}

function updateProgress() {
    const total = document.querySelectorAll(".step").length;
    const done = document.querySelectorAll(".step.done").length;
    const progress = document.getElementById("progress");

    if (done === total) {
        progress.textContent = "All steps done! Enjoy your wreath";
    } else {
        progress.textContent = "Done " + done + " / " + total + " steps";
    }
}

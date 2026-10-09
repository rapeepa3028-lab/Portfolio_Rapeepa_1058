// =============================================================================
// MDT312 Assignment 7  - Square Game
// Modern JavaScript: DOM, Event, Timer
// =============================================================================

window.onload = pageLoad;
// โหลดหน้าเว็บเสร็จ HTML, CSS 
// การไม่ใส่วงเล็บคือการ "ส่งฟังก์ชันไปเก็บไว้" ให้เบราว์เซอร์เรียกเองภายหลัง

 
// Global timer reference เพื่อให้สามารถควบคุมและเคลียร์สถานะได้ถูกต้อง
// เก็บรหัสของนาฬิกาที่กำลังทำงานอยู่ ใช้ let เพราะค่าต้องเปลี่ยนได้ตลอดเหตุผลที่ต้องมีตัวแปรนี้คือ ถ้าผู้เล่นกด Start ซ้ำระหว่างเล่นอยู่ เราต้องรู้ว่ามีนาฬิกาตัวเก่าทำงานค้างอยู่ไหม ก่อนจะสร้างตัวใหม่
let timer = null;

 
function pageLoad(){
	// 1. ผูกเหตุการณ์คลิกปุ่ม Start ด้วย const
	const startBtn = document.getElementById("start");
	startBtn.onclick = startGame;
    // หา element ปุ่ม Start จาก id="start" ในไฟล์ HTML แล้วผูกให้เรียก startGame ทุกครั้งที่มีคนคลิก
 
	// 2. ใช้ Event Delegation (สไลด์หน้า 50–52):
	// ผูก event ไว้ที่กล่องแม่ #layer เพียงจุดเดียว
	// เมื่อมีการคลิกเกิดขึ้น ให้ใช้ event.target ตรวจสอบว่าเป็นกล่อง .square หรือไม่
	const gameLayer = document.getElementById("layer");
	gameLayer.onclick = handleLayerClick;
	//หา element #layer (กล่องแม่ที่บรรจุสี่เหลี่ยมทั้งหมด) เก็บไว้ในตัวแปร gameLayer
	// ?? gameLayer.onclick = handleLayerClick;
}
 
function handleLayerClick(event) {
	if (event.target.classList.contains("square")) {
		event.target.remove();
	}
	// ??
}
 
function startGame(){
	alert("Ready"); //เตือนผู้เล่นก่อนเริ่ม (โค้ดหยุดรอจนกดตกลง)
	clearScreen(); // ล้างกล่องเก่าออกก่อนเริ่มรอบใหม่
	addBox(); //สร้างกล่องชุดใหม่
	timeStart(); //เริ่มจับเวลาถอยหลัง
}
 
function timeStart(){
	const TIMER_TICK = 1000;
	// เคลียร์ timer เดิมก่อนเริ่มนับใหม่ เพื่อป้องกันการนับเวลาเร่งความเร็วเมื่อกด Start ซ้ำ
	if (timer !== null) {
		clearInterval(timer);
		timer = null;
		// เช็กก่อนว่ามีนาฬิกาตัวเก่าค้างอยู่ไหม (timer !== null) ถ้ามีให้หยุดด้วย clearInterval แล้วรีเซ็ตเป็น null 
		// — จุดนี้ป้องกันปัญหา "นาฬิกาเดินเร็วขึ้นเป็นเท่าตัว" ถ้ากด Start ซ้ำโดยไม่เคลียร์ตัวเก่าก่อน
	}
 
	const min = 0.5; // 0.5 minute * 6 = 30 seconds
	let second = min * 60;
	const clockDisplay = document.getElementById('clock');
	clockDisplay.textContent = second;
	// ??
 
	// สั่งให้ timeCount ถูกเรียกซ้ำทุกๆ 1000ms (1 วินาที)(สไลด์หน้า 12)
	timer = setInterval(timeCount, TIMER_TICK);
 
	function timeCount(){
		const allbox = document.querySelectorAll("#layer div");
		// สังเกตว่า timeCount ประกาศข้างใน timeStart — เรียกว่า closure 
		// ทำให้ timeCount เข้าถึงตัวแปร second และ clockDisplay ของฟังก์ชันแม่ได้โดยตรง 
		// ไม่ต้องส่งผ่าน parameter
 

		// จัดการเกี่ยวกับเวลาตามเงื่อนไขโจทย์:
		// 1. ถ้าไม่มีกล่องเหลือแล้ว และเวลายังเหลืออยู่จะขึ้นว่า You win!
		if (allbox.length === 0 && second > 0) {
			clearInterval(timer);
			timer = null;
			alert("You win!");
			return;
		}
		// นับกล่องที่เหลือด้วย querySelectorAll ถ้าเหลือ 0 อัน และ เวลายังไม่หมด = ชนะ 
		// ต้อง clearInterval หยุดนาฬิกาทันที ไม่งั้นมันจะเดินต่อทั้งที่เกมจบแล้ว return คือออกจากฟังก์ชันทันที 
		// ไม่ให้โค้ดข้างล่างทำงานต่อ
 
		// 2. ถ้าเวลาหมด แต่ยังมีกล่องเหลืออยู่ จะบอกว่า Game over และทำการ clear screen
		if (second <= 0 && allbox.length > 0) {
			clearInterval(timer);
			timer = null;
			alert("Game over");
			clearScreen();
			return;
		}
		// ตรงข้ามกัน: เวลาหมดแล้วแต่ยังมีกล่องเหลือ = แพ้ 
		// หยุดนาฬิกา แจ้งเตือน แล้ว clearScreen() ล้างกล่องที่เหลือทิ้งให้จอสะอาด
 
		// 3. ถ้ายังมีกล่องเหลืออยู่ เวลาจะลดลงเรื่อยๆ
		second--;
		clockDisplay.textContent = second;
	}
	// ถ้าไม่เข้าเงื่อนไขไหนเลย (เกมยังเล่นต่อได้ปกติ) ลดเวลาลง 1 แล้วอัปเดตตัวเลขบนจอ
}
 
function addBox(){
	// สร้างกล่องตาม input ที่เราใส่
	const numbox = parseInt(document.getElementById("numbox").value) || 0;
	// .value ดึงค่าจากช่อง input ซึ่งได้เป็น string เสมอ (แม้พิมพ์ตัวเลข) parseInt 
	// แปลงเป็นจำนวนเต็ม ส่วน || 0 คือ fallback กันไว้เผื่อแปลงไม่ได้ (ช่องว่างเปล่า) จะได้ NaN ซึ่งเป็น 
	// falsy ทำให้ใช้ 0 แทน ป้องกัน error ตอนเอาไปวนลูป
	const gameLayer = document.getElementById("layer");
	const colorDrop = document.getElementById("color").value;
	// ดึงกล่องแม่และสีที่เลือกจาก dropdown

 
	for (let i = 0; i < numbox; i++){
		const tempbox = document.createElement("div");
		tempbox.className = "square " + colorDrop;
		tempbox.id = "box" + i;
		// ใช้ขนาดจริงของกรอบ (clientWidth) แทนเลข 500 ตายตัว เพื่อให้เล่นบนมือถือที่กรอบเล็กลงได้
		tempbox.style.left = Math.random() * (gameLayer.clientWidth - 25) + "px";
		tempbox.style.top = Math.random() * (gameLayer.clientHeight - 25) + "px";
 
		// add element to HTML node
		gameLayer.appendChild(tempbox);
		// วนลูปสร้างกล่องทีละอันตามจำนวนที่กรอก แต่ละรอบ:
        // 1.createElement("div") สร้าง <div> ใหม่ในหน่วยความจำ (ยังไม่ขึ้นจอ) ตามสไลด์หน้า 24
        // 2.className = "square " + colorDrop ใส่ 2 class พร้อมกัน เช่น class="square maroon" — square กำหนดรูปทรง/ขนาดจาก CSS, สีกำหนดพื้นหลัง
        // 3.id = "box" + i ตั้งชื่อไม่ซ้ำ เช่น box0, box1
        // 4.สุ่มตำแหน่งซ้าย/บน ลบ 25 (ขนาดกล่อง) ออกจาก 500 (ขนาดกรอบ) กันไม่ให้กล่องล้นขอบ
        // 5.appendChild ฝังกล่องเข้า DOM จริง ตามสไลด์หน้า 25 — ขาดขั้นนี้ไม่ได้ เพราะถ้าไม่ทำ กล่องจะถูกสร้างไว้เฉยๆ ไม่ปรากฏบนจอเลย
	}
}
 
 
function clearScreen(){
	// ทำการลบ node ของกล่องทั้งหมด ออกจากหน้าจอ
	const allbox = document.querySelectorAll("#layer div"); // สไลด์หน้า 29
 
	// ใช้ for/of (ES6) วนลบทีละกล่อง ตรงกับที่สอนใน week 6 หน้า 17
	// และใช้ remove() แบบ Modern JavaScript ตามที่สอนใน week 7 หน้า 40
	for (const box of allbox) {
		box.remove();
		//querySelectorAll คืนค่าเป็น NodeList ของกล่องทุกอันใน #layer (สไลด์หน้า 29)
        // for (const box of allbox) คือ for/of loop ตามที่สอนในสไลด์ week 6 หน้า 17 วนผ่านสมาชิกแต่ละตัวใน NodeList โดยไม่ต้องใช้ดัชนี i เหมือน for แบบเดิม — ในแต่ละรอบตัวแปร box จะแทนกล่องตัวนั้นๆ ทีละอัน
        // box.remove() ลบกล่องนั้นออกจาก DOM ตามสไลด์หน้า 40

        // ข้อดีของการเปลี่ยนจาก forEach มาเป็น for...of คือไม่มีฟังก์ชันซ้อนฟังก์ชัน อ่านง่ายกว่า และเป็นไวยากรณ์เดียวกับที่เรียนในคลาสทุกจุด 
 	}
}
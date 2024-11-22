import {levelone,leveltwo} from "./func.js"


let rocketicon = document.getElementById("rocketicon")
let picon = document.getElementById("picon")
let btnstartis = document.getElementById("btnstartis")
let story = document.getElementById("story")
let storypage1 = document.getElementById("storypage1")
let mainpage = document.getElementById("mainpage");
let score1 = document.getElementById("score")
let line = document.getElementById("line")
let plentstate = document.getElementById("plentstate")
let select = document.getElementById("select");
let levelEasy = document.getElementById("leveleseay");
let levelHard = document.getElementById("levelhard");
let healthis = document.getElementById("healthis");
let levelis
let speedis
let classfire = "fire"
let istruetostart
let finallscore
let heeltplanet = 100
healthis.innerHTML = heeltplanet
let justplay = document.getElementById("justplay")
let mainsub = document.getElementById("mainsub")
let normalsub = document.getElementById("normalsub")
let hardsub = document.getElementById("hardsub")
let maxscore = 100
let homepagelose = document.getElementById("homepagelose")

let myrecords = document.getElementById("myrecords");
let duringtimeis
let countmy = 0
let youlose = document.getElementById("youlose")
let sound = document.getElementById("sound")
let scoreis
let score = document.getElementById("score")
let homepage = document.getElementById("homepage")
let starterpage = document.getElementById("starterpage")
let leveleseayclass = document.querySelectorAll(".leveleseay")
let llevelhardclass = document.querySelectorAll(".levelhard")

function startgame(){
    storypage1.style.display = "none"
    mainpage.style.display = "none"
    score1.style.display = "block"
    line.style.display = "block"
    plentstate.style.display = "block"
    healthis.style.display = "block"
    const customCursor = document.getElementById('customCursor');
    customCursor.style.display = 'block'
    document.addEventListener('mousemove', function(event) {
        customCursor.style.left = event.pageX + 'px'; // موقعیت افقی
        customCursor.style.top = event.pageY + 'px'; // موقعیت عمودی
    });
    let healthenemy = 1
    let level = 1
    let sccc = 0
    let body = document.getElementById('body')
    let attackers
    let damege = 0
    let healthplanet = 100
    
    // let scoreis = 0
    body.style.cursor = 'none'      
    function createattackers(){
        if(istruetostart == 1){
        let attackeris = document.createElement("div")
        attackeris.classList.add("attacker")
        let damegedis = document.createElement("div")
        damegedis.classList.add("damegedis")
        let damegedislevel = document.createElement("div")
        damegedislevel.classList.add("damegedislevelfull")
        let randomX = 790 + Math.floor(Math.random() * 550)
        let previousY = 100 + Math.floor(Math.random() * 400); 
        attackeris.style.top = `${previousY}px`;
        function generateRandomY() {
            let newY;
            do {
                newY = 100 + Math.floor(Math.random() * 400);
            } while (Math.abs(newY - previousY) < 200);
            previousY = newY; 
            return newY;
        }
        let randomY = generateRandomY();
        attackeris.style.left = `${randomX}px`;
        attackeris.style.top = `${randomY}px`;
        body.appendChild(attackeris)
        attackeris.appendChild(damegedis)
        damegedis.appendChild(damegedislevel)
        attackers = document.querySelectorAll(".attacker")


        
        attackers.forEach(attacker => {
            // انیمیشن مهاجم به سمت چپ
            gsap.to(attacker, {
                left: "0%", // حرکت به سمت چپ
                duration: duringtimeis, // مدت زمان حرکت
                ease: "none",
                onUpdate: () => {
                    const currentLeft = parseFloat(attacker.style.left);
                    if (currentLeft <= 1){
                        attacker.classList.add("radshod")
                    }
                },
                
            });;
            // تابعی برای حذف مهاجم بعد از 5000 میلی‌ثانیه
            setTimeout(() => {
                attacker.remove(); // حذف مهاجم
            }, 9000);

        });
        }else if(istruetostart == 2){
            
        }
    }
    setInterval(createattackers, speedis);
    
    function checkthisline(){
        attackers.forEach(attacker =>{
            if(attacker.classList.contains("radshod") && heeltplanet > 0 && youwin.style.display == "none" && attacker.style.display !== "none"){
                heeltplanet -=10
                console.log(heeltplanet)
                console.log(attacker.classList.contains("radshod"))
                attacker.classList.remove("radshod")
                healthis.innerHTML = heeltplanet
                attacker.remove()
            }
            if(heeltplanet == 0){
                attacker.remove()
                 youlose.style.display = "block"
                 istruetostart = 2
                 customCursor.style.display = 'none'
                 body.style.cursor = "default"
            }
        })
    }
    setInterval(checkthisline, 1800);


    body.addEventListener("click",function(event){
        const x = event.clientX; // موقعیت افقی موس
        const y = event.clientY; // موقعیت عمودی موس
        // console.log(`موقعیت موس: X: ${x}, Y: ${y}`);
        
        let firediv = document.createElement("div")
        firediv.classList.add(classfire)
        firediv.style.left = `${x}px`;
        firediv.style.top = `${y + 50}px`;
        body.appendChild(firediv)
        const sound = new Audio("img/firesoundready.mp3");
        sound.play();
        

        let allfires = document.querySelectorAll(`.${classfire}`)
        allfires.forEach(fire =>{
            gsap.to(fire,{
                x : 2600,
                duration:1,
            })
        })

    
    
    if(levelis == 1){
        attackers.forEach(attacker => {
            const damegedis = attacker.querySelector('.damegedis .damegedislevelfull') || attacker.querySelector('.damegedis .damegedislevelhalf');
            const firedivRect = firediv.getBoundingClientRect(); // دریافت ابعاد و موقعیت firediv
            const attackerRect = attacker.getBoundingClientRect(); // دریافت ابعاد و موقعیت attacker
            const range = 20; // محدوده‌ی اضافه برای بررسی برخورد
                const expandedFiredivRect = {
                top: firedivRect.top - range,
                bottom: firedivRect.bottom + range,
                left: firedivRect.left - range,
                right: firedivRect.right + range,
            };
            
            if (attacker.style.display !== "none") {
                if(
                    expandedFiredivRect.left < attackerRect.right &&
                    expandedFiredivRect.right > attackerRect.left &&
                    expandedFiredivRect.top < attackerRect.bottom &&
                    expandedFiredivRect.bottom > attackerRect.top
                ){
                    attacker.style.display = 'none';
                    attacker.remove();
                    scoreis = parseInt(score.innerText);
                    if(scoreis < maxscore){
                        scoreis += 10;
                        score.innerHTML = scoreis;
                    }else{
                        youwin.style.display = "block"
                        istruetostart = 2
                        scoreis += 10;
                        score.innerHTML = scoreis;
                        finallscore = scoreis
                        
                        customCursor.style.display = 'none'
                        body.style.cursor = "default"
                    }
                    
                }
            }
        });
    }

    if(levelis == 2){
        const losingLine = document.getElementById("line").offsetLeft; // موقعیت x خط باخت
        attackers.forEach(attacker => {
            // اگر ویژگی `hitCount` برای `attacker` وجود ندارد، آن را ایجاد و مقداردهی اولیه کنید
            if (!attacker.hitCount) {
                attacker.hitCount = 0;
            }
        
            const damegedis = attacker.querySelector('.damegedis .damegedislevelfull') || attacker.querySelector('.damegedis .damegedislevelhalf');
            const firedivRect = firediv.getBoundingClientRect(); // دریافت ابعاد و موقعیت firediv
            const attackerRect = attacker.getBoundingClientRect(); // دریافت ابعاد و موقعیت attacker
            const range = 20; // محدوده‌ی اضافه برای بررسی برخورد
        
            // گسترش منطقه برخورد با اضافه کردن `range` در اطراف firediv
            const expandedFiredivRect = {
                top: firedivRect.top - range,
                bottom: firedivRect.bottom + range,
                left: firedivRect.left - range,
                right: firedivRect.right + range,
            };
        
            if (attacker.style.display !== "none") {
                // بررسی برخورد با استفاده از منطقه‌ی گسترش‌یافته
                if (
                    expandedFiredivRect.left < attackerRect.right &&
                    expandedFiredivRect.right > attackerRect.left &&
                    expandedFiredivRect.top < attackerRect.bottom &&
                    expandedFiredivRect.bottom > attackerRect.top
                ) {
                    // برخورد شناسایی شد
                    attacker.hitCount += 1; // افزایش تعداد برخورد
                    attacker.classList.add("hited");
        
                    // بررسی وضعیت برخورد
                    if (attacker.hitCount === 2 && damegedis && damegedis.classList.contains("damegedislevelhalf")) {
                        attacker.style.display = 'none';
                        attacker.remove();
                        scoreis = parseInt(score.innerText);
                        
                        score.innerHTML = scoreis;
                        // console.log("حذف شد و امتیاز اضافه شد");
                        attacker.hitCount = 0; // بازنشانی `hitCount`
                        if(scoreis < maxscore){
                            scoreis += 10;
                            score.innerHTML = scoreis;
                        }else{
                            youwin.style.display = "block"
                            istruetostart = 2
                            scoreis += 10;
                            score.innerHTML = scoreis;
                            finallscore = scoreis
                            // console.log(finallscore,"fi")
                            customCursor.style.display = 'none'
                            body.style.cursor = "default"
                        }
        
                    } else if (attacker.hitCount === 1 && damegedis && damegedis.classList.contains("damegedislevelfull")) {
                        // console.log("اولین برخورد: وارد شرط شد");
                        damegedis.classList.remove("damegedislevelfull");
                        damegedis.classList.add("damegedislevelhalf");
                        attacker.classList.add("h1is");
        
                    } else {
                        // console.log("هیچ تغییری ایجاد نشد");
                    }
                    attacker.st
                }
                let attackerLeft = parseInt(attacker.style.left, 10); // دریافت موقعیت x مهاجم

                // بررسی عبور مهاجم از خط باخت
                // if (attackerLeft <= losingLine) { // توجه داشته باشید که در اینجا <= به معنی عبور از خط است
                //     alert("شما باختید!"); // نمایش پیام باخت
                // }
                
            }
        });
    }
    
    setTimeout(function(){
        firediv.remove()
        }, 3000)
})

}
    
// startgame()


const text = "Welcome to the world of pixelated star wars! You’re the commander of the defending spaceship, and the galaxy is under relentless attack from incoming rockets.Take control and begin your endless battle.";
const typingElement = document.getElementById("typingtext");
let index = 0;

function typeText() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeText, 20); // سرعت تایپ
  }
}

typeText();

leveleseayclass.forEach(levelEasy =>{
    levelEasy.addEventListener("click",function(){
        levelis = 1
        speedis = 2000
        duringtimeis = 2.5
        select.style.display = "none"
        youlose.style.display = "none"
        heeltplanet = 100
        scoreis = 0
        istruetostart = 1
        if (!soundplay1.paused) {
            soundplay1.pause();
            soundplay1.currentTime = 0; // بازنشانی از ابتدا
        }
        startgame()
    })
    let typingTimeout; // ذخیره تایمر
    
    levelEasy.addEventListener("mouseover", function() {
        clearTimeout(typingTimeout); // اطمینان از اینکه تایمر قبلی پاک شده
        normalsub.style.display = "block";
        normalsub.innerHTML = ""; // پاک کردن متن قبلی
    
        let textnor = "In this Mood, the attackers' attack speed is slower, and they only have one life. Therefore, they are eliminated with a single hit!";
        let indexnor = 0;
    
        function typeTextnor() {
            if (indexnor < textnor.length) {
                normalsub.innerHTML += textnor.charAt(indexnor);
                indexnor++;
                typingTimeout = setTimeout(typeTextnor, 20); // ذخیره تایمر جدید
            }
        }
        typeTextnor();
    });
    
    levelEasy.addEventListener("mouseout", function() {
        clearTimeout(typingTimeout); // متوقف کردن تایمر
        normalsub.innerHTML = ""; // پاک کردن متن
        normalsub.style.display = "none"; // مخفی کردن عنصر
    });
})

llevelhardclass.forEach(levelHard =>{
    levelHard.addEventListener("click",function(){
        levelis = 2
        speedis = 1500
        duringtimeis = 1.5
         select.style.display = "none"
         youlose.style.display = "none"
        heeltplanet = 100
        scoreis = 0
         istruetostart = 1
         console.log(levelis)
         if (!soundplay1.paused) {
            soundplay1.pause();
            soundplay1.currentTime = 0; // بازنشانی از ابتدا
        }
        startgame()
    })
    let typingTimeoutHard;
    levelHard.addEventListener("mouseover", function() {
        clearTimeout(typingTimeoutHard); // اطمینان از اینکه تایمر قبلی پاک شده
        hardsub.style.display = "block";
        hardsub.innerHTML = ""; // پاک کردن متن قبلی
    
        let textHard = "In this mode, the attackers move faster and have two lives. So, you need to shoot each of them twice to destroy them!";
        let indexHard = 0;
    
        function typeTextHard() {
            if (indexHard < textHard.length) {
                hardsub.innerHTML += textHard.charAt(indexHard);
                indexHard++;
                typingTimeoutHard = setTimeout(typeTextHard, 20); // ذخیره تایمر جدید
            }
        }
        typeTextHard();
    });
    
    levelHard.addEventListener("mouseout", function() {
        clearTimeout(typingTimeoutHard); // متوقف کردن تایمر
        hardsub.innerHTML = ""; // پاک کردن متن
        hardsub.style.display = "none"; // مخفی کردن عنصر
    });
})




let youwin = document.getElementById("youwin")
let startaginbut = document.getElementById("startaginbut")
let allchois = document.querySelectorAll(".choisshop")
let yellowfire = document.getElementById("yellowfire")
let bluefire = document.getElementById("bluefire")
let newplain1 = document.getElementById("newplain1")
let newplain2 = document.getElementById("newplain2")
    
    yellowfire.addEventListener('click',function(){
        if(finallscore > 100){
            classfire = "fireyellow"
            finallscore -=100
            console.log(finallscore,scoreis)
            scoreis = finallscore
            score.innerHTML = scoreis;
        }else{
            alert("YOU DONT HAVE ENOGH COINS")
        }
    })
    bluefire.addEventListener('click',function(){
        if(finallscore > 100){
            classfire = "fireblue"
            finallscore -=100
            console.log(finallscore,scoreis)
            scoreis = finallscore
            score.innerHTML = scoreis;
        }else{
            alert("YOU DONT HAVE ENOGH COINS")
        }
    })
    newplain1.addEventListener('click',function(){
        if(finallscore > 100){
            customCursor.style.backgroundImage = 'url("img/newairplane.1readygif.gif")'
            customCursor.style.transform = 'rotate(0deg) ';
            finallscore -=100
            scoreis = finallscore
            console.log(finallscore,scoreis)
            score.innerHTML = scoreis;
        }else{
            alert("YOU DONT HAVE ENOGH COINS")
        }
    })
    newplain2.addEventListener('click',function(){
        if(finallscore > 100){
            customCursor.style.backgroundImage = 'url("img/newairplane2final.gif")'
            customCursor.style.transform = 'rotate(0deg) scaleX(-1)';
            finallscore -=100
            scoreis = finallscore
            console.log(finallscore,scoreis)
            score.innerHTML = scoreis;
        }else{
            alert("YOU DONT HAVE ENOGH COINS")
        }
    })
function startagin(){
    youwin.style.display = "none"
    istruetostart = 1
    score1 = finallscore 
    levelis = 2
    customCursor.style.display = 'block'
    body.style.cursor = "none"
    heeltplanet = 100
    healthis.innerHTML = heeltplanet
    score1 = 0
    scoreis = 0
    score1 = finallscore
    score.innerHTML = scoreis
    maxscore = 200
    speedis = 500
    duringtimeis = 1.4
    startgame()
    
}
startaginbut.addEventListener("click",startagin)

const fullScreenBtn = document.getElementById('fullScreenBtn');
fullScreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        // ورود به حالت تمام‌صفحه
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
        fullScreenBtn.textContent = 'EXIT';
    } else {
        // خروج از حالت تمام‌صفحه
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        fullScreenBtn.textContent = 'FULLSCREEN';
    }
});

// تغییر متن دکمه به صورت خودکار هنگام خروج با کلید Esc
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullScreenBtn.textContent = 'FULLSCREEN';
    }
});
homepage.addEventListener("click",function(){
    // mainpage.style.display = "block"
    // youwin.style.display = "none"
    // score1.style.display = "none"
    // plentstate.style.display = "none"
    // healthis.style.display = "none"
    istruetostart = 2
    location.reload();
})

btnstartis.addEventListener("click",function(){
    starterpage.style.display = "none"
    mainpage.style.display = "block"
})
story.addEventListener("click", function() {
    // شروع انیمیشن و پخش صدا بلافاصله
    let rocketsimg = document.querySelectorAll(".rockets img");
    rocketsimg.forEach(img => {
        gsap.to(img, {
            x: 2700,
            ease: "slow(0.7,0.7,false)",
            duration: 3.6
        });
    });
    
    const soundplay = new Audio("img/rosof.mp3");
    soundplay.volume = 0.05
    soundplay.play();

    // تعویض عناصر پس از 4 ثانیه
    setTimeout(function() {
        select.style.display = "block";
        storypage1.style.display = "none";
        mainpage.style.display = "none";
        mainsub.style.display = "none";
    }, 4000); // 4 ثانیه تأخیر
});

if(homepage.style.display == "block"){
    istruetostart = 2
}
function cheakpage(){
    if(mainpage.style.display == "block"){
        istruetostart = 2
    }
}

const soundplay1 = new Audio("img/matn.mp3");
    soundplay1.play();


homepagelose.addEventListener("click",function(){
    // mainpage.style.display = "block"
    // youwin.style.display = "none"
    // youlose.style.display = "none"
    // score1.style.display = "none"
    // plentstate.style.display = "none"
    // healthis.style.display = "none"
    istruetostart = 2
    location.reload();
})
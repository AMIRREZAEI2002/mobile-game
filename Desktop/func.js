function levelone(){
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
        attacker.style.display = 'none';
        attacker.remove();
        let scoreis = parseInt(score.innerText);
        scoreis += 10;
        score.innerHTML = scoreis;
    }
});
}

function leveltwo(){
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
                    let scoreis = parseInt(score.innerText);
                    if(scoreis < 30){
                        scoreis += 10;
                    }else{
                        console.log("بیشتر شد")
                    }
                    score.innerHTML = scoreis;
                    console.log("حذف شد و امتیاز اضافه شد");
                    attacker.hitCount = 0; // بازنشانی `hitCount`
    
                } else if (attacker.hitCount === 1 && damegedis && damegedis.classList.contains("damegedislevelfull")) {
                    console.log("اولین برخورد: وارد شرط شد");
                    damegedis.classList.remove("damegedislevelfull");
                    damegedis.classList.add("damegedislevelhalf");
                    attacker.classList.add("h1is");
    
                } else {
                    console.log("هیچ تغییری ایجاد نشد");
                }
            }
        }
}

export {levelone , leveltwo}
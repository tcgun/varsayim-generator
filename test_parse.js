const text = `INC	Dk	Açıklama	Eksik Kart	Hatali Kart	Hakem	Net Karar
inc1	1'	Torreira - Lungoyi Mücadelesi	
CHRISTOPHER LUNGOYI
-	Devam	GALATASARAY LEHİNE FAUL LUNGOYI SARI KART
inc2	6'	Kozlowski - Torreira Mücadelesi	
KACPER SZYMON KOZLOWSKI
-	Faul	KOZLOWSKI SARI KART GÖRMELİYDİ
inc3	7'	Sallai ve Rodriguez Arasındaki Penaltı Pozisyonu	-	-	Devam	VAR MÜDAHALESİ VE VERİLEN PENALTI KARARI DOĞRUDUR
inc4	12'	Barış Alper Yılmaz'ın Gol Sevinci	
BARIŞ ALPER YILMAZ
-	Sarı Kart Verilmedi	BARIŞ ALPER YILMAZ SARI KART GÖRMELİYDİ`;

const blocks = text.split(/(?=^inc\d+\b|\binc\d+\b)/im).filter(b => b.toLowerCase().trim().startsWith('inc'));
console.log(`Found ${blocks.length} blocks`);

const newMistakes = blocks.map(block => {
    const parts = block.split('\t').map(s => s.trim());
    
    const inc = parts[0] || '';
    const minute = parts[1] || '';
    const title = parts[2] || '';
    
    let cardPlayer = '';
    let refDecision = '';
    let finalDecision = '';

    if (parts.length >= 7) {
        const eksik = parts[3].replace(/[\n\r"]/g, ' ').trim();
        const hatali = parts[4].replace(/[\n\r"]/g, ' ').trim();
        if (eksik && eksik !== '-') cardPlayer = eksik;
        if (hatali && hatali !== '-') {
            cardPlayer = cardPlayer ? `${cardPlayer} / ${hatali}` : hatali;
        }
        refDecision = parts[5].replace(/[\n\r"]/g, ' ').trim();
        finalDecision = parts[6].replace(/[\n\r"]/g, ' ').trim();
        console.log(`[${inc}] Length >= 7`);
    } else {
        cardPlayer = (parts[3] || '').replace(/[\n\r"]/g, ' ').replace(/-/g, '').trim();
        refDecision = parts[4] || ''; 
        finalDecision = parts[5] || ''; 
        console.log(`[${inc}] Length < 7. length: ${parts.length}`);
        console.log("Parts: ", parts);
    }
    return { inc, cardPlayer, refDecision, finalDecision };
});

console.log(JSON.stringify(newMistakes, null, 2));

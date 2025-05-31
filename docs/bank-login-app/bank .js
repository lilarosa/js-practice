// Bankknoto-System mit PIN-Login und Menü
function startBankApp(){
    const korrektPIN= "1234";  
let kontostand=1000;
let versuche=0;
let eingloggt = false;
// PIN eingeben, Maximal 3 mal
while(!eingloggt && versuche<3){
    let eingabe=prompt("Bitte gib deine 4-stellig PIN ein");
    versuche++;
    if (eingabe===korrektPIN){
    alert("Zugang erlaubt!");
    eingloggt=true;
    } 
    else if (eingabe=== null) {
                    alert("Abgebrochen. Vorgang beendet.");
                    return;
                }
    else{
        alert(`Falsche PIN (${versuche}/3)`);
    }
}
if (!eingloggt){
    alert("Konto gesperrt. Bitte wende dich an die Bank.");}
    else {
        let wahl;
        do {
            wahl= prompt(
                "Was möchtest du tun?\n"+
            "1 = Kontostand anzeigen\n" +
            "2 = Geld abheben\n" +
            "exit = beenden"    );
            if (wahl==="1"){
                alert(`Aktueller Kontostand: ${kontostand.toFixed(2)} €`);
            }
            else if(wahl==="2"){
                    let betrag= parseFloat(prompt("Betrag zum Abheben:"));
                    if (isNaN (betrag) || betrag <=0) {
                        alert("Ungültiger Betrag:");
                    } else if (betrag>kontostand){
                        alert("Nicht genug Guthaben.");
                        
                    } else {
                        kontostand -= betrag;
                        alert(`${betrag} € abgehoben.\nNeuer Kontostand: ${kontostand.toFixed(2)} €`);
                    } 
                    
                } 
            else if (wahl === "exit" ){
            alert("Aufwiedersehen und vielen Dank!");
                }

            else if (wahl === null) {
                    alert("Abgebrochen. Vorgang beendet.");
                    break;
                } 
            else  {
                    alert("Unbekannte Eingabe. Bitte wähle 1,2 order exit.");
                } 
            } 

            while(wahl!="exit");
            
           
        }

    }


    
    
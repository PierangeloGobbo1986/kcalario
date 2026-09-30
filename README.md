# Kcalario

Diario personale delle calorie, installabile come app (PWA) su iPhone. Registra pasti e peso, calcola il fabbisogno energetico e confronta la dieta pianificata con l'andamento reale del peso. I dati stanno su Firebase (Firestore), l'app è pubblicata su GitHub Pages.

Versione corrente: **2.7**.

## Funzioni

**Diario.** Il tasto + cerca per parola tra ingredienti e piatti, ignorando gli accenti, e propone in cima i 10 cibi più mangiati. Il pasto viene scelto in automatico dall'orario. Una voce si modifica o si elimina toccandola; "Seleziona" elimina più voci insieme.

**Grafici.** Mostrano tutto lo storico su un unico asse dei giorni e all'apertura si posizionano su oggi, all'estremità destra. Scorrendo, calorie e peso si muovono insieme, solo in orizzontale; toccando un giorno lo si apre nel diario. Le scale verticali restano fisse a sinistra e seguono i giorni visibili, cambiando a salti.

- Calorie: barre giornaliere (verdi fino all'obiettivo, rosse oltre), obiettivo (tratteggio giallo), media mobile a 7 giorni (linea scura), parti stimate dei giorni incompleti (barre tratteggiate). La scala va da 0 a un massimo multiplo di 500 kcal, scelto sul giorno più alto visibile (obiettivo e media compresi), con un'etichetta ogni 500 kcal (ogni 1000 oltre 4500).
- Peso: pesate reali (punti uniti da una linea sottile), media a 7 giorni (linea verde, chiamata tendenza nei calcoli), percorso pianificato (tratteggio giallo). Dove per una settimana o più non ci sono pesate la media non esiste e un raccordo punteggiato unisce i due tratti. Gli estremi della scala sono multipli di 0,2 kg, calcolati su pesate, media e percorso visibili con un passo di margine; le etichette sono ogni 0,2 kg, oppure ogni 1, 2 o 5 kg quando l'intervallo è troppo ampio per starci.

**Sintesi sotto i grafici.** Ritmo di calo in kg a settimana, media calorica degli ultimi 7 giorni, TDEE reale con la sua incertezza, data prevista di arrivo al peso obiettivo. Il TDEE reale compare solo se è attendibile (vedi sotto); altrimenti la sintesi dice "in calibrazione" e ne indica il motivo. Quando si discosta da quello in uso più della sua incertezza (e di almeno 50 kcal), il pulsante "Aggiorna il TDEE" diventa giallo. Quando la tendenza raggiunge il peso obiettivo compare la proposta di passare al mantenimento; la tendenza vale per questa proposta e per la data di arrivo solo con almeno 3 pesate negli ultimi 7 giorni.

**Pesate.** Il campo nella card del giorno, in alto sotto le kcal, agisce sul giorno selezionato: registra la pesata, la corregge se esiste già, e il cestino la elimina dopo conferma. Le pesate anomale, per esempio dopo un allenamento intenso, si correggono o si tolgono da qui.

**Ingredienti e Piatti.** Libreria condivisa tra gli utenti. I piatti composti calcolano le kcal dal vivo dai loro ingredienti: correggere un ingrediente aggiorna tutti i piatti che lo usano e il diario passato. La loro descrizione è automatica e si può aggiungere una nota. I piatti semplici hanno kcal fisse, fonte e descrizione scritta a mano. Un ingrediente mancante si crea al volo dall'editor del piatto e finisce tra gli ingredienti.

**Impostazioni.** Dati personali (il peso è quello dell'ultima pesata), peso obiettivo, deficit, orari dei pasti, immagine dell'intestazione, backup in Excel e versione dell'app con il pulsante "Aggiorna".

**Backup.** Un file `kcalario_AAAA-MM-GG.xlsx` con i fogli Diario, Alimenti base, Piatti, Impostazioni e Peso.

## Come funzionano i calcoli

**Metabolismo basale (BMR).** Equazione di Mifflin-St Jeor: 10 × peso (kg) + 6,25 × altezza (cm) − 5 × età + 5 per gli uomini, − 161 per le donne [1]. Il peso usato è quello dell'ultima pesata.

**TDEE da formula.** BMR × fattore di attività (1,2 sedentario, 1,375 leggero, 1,55 moderato). È una stima di popolazione: sul singolo l'errore arriva facilmente a un paio di centinaia di kcal.

**Obiettivo giornaliero.** TDEE in uso − deficit. Il TDEE in uso è quello da formula finché non se ne adotta uno calibrato.

**Giorni incompleti.** A partire dal primo giorno di diario, un giorno concluso senza cena conta nei calcoli 1400 kcal in più, un giorno senza voci conta 2100 kcal. Le stime compaiono tratteggiate nel grafico e non modificano il diario. Il giorno in corso non viene mai stimato.

**Tendenza del peso.** Media delle pesate degli ultimi 7 giorni. Filtra le oscillazioni d'acqua e segue il peso reale con circa tre giorni di ritardo.

**TDEE reale.** Calcolato sulle ultime 4 settimane come kcal medie mangiate (stime incluse) meno la variazione di peso convertita in energia con 7700 kcal/kg [2]. La variazione di peso è la pendenza di una regressione lineare pesata sulle pesate, con pesi esponenziali (costante di 14 giorni) che danno più importanza alle ultime due settimane; le kcal sono mediate con gli stessi pesi. L'incertezza (±, una deviazione standard) combina l'errore sulla pendenza e 400 kcal per ogni giorno stimato. Il valore viene mostrato solo se: ci sono almeno 21 giorni di diario e non più di 2 giorni stimati ogni 7; ci sono almeno 8 pesate distribuite su almeno 7 giorni; tra due pesate consecutive, e tra l'ultima e oggi, passano al massimo 7 giorni; l'incertezza non supera ±150 kcal. Una sola pesata anomala, molto pesata perché recente, può spostare la stima di 200-300 kcal, quindi con dati radi il calcolo si sospende invece di dare un numero poco affidabile. Il valore calibrato incorpora anche gli errori sistematici di registrazione, quindi l'obiettivo che ne deriva funziona con il proprio modo di registrare.

**Percorso pianificato.** Parte dalla prima pesata, oppure dal peso di tendenza del giorno in cui si modificano peso obiettivo o deficit, e scende di deficit/7700 kg al giorno fino al peso obiettivo. Con deficit zero è piatto.

**Arrivo previsto.** Distanza tra la tendenza attuale e il peso obiettivo divisa per la velocità di calo misurata. Non compare se il peso non scende o se l'arrivo è oltre un anno.

**Mantenimento.** Deficit zero: l'obiettivo giornaliero coincide con il TDEE in uso e il percorso diventa piatto.

La conversione 7700 kcal/kg è un'approssimazione adeguata per perdite piccole su qualche settimana; su tempi lunghi il corpo si adatta e il calo rallenta [3]. L'aggiornamento periodico del TDEE calibrato assorbe questo effetto.

## Uso consigliato

- Pesarsi al mattino, dopo il bagno e prima di mangiare e bere, sempre nelle stesse condizioni. Le pesate saltate non creano problemi.
- Registrare ogni giorno, anche con stime grossolane. Per i pasti fuori casa conviene avere tre piatti semplici, per esempio "Cena fuori leggera" (1000 kcal), "media" (1400) e "abbondante" (1800).
- Se una cena è stata davvero saltata, registrare un piatto semplice "Cena saltata" da 0 kcal, altrimenti l'app aggiunge la stima di 1400 kcal.
- Aggiornare il TDEE quando il pulsante è giallo, all'incirca una volta al mese.
- Non scendere sotto circa 1500 kcal senza supervisione: l'avviso nelle Impostazioni diventa rosso se l'obiettivo è più basso.

## Dati su Firestore

| Percorso | Contenuto |
|---|---|
| `foods/{id}` | Ingredienti condivisi: `nome`, `unit` (g, mL, pezzo), `kcal` (per 100 g o mL, oppure per pezzo), `fonte`, `note` |
| `dishes/{id}` | Piatti condivisi. Semplici: `type: "simple"`, `unit`, `kcal`, `fonte`, `desc`. Composti: `type: "composed"`, `ingredients: [{foodId, qty}]`, `note` |
| `users/{uid}/entries/{id}` | Voci del diario: `date` (AAAA-MM-GG), `meal`, `qty` (porzioni per i piatti), `foodId` oppure `dishId` |
| `users/{uid}/data/weights` | `map`: {data: kg} |
| `users/{uid}/data/settings` | `altezza`, `peso`, `eta`, `sesso`, `fattore`, `deficit`, `pesoObiettivo`, `tdeeRef`, `tdeeRefDate`, `planStart {date, w}`, `mealHours`, `headerImg` |

I campi `historyVersion` e `historyImported`, rimasti dalle importazioni dai file Excel, non sono più letti.

## Regole di sicurezza

Il contenuto di `firestore.rules` va incollato in Firebase console, Firestore Database, scheda Regole, e pubblicato. Ingredienti e piatti sono leggibili e modificabili da ogni utente autenticato; diario, peso e impostazioni solo dal proprietario.

## Pubblicazione su GitHub Pages

Nel repository servono `index.html`, `manifest.webmanifest`, `sw.js` e la cartella `icons/`. Per aggiornare l'app basta sostituire `index.html`; poi, nell'app, Impostazioni e "Aggiorna" svuotano la cache e ricaricano la pagina. Il service worker usa la rete per prima e la cache solo come riserva quando si è offline. Aperta dall'icona sulla schermata Home, l'app va a tutto schermo.

## Sviluppo

- `app.jsx`: sorgente unico (React 18, Firebase compat 10.12.2, SheetJS e Tailwind da CDN), con la configurazione Firebase del progetto `kcalario-67e66`.
- `build.sh`: compila `app.jsx` in JavaScript puro con esbuild e assembla `index.html`. Non c'è Babel nel browser, che su Safari iOS causava l'errore "appendChild". Richiede `npm i -g esbuild`; se è installato node, controlla anche la sintassi del risultato.

  ```
  bash build.sh
  ```

- Le funzioni di calcolo sono pure e raccolte nel blocco `==calc==` di `app.jsx`, così si possono verificare in node senza browser.
- `index.html` contiene un pannello diagnostico che mostra il messaggio d'errore se l'app non parte.

## Utenti

Il nome in alto a destra viene da `USER_NAMES` in `app.jsx` (email e nome); senza corrispondenza compare l'email. Per aggiungere un utente lo si crea in Firebase Authentication con email e password e, se si vuole il nome, si aggiunge la riga in `USER_NAMES` e si ricompila.

## Versioni

- **2.7**: peso spostato nella card del giorno; area dei grafici scorrevole solo in orizzontale; scale verticali a salti fissi che seguono i giorni visibili (500 kcal, multipli di 0,2 kg) con transizione di 150 ms; grafico del peso più alto (150 px) con linea delle pesate e media a 7 giorni separate; "Tendenza" rinominata "Ritmo di calo" nella sintesi.
- **2.6**: pesata registrabile, correggibile ed eliminabile per il giorno selezionato; TDEE reale mostrato solo con pesate senza buchi oltre 7 giorni e incertezza fino a ±150 kcal; raccordo punteggiato della tendenza; proposta di mantenimento e data di arrivo solo con almeno 3 pesate negli ultimi 7 giorni.
- **2.5**: grafici su tutto lo storico con media a 7 giorni, stime per i giorni incompleti, tendenza e percorso del peso; sintesi con TDEE reale calibrato e pulsante di aggiornamento; peso obiettivo e mantenimento; peso dall'ultima pesata; nota facoltativa nei piatti composti; virgola decimale accettata in tutti i campi; rimosso il codice di importazione una tantum dai file Excel.
- **2.4**: "più mangiati" nella ricerca del diario.
- **2.3**: focus dei campi senza scorrimento della pagina su iOS.
- **2.2**: icona dei piatti, data nel nome del backup, schede che si aprono dall'alto.
- **2.1**: dati sincronizzati dai file Excel, regole per la collezione `dishes`.
- **2.0**: collezioni separate Ingredienti e Piatti, ricerca unificata.
- **1.2**: menu fisso in primo piano sopra la barra di iPhone, nome utente dall'email.
- **1.1**: grafici con asse dei giorni condiviso e scorrimento sincronizzato.
- **1.0**: prima versione con Firebase.

## Riferimenti

1. [M.D. Mifflin, S.T. St Jeor, L.A. Hill, B.J. Scott, S.A. Daugherty, Y.O. Koh, "A new predictive equation for resting energy expenditure in healthy individuals", Am. J. Clin. Nutr., 1990, 51(2), 241-247]
2. [M. Wishnofsky, "Caloric equivalents of gained or lost weight", Am. J. Clin. Nutr., 1958, 6(5), 542-546]
3. [K.D. Hall, G. Sacks, D. Chandramohan, C.C. Chow, Y.C. Wang, S.L. Gortmaker, B.A. Swinburn, "Quantification of the effect of energy imbalance on bodyweight", Lancet, 2011, 378(9793), 826-837]

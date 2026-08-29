# Kcalario — istruzioni per la pubblicazione

App web (PWA) con database Firebase. Utente singolo ora, pronta per aggiungere Martina in futuro.
Alimenti condivisi tra gli utenti; diario, peso e impostazioni privati per ciascuno.

## File
- `index.html` — pagina dell'app
- `app.jsx` — tutto il codice dell'app (qui va incollata la config Firebase)
- `manifest.webmanifest`, `sw.js` — supporto PWA (installazione su schermata Home, offline dello scheletro)
- `icons/` — icone dell'app (bilancia)
- `firestore.rules` — regole di sicurezza del database

---

## Parte 1 — Firebase (5 minuti)

1. Vai su https://console.firebase.google.com e premi **Aggiungi progetto**. Dai un nome (es. `kcalario`), puoi disattivare Google Analytics.
2. Nel menu a sinistra: **Build → Authentication → Get started**. Apri la scheda **Sign-in method**, abilita **Email/Password** e salva.
3. Nel menu: **Build → Firestore Database → Create database**. Scegli **Production mode** e una region europea (es. `europe-west`).
4. Apri la scheda **Rules** di Firestore, incolla il contenuto del file `firestore.rules` e premi **Publish**.
5. Torna in **Project settings** (ingranaggio in alto a sinistra) → scheda **General** → sezione **Your apps** → icona **</>** (Web). Registra un'app (nickname `kcalario`, NON serve Firebase Hosting). Alla fine ti mostra un oggetto `firebaseConfig`: **copialo**.

## Parte 2 — Incolla la config

Apri `app.jsx`, in cima trovi:

```js
const firebaseConfig = {
  apiKey: "INCOLLA_API_KEY",
  ...
};
```

Sostituisci l'intero oggetto con quello copiato dalla console. Salva.
Nota: queste chiavi non sono segrete, possono stare in un repo pubblico. La sicurezza è data dalle regole del punto 4.

## Parte 3 — Pubblica su GitHub Pages

1. Crea un repository su GitHub (es. `kcalario`). Può essere pubblico.
2. Carica **tutto il contenuto della cartella** `kcalario_app` nella radice del repository: `index.html`, `app.jsx`, `manifest.webmanifest`, `sw.js` e la cartella `icons/`.
   (Da web: "Add file → Upload files", trascina i file e la cartella icons.)
3. Nel repo: **Settings → Pages**. In **Source** scegli **Deploy from a branch**, branch `main`, cartella `/ (root)`. Salva.
4. Dopo 1–2 minuti l'app è online all'indirizzo indicato lì, tipo:
   `https://TUONOME.github.io/kcalario/`

## Parte 4 — Primo accesso

1. Apri l'indirizzo. Premi **Registrati**, crea il tuo account con email e password (min. 6 caratteri).
2. Al primo avvio la libreria alimenti si popola da sola con i 42 alimenti già preparati.
3. Per aggiungere **Martina**: dal suo telefono apre lo stesso indirizzo e si registra con la sua email. Vedrà gli stessi alimenti, ma diario e peso separati.

## Parte 5 — Installa sulla schermata Home

- **iPhone (Safari):** apri l'indirizzo → tasto Condividi → **Aggiungi a Home**. Parte a tutto schermo con l'icona della bilancia.
- **Android (Chrome):** menu ⋮ → **Installa app** / **Aggiungi a schermata Home**.

---

## Aggiornare l'app in futuro
Quando ti mando una nuova versione, sostituisci i file nel repo. Sul telefono apri **Impostazioni → Aggiorna** dentro l'app: svuota la cache e ricarica l'ultima versione.

## Note
- **Offline:** lo scheletro dell'app è memorizzato, ma per leggere/salvare i dati serve la rete (il database è online).
- **Immagine header:** viene ridimensionata e salvata nel tuo profilo; è personale, non condivisa.
- **Backup:** dalla pagina Impostazioni puoi esportare tutto in Excel quando vuoi.
- **Esci:** in fondo a Impostazioni, per cambiare utente sullo stesso dispositivo.

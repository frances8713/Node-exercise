import express from "express"
import "express-async-errors"

const app1 = express()

app1.get("/colors", (request, response) => {
    response.json([
        { name : "Green"},
        { name: "White"}
    ]);
});

export default app1;


//Siccome avevo creato ad inizio lezioni sul http un server con express seguendo Simon, lanciando npm run dev
//e poi curl si vede come messaggio Up and running cioè il primo creato. Probabilmente perché negli script c'è
//sia watch dist/ e sia altre impostazioni che comprendono la cartella src. Ho provato a fare delle modifiche ma
//si era rotto tutto e non ho proseguito.Facendo npm test passano tutti quindi penso che sia corretto ma
//se hai modo di dirmi dove sbaglio, modifico...grazie!

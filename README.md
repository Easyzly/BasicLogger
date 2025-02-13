# Logbeheer Applicatie

## Vereisten

- Node.js (v14 of hoger)
- npm (v6 of hoger)

## Installatie

1. Installeer de afhankelijkheden:

    ```sh
    npm install
    ```

## De Applicatie Starten

2. Start de server:

    ```sh
    node server.js
    ```

   2. Open je browser en navigeer naar:

       ```
       http://localhost:3000 (voor macOS en Linux)
       ```

      of

       ```
      bezoek de locatie van de index.html
       ```

## API Eindpunten

- `GET /logs` - Haal alle logs op
- `POST /log` - Maak een nieuwe log aan
- `DELETE /log/:id` - Verwijder een log op ID
- `GET /country` - Haal landdetails op
- `POST /country` - Sla landdetails op

## Gebruik

- Om een nieuwe log toe te voegen, vul de logdetails in en klik op de knop "Verzenden".
- Om een log te verwijderen, klik op de knop "Verwijderen" naast de logvermelding.
- Om landdetails bij te werken, vul de landdetails in en klik op de knop "Opslaan".

## Opmerkingen

- Zorg ervoor dat de server draait voordat je de applicatie in de browser opent.
- De applicatie gebruikt een `data.json` bestand om logs en landdetails op te slaan.
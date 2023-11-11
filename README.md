# Tarte Flambee

Dies ist ein kleines Spassprojekt, um die Organisation von Tarte Flambee Turnieren zu vereinfachen. Es entstand, als ich mir den Livestream von NoWay4u_Sir am Freitagabend, den 10. November 2023 ansah. Pull Requests / Hilfe von der Community ist herzlich willkommen.

## Funktionen und Roadmap

- [x] Anmeldung mit Discord
- [x] Anlegen von Tarte Flambee Turnieren (nur Freddy)
  - [x] Name und Datum
  - [x] Turnier aktivieren/deaktivieren
  - [ ] Gewährleisten dass nur ein Turnier gleichzeitig aktiv sein kann. Muss
        momentan manuell gewährleistet werden.
- [x] Anmeldung zu Tarte Flambee Turnieren
  - [x] Ingame-Name und Ranking als Freitext
  - [ ] Validierung des Ingame-Benutzernamens
  - [ ] Riot API Integration um Ranking zu validieren
  - [ ] OpenAI Integration um Wahrscheinlichkeit des Rankings zu schätzen
- [x] Anzeige der Teilnehmer pro Tournier
  - [ ] Teilnehmer nach Ranking zeigen (separate listen für Silber, Gold, etc)
  - [ ] Filter-/Sortier-Funktion für Teilnehmer (z.B. nach Ranking)
  - [ ] Spielerstatiskiken automatisch von Riot laden und anzeigen
- [ ] Zufälliges Auswahlverfahren Spieler pairings zu erstellen (pro Ranking)

## In dieser Anwendung verwendete Technologien

Dies ist ein [T3 Stack](https://create.t3.gg/) Projekt, das mit `create-t3-app` gebootstrapped wurde.

Wenn du mit den verschiedenen Technologien, die in diesem Projekt verwendet werden, nicht vertraut bist, schaue bitte in die entsprechenden Dokumente.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Mehr erfahren

Um mehr über den [T3 Stack](https://create.t3.gg/) zu erfahren, können die folgenden Ressourcen konsultiert werden:

- [Dokumentation](https://create.t3.gg/)
- Den [T3 Stack] kennenlernen(https://create.t3.gg/en/faq#what-learning-resources-are-currently-available)

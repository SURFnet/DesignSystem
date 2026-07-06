# Aantekeningen bij implementatie Spartan-ng helm components

Spartan-ng heeft een package `@spartan-ng/brain` die de logica van alle componenten bevat. Daarnaast zijn er helm-components die de styling regelen. Deze zijn niet als package afneembaar, maar worden lokaal gescaffold in de eigen repository middels commando's die met `spartan-ng/cli` beschikbaar zijn. Dit resulteert in de `hlm-*.ts` componenten die zijn opgenomen in folder `package/angular`.

## Aanpassingen gemaakt voor de POC

- In de POC hebben we een subset van componenten opgenomen. Naast deze componenten zijn er nog een paar extra componenten in de code aanwezig, namelijk [icon, sheet, skeleton, tooltip]. Dit is het geval omdat de andere componenten daar afhankelijk van zijn. Omdat de helm-components niet als package afneembaar zijn moeten ze in de code aanwezig zijn om te zorgen dat de gekozen componenten succesvol werken.
- Default spartan-ng helm-components gebruiken lucide icons i.p.v. phospor icon. Na scaffolden van de helm components is dit aangepast; dat was vrij snel geregeld.

## Verschil in UI tussen Angular en React storybook

- Button - geen interactieve control 'children' beschikbaar in Angular om de text van de button te wijzigen.
- Checkbox - wordt uitgevinkt als je 'disabled' op true zet, omdat de template re-rendert. Dit lijkt Storybook-specifiek.
- Dropdown Menu - With Checkbox Items - blijft niet open staan als je een item aanklikt.
- Field / Input / TextArea - De ingestelde error state triggert pas na interactie met de control. De error werkt wel op basis van echte validators in plaats van een hardcoded invalide status van React.
- Input - Alle inputs zijn even breed in Angular. In React niet, omdat sommige story's een default rendering pakken en dan geen `w-72` CSS class toepassen.
- InputGroup - De inputs zijn iets minder breed, ondanks dat dezelfde CSS classes zijn toegepast.

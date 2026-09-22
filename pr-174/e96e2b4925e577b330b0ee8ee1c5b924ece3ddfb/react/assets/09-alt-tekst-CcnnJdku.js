import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Slechte alt-tekst`}),`
`,(0,c.jsx)(n.h1,{id:`slechte-alt-tekst`,children:`Slechte alt-tekst`}),`
`,(0,c.jsxs)(n.p,{children:[`Een alt-tekst is geen bijschrift voor wie de afbeelding wél ziet. Het is de afbeelding, voor wie
de pagina `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`beluistert`}),`.
Beschrijf de betekenis in deze context, niet de pixels.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`Zonder `,(0,c.jsx)(n.code,{children:`alt`}),` leest een screenreader vaak de bestandsnaam voor: "grafiek-q3-final-v2.png". Met
`,(0,c.jsx)(n.code,{children:`alt="afbeelding"`}),` of `,(0,c.jsx)(n.code,{children:`alt="icoon"`}),` weet de luisteraar dat er iets is, niet wat het betekent.
Het omgekeerde is ook een probleem: een sfeerfoto mét een uitgebreide beschrijving onderbreekt
de inhoud met iets dat niets toevoegt, of herhaalt de alinea ernaast.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Tekst `,(0,c.jsx)(n.em,{children:`in`}),` een afbeelding (een poster, een meme, een scan) zit vast in pixels. Wie vergroot of
een eigen lettertype gebruikt, komt er niet bij — zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--tekst-in-afbeeldingen`,children:`Tekst in afbeeldingen`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Beschrijf wat de afbeelding in deze context overbrengt. Is er niets over te brengen, dan is de
afbeelding decoratief.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Decoratief: wordt overgeslagen -->
<img src="golf.svg" alt="" />

<!-- Informatief: de conclusie, niet de kleuren -->
<img src="aanmeldingen.svg" alt="Aanmeldingen stegen van 120 in januari naar 340 in juni" />

<!-- Icoonknop: de actie, niet het icoon. De alt-tekst in dit voorbeeld wordt de "tekst" van de knop. -->
<button type="button">
  <img src="trash.svg" alt="Factuur verwijderen" />
</button>

<!-- Logo van de organisatie in de header geeft aan welke actie de gebruiker kan verwachten als de link wordt geactiveerd -->
<a href="https://www.surf.nl">
    <img src="surf-logo.svg" alt="Logo SURF, ga naar de homepage" />
 </a>
`})}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Situatie`}),(0,c.jsx)(n.th,{children:`Alt-tekst`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Decoratief (sfeer, scheiding, herhaald icoon)`}),(0,c.jsxs)(n.td,{children:[`Leeg: `,(0,c.jsx)(n.code,{children:`alt=""`}),`. De afbeelding wordt overgeslagen`]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Foto die sfeer toevoegt, geen informatie`}),(0,c.jsx)(n.td,{children:`Leeg, of één korte zin als de foto wél iets beweert`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Knop of link die alleen een icoon is`}),(0,c.jsx)(n.td,{children:`De actie: "Factuur verwijderen", niet "prullenbak-icoon"`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Grafiek of infographic`}),(0,c.jsx)(n.td,{children:`De conclusie: "Aanmeldingen stegen van 120 naar 340", met aanvullende data in een tabel vlakbij de grafiek`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Screenshot in een handleiding`}),(0,c.jsx)(n.td,{children:`Wat je eruit moet halen, niet "screenshot van stap 3"`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Logo van de organisatie in de header`}),(0,c.jsx)(n.td,{children:`De organisatienaam, één keer`})]})]})]}),`
`,(0,c.jsxs)(n.p,{children:[`Niet doen: `,(0,c.jsx)(n.code,{children:`alt="afbeelding"`}),`, `,(0,c.jsx)(n.code,{children:`alt="icoon"`}),`, een bestandsnaam, of de eerste alinea van het
artikel ernaast herhalen. Staat de informatie al in de lopende tekst, dan is de afbeelding
decoratief.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Een bijschrift is extra uitleg voor iedereen. Die vervangt de alt-tekst niet: zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--ontbrekende-bijschriften`,children:`Ontbrekende bijschriften`}),`.
Hoe je een informatieve afbeelding zelf laat vergroten, staat bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-designers--touch-en-vergroting`,children:`Touch en vergroting`}),`.
Ontbreekt het attribuut helemaal, dan is dat
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--afbeeldingen-zonder-beschrijving`,children:`Afbeeldingen zonder beschrijving`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
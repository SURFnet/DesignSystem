import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Teveel ARIA`}),`
`,(0,c.jsx)(n.h1,{id:`teveel-aria`,children:`Teveel ARIA`}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`Geen ARIA is beter dan slechte ARIA.`}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`Dat is de eerste regel van ARIA, in de woorden van het W3C zelf. Wie de pagina
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`beluistert`}),`
krijgt beloftes die jij in JavaScript moet nakomen. Native HTML komt die beloftes al na.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`Grootschalige scans laten stelselmatig zien dat pagina's mét ARIA gemiddeld `,(0,c.jsx)(n.em,{children:`méér`}),` aantoonbare
toegankelijkheidsfouten bevatten dan pagina's zonder: niet omdat de attributen op zichzelf
schadelijk zijn, maar omdat ernaar grijpen een symptoom is van het verkeerde element bouwen.`]}),`
`,(0,c.jsxs)(n.p,{children:[`ARIA verandert wat hulpsoftware over een element te horen krijgt. Meer niet. Het voegt `,(0,c.jsx)(n.strong,{children:`geen
gedrag`}),` toe: `,(0,c.jsx)(n.code,{children:`role="button"`}),` maakt een element niet focusbaar, niet activeerbaar met`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(`kbd`,{children:`Enter`}),` en niet indrukbaar met `,(0,c.jsx)(`kbd`,{children:`Spatie`}),`. Het voegt `,(0,c.jsx)(n.strong,{children:`geen opmaak`}),` toe:
`,(0,c.jsx)(n.code,{children:`aria-expanded="true"`}),` opent niets.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Een `,(0,c.jsx)(n.code,{children:`div`}),` met `,(0,c.jsx)(n.code,{children:`role="button"`}),` staat niet betrouwbaar in de knoppenlijst van een screenreader, werkt
niet met spraakbesturing, en mist het toetsenbordcontract. Dat is erger dan
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--naamloze-knoppen`,children:`een knop zonder naam`}),`:
het element liegt over wat het is.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:`Geeft een bestaand HTML-element of -attribuut je de semantiek en het gedrag dat je nodig hebt,
gebruik dat dan in plaats van een element te herbestemmen en er ARIA op te plakken.`})}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: drie attributen, een toetsafhandelaar, en nog steeds geen knop -->
<div role="button" tabindex="0" onclick="opslaan()" onkeydown="...">Opslaan</div>

<!-- Wel doen -->
<button type="button" onclick="opslaan()">Opslaan</button>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`De native variant is focusbaar, staat in de tabvolgorde, reageert op `,(0,c.jsx)(`kbd`,{children:`Enter`}),` en`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(`kbd`,{children:`Spatie`}),`, wordt aangekondigd als knop, werkt met spraakbesturing, respecteert de
hoog-contrastmodus van het besturingssysteem, en verschijnt wanneer een screenreadergebruiker om een
lijst met knoppen vraagt.`]}),`
`,(0,c.jsx)(n.p,{children:`De vijf regels van het W3C dekken de fouten die volgen zodra ARIA onvermijdelijk is.`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`2. Verander de native semantiek niet, tenzij het echt moet.`}),` Heb je een kop nodig die als tab
werkt, zet de tab dan in de kop in plaats van de rol van de kop te overschrijven.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen -->
<h2 role="tab">Facturatie</h2>

<!-- Wel doen -->
<h2><div role="tab">Facturatie</div></h2>
`})}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`3. Alle bedienbare ARIA-elementen moeten met het toetsenbord werken.`}),` Geef je iets
`,(0,c.jsx)(n.code,{children:`role="slider"`}),`, dan ben je pijltoetsen, `,(0,c.jsx)(`kbd`,{children:`Home`}),` en `,(0,c.jsx)(`kbd`,{children:`End`}),` verschuldigd. Een rol
zonder het bijbehorende toetsenbordcontract is een leugen.`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsxs)(n.strong,{children:[`4. Zet nooit `,(0,c.jsx)(n.code,{children:`role="presentation"`}),` of `,(0,c.jsx)(n.code,{children:`aria-hidden="true"`}),` op een focusbaar element.`]}),` Dat levert
een element op dat een toetsenbordgebruiker wel kan bereiken en een screenreader niet kan
beschrijven: de focus landt op niets.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: bereikbaar met Tab, onzichtbaar voor een screenreader -->
<button aria-hidden="true">Sluiten</button>

<!-- Wel doen: verberg het icoon, benoem de knop -->
<button type="button" aria-label="Sluiten">
  <svg aria-hidden="true">...</svg>
</button>
`})}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`5. Elk bedienbaar element heeft een toegankelijke naam nodig.`}),` Uit de eigen tekst, een `,(0,c.jsx)(n.code,{children:`label`}),`,
`,(0,c.jsx)(n.code,{children:`aria-label`}),` of `,(0,c.jsx)(n.code,{children:`aria-labelledby`}),`. Zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--naamloze-knoppen`,children:`Naamloze knoppen`}),`.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Vrijwel alle ARIA die je anders zou schrijven, is in Curve al geregeld. Base UI (React) en de
Brain-laag van Spartan (Angular) implementeren het WAI-ARIA-patroon per component. Betrap je
jezelf erop dat je `,(0,c.jsx)(n.code,{children:`role`}),`, `,(0,c.jsx)(n.code,{children:`aria-expanded`}),` of `,(0,c.jsx)(n.code,{children:`aria-selected`}),` aan een Curve-component toevoegt,
stop dan: of het component zet het al, of je gebruikt het verkeerde component.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Bouw je iets dat Curve niet heeft, gebruik dan het patroon uit de
`,(0,c.jsx)(n.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/`,rel:`nofollow`,children:`ARIA Authoring Practices Guide`}),`. Wat er legitiem
overblijft — benoemen, beschrijven, live regions en status — staat in
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--verkeerde-aria`,children:`Verkeerde ARIA`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
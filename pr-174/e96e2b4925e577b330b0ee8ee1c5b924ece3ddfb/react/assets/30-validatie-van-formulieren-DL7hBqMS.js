import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Onduidelijke validatie`}),`
`,(0,c.jsx)(n.h1,{id:`onduidelijke-validatie`,children:`Onduidelijke validatie`}),`
`,(0,c.jsxs)(n.p,{children:[`"Ongeldige invoer" zegt dat er iets mis is, niet wát, en niet hoe het wél moet. Wie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`onder druk staat of de vorige stap is vergeten`}),`
heeft beide nodig, bij het veld waar het misging, in een vorm die ook voorgelezen wordt.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`Een rood veld zonder zin, een `,(0,c.jsx)(n.code,{children:`disabled`}),` verzendknop zonder uitleg, of een melding bovenin de
pagina terwijl de fout onderin zit: de gebruiker moet gokken. Verwijzen naar "het rode veld" of
"hierboven" valt weg voor wie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--status-alleen-in-kleur`,children:`geen kleur ziet`}),`
of de pagina beluistert.`]}),`
`,(0,c.jsx)(n.p,{children:`Technisch gaat het nóg vaker mis. De melding staat ernaast maar is niet gekoppeld, dus een
screenreader leest het veld voor als geldig. Na een mislukte verzending blijft de focus op de
knop. Wat al was ingevuld, is weg. WCAG 3.3.1 en 3.3.3 vragen dat fouten geïdentificeerd worden
én dat je een suggestie krijgt.`}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Noem het probleem én de oplossing, in gewone taal, bij het veld. Koppel de melding, markeer het
veld, en verplaats de focus.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: alleen een rode rand, knop uitgeschakeld, niks gekoppeld -->
<input type="email" class="border-red-600" />
<button type="submit" disabled>Versturen</button>

<!-- Wel doen: label, melding, invalid, beschrijving -->
<label for="email">E-mailadres</label>
<input id="email" type="email" aria-invalid="true" aria-describedby="email-fout" />
<p id="email-fout">Vul een geldig e-mailadres in, bijvoorbeeld naam@instelling.nl</p>
<button type="submit">Versturen</button>
`})}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`In plaats van`}),(0,c.jsx)(n.th,{children:`Schrijf`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Ongeldige invoer`}),(0,c.jsx)(n.td,{children:`Vul een datum in als DD-MM-JJJJ, bijvoorbeeld 04-09-2026`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Verplicht veld`}),(0,c.jsx)(n.td,{children:`Vul een e-mailadres in`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Fout`}),(0,c.jsx)(n.td,{children:`Dit wachtwoord is te kort. Gebruik minimaal 12 tekens`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Probeer het opnieuw`}),(0,c.jsx)(n.td,{children:`We konden niet opslaan. Controleer je verbinding en probeer het nog eens`})]})]})]}),`
`,(0,c.jsxs)(n.p,{children:[`Zeg wat er wél mag, niet alleen wat er fout is. Kleur mag, nooit alleen. De zinnen zelf zijn
copywerk: zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--vage-foutmeldingen`,children:`Vage foutmeldingen`}),`
en, voor wie de teksten schrijft,
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-designers--validatie-van-formulieren`,children:`Validatie van formulieren`}),`.`]}),`
`,(0,c.jsx)(n.p,{children:`Technisch, allemaal nodig:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Een `,(0,c.jsx)(n.code,{children:`<label>`}),` dat aan het veld gekoppeld is.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`aria-invalid="true"`}),` op het afgekeurde veld.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`aria-describedby`}),` naar de zichtbare melding (en eventueel naar de hulptekst).`]}),`
`,(0,c.jsx)(n.li,{children:`Na een mislukte verzending de focus naar een zinnige plek: de samenvatting of het eerste
veld met een fout.`}),`
`,(0,c.jsxs)(n.li,{children:[`Een live region als de melding verschijnt zonder herladen. Hoe je die zet, staat bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--verkeerde-aria`,children:`Verkeerde ARIA`}),`.`]}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`Mensen maken typefouten, kiezen de verkeerde optie, of sturen een formulier te vroeg in. Een
toegankelijk product straft dat niet af.`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Toon de eisen `,(0,c.jsx)(n.em,{children:`vóór`}),` het versturen: het datumformaat, de minimale lengte, wat verplicht is.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Houd de verzendknop bruikbaar. Een `,(0,c.jsx)(n.code,{children:`disabled`}),` knop zonder uitleg is een doodlopende weg.`]}),`
`,(0,c.jsx)(n.li,{children:`Laat iemand een destructieve actie bevestigen ("Factuur 2026-104 verwijderen?"), en bied
daarna een manier om terug te gaan als dat nog kan.`}),`
`,(0,c.jsx)(n.li,{children:`Bewaar wat al is ingevuld als er iets misgaat. "Begin opnieuw" is geen herstel, het is straf.`}),`
`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
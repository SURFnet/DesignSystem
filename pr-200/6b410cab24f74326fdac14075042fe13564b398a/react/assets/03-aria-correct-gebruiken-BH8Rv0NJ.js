import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Verkeerde ARIA`}),`
`,(0,c.jsx)(n.h1,{id:`verkeerde-aria`,children:`Verkeerde ARIA`}),`
`,(0,c.jsxs)(n.p,{children:[`Als je native HTML echt hebt uitgeput, is ARIA het juiste gereedschap. Wie de pagina
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`beluistert`}),`
hoort dan een naam, een beschrijving, een status of een verandering. Zonder die vier blijft een
visuele wijziging stil.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Heb je het native element nog niet uitgeput, begin dan bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--teveel-aria`,children:`Teveel ARIA`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`ARIA wordt het vaakst verkeerd ingezet op plekken waar het wél nodig is. Een `,(0,c.jsx)(n.code,{children:`aria-label`}),` op een
`,(0,c.jsx)(n.code,{children:`div`}),` zonder rol doet niets. `,(0,c.jsx)(n.code,{children:`aria-labelledby`}),` overschrijft de zichtbare tekst, en de knop zegt
dan "Annuleren" terwijl er "Opslaan" op staat. `,(0,c.jsx)(n.code,{children:`aria-expanded`}),` zit op het paneel in plaats van op
de knop. Een live region wordt pas in de DOM gezet als de melding er al in staat, en kondigt
daardoor niets aan.`]}),`
`,(0,c.jsx)(n.p,{children:`De visuele status verandert, het attribuut niet. Een screenreadergebruiker hoort een ingeklapte
knop die open is, of mist de foutmelding die naast het veld staat.`}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Vier taken, en verder niets: benoemen, beschrijven, status doorgeven, verandering aankondigen.`}),`
`,(0,c.jsx)(n.h3,{id:`benoemen`,children:`Benoemen`}),`
`,(0,c.jsx)(n.p,{children:`Een toegankelijke naam is wat een screenreader voorleest bij een element. HTML biedt meerdere
manieren om die te zetten, en ze verdringen elkaar in een vaste volgorde:`}),`
`,(0,c.jsx)(n.p,{children:(0,c.jsxs)(n.strong,{children:[(0,c.jsx)(n.code,{children:`aria-labelledby`}),` → `,(0,c.jsx)(n.code,{children:`aria-label`}),` → de eigen inhoud → `,(0,c.jsx)(n.code,{children:`title`})]})}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`aria-labelledby`}),` wint van alles, ook van zichtbare tekst: en dat is de meest voorkomende oorzaak
van "er staat Opslaan maar hij zegt Annuleren". Gebruik bij voorkeur zichtbare tekst die je niet
hoefde te verdubbelen:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Het beste: de zichtbare tekst ís de naam -->
<button type="button">Factuur verwijderen</button>

<!-- Alleen een icoon: benoem de knop, verberg de decoratie -->
<button type="button" aria-label="Factuur verwijderen">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>

<!-- Verwijs naar tekst die al op het scherm staat -->
<section aria-labelledby="totalen-kop">
  <h2 id="totalen-kop">Totalen</h2>
</section>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Twee regels die veel zoekwerk schelen: `,(0,c.jsx)(n.code,{children:`aria-label`}),` wordt genegeerd op elementen zonder rol — op
een `,(0,c.jsx)(n.code,{children:`div`}),` of `,(0,c.jsx)(n.code,{children:`span`}),` doet het niets — en de tekst van een zichtbaar label moet in de toegankelijke
naam voorkomen, anders kunnen gebruikers van spraakbesturing niet uitspreken wat ze zien.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Bij formuliervelden wint een echt `,(0,c.jsx)(n.code,{children:`<label>`}),` van dit alles. Dat geeft je de naam én een groter
klikgebied. Zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--naamloze-knoppen`,children:`Naamloze knoppen`}),`.`]}),`
`,(0,c.jsx)(n.h3,{id:`beschrijven`,children:`Beschrijven`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`aria-describedby`}),` voegt aanvullende informatie toe die ná de naam wordt voorgelezen: hulptekst,
formaateisen, foutmeldingen. Anders dan bij benoemen mag je hier meerdere id's opgeven.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<label for="ww">Wachtwoord</label>
<input id="ww" type="password" aria-describedby="ww-hint ww-fout" aria-invalid="true" />
<p id="ww-hint">Minimaal 12 tekens.</p>
<p id="ww-fout">Dit wachtwoord is te kort.</p>
`})}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`aria-invalid`}),` markeert het veld als afgekeurd; de melding zelf moet nog steeds echte tekst zijn,
gekoppeld aan het veld, en zichtbaar. Het koppelen van fouten staat bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--onduidelijke-validatie`,children:`Onduidelijke validatie`}),`.`]}),`
`,(0,c.jsx)(n.h3,{id:`status`,children:`Status`}),`
`,(0,c.jsx)(n.p,{children:`Statusattributen vertellen hulpsoftware wat je CSS visueel al laat zien. Je werkt ze bij op
dezelfde plek waar je de class bijwerkt.`}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Attribuut`}),(0,c.jsx)(n.th,{children:`Waarvoor`}),(0,c.jsx)(n.th,{children:`Let op`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`aria-expanded`})}),(0,c.jsx)(n.td,{children:`Uitklappers, accordions, comboboxen, menu's`}),(0,c.jsxs)(n.td,{children:[`Hoort op de `,(0,c.jsx)(n.strong,{children:`knop`}),`, niet op het paneel`]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`aria-current`})}),(0,c.jsx)(n.td,{children:`De actieve pagina in een navigatie, de huidige stap`}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:`aria-current="page"`}),`: niet `,(0,c.jsx)(n.code,{children:`aria-selected`})]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`aria-selected`})}),(0,c.jsx)(n.td,{children:`Tabs, opties in een listbox`}),(0,c.jsx)(n.td,{children:`Alleen geldig binnen die patronen`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`aria-checked`})}),(0,c.jsx)(n.td,{children:`Eigen checkboxen, radio's, switches`}),(0,c.jsx)(n.td,{children:`Native invoervelden regelen dit zelf`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`aria-disabled`})}),(0,c.jsx)(n.td,{children:`Elementen die focusbaar moeten blijven`}),(0,c.jsx)(n.td,{children:`Je moet de actie zelf blokkeren`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`aria-pressed`})}),(0,c.jsx)(n.td,{children:`Schakelknoppen`}),(0,c.jsx)(n.td,{children:`Een knop die aan blijft staan, niet een die navigeert`})]})]})]}),`
`,(0,c.jsxs)(n.p,{children:[`De fout is altijd dezelfde: de visuele status verandert en het attribuut niet. Betrap je jezelf
erop dat je `,(0,c.jsx)(n.code,{children:`aria-expanded`}),` met de hand op een Curve-component zet, dan beheert het component dat
allang.`]}),`
`,(0,c.jsx)(n.h3,{id:`verandering-aankondigen`,children:`Verandering aankondigen`}),`
`,(0,c.jsx)(n.p,{children:`Verandert er iets zonder dat de pagina herlaadt — een aantal zoekresultaten, een
opgeslagen-melding, een foutsamenvatting — dan ziet een ziende gebruiker dat en hoort een
screenreadergebruiker niets. Live regions lossen dat op.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Moet in de DOM staan vóórdat de tekst verandert -->
<p role="status" aria-live="polite">3 resultaten</p>
`})}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`role="status"`}),` (impliciet `,(0,c.jsx)(n.code,{children:`aria-live="polite"`}),`) wacht op een pauze. Gebruik dit vrijwel altijd.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`role="alert"`}),` (impliciet `,(0,c.jsx)(n.code,{children:`assertive`}),`) onderbreekt meteen. Bewaar dat voor fouten die je
tegenhouden; meer dan dat is vijandig.`]}),`
`,(0,c.jsxs)(n.li,{children:[`De container moet aanwezig en leeg zijn `,(0,c.jsx)(n.em,{children:`voordat`}),` je hem vult. Een element toevoegen dat de
melding al bevat, kondigt meestal niets aan.`]}),`
`,(0,c.jsx)(n.li,{children:`Houd het kort, en zet nooit een live region op iets dat continu verandert.`}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`dingen-verbergen`,children:`Dingen verbergen`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`aria-hidden="true"`}),` haalt een element uit de toegankelijkheidsboom terwijl het zichtbaar blijft.
Dat klopt voor decoratieve iconen en gedupliceerde tekst; het is een fout op alles wat focusbaar
is, of op de enige versie van een stuk informatie.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Voor het omgekeerde — wel voor screenreaders, niet op het scherm — gebruik je een utility-class
die het element visueel verbergt, en niet `,(0,c.jsx)(n.code,{children:`display: none`}),`, want dat verbergt het voor iedereen.`]}),`
`,(0,c.jsx)(n.h3,{id:`controleer-het-in-de-toegankelijkheidsboom`,children:`Controleer het in de toegankelijkheidsboom`}),`
`,(0,c.jsxs)(n.p,{children:[`Je eigen opmaak lezen bewijst niets, want browsers berekenen namen en rollen met regels die
makkelijk tegenvallen. Open DevTools → `,(0,c.jsx)(n.strong,{children:`Elements`}),` → `,(0,c.jsx)(n.strong,{children:`Accessibility`}),` en lees de berekende naam,
rol en status. Of schrijf de assertie:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`// Faalt als de toegankelijke naam ontbreekt, fout is of overschreven wordt
screen.getByRole('button', { name: 'Factuur verwijderen' });
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Kan een zoekopdracht op rol en naam jouw element niet vinden, dan vindt geen enkele
screenreadergebruiker het. De stappen staan bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-je-werk-testen--handmatig-testen`,children:`Handmatig testen`}),`.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Bouw je iets nieuws, gebruik dan de
`,(0,c.jsx)(n.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/`,rel:`nofollow`,children:`ARIA Authoring Practices Guide`}),`. Elk patroon vermeldt
de rollen, de statussen en het volledige toetsenbordcontract.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
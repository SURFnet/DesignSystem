import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Afbeeldingen zonder beschrijving`}),`
`,(0,c.jsx)(n.h1,{id:`afbeeldingen-zonder-beschrijving`,children:`Afbeeldingen zonder beschrijving`}),`
`,(0,c.jsxs)(n.p,{children:[`Wie de pagina `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`beluistert`}),`
ziet de afbeelding nooit. De alt-tekst ís de afbeelding.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`Zonder `,(0,c.jsx)(n.code,{children:`alt`}),` leest een screenreader vaak de bestandsnaam voor: "grafiek-q3-final-v2.png". Met
`,(0,c.jsx)(n.code,{children:`alt="afbeelding"`}),` of `,(0,c.jsx)(n.code,{children:`alt="icoon"`}),` weet de luisteraar dat er iets is, niet wat het betekent. Een
informatieve grafiek zonder beschrijving valt gewoon weg.`]}),`
`,(0,c.jsx)(n.p,{children:`Het omgekeerde is ook een probleem: een sfeerfoto of een decoratief scheidingslijntje mét een
uitgebreide alt-tekst onderbreekt de inhoud met iets dat niets toevoegt.`}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Beschrijf wat de afbeelding in deze context overbrengt, niet de pixels. Is er niets over te brengen,
dan is de afbeelding decoratief.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Decoratief: wordt overgeslagen -->
<img src="golf.svg" alt="" />

<!-- Informatief: de conclusie, niet de kleuren -->
<img src="aanmeldingen.svg" alt="Aanmeldingen stegen van 120 in januari naar 340 in juni" />

<!-- Icoonknop: de actie, niet het icoon -->
<button type="button" aria-label="Factuur verwijderen">
  <img src="trash.svg" alt="" />
</button>
`})}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Situatie`}),(0,c.jsx)(n.th,{children:`Alt-tekst`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Sfeer, scheiding, herhaald icoon`}),(0,c.jsxs)(n.td,{children:[`Leeg: `,(0,c.jsx)(n.code,{children:`alt=""`})]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Grafiek of infographic`}),(0,c.jsx)(n.td,{children:`De conclusie in één zin`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Screenshot in een handleiding`}),(0,c.jsx)(n.td,{children:`Wat je eruit moet halen`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Logo in de header`}),(0,c.jsx)(n.td,{children:`De organisatienaam, één keer`})]})]})]}),`
`,(0,c.jsxs)(n.p,{children:[`Niet doen: `,(0,c.jsx)(n.code,{children:`alt="afbeelding"`}),`, een bestandsnaam, of de alinea ernaast herhalen. Meer voorbeelden
staan bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--slechte-alt-tekst`,children:`Slechte alt-tekst`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
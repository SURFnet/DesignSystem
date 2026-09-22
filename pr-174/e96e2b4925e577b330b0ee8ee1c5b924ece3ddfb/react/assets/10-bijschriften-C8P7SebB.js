import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Ontbrekende bijschriften`}),`
`,(0,c.jsx)(n.h1,{id:`ontbrekende-bijschriften`,children:`Ontbrekende bijschriften`}),`
`,(0,c.jsxs)(n.p,{children:[`Een bijschrift is extra uitleg voor iedereen: wie ziet én wie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`beluistert`}),`.
Het vervangt de alt-tekst niet, en de alt-tekst herhaalt het bijschrift niet.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`Een zin onder een afbeelding in een gewone `,(0,c.jsx)(n.code,{children:`<p>`}),` hoort visueel bij het plaatje, maar niet in de
opmaak. Een screenreader leest hem als de volgende alinea, niet als toelichting bij de figuur.
Het omgekeerde: de hele uitleg in de alt-tekst stoppen. Wie de afbeelding wél ziet, mist die
context, en wie beluistert hoort een alinea waar een korte beschrijving hoort.`]}),`
`,(0,c.jsx)(n.p,{children:`Nog een valkuil: alt en bijschrift dezelfde zin. Dan hoort de luisteraar twee keer "Aanmeldingen
stegen van 120 naar 340". WCAG 1.3.1 (Info and Relationships) eist dat de relatie in de HTML zit,
niet alleen in de pixels.`}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsxs)(n.p,{children:[`Zet de afbeelding in een `,(0,c.jsx)(n.code,{children:`<figure>`}),` met een `,(0,c.jsx)(n.code,{children:`<figcaption>`}),`. De alt-tekst beschrijft wat de
afbeelding overbrengt; het bijschrift geeft context die iedereen nodig heeft: periode, bron,
een extra conclusie.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: visueel eronder, niet gekoppeld, of alles in de alt -->
<img src="aanmeldingen.svg" alt="Aanmeldingen 2026 per maand. WO steeg het sterkst." />
<p>Bron: CROHO, juni 2026.</p>

<!-- Wel doen: alt voor wie beluistert, bijschrift voor iedereen -->
<figure>
  <img src="aanmeldingen.svg" alt="Aanmeldingen stegen van 120 in januari naar 340 in juni" />
  <figcaption>Aanmeldingen 2026, per maand. Bron: CROHO.</figcaption>
</figure>
`})}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Een bijschrift hoort in `,(0,c.jsx)(n.code,{children:`<figcaption>`}),` binnen `,(0,c.jsx)(n.code,{children:`<figure>`}),`, niet in een losse `,(0,c.jsx)(n.code,{children:`<p>`}),` of een
`,(0,c.jsx)(n.code,{children:`div`}),` ernaast.`]}),`
`,(0,c.jsx)(n.li,{children:`De alt-tekst is kort en specifiek voor wie de afbeelding niet ziet. Het bijschrift mag langer,
want het is extra, niet de afbeelding zelf.`}),`
`,(0,c.jsx)(n.li,{children:`Herhaal de alt-tekst niet in het bijschrift.`}),`
`,(0,c.jsxs)(n.li,{children:[`Een sfeerfoto zonder informatie heeft geen bijschrift nodig, en ook geen alt: `,(0,c.jsx)(n.code,{children:`alt=""`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Tabellen hebben een eigen `,(0,c.jsx)(n.code,{children:`<caption>`}),`, geen `,(0,c.jsx)(n.code,{children:`<figcaption>`}),`. Dat staat bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--tabellen-zonder-koppen`,children:`Tabellen zonder koppen`}),`.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`Hoe je de afbeelding zelf beschrijft, staat bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--slechte-alt-tekst`,children:`Slechte alt-tekst`}),`.
Een grafiek die zonder kleur of bijschrift onleesbaar is, staat bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--ongelabelde-grafieken`,children:`Ongelabelde grafieken`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
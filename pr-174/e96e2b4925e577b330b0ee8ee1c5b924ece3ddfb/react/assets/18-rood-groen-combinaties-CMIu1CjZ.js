import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Rood/groen-combinaties`}),`
`,(0,c.jsx)(n.h1,{id:`roodgroen-combinaties`,children:`Rood/groen-combinaties`}),`
`,(0,c.jsxs)(n.p,{children:[`Rood versus groen is het meest voorkomende kleuronderscheid in interfaces, en het onderscheid dat
het vaakst `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`wegvalt`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsx)(n.p,{children:`De meeste kleurenblindheid is rood/groen (deuteranomalie of protanomalie). Een groene "succes"-knop
naast een rode "verwijder"-knop, een stoplichtstatus in een tabel, of een diff die alleen in rood en
groen is gezet: die twee kleuren vallen voor een deel van de gebruikers samen tot één bruinige tint.`}),`
`,(0,c.jsxs)(n.p,{children:[`Zelfs met voldoende contrast tegen de achtergrond blijft het `,(0,c.jsx)(n.em,{children:`verschil tussen`}),` rood en groen klein.
Kleur als enige as in een grafiek heeft hetzelfde probleem; dat staat bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--ongelabelde-grafieken`,children:`Ongelabelde grafieken`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Gebruik rood en groen niet als het enige verschil dat twee staten uit elkaar houdt.`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`Voeg een icoon toe: vink versus kruis, pijl omhoog versus omlaag.`}),`
`,(0,c.jsx)(n.li,{children:`Zet er een woord bij: "Opgeslagen", "Mislukt", niet alleen een bolletje.`}),`
`,(0,c.jsx)(n.li,{children:`Geef een andere vorm: vorm, patroon, dikte van de lijn, positie.`}),`
`,(0,c.jsx)(n.li,{children:`In tabellen: tekst in de cel ("actief" / "verlopen") in plaats van alleen een gekleurde badge.`}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: twee even grote knoppen, alleen de kleur verschilt -->
<button class="bg-green-600">Bevestigen</button>
<button class="bg-red-600">Verwijderen</button>

<!-- Wel doen: label + icoon, destructieve actie visueel én tekstueel anders -->
<button type="button">Bevestigen</button>
<button type="button">Factuur verwijderen</button>
`})}),`
`,(0,c.jsx)(n.p,{children:`Test met een kleurenblindheidsfilter in DevTools of een
grijstinten-screenshot.`})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
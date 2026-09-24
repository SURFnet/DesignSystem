import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Kleine klikdoelen`}),`
`,(0,c.jsx)(n.h1,{id:`kleine-klikdoelen`,children:`Kleine klikdoelen`}),`
`,(0,c.jsxs)(n.p,{children:[`Wie `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`niet nauwkeurig kan aanwijzen`}),`
— tremor, RSI, één hand, een switch, een duim in de trein — mist een doel van 16 pixels, of raakt
het doel ernaast.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsx)(n.p,{children:`Icoonknoppen in een toolbar, een sluitkruis in een hoek, checkboxes zonder ruime hit-area, links die
tegen elkaar aan staan: het klikvlak is kleiner dan de motoriek toelaat. Per ongeluk tikken is dan
geen slordigheid, het is het ontwerp.`}),`
`,(0,c.jsxs)(n.p,{children:[`WCAG 2.2 vraagt minimaal `,(0,c.jsx)(n.strong,{children:`24×24 CSS-pixels`}),` (2.5.8). `,(0,c.jsx)(n.strong,{children:`44×44`}),` is comfortabel: wat je duim haalt
zonder te mikken, en wat Apple en Android al jaren als richtlijn geven. Twee 24-pixel-iconen tegen
elkaar aan zijn nog steeds één verkeerde tik.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Maak het klikvlak groot genoeg, en houd ruimte tussen doelen.`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`Padding telt. Een 16-pixel-icoon in een 44-pixel-knop is in orde.`}),`
`,(0,c.jsxs)(n.li,{children:[`Zet ruimte `,(0,c.jsx)(n.em,{children:`tussen`}),` knoppen, niet alleen grotere iconen.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Curve-componenten zitten aan de ruime kant. Knijp ze niet in met `,(0,c.jsx)(n.code,{children:`p-0`}),` of een vaste `,(0,c.jsx)(n.code,{children:`h-6`}),`.`]}),`
`,(0,c.jsx)(n.li,{children:`Een tekstlink in een alinea mag kleiner, omdat de regel ernaast per ongeluk tikken ondervangt.
Losse icoonknoppen hebben die ruimte niet.`}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: icoon is het hele doel -->
<button type="button" class="size-4" aria-label="Sluiten">
  <svg><!-- kruis --></svg>
</button>

<!-- Wel doen: het klikvlak is groter dan de tekening -->
<button type="button" class="size-11" aria-label="Sluiten">
  <svg aria-hidden="true"><!-- kruis --></svg>
</button>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Test op een echt toestel, of in de apparaatmodus met je vinger in plaats van een muis. Tik de
sluitknop, de secundaire actie, de checkbox in een lijst. Uitwerking staat bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-designers--touch-en-vergroting`,children:`Touch en vergroting`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
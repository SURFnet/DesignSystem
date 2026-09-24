import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Ontbreken van unieke pagina-titel`}),`
`,(0,c.jsx)(n.h1,{id:`ontbreken-van-unieke-pagina-titel`,children:`Ontbreken van unieke pagina-titel`}),`
`,(0,c.jsxs)(n.p,{children:[`De paginatitel is het eerste dat een
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`screenreader`}),`
voorleest, en wat in het tabblad staat. Zonder unieke titel is elke pagina dezelfde pagina.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsx)(n.p,{children:`Elk tabblad zegt "Mijn SURF". Wie vijf tabbladen open heeft, moet ze allemaal openen om de juiste
te vinden. Een screenreadergebruiker hoort bij elke navigatie opnieuw de productnaam, niet waar
die terecht is gekomen. In een single-page-app blijft de titel vaak hangen op de eerste view:
na drie stappen in een wizard zegt het tabblad nog "Aanvragen".`}),`
`,(0,c.jsx)(n.p,{children:`WCAG 2.4.2 (Page Titled) eist een titel die het onderwerp of doel beschrijft. Dit is geen
Curve-component. Het is een eigenschap van het document, en het moet kloppen voordat de pagina
"af" is.`}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Maak de titel uniek, met het onderwerp eerst. Werk hem bij bij iedere route.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: elke pagina hetzelfde -->
<title>Mijn SURF</title>

<!-- Wel doen: onderwerp eerst, product daarna -->
<title>Factuur 2026-104 - Mijn SURF</title>
`})}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`Eén titel per weergave, niet per layout.`}),`
`,(0,c.jsx)(n.li,{children:`Het unieke deel vooraan: "Facturen - Mijn SURF", niet "Mijn SURF - Facturen". In een tabblad
is de staart het eerst afgekapt.`}),`
`,(0,c.jsx)(n.li,{children:`Bij een wizard of een gefilterde lijst hoort de stap of de filter in de titel: "Stap 2 van 4:
Controleer je gegevens - Aanvragen".`}),`
`,(0,c.jsxs)(n.li,{children:[`Verandert de view zonder herladen, dan verandert `,(0,c.jsx)(n.code,{children:`document.title`}),` mee. Anders blijft de
screenreader de oude pagina aankondigen.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`Controleer het door drie pagina's in tabbladen te openen. Kun je ze uit elkaar houden zonder ze
te activeren, dan klopt de titel. De rest van de
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--ontbrekende-pagina-structuur`,children:`pagina-structuur`}),`
is de inhoudsopgave; de titel is de naam op de kaft.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
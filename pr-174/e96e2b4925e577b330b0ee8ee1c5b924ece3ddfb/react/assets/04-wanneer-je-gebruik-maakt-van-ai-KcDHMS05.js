import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Je werk testen`,name:`Wanneer je gebruik maakt van AI`}),`
`,(0,c.jsx)(n.h1,{id:`wanneer-je-gebruik-maakt-van-ai`,children:`Wanneer je gebruik maakt van AI`}),`
`,(0,c.jsxs)(n.p,{children:[`Coding agents produceren opmaak die er goed uitziet en verkeerd wordt voorgelezen: een `,(0,c.jsx)(n.code,{children:`div`}),` met een
klikafhandelaar in plaats van een knop, een placeholder in plaats van een label, `,(0,c.jsx)(n.code,{children:`aria-label`}),`
uitgestrooid over elementen die helemaal geen rol hebben om te benoemen. De code compileert, rendert en
komt door de review, want het gebrek is onzichtbaar totdat iemand er met een toetsenbord of een
screenreader langskomt.`]}),`
`,(0,c.jsx)(n.p,{children:`De goedkoopste oplossing is de agent de regels vooraf meegeven. Feedback over toegankelijkheid op het
moment dat de code geschreven wordt kost een zin; dezelfde feedback in een pull request kost een
herschrijving.`}),`
`,(0,c.jsx)(n.h2,{id:`de-accessibility-skill`,children:`De accessibility skill`}),`
`,(0,c.jsxs)(n.p,{children:[`Een map met markdown-bestanden die je in Cursor, Claude Code of een andere agent zet. De skill leert de
agent semantische HTML, toegankelijke namen, toetsenbordtoegang en focusstijlen toe te passen: en
beoordeelt UI vanuit de `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`zeven persona's`}),`
(blind/screenreader, slechtziend, kleurenblind, doof, beperkte motoriek, cognitief, situationeel).`]}),`
`,(0,c.jsx)(n.h3,{id:`download`,children:`Download`}),`
`,(0,c.jsx)(`p`,{children:(0,c.jsx)(`a`,{href:`./downloads/accessibility.zip`,download:`accessibility.zip`,children:(0,c.jsx)(n.p,{children:`Download de accessibility skill (accessibility.zip)`})})}),`
`,(0,c.jsx)(n.p,{children:`Of download losse bestanden:`}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Bestand`}),(0,c.jsx)(n.th,{children:`Doel`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`./downloads/accessibility/SKILL.md`,children:`SKILL.md`})}),(0,c.jsx)(n.td,{children:`Workflow, persona-review, output-sjabloon`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`./downloads/accessibility/personas.md`,children:`personas.md`})}),(0,c.jsx)(n.td,{children:`Persona-definities en review-vragen`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`./downloads/accessibility/reference.md`,children:`reference.md`})}),(0,c.jsx)(n.td,{children:`Semantische HTML, toetsenbord, labels, focus`})]})]})]}),`
`,(0,c.jsx)(n.h3,{id:`installeren`,children:`Installeren`}),`
`,(0,c.jsxs)(n.p,{children:[`Pak `,(0,c.jsx)(n.code,{children:`accessibility.zip`}),` uit in de skills-map van je agent. De map moet `,(0,c.jsx)(n.code,{children:`accessibility/`}),` heten en
`,(0,c.jsx)(n.code,{children:`SKILL.md`}),` plus de andere bestanden bevatten. De YAML-frontmatter in `,(0,c.jsx)(n.code,{children:`SKILL.md`}),` is verplicht: agents
lezen `,(0,c.jsx)(n.code,{children:`name`}),` en `,(0,c.jsx)(n.code,{children:`description`}),` om te bepalen wanneer ze de skill laden.`]}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Tool`}),(0,c.jsx)(n.th,{children:`Opslaan als`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Cursor`}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`.cursor/skills/accessibility/`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Claude Code`}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`.claude/skills/accessibility/`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Codex / andere agents`}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`.agents/skills/accessibility/`})})]})]})]}),`
`,(0,c.jsx)(n.p,{children:`Zodra de skill geïnstalleerd is, geldt hij telkens wanneer de agent UI schrijft of beoordeelt. Voorbeelden:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`"Beoordeel dit component op toegankelijkheid vanuit elke persona"`}),`
`,(0,c.jsx)(n.li,{children:`"Wat zou een screenreadergebruiker missen in deze dialoog?"`}),`
`,(0,c.jsx)(n.li,{children:`"Welk element krijgt focus als dit opengaat?"`}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`hoe-je-bruikbaar-werk-uit-een-agent-krijgt`,children:`Hoe je bruikbaar werk uit een agent krijgt`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Vraag naar het mechanisme, niet naar het oordeel.`}),` "Is dit toegankelijk?" nodigt uit tot een
zelfverzekerd ja. "Welk element krijgt focus als dit opengaat, en wat leest een screenreader voor?"
levert iets op dat je kunt controleren.`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Laat ARIA verantwoorden.`}),` Agents grijpen uit gewoonte naar ARIA-attributen. Vraag welk native element
het attribuut overbodig zou maken, en het meeste verdwijnt: zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--teveel-aria`,children:`Teveel ARIA`}),`.`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Geef het component mee, niet de klassenaam.`}),` Een agent die weet dat Curve bestaat, stelt Button,
Dialog en Field samen. Een agent die vanaf een screenshot werkt, bouwt ze na uit `,(0,c.jsx)(n.code,{children:`div`}),`s en verliest elke
garantie die die primitieven bieden.`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Laat hem de toetsenbordtest schrijven.`}),` Agents zijn goed in het omzetten van een interactie naar een
Playwright- of Vitest-assertie. Focusvolgorde, Escape die een dialoog sluit, focus die terugkeert naar
de knop: precies de controles die zonder test langzaam wegroesten.`]}),`
`,(0,c.jsx)(n.h2,{id:`wat-een-agent-niet-voor-je-kan-doen`,children:`Wat een agent niet voor je kan doen`}),`
`,(0,c.jsx)(n.p,{children:`Hij kan niet beoordelen of een kopstructuur klopt voor iemand die hem voor het eerst hoort, of iets een
link had moeten zijn in plaats van een knop, of jouw foutmelding iets uitlegt, of de flow werkt met
VoiceOver. Hij heeft jouw product nog nooit met een screenreader gebruikt.`}),`
`,(0,c.jsxs)(n.p,{children:[`Behandel de output van een agent zoals je een linter behandelt: snel, onvermoeibaar, beperkt, en vaak
genoeg zelfverzekerd fout om
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-je-werk-testen--handmatig-testen`,children:`de handmatige controle`}),`
niet te vervangen.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Ontbrekende pagina-structuur`}),`
`,(0,c.jsx)(n.h1,{id:`ontbrekende-pagina-structuur`,children:`Ontbrekende pagina-structuur`}),`
`,(0,c.jsxs)(n.p,{children:[`Een `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`screenreadergebruiker`}),`
leest de pagina niet van boven naar beneden. Eerst de koppen, dan de landmarks, dan de links. Als ziende gebruiker doe je dit tenslotte ook: je kijkt eerst naar de koppen, dan naar de inhoud.`]}),`
`,(0,c.jsx)(n.p,{children:`Als je een screenreader gebruikt, kun je dit ook doen, als de structuur van de pagina goed is opgezet. Een beetje op dezelfde manier als wanneer je een Word-document maakt en automatisch een inhoudsopgave aanmaakt. Als je de juiste kopjes hebt gebruikt, krijg je een inhoudsopgave die klopt.`}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`Wanneer je een pagina maakt, kijk je vooral naar de visuele structuur. Een vette regel, witruimte, een kaart: betekent niets als die niet in de opmaak zit. Een `,(0,c.jsx)(n.code,{children:`div`}),` die eruitziet als een kop is geen kop. Een pagina zonder `,(0,c.jsx)(n.code,{children:`main`}),` heeft geen hoofdinhoud om naartoe te springen. Overgeslagen kopniveaus (`,(0,c.jsx)(n.code,{children:`h1`}),` → `,(0,c.jsx)(n.code,{children:`h3`}),`) suggereren een onderdeel (met een `,(0,c.jsx)(n.code,{children:`h2`}),` als kopniveau) dat er niet is.`]}),`
`,(0,c.jsx)(n.p,{children:`Wie de rotor (die 'inhoudsopgave' die een screenreader aanmaakt) of de elementenlijst opent, krijgt dan geen inhoudsopgave maar een lijst die nergens op
slaat, of helemaal geen koppen. De enige route die overblijft is lineair luisteren: onbruikbaar op
een lange pagina.`}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Bouw de structuur in HTML, niet in CSS.`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Precies één `,(0,c.jsx)(n.code,{children:`h1`}),` per weergave.`]}),`
`,(0,c.jsx)(n.li,{children:`Kopniveaus volgen de documentstructuur, nooit de lettergrootte. Style met CSS.`}),`
`,(0,c.jsx)(n.li,{children:`Sla geen niveaus over.`}),`
`,(0,c.jsxs)(n.li,{children:[`Gebruik landmarks: `,(0,c.jsx)(n.code,{children:`header`}),`, `,(0,c.jsx)(n.code,{children:`nav`}),`, `,(0,c.jsx)(n.code,{children:`main`}),`, `,(0,c.jsx)(n.code,{children:`footer`}),`. Precies één `,(0,c.jsx)(n.code,{children:`main`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Lijsten van links of bevindingen zijn een `,(0,c.jsx)(n.code,{children:`ul`}),` of `,(0,c.jsx)(n.code,{children:`ol`}),`, geen reeks `,(0,c.jsx)(n.code,{children:`div`}),`s.`]}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: visueel een kop, voor een screenreader een zin -->
<div class="text-2xl font-bold">Facturen</div>

<!-- Wel doen -->
<h1>Facturen</h1>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Controleer in DevTools → `,(0,c.jsx)(n.strong,{children:`Elements`}),` → `,(0,c.jsx)(n.strong,{children:`Accessibility`}),` → `,(0,c.jsx)(n.strong,{children:`Headings`}),`. Die lijst moet lezen als
een inhoudsopgave. De stappen staan bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-je-werk-testen--handmatig-testen`,children:`Handmatig testen`}),`.
Op een volledige pagina hoort daar een
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--ontbrekende-skiplinks`,children:`skiplink`}),` bij.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
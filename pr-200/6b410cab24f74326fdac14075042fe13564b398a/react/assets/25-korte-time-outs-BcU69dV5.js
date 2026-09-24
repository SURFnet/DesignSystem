import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Korte time-outs`}),`
`,(0,c.jsx)(n.h1,{id:`korte-time-outs`,children:`Korte time-outs`}),`
`,(0,c.jsxs)(n.p,{children:[`Wie `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`langzamer navigeert`}),`
— switch, oogbesturing, toetsenbord, een pauze om te lezen — loopt vast op een sessie of een
carrousel die vanzelf verdergaat.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsx)(n.p,{children:`Een inlog die na twee minuten verloopt, een melding die na drie seconden verdwijnt, een
cookie-banner die zichzelf sluit, een quiz met een countdown: de gebruiker was nog bezig. Met een
switch kan één keuze tientallen seconden duren. Met een screenreader duurt voorlezen langer dan
overzien.`}),`
`,(0,c.jsx)(n.p,{children:`WCAG 2.2.1 (Timing Adjustable) eist dat je tijdslimieten kunt uitzetten, aanpassen of verlengen,
tenzij de limiet essentieel is (een veiling, een realtime-toets). Een sessie om beveiligingsredenen
mag verlopen, maar niet zonder waarschuwing en een manier om te verlengen.`}),`
`,(0,c.jsxs)(n.p,{children:[`Dit raakt ook de
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--tijdsdruk`,children:`cognitieve persona`}),`:
tijdsdruk zelf is het probleem, niet alleen de motoriek.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Geef tijd, of geef controle over de tijd.`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`Sessie: waarschuw vóór het verlopen, met een knop "Blijf ingelogd". Bewaar wat al is ingevuld.`}),`
`,(0,c.jsx)(n.li,{children:`Toasts en banners: blijven staan tot iemand ze sluit, of minstens lang genoeg om te lezen én te
handelen. Geen informatie die alleen in een verdwijnende melding zit.`}),`
`,(0,c.jsx)(n.li,{children:`Carrousels: niet automatisch doorschuiven, of pauzeren bij focus/hover en een pauze-knop.`}),`
`,(0,c.jsx)(n.li,{children:`Formulieren: geen countdown. Als die er toch moet zijn, minstens 20 uur of verlengbaar.`}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<dialog aria-labelledby="sessie-titel">
  <h2 id="sessie-titel">Je sessie verloopt over 2 minuten</h2>
  <p>Je voortgang blijft bewaard als je ingelogd blijft.</p>
  <button type="button">Blijf ingelogd</button>
</dialog>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Niets mag afhangen van hoe snel iemand de muis haalt. Dezelfde tien minuten als de
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-je-werk-testen--handmatig-testen`,children:`handmatige ronde`}),`:
wacht eens twintig seconden op een scherm, en kijk wat er vanzelf gebeurt.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
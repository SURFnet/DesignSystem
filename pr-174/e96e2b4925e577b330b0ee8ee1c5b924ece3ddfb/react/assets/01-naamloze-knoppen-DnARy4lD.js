import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Naamloze knoppen`}),`
`,(0,c.jsx)(n.h1,{id:`naamloze-knoppen`,children:`Naamloze knoppen`}),`
`,(0,c.jsxs)(n.p,{children:[`Een `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`screenreadergebruiker`}),`
navigeert onder meer via een lijst met knoppen. Zonder toegankelijke naam blijft daar alleen de rol
over: "knop".`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsx)(n.p,{children:`Een icoonknop is visueel volstrekt duidelijk: een prullenbak, een kruis, een potlood. Voor wie de
pagina beluistert, is er geen prullenbak. Er is een bedienbaar element zonder naam.`}),`
`,(0,c.jsxs)(n.p,{children:[`Hetzelfde gebeurt bij een invoerveld zonder `,(0,c.jsx)(n.code,{children:`<label>`}),`, een link die alleen een icoon is, of een knop
waarvan de tekst in een `,(0,c.jsx)(n.code,{children:`svg`}),` of achtergrondafbeelding zit. De toegankelijke naam is leeg, en de
gebruiker moet gokken.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Een `,(0,c.jsx)(n.code,{children:`div`}),` met een klikafhandelaar is nóg erger: hij staat niet eens in die knoppenlijst. Dat staat
bij `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--teveel-aria`,children:`Teveel ARIA`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Elk bedienbaar element heeft een naam nodig. De zichtbare tekst ís de beste naam. Alleen als die er
niet is, voeg je er een toe.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: voorgelezen als "knop" -->
<button>
  <svg><!-- prullenbak --></svg>
</button>

<!-- Wel doen: benoem de knop, verberg de decoratie -->
<button type="button" aria-label="Factuur verwijderen">
  <svg aria-hidden="true" focusable="false"><!-- prullenbak --></svg>
</button>
`})}),`
`,(0,c.jsx)(n.p,{children:`Voorkeursvolgorde:`}),`
`,(0,c.jsxs)(n.ol,{children:[`
`,(0,c.jsx)(n.li,{children:`Zichtbare tekst in de knop of link.`}),`
`,(0,c.jsxs)(n.li,{children:[`Een `,(0,c.jsx)(n.code,{children:`<label>`}),` dat aan het veld gekoppeld is.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`aria-labelledby`}),` naar tekst die al op het scherm staat.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`aria-label`}),` alleen bij icoon-only bediening.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`Controleer in DevTools → `,(0,c.jsx)(n.strong,{children:`Elements`}),` → `,(0,c.jsx)(n.strong,{children:`Accessibility`}),` → `,(0,c.jsx)(n.strong,{children:`Name`}),`. Is Name leeg, dan is het
element naamloos. Hoe je die teksten schrijft, staat bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-designers--microcopy`,children:`Microcopy`}),`.
Meer over benoemen bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--verkeerde-aria`,children:`Verkeerde ARIA`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
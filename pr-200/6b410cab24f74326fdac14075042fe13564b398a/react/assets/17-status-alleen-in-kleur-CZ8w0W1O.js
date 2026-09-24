import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Status alleen in kleur`}),`
`,(0,c.jsx)(n.h1,{id:`status-alleen-in-kleur`,children:`Status alleen in kleur`}),`
`,(0,c.jsxs)(n.p,{children:[`Wie `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`geen kleurverschil ziet`}),`
ziet jouw opmaak prima. Wat wegvalt is het onderscheid dat je in kleur hebt gestopt.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsx)(n.p,{children:`Een invoerveld dat rood omrand wordt bij een fout, een groene stip voor "beschikbaar", een geselecteerde
tab die alleen een andere kleur krijgt: in grijstinten is dat hetzelfde element. Ongeveer 8% van de
mannen heeft een vorm van kleurenblindheid. WCAG 1.4.1 (Use of Color) verbiedt kleur als enig
signaal.`}),`
`,(0,c.jsxs)(n.p,{children:[`Dit is niet hetzelfde als
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--te-licht-contrast`,children:`te licht contrast`}),`.
Het contrast kan prima zijn, en de betekenis toch alleen in de tint zitten.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Combineer kleur altijd met iets dat zonder kleur overeind blijft: tekst, een icoon met naam, een
patroon, of een positie.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: alleen een rode rand -->
<input type="email" aria-invalid="true" class="border-red-600" />

<!-- Wel doen: kleur + icoon + zin -->
<label for="email">E-mailadres</label>
<input id="email" type="email" aria-invalid="true" aria-describedby="email-fout" />
<p id="email-fout">
  <span aria-hidden="true">⚠</span>
  Vul een geldig e-mailadres in, bijvoorbeeld naam@instelling.nl
</p>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Maak een schermafbeelding en bekijk hem in grijstinten. Alles wat je dan niet meer kunt
onderscheiden, leunde op kleur alleen. Foutteksten zelf staan bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--vage-foutmeldingen`,children:`Vage foutmeldingen`}),`
en
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--onduidelijke-validatie`,children:`Onduidelijke validatie`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
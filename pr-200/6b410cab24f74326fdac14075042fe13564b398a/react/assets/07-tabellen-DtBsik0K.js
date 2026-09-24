import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Tabellen zonder koppen`}),`
`,(0,c.jsx)(n.h1,{id:`tabellen-zonder-koppen`,children:`Tabellen zonder koppen`}),`
`,(0,c.jsxs)(n.p,{children:[`Een `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`screenreadergebruiker`}),`
navigeert een tabel per cel, en hoort bij elke cel de bijbehorende kop. Zonder kopcellen is een
tabel een reeks losse woorden. Met een tabel als layout is de pagina een doolhof.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`Een `,(0,c.jsx)(n.code,{children:`table`}),` om twee kolommen naast elkaar te zetten, een raster van `,(0,c.jsx)(n.code,{children:`div`}),`s dat eruitziet als een
tabel, of een gegevensoverzicht waarvan de eerste rij visueel vet is maar uit `,(0,c.jsx)(n.code,{children:`td`}),`s bestaat: de
relatie tussen rij, kolom en waarde zit dan alleen in de pixels.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Wie de tabel beluistert, hoort "104, 2026, betaald" zonder te weten wat die getallen zijn. Wie
vergroot, krijgt bij een layout-tabel horizontale scroll of cellen die hun inhoud afsnijden.
Samengevoegde cellen zonder `,(0,c.jsx)(n.code,{children:`headers`}),` of `,(0,c.jsx)(n.code,{children:`scope`}),` maken de route nog korter stuk.`]}),`
`,(0,c.jsx)(n.p,{children:`WCAG 1.3.1 (Info and Relationships) eist dat die relaties in de opmaak zitten. Dit is geen
Curve-component. Het is een keuze in de HTML, en die moet kloppen voordat de pagina "af" is.`}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Gebruik een tabel alleen als rijen en kolommen bij elkaar horen. Niet om iets mooi naast elkaar
te zetten.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: layout, geen kopcellen -->
<table>
  <tr>
    <td><strong>Nummer</strong></td>
    <td><strong>Status</strong></td>
  </tr>
  <tr>
    <td>2026-104</td>
    <td>Betaald</td>
  </tr>
</table>

<!-- Wel doen: gegevens, kopcellen, bijschrift -->
<table>
  <caption>
    Openstaande facturen
  </caption>
  <thead>
    <tr>
      <th scope="col">Nummer</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">2026-104</th>
      <td>Betaald</td>
    </tr>
  </tbody>
</table>
`})}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Layout is CSS (`,(0,c.jsx)(n.code,{children:`flex`}),`, `,(0,c.jsx)(n.code,{children:`grid`}),`), nooit `,(0,c.jsx)(n.code,{children:`<table>`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Elke kolom (en bij een complexe tabel elke rij) heeft een `,(0,c.jsx)(n.code,{children:`<th>`}),` met `,(0,c.jsx)(n.code,{children:`scope`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Een `,(0,c.jsx)(n.code,{children:`<caption>`}),` zegt waar de tabel over gaat. Die vervangt de paginakop niet. Bijschriften bij
afbeeldingen zijn `,(0,c.jsx)(n.code,{children:`<figcaption>`}),`: zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--ontbrekende-bijschriften`,children:`Ontbrekende bijschriften`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Zet de conclusie ook in de lopende tekst als de tabel een grafiek ondersteunt: zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--ongelabelde-grafieken`,children:`Ongelabelde grafieken`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Lever een gegevens-tabel niet aan als plaatje. Wie vergroot of beluistert, komt er dan niet
bij — zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--tekst-in-afbeeldingen`,children:`Tekst in afbeeldingen`}),`.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`Controleer in DevTools → `,(0,c.jsx)(n.strong,{children:`Elements`}),` → `,(0,c.jsx)(n.strong,{children:`Accessibility`}),`: elke cel moet een naam hebben die de
kop meeneemt. De rest van de
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--ontbrekende-pagina-structuur`,children:`pagina-structuur`}),`
is koppen en landmarks; een tabel is alleen het raster daarbinnen.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
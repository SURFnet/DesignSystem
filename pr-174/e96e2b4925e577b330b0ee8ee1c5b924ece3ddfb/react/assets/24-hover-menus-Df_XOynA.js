import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Hover-menu's`}),`
`,(0,c.jsx)(n.h1,{id:`hover-menus`,children:`Hover-menu's`}),`
`,(0,c.jsxs)(n.p,{children:[`Inhoud die alleen verschijnt als de muis erop blijft staan, is onbereikbaar voor wie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`geen muis gebruikt`}),`:
toetsenbord, switch, touch, spraak.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsx)(n.p,{children:`Een megamenu dat opent bij hover, een tooltip met de enige uitleg, een actieknop die pas verschijnt
als je over een rij gaat: op een telefoon is er geen hover. Met het toetsenbord verschijnt het
niet, tenzij je dezelfde staat ook aan focus koppelt. Wie tremor heeft, verliest het menu zodra de
aanwijzer een pixel wegglijdt.`}),`
`,(0,c.jsx)(n.p,{children:`WCAG 1.4.13 (Content on Hover or Focus) eist: de inhoud is ook bij toetsenbordfocus te zien, blijft
staan tot je hem wegstuurt, en is weg te klikken zonder de muis te verplaatsen (meestal`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(`kbd`,{children:`Esc`}),`).`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Koppel dezelfde inhoud aan een klik of aan focus, en laat hem bewust sluiten.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen: alleen zichtbaar bij hover -->
<style>
  .menu:hover .submenu {
    display: block;
  }
</style>

<!-- Wel doen: openen met knop, sluiten met Esc of een tweede klik -->
<button type="button" aria-expanded="false" aria-controls="submenu">Producten</button>
<ul id="submenu" hidden>
  <li><a href="/curve">Curve</a></li>
</ul>
`})}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`Tooltips met essentiële informatie horen zichtbare tekst te zijn, of een knop die de uitleg opent.`}),`
`,(0,c.jsx)(n.li,{children:`Acties in een tabelrij: altijd zichtbaar, of beschikbaar in een menu-knop op die rij.`}),`
`,(0,c.jsxs)(n.li,{children:[`Curve-componenten (Dropdown, Tooltip, Popover) koppelen hover al aan focus. Bouw ze niet na met
alleen `,(0,c.jsx)(n.code,{children:`:hover`}),`.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`Op een telefoon bestaat hover niet. Test daar. Zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-designers--touch-en-vergroting`,children:`Touch en vergroting`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
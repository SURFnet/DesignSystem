import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Vaste breedtes`}),`
`,(0,c.jsx)(n.h1,{id:`vaste-breedtes`,children:`Vaste breedtes`}),`
`,(0,c.jsxs)(n.p,{children:[`Wie `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`vergroot tot 200 of 400%`}),`
krijgt jouw desktoplayout in een venster van grofweg 320px breed. Vaste breedtes passen daar niet in.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`Een container van `,(0,c.jsx)(n.code,{children:`width: 1200px`}),`, een tabel die niet mag wrappen, of `,(0,c.jsx)(n.code,{children:`white-space: nowrap`}),` op
lopende tekst dwingt tot horizontaal scrollen. Bij 400% zoom moet je dan in twee richtingen scrollen
om één zin te lezen: eerst naar rechts voor het einde, dan naar beneden voor de volgende regel.`]}),`
`,(0,c.jsxs)(n.p,{children:[`WCAG 1.4.10 (Reflow) zegt: bij een viewport van 320 CSS-pixels blijft de inhoud werken in één
scrollrichting, zonder dat er iets wegvalt. Vaste hoogtes met `,(0,c.jsx)(n.code,{children:`overflow: hidden`}),` knippen tekst af
zodra iemand de lettergrootte van het systeem vergroot.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsxs)(n.p,{children:[`Laat de layout meebewegen. Gebruik `,(0,c.jsx)(n.code,{children:`max-width`}),` in plaats van `,(0,c.jsx)(n.code,{children:`width`}),`, relatieve eenheden, en een
omslag naar één kolom.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`/* Niet doen */
.layout {
  width: 1200px;
}
.cell {
  white-space: nowrap;
}

/* Wel doen */
.layout {
  max-width: 75rem;
  width: 100%;
}
`})}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Bij `,(0,c.jsx)(n.strong,{children:`200% zoom`}),` blijft alles leesbaar: geen overlapping, geen afgesneden labels.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Bij `,(0,c.jsx)(n.strong,{children:`400% zoom`}),` (of 320px breed) vouwt de opmaak terug naar één kolom.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Vermijd vaste hoogtes die tekst afknippen. `,(0,c.jsx)(n.code,{children:`overflow: auto`}),` is beter dan `,(0,c.jsx)(n.code,{children:`hidden`}),` als er geen
andere weg is.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`De teststappen staan bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-designers--touch-en-vergroting`,children:`Touch en vergroting`}),`
en in de
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-je-werk-testen--handmatig-testen`,children:`handmatige ronde`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
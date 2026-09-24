import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Taalwissels zonder markering`}),`
`,(0,c.jsx)(n.h1,{id:`taalwissels-zonder-markering`,children:`Taalwissels zonder markering`}),`
`,(0,c.jsxs)(n.p,{children:[`Voorleessoftware, vertaaltools en de browser moeten weten in welke taal de tekst staat. Zonder
markering spreekt een Nederlandse stem Engels fonetisch uit, of andersom — ook voor wie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`vergroot of laat voorlezen`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`Een citaat, een knoplabel, een `,(0,c.jsx)(n.code,{children:`aria-label`}),` of een vakterm in een andere taal midden in een
Nederlandse zin: zonder `,(0,c.jsx)(n.code,{children:`lang`}),` blijft de stem op Nederlands staan. "Submit" wordt "submit" met
een Nederlandse u, "SURFconext" een onverstaanbare klank. Wisselt het product van taal via een
taalselector, maar blijft `,(0,c.jsx)(n.code,{children:`lang="nl"`}),` op `,(0,c.jsx)(n.code,{children:`<html>`}),` staan, dan is de hele Engelstalige pagina
onverstaanbaar.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Hetzelfde geldt voor toegankelijke namen. Een Nederlandse pagina met `,(0,c.jsx)(n.code,{children:`aria-label="Close"`}),` of
`,(0,c.jsx)(n.code,{children:`alt="Search"`}),` leest die woorden Nederlands voor. Ontbreekt `,(0,c.jsx)(n.code,{children:`lang`}),` op `,(0,c.jsx)(n.code,{children:`<html>`}),` helemaal, dan
raadt de software de taal, en raadt ze het vaak mis. WCAG 3.1.1 eist een taal op de pagina,
3.1.2 op delen die afwijken.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Zet de taal van het document, markeer afwijkingen, en houd toegankelijke namen in dezelfde taal.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<html lang="nl">
  <body>
    <p>
      Log in via
      <span lang="en">SURFconext</span>.
    </p>
    <blockquote lang="en">
      <p>The service will be unavailable on Sunday.</p>
    </blockquote>
    <button type="button" aria-label="Zoeken">
      <svg aria-hidden="true"><!-- vergrootglas --></svg>
    </button>
  </body>
</html>
`})}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Eén `,(0,c.jsx)(n.code,{children:`lang`}),` op `,(0,c.jsx)(n.code,{children:`<html>`}),` die overeenkomt met de hoofdtaal van de pagina.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Een citaat, UI-string of vakterm in een andere taal krijgt een eigen `,(0,c.jsx)(n.code,{children:`lang`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Wisselt het product van taal, dan verandert `,(0,c.jsx)(n.code,{children:`lang`}),` op `,(0,c.jsx)(n.code,{children:`<html>`}),` mee.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`aria-label`}),`, skiplinktekst en alt-tekst horen in dezelfde taal als de pagina, tenzij je die
ook markeert.`]}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`Dit is geen werk dat je aan een component uit Curve overlaat. Het is een eigenschap van het
document.`})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
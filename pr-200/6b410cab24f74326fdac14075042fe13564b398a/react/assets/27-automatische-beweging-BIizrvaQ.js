import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Automatische beweging`}),`
`,(0,c.jsx)(n.h1,{id:`automatische-beweging`,children:`Automatische beweging`}),`
`,(0,c.jsxs)(n.p,{children:[`Onverwachte beweging eist aandacht op. Voor wie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`ADHD heeft, snel overprikkeld raakt, of vestibulaire klachten heeft`}),`
is dat geen sfeer, het is een blokkade.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`Een carrousel die vanzelf doorschuift, een parallax-header, een loader die pulseert, een video die
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--video-die-automatisch-afspeelt`,children:`automatisch afspeelt`}),`,
confetti bij een succesmelding: de pagina beweegt terwijl iemand probeert te lezen of een veld in
te vullen.`]}),`
`,(0,c.jsxs)(n.p,{children:[`WCAG 2.2.2 (Pause, Stop, Hide) eist dat beweging die langer dan vijf seconden duurt, te pauzeren of
uit te zetten is. Flitsen kunnen een aanval uitlokken (2.3.1). `,(0,c.jsx)(n.code,{children:`prefers-reduced-motion`}),` is het
signaal van het besturingssysteem dat iemand minder beweging wil: het negeren is een keuze.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsxs)(n.p,{children:[`Geen beweging die de gebruiker niet heeft gevraagd. Respecteer `,(0,c.jsx)(n.code,{children:`prefers-reduced-motion`}),`.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`.carousel {
  animation: slide 12s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .carousel {
    animation: none;
  }
}
`})}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`Carrousels starten niet vanzelf, of pauzeren bij focus en hebben een pauze-knop.`}),`
`,(0,c.jsx)(n.li,{children:`Succes mag een korte, kleine overgang zijn, geen confetti-explosie.`}),`
`,(0,c.jsx)(n.li,{children:`Loaders mogen bewegen; ze horen te stoppen of stiller te worden bij reduced motion.`}),`
`,(0,c.jsxs)(n.li,{children:[`Curve-componenten volgen dit token al. Voeg geen eigen `,(0,c.jsx)(n.code,{children:`animate-*`}),` toe zonder de media query.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`Zet `,(0,c.jsx)(n.strong,{children:`Verminder beweging`}),` aan in je systeeminstellingen en herlaad. Blijft alles bewegen, dan is
het niet af. Zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-je-werk-testen--handmatig-testen`,children:`Handmatig testen`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
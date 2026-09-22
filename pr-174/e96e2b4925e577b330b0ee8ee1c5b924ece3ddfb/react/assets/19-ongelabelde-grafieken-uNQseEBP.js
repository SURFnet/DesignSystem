import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Ongelabelde grafieken`}),`
`,(0,c.jsx)(n.h1,{id:`ongelabelde-grafieken`,children:`Ongelabelde grafieken`}),`
`,(0,c.jsxs)(n.p,{children:[`Een grafiek die series alleen in kleur onderscheidt, is voor
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`wie geen kleurverschil ziet`}),`
één lijn. Voor wie de pagina beluistert, is er helemaal geen grafiek.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsxs)(n.p,{children:[`Een legenda met gekleurde vlakjes, lijnen zonder patroon, taartpunten zonder naam in de slice:
de betekenis zit in de tint. In grijstinten vallen de series samen. Een screenreader krijgt
hooguit `,(0,c.jsx)(n.code,{children:`alt="grafiek"`}),` of de bestandsnaam, niet de conclusie.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Dat is twee persona's tegelijk: kleurenblind én
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--afbeeldingen-zonder-beschrijving`,children:`blind`}),`.
Wie vergroot, loopt bovendien tegen
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--tekst-in-afbeeldingen`,children:`tekst in de afbeelding`}),`
aan als de assen in pixels zitten.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Maak de grafiek leesbaar zonder kleur, en geef de boodschap ook als tekst.`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`Direct label op de lijn of staaf ("WO 2024"), niet alleen een gekleurde legenda.`}),`
`,(0,c.jsx)(n.li,{children:`Patroon of vorm per serie: stippellijn, driehoek, arcering.`}),`
`,(0,c.jsx)(n.li,{children:`De conclusie in de lopende tekst: "Aanmeldingen stegen van 120 naar 340."`}),`
`,(0,c.jsx)(n.li,{children:`Een data-tabel ernaast of achter een "Toon tabel"-knop, met kopcellen.`}),`
`,(0,c.jsxs)(n.li,{children:[`Alt-tekst of een
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--ontbrekende-bijschriften`,children:`bijschrift`}),`
die de conclusie noemt, niet "staafdiagram van aanmeldingen".`]}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<figure>
  <img src="aanmeldingen.svg" alt="Aanmeldingen stegen van 120 in januari naar 340 in juni" />
  <figcaption>
    Aanmeldingen 2026, per maand. WO steeg het sterkst; HBO bleef nagenoeg gelijk.
  </figcaption>
</figure>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Een interactieve grafiek (SVG, canvas) heeft dezelfde eisen: elke serie een naam, toetsenbordtoegang
tot datapunt of tabel, geen betekenis alleen in kleur. Zie ook
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--status-alleen-in-kleur`,children:`Status alleen in kleur`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
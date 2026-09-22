import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Te licht contrast`}),`
`,(0,c.jsx)(n.h1,{id:`te-licht-contrast`,children:`Te licht contrast`}),`
`,(0,c.jsxs)(n.p,{children:[`Wie `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`slechtziend is`}),`,
buiten in de zon werkt, of een mat scherm heeft, leest jouw grijze tekst op een bijna-witte
achtergrond niet.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsx)(n.p,{children:`Lichtgrijs op wit oogt rustig in een ontwerp op een gekalibreerd scherm. Op een laptop in de trein
is het onleesbaar. Hetzelfde geldt voor placeholders, disabled-tekst die de enige uitleg is, iconen
zonder extra signaal, en randen van invoervelden die je alleen ziet als je weet dat ze er zijn.`}),`
`,(0,c.jsxs)(n.p,{children:[`WCAG vraagt `,(0,c.jsx)(n.strong,{children:`4,5:1`}),` voor lopende tekst en `,(0,c.jsx)(n.strong,{children:`3:1`}),` voor grote tekst, iconen en componenten
(1.4.3 Contrast Minimum, 1.4.11 Non-text Contrast). Curve-tokens zijn daarop gebouwd. Een
handmatige `,(0,c.jsx)(n.code,{children:`text-gray-400`}),` op `,(0,c.jsx)(n.code,{children:`bg-white`}),` haalt dat er zo weer af.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsx)(n.p,{children:`Gebruik de semantische kleurtokens van Curve, niet een grijs dat "zachter" oogt. Controleer het
contrast in DevTools: klik de kleur, de verhouding staat erbij.`}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Wat`}),(0,c.jsx)(n.th,{children:`Minimum`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Lopende tekst, tot 18px`}),(0,c.jsx)(n.td,{children:`4,5:1`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Grote tekst (18px bold / 24px)`}),(0,c.jsx)(n.td,{children:`3:1`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Iconen, randen, focusring`}),(0,c.jsx)(n.td,{children:`3:1`})]})]})]}),`
`,(0,c.jsxs)(n.p,{children:[`Placeholder-tekst telt als tekst als het de enige naam van het veld is: gebruik een zichtbaar
label. Uitgeschakelde knoppen mogen lichter, maar zet er dan in gewone tekst bij waarom ze niet
werken. Zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--onduidelijke-validatie`,children:`Onduidelijke validatie`}),`.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Contrast is niet hetzelfde als
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--status-alleen-in-kleur`,children:`kleur als enig signaal`}),`:
een foutmelding kan wél rood zijn, als de tekst zelf het contrast haalt én het probleem in woorden
staat.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
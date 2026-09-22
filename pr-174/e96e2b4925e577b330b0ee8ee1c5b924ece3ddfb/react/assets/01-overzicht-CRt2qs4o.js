import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor designers`,name:`Overzicht`}),`
`,(0,c.jsx)(n.h1,{id:`voor-designers`,children:`Voor designers`}),`
`,(0,c.jsx)(n.p,{children:`Deze pagina beschrijft hoe een ontwerpwijziging in Curve terechtkomt: waar je hem maakt, hoe hij in de
code belandt en wat er van je verwacht wordt zodat een developer er direct mee verder kan.`}),`
`,(0,c.jsx)(n.h2,{id:`figma`,children:`Figma`}),`
`,(0,c.jsx)(n.p,{children:`Alle kleuren, typografie, spacing en hoekafrondingen staan als variabelen in Figma. Die variabelen
zijn de officiële bron: de code haalt de waarden daaruit op, niet omgekeerd. Neem contact op met het Design team als je hier nog geen toegang toe hebt!`}),`
`,(0,c.jsx)(n.h2,{id:`van-figma-naar-code`,children:`Van Figma naar code`}),`
`,(0,c.jsxs)(n.ol,{children:[`
`,(0,c.jsx)(n.li,{children:`Je past een variabele aan in Figma, of voegt een nieuwe toe.`}),`
`,(0,c.jsxs)(n.li,{children:[`Een developer haalt de variabelen op met één commando (`,(0,c.jsx)(n.code,{children:`pnpm sync:figma`}),`). De waarden worden
opgeslagen als tekstbestanden in de repository.`]}),`
`,(0,c.jsx)(n.li,{children:`Uit die bestanden wordt automatisch de stylesheet gebouwd die de componenten gebruiken.`}),`
`,(0,c.jsxs)(n.li,{children:[`De wijziging krijgt een versienummer en wordt gepubliceerd — zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve--updates-en-releases`,children:`Updates en releases`}),`.`]}),`
`,(0,c.jsx)(n.li,{children:`Projecten die de nieuwe versie installeren, hebben je wijziging binnen.`}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`Stap 2 en 3 gebeuren niet automatisch bij elke Figma-wijziging. Laat dus even weten dat er iets klaar
staat, anders blijft het in Figma hangen.`}),`
`,(0,c.jsx)(n.h2,{id:`wat-loopt-via-tokens-en-wat-niet`,children:`Wat loopt via tokens en wat niet`}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Wat je wijzigt`}),(0,c.jsx)(n.th,{children:`Hoe het werkt`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Kleur, typografie, spacing, hoekafronding, schaduw`}),(0,c.jsx)(n.td,{children:`Via een Figma-variabele: synchroniseren en klaar`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Een nieuwe variant van een bestaand component`}),(0,c.jsx)(n.td,{children:`Kleine codewijziging, in overleg met een developer`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Gedrag: wat gebeurt er bij klikken, openen, sluiten`}),(0,c.jsx)(n.td,{children:`Altijd code, niet in te stellen via tokens`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Een compleet nieuw component`}),(0,c.jsx)(n.td,{children:`Ontwerp plus afstemming, zie hieronder`})]})]})]}),`
`,(0,c.jsxs)(n.p,{children:[`Vuistregel: `,(0,c.jsx)(n.strong,{children:`hoe iets eruitziet`}),` loopt meestal via tokens, `,(0,c.jsx)(n.strong,{children:`wat iets doet`}),` is altijd code.`]}),`
`,(0,c.jsx)(n.h2,{id:`themas`,children:`Thema's`}),`
`,(0,c.jsx)(n.p,{children:`Curve ondersteunt meerdere thema's (bijvoorbeeld een donkere modus en varianten met een andere
accentkleur). Een thema is een set variabelen die bepaalde waarden overschrijft.`}),`
`,(0,c.jsxs)(n.p,{children:[`Ontwerp je iets nieuws, controleer het dan in minimaal licht én donker. Gebruik daarvoor de
`,(0,c.jsx)(n.strong,{children:`Theme`}),`-schakelaar in de werkbalk van deze Storybook. Kies altijd een token in plaats van een vaste
kleurcode, dan werkt je ontwerp automatisch in alle thema's.`]}),`
`,(0,c.jsx)(n.h2,{id:`een-nieuw-component-of-variant-voorstellen`,children:`Een nieuw component of variant voorstellen`}),`
`,(0,c.jsxs)(n.ol,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Kijk eerst of het al bestaat.`}),` Zoek in `,(0,c.jsx)(n.strong,{children:`Components`}),`. Vaak is wat je nodig hebt een bestaand
component met andere inhoud, of een combinatie van twee componenten.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsxs)(n.strong,{children:[`Kijk in de `,(0,c.jsx)(n.a,{href:`https://github.com/orgs/SURFnet/projects/24/views/1`,rel:`nofollow`,children:`backlog`})]}),` of hier al een issue voor is aangemaakt op Github.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Beschrijf waarvoor het is.`}),` In welk product, welke taak van de gebruiker, hoe vaak. Componenten
die maar op één plek voorkomen horen meestal niet in het design system.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Ontwerp alle states.`}),` Standaard, hover, focus, actief, uitgeschakeld, met foutmelding, leeg, en aan
het laden. Een ontwerp zonder states wordt door iemand anders verzonnen.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Geef aan wat er gebeurt bij weinig en veel inhoud.`}),` Lange labels, twee regels tekst, een lege
lijst.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Gebruik bestaande tokens.`}),` Heb je echt een nieuwe waarde nodig, benoem dat expliciet — het is
een beslissing, geen detail.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Maak een Github issue aan`}),` voor een nieuwe feature, bug, of vraag. `,(0,c.jsx)(n.a,{href:`https://github.com/SURFnet/DesignSystem/issues/new`,rel:`nofollow`,children:`Maak een Github issue aan`}),`.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`checklist-is-dit-ontwerp-klaar-voor-implementatie`,children:`Checklist: is dit ontwerp klaar voor implementatie?`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`Alle states zijn getekend.`}),`
`,(0,c.jsx)(n.li,{children:`Kleuren komen uit variabelen, niet uit losse hex-codes.`}),`
`,(0,c.jsx)(n.li,{children:`Getest in licht en donker.`}),`
`,(0,c.jsx)(n.li,{children:`Tekstcontrast is minimaal 4,5:1 voor normale tekst en 3:1 voor iconen en randen.`}),`
`,(0,c.jsx)(n.li,{children:`De focus-indicator is zichtbaar en niet weggehaald.`}),`
`,(0,c.jsx)(n.li,{children:`Duidelijk welke elementen aanklikbaar zijn, ook zonder kleurverschil.`}),`
`,(0,c.jsx)(n.li,{children:`Interactieve elementen zijn minimaal 24×24 pixels (44×44 is comfortabel).`}),`
`,(0,c.jsxs)(n.li,{children:[`Betekenis zit nooit alleen in kleur — zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-designers--toegankelijk-ontwerpen`,children:`Robuust ontwerpen`}),`.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`waar-beslissingen-worden-vastgelegd`,children:`Waar beslissingen worden vastgelegd`}),`
`,(0,c.jsxs)(n.p,{children:[`Beslissingen over het design system, zoals waarom een component zo werkt en waarom een token zo heet, worden apart gedocumenteerd. Zie `,(0,c.jsx)(n.a,{href:`?path=/docs/curve--changelog-en-beslissingen`,children:`Changelog en beslissingen`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
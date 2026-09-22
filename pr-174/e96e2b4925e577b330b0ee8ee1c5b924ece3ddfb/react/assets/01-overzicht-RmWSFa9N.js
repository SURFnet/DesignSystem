import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve`,name:`Overzicht`}),`
`,(0,c.jsx)(n.h1,{id:`curve`,children:`Curve`}),`
`,(0,c.jsx)(n.p,{children:`Curve is het design system van SURF. Eén verzameling componenten, kleuren, typografie en richtlijnen
die alle SURF-producten delen, zodat je niet in elk project opnieuw een knop, een dialoog of een
formulier hoeft te bedenken.`}),`
`,(0,c.jsx)(n.p,{children:`Deze Storybook is de plek waar je ziet wat er is, hoe het eruitziet en hoe je het gebruikt.`}),`
`,(0,c.jsx)(n.h2,{id:`waarom-een-design-system`,children:`Waarom een design system`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Consistentie.`}),` Een gebruiker die van het ene SURF-product naar het andere gaat, herkent de
interface. Dezelfde knop doet hetzelfde en ziet er hetzelfde uit. Dit geeft vertrouwen en maakt het gebruik gemakkelijker.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Snelheid.`}),` Componenten zijn al ontworpen, gebouwd en getest. Dit helpt om sneller aan de slag te gaan.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsxs)(n.strong,{children:[(0,c.jsx)(n.a,{href:`?path=/docs/curve--toegankelijkheid`,children:`Toegankelijkheid`}),`.`]}),` Toetsenbordgebruik, focus-stijlen
en semantiek zitten in de componenten ingebouwd. Dat scheelt werk en voorkomt fouten die
anders pas laat opvallen. (Hier wordt op dit moment nog verder aan ontwikkeld en getest.)`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Onderhoud op één plek.`}),` Een verbetering in een component komt in alle producten terecht die de
nieuwe versie installeren.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`waaruit-bestaat-curve`,children:`Waaruit bestaat Curve`}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Onderdeel`}),(0,c.jsx)(n.th,{children:`Wat het is`}),(0,c.jsx)(n.th,{children:`Voor wie`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`@surfnet/curve-react`})}),(0,c.jsx)(n.td,{children:`De componenten voor React-projecten`}),(0,c.jsx)(n.td,{children:`Developers`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`@surfnet/curve-angular`})}),(0,c.jsx)(n.td,{children:`Dezelfde componenten voor Angular-projecten`}),(0,c.jsx)(n.td,{children:`Developers`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Design tokens`}),(0,c.jsx)(n.td,{children:`Kleuren, typografie, spacing en radius als variabelen`}),(0,c.jsx)(n.td,{children:`Designers en developers`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Deze Storybook`}),(0,c.jsx)(n.td,{children:`Documentatie, voorbeelden en richtlijnen`}),(0,c.jsx)(n.td,{children:`Iedereen`})]})]})]}),`
`,(0,c.jsx)(n.h2,{id:`twee-frameworks-dezelfde-componenten`,children:`Twee frameworks, dezelfde componenten`}),`
`,(0,c.jsxs)(n.p,{children:[`Een knop in React en een knop in Angular hebben dezelfde varianten (`,(0,c.jsx)(n.code,{children:`default`}),`, `,(0,c.jsx)(n.code,{children:`outline`}),`, `,(0,c.jsx)(n.code,{children:`secondary`}),`,
`,(0,c.jsx)(n.code,{children:`ghost`}),`, `,(0,c.jsx)(n.code,{children:`destructive`}),`, `,(0,c.jsx)(n.code,{children:`link`}),`) en dezelfde maten. Dat wordt tijdens het bouwen automatisch gecontroleerd: staat er in het ene framework een variant die het andere niet heeft, dan faalt de build. Zo kunnen de twee packages niet stilletjes uit elkaar groeien.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Boven in de werkbalk (boven elke preview van een component)staat een `,(0,c.jsx)(n.strong,{children:`Framework`}),`-schakelaar. Daarmee switch je naar dezelfde component in de Storybook van het andere framework.`]}),`
`,(0,c.jsx)(n.h2,{id:`figma-is-de-bron-van-waarheid-voor-designsystem`,children:`Figma is de bron van waarheid voor DesignSystem`}),`
`,(0,c.jsxs)(n.p,{children:[`Alle kleuren, typografie, spacing en hoekafrondingen staan als variabelen in Figma. Die variabelen
zijn de officiële bron (`,(0,c.jsx)(n.em,{children:`'Single source of truth'`}),`): de code haalt de waarden daaruit op, niet omgekeerd.`]}),`
`,(0,c.jsx)(n.p,{children:`Dat betekent één belangrijke afspraak: pas kleuren nooit direct in de code aan. Wijzig je een
kleur alleen in de code, dan verdwijnt die wijziging bij de volgende synchronisatie met Figma. Wijzig
je hem in Figma, dan komt hij overal terecht.`}),`
`,(0,c.jsx)(n.h2,{id:`waar-vind-je-wat`,children:`Waar vind je wat`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Voor designers`}),` — Figma, microcopy, video, touch en vergroting.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Voor developers`}),` — installeren, thema's, en wat je zelf nog moet doen om toegankelijk te bouwen en andere `,(0,c.jsx)(`span`,{lang:`en`,children:`best practices`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Foundations`}),` — de basis: design tokens (kleur, typografie, spacing).`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Components`}),` — elk component met zijn varianten, states en voorbeelden. Op elke component-pagina
vind je onder `,(0,c.jsx)(n.strong,{children:`Docs`}),` de eigenschappen die je kunt instellen.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`meedoen`,children:`Meedoen`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Ben je `,(0,c.jsx)(n.strong,{children:`designer`}),`? Begin bij `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-designers--overzicht`,children:`Voor designers`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Ben je `,(0,c.jsx)(n.strong,{children:`developer`}),`? Begin bij `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--curve-gebruiken`,children:`Voor developers`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Wil je weten hoe Curve toegankelijkheid aanpakt? Zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve--toegankelijkheid`,children:`Toegankelijkheid`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Wil je weten hoe nieuwe versies verschijnen? Zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve--updates-en-releases`,children:`Updates en releases`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Wil je weten hoe de changelog eruit ziet? Zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve--changelog-en-beslissingen`,children:`Changelog en beslissingen`}),`.`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
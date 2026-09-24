import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve`,name:`Updates en releases`}),`
`,(0,c.jsx)(n.h1,{id:`updates-en-releases`,children:`Updates en releases`}),`
`,(0,c.jsx)(n.p,{children:`Curve wordt gepubliceerd als npm-package. Elke wijziging krijgt een versienummer, en projecten bepalen
zelf wanneer ze meegaan naar een nieuwe versie. Deze pagina legt uit hoe dat werkt — zowel als je aan
Curve meewerkt als wanneer je Curve gebruikt.`}),`
`,(0,c.jsx)(n.h2,{id:`versienummers-lezen`,children:`Versienummers lezen`}),`
`,(0,c.jsxs)(n.p,{children:[`Voor releases gebruiken we `,(0,c.jsx)(n.a,{href:`https://semver.org`,rel:`nofollow`,children:`semver`}),`, waarbij versienummers opgebouwd worden op een specifieke manier:`]}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Verandert`}),(0,c.jsx)(n.th,{children:`Heet`}),(0,c.jsx)(n.th,{children:`Wat het betekent`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:`0.2.2`}),` → `,(0,c.jsx)(n.code,{children:`0.2.3`})]}),(0,c.jsx)(n.td,{children:`patch`}),(0,c.jsx)(n.td,{children:`Een hele kleine wijziging die niet veel aan de code verandert`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:`0.2.2`}),` → `,(0,c.jsx)(n.code,{children:`0.3.0`})]}),(0,c.jsx)(n.td,{children:`minor`}),(0,c.jsx)(n.td,{children:`Iets nieuws: een component, een variant, een extra instelling.`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:`0.2.2`}),` → `,(0,c.jsx)(n.code,{children:`1.0.0`})]}),(0,c.jsx)(n.td,{children:`major`}),(0,c.jsx)(n.td,{children:`Er is een wijziging die mogelijk je code breekt, dus let goed op bij het bijwerken`})]})]})]}),`
`,(0,c.jsx)(n.h2,{id:`hoe-een-wijziging-een-release-wordt`,children:`Hoe een wijziging een release wordt`}),`
`,(0,c.jsx)(n.p,{children:`Wij publiceren niet met de hand. Het gaat zo:`}),`
`,(0,c.jsxs)(n.ol,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Iemand maakt een wijziging`}),` en beschrijft in de pull request wat er verandert en of het een
patch, minor of major is. Die beschrijving is de latere changelog-tekst, dus die wordt geschreven
voor de mensen die Curve gebruiken.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`De pull request wordt gemerged`}),` naar `,(0,c.jsx)(n.code,{children:`main`}),`. Er is dan nog niets gepubliceerd.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Automatisch verschijnt een "Version Packages" pull request.`}),` Daarin staan de nieuwe
versienummers en de bijgewerkte changelog, verzameld uit alle wijzigingen die nog niet uit zijn.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Die pull request mergen triggert de release.`}),` Dan pas gaat de nieuwe versie naar npm.`]}),`
`]}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`Werk je mee aan Curve? Voer `,(0,c.jsx)(n.code,{children:`pnpm version-packages`}),` en `,(0,c.jsx)(n.code,{children:`pnpm release`}),` nooit zelf uit, en pas geen
versienummers of changelog-bestanden met de hand aan. Dat doet de automatisering voor ons.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`curve-bijwerken-in-je-eigen-project`,children:`Curve bijwerken in je eigen project`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`# kijk eerst wat er nieuw is
pnpm outdated @surfnet/curve-react

# werk bij naar de nieuwste versie
pnpm update @surfnet/curve-react
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Vervang `,(0,c.jsx)(n.code,{children:`curve-react`}),` in bovenstaand codeblok door `,(0,c.jsx)(n.code,{children:`curve-angular`}),` als je Angular gebruikt.`]}),`
`,(0,c.jsx)(n.p,{children:`Praktische tips:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Lees de changelog voordat je een major installeert.`}),` Daar staat precies wat er is veranderd en wat
je moet aanpassen.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Werk bij in een aparte pull request`}),`, zodat collega's je wijzigingen kunnen controleren en automatisch wordt gecontroleerd of je code niets breekt.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Kijk daarna naar je eigen aanpassingen.`}),` Heb je styling voor componenten overschreven met eigen CSS, dan is dat het eerste dat na een update opvalt.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Vergeet de stylesheet niet.`}),` Die zit in dezelfde package en wordt automatisch meegenomen, maar
controleer of je hem nog importeert zoals beschreven bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--curve-gebruiken`,children:`Curve gebruiken`}),`.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`wat-wel-en-niet-wordt-gepubliceerd`,children:`Wat wel en niet wordt gepubliceerd`}),`
`,(0,c.jsxs)(n.p,{children:[`De twee component-packages (`,(0,c.jsx)(n.code,{children:`@surfnet/curve-react`}),` en `,(0,c.jsx)(n.code,{children:`@surfnet/curve-angular`}),`) staan op npm en kun je
installeren. De onderdelen daarachter — de design tokens, de interne afspraken over varianten en de
gedeelde configuratie — zijn interne packages. Ze krijgen wel een versienummer, maar worden niet gepubliceerd: hun inhoud zit al ingebakken in de twee packages die je installeert.`]}),`
`,(0,c.jsx)(n.p,{children:`Je hebt ze dus niet nodig, en je hoeft er ook niets voor te installeren.`}),`
`,(0,c.jsx)(n.h2,{id:`broncode-van-het-design-systeem`,children:`Broncode van het design systeem`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`https://github.com/SURFnet/DesignSystem`,rel:`nofollow`,children:`Vind ons op GitHub`})}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:`https://github.com/SURFnet/DesignSystem/issues/new`,rel:`nofollow`,children:`Maak een Github issue aan`}),` voor een nieuwe feature, bug, of vraag`]}),`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`https://github.com/orgs/SURFnet/projects/24/views/1`,rel:`nofollow`,children:`Ons backlog`})}),`
`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
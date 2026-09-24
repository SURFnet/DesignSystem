import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers`,name:`Curve gebruiken`}),`
`,(0,c.jsx)(n.h1,{id:`curve-gebruiken`,children:`Curve gebruiken`}),`
`,(0,c.jsx)(n.p,{children:`Van niets naar een werkende Curve-knop, stap voor stap. Kies onderweg de blokken van jouw framework en
negeer de andere.`}),`
`,(0,c.jsx)(n.h2,{id:`stap-1--kies-je-package`,children:`Stap 1 — Kies je package`}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Jouw project`}),(0,c.jsx)(n.th,{children:`Installeer`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`React`}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`@surfnet/curve-react`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Angular`}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`@surfnet/curve-angular`})})]})]})]}),`
`,(0,c.jsx)(n.p,{children:`Beide bevatten dezelfde componenten met dezelfde namen en varianten. Je hebt er dus maar één nodig.`}),`
`,(0,c.jsx)(n.h2,{id:`stap-2--installeren`,children:`Stap 2 — Installeren`}),`
`,(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:`React:`})}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`pnpm add @surfnet/curve-react
pnpm add @phosphor-icons/react   # alleen als je iconen gebruikt
`})}),`
`,(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:`Angular:`})}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`pnpm add @surfnet/curve-angular
pnpm add @ng-icons/core @ng-icons/phosphor-icons   # alleen als je iconen gebruikt
`})}),`
`,(0,c.jsx)(n.p,{children:`De iconen zijn een aparte installatie omdat niet elk project ze nodig heeft. Laat je ze weg en gebruik
je toch een icoon, dan krijg je een foutmelding dat het package ontbreekt.`}),`
`,(0,c.jsx)(n.h2,{id:`stap-3--importeer-de-stylesheet-één-keer`,children:`Stap 3 — Importeer de stylesheet, één keer`}),`
`,(0,c.jsx)(n.p,{children:`Zonder deze regel heb je componenten zonder opmaak. Zet hem op de hoogste plek in je applicatie, en
importeer hem precies één keer.`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`React`}),` (bijvoorbeeld in `,(0,c.jsx)(n.code,{children:`main.tsx`}),`, of in `,(0,c.jsx)(n.code,{children:`app/layout.tsx`}),` bij Next.js):`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`import '@surfnet/curve-react/styles.css';
`})}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Angular`}),` (in `,(0,c.jsx)(n.code,{children:`angular.json`}),` onder `,(0,c.jsx)(n.code,{children:`styles`}),`, of in je globale `,(0,c.jsx)(n.code,{children:`styles.css`}),`):`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`@import '@surfnet/curve-angular/styles.css';
`})}),`
`,(0,c.jsx)(n.p,{children:`In dit bestand zitten drie dingen: de basisopmaak, alle design tokens als CSS-variabelen, en de
opmaak van de componenten zelf.`}),`
`,(0,c.jsx)(n.h2,{id:`stap-4--je-eerste-component`,children:`Stap 4 — Je eerste component`}),`
`,(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:`React:`})}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`import { Button } from '@surfnet/curve-react';

export function Voorbeeld() {
  return (
    <>
      <Button>Opslaan</Button>
      <Button variant="outline">Annuleren</Button>
    </>
  );
}
`})}),`
`,(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:`Angular:`})}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`import { Component } from '@angular/core';
import { HlmButton } from '@surfnet/curve-angular';

@Component({
  selector: 'app-voorbeeld',
  imports: [HlmButton],
  template: \`
    <button hlmBtn>Opslaan</button>
    <button hlmBtn variant="outline">Annuleren</button>
  \`,
})
export class VoorbeeldComponent {}
`})}),`
`,(0,c.jsxs)(n.p,{children:[`De knop heeft zes varianten — `,(0,c.jsx)(n.code,{children:`default`}),`, `,(0,c.jsx)(n.code,{children:`outline`}),`, `,(0,c.jsx)(n.code,{children:`secondary`}),`, `,(0,c.jsx)(n.code,{children:`ghost`}),`, `,(0,c.jsx)(n.code,{children:`destructive`}),` en `,(0,c.jsx)(n.code,{children:`link`}),` — en
acht maten. Laat je `,(0,c.jsx)(n.code,{children:`variant`}),` weg, dan krijg je `,(0,c.jsx)(n.code,{children:`default`}),`.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Twee dingen om te weten over Angular: componenten zijn `,(0,c.jsx)(n.em,{children:`standalone`}),`, dus je zet ze in `,(0,c.jsx)(n.code,{children:`imports`}),` van je
eigen component in plaats van in een module. En de meeste Curve-componenten zijn directives — je zet
`,(0,c.jsx)(n.code,{children:`hlmBtn`}),` op een echt `,(0,c.jsx)(n.code,{children:`<button>`}),`-element in plaats van een eigen tag te gebruiken.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Welke varianten en maten een component heeft, staat op zijn eigen pagina onder `,(0,c.jsx)(n.strong,{children:`Components`}),`. Open
daar het tabblad `,(0,c.jsx)(n.strong,{children:`Docs`}),` en scroll naar de tabel met eigenschappen.`]}),`
`,(0,c.jsx)(n.h2,{id:`stap-5--donkere-modus-en-themas`,children:`Stap 5 — Donkere modus en thema's`}),`
`,(0,c.jsxs)(n.p,{children:[`Thema's zet je aan met een class op het `,(0,c.jsx)(n.code,{children:`<html>`}),`-element. Er is niets te importeren en niets te
configureren.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<html class="dark">
  <!-- alles binnen de pagina gebruikt nu de donkere kleuren -->
</html>

<html class="dark theme-surf-green">
  <!-- donker, met een andere accentkleur -->
</html>
`})}),`
`,(0,c.jsx)(n.p,{children:`Wil je een schakelaar bouwen, dan zet of haal je die class weg met JavaScript. De componenten hebben
verder geen instelling nodig: ze gebruiken de CSS-variabelen die bij de actieve class horen.`}),`
`,(0,c.jsx)(n.h2,{id:`stap-6--eigen-styling`,children:`Stap 6 — Eigen styling`}),`
`,(0,c.jsx)(n.p,{children:`De componenten zijn met Tailwind opgemaakt en gebruiken de design tokens. Je kunt ze aanvullen:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`<Button className="w-full">Opslaan</Button>
`})}),`
`,(0,c.jsx)(n.p,{children:`Houd je daarbij aan twee regels:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Gebruik tokens, geen vaste kleurcodes.`}),` Schrijf `,(0,c.jsx)(n.code,{children:`bg-primary`}),` of `,(0,c.jsx)(n.code,{children:`text-muted-foreground`}),` in plaats
van `,(0,c.jsx)(n.code,{children:`bg-[#1a73e8]`}),`. Alleen dan blijft je werk goed in alle thema's.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Vecht niet met een component.`}),` Moet je met `,(0,c.jsx)(n.code,{children:`!important`}),` of hele hoge specificiteit werken om iets
voor elkaar te krijgen, dan is dat een signaal. Vaak bestaat er een variant voor, en anders is het
een goed onderwerp voor een issue.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`stap-7--zo-vind-je-je-weg-in-deze-storybook`,children:`Stap 7 — Zo vind je je weg in deze Storybook`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Curve`}),` — documentatie over het Curve design system.`]}),`
`,(0,c.jsx)(n.li,{children:`Verder in deze sectie — wat je zelf nog moet doen om toegankelijk te bouwen.`}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Components`}),` — elk component, met een voorbeeld per variant en state.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Het tabblad `,(0,c.jsx)(n.strong,{children:`Docs`}),` van een component — alle eigenschappen met hun standaardwaarden.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Foundations → Design Tokens`}),` — welke kleuren, tekststijlen en maten er zijn.`]}),`
`,(0,c.jsxs)(n.li,{children:[`De `,(0,c.jsx)(n.strong,{children:`Framework`}),`-schakelaar in de werkbalk — springt naar hetzelfde component in het andere
framework.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`stap-8--mis-je-iets-of-klopt-iets-niet`,children:`Stap 8 — Mis je iets, of klopt iets niet?`}),`
`,(0,c.jsxs)(n.p,{children:[`Meld het, ook als je het zelf omzeilt: iemand anders loopt tegen hetzelfde aan. Zet erbij welke versie je gebruikt, welk framework, en wat je verwachtte. Heb je github? Maak dan een issue aan op de `,(0,c.jsx)(n.a,{href:`https://github.com/SURFnet/DesignSystem/issues`,rel:`nofollow`,children:`Curve GitHub repository`}),`. Bedankt!`]}),`
`,(0,c.jsx)(n.p,{children:`Wil je zelf een component toevoegen, doe dat dan niet met de hand: er is een generator per framework
en een vaste plek in de mappenstructuur. Vraag ernaar voordat je begint, dan hoeft het achteraf niet
opnieuw.`})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
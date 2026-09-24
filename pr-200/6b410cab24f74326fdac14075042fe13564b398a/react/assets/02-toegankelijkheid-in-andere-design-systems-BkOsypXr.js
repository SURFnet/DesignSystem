import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={h1:`h1`,h2:`h2`,p:`p`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor designers/Meer leren`,name:`Toegankelijkheid in andere design systems`}),`
`,(0,c.jsx)(n.h1,{id:`toegankelijkheid-in-andere-design-systems`,children:`Toegankelijkheid in andere design systems`}),`
`,(0,c.jsx)(n.p,{children:`Elk volwassen design system heeft dezelfde vraag moeten beantwoorden: hoe voorkom je dat kennis over
toegankelijkheid in het hoofd van één specialist blijft zitten? Hun antwoorden zijn openbaar, en het is
verstandiger om ervan te lenen dan het opnieuw te bedenken.`}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Design system`}),(0,c.jsx)(n.th,{children:`Hoe toegankelijkheid er terugkomt`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`GOV.UK Design System`}),(0,c.jsx)(n.td,{children:`Acceptatiecriteria per component, gepubliceerd gebruikersonderzoek, openlijk vermelde bekende problemen`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`NL Design System`}),(0,c.jsx)(n.td,{children:`Door de community onderhouden richtlijnen per component, met het WCAG-criterium erbij vermeld`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`U.S. Web Design System`}),(0,c.jsx)(n.td,{children:`Een toegankelijkheidsparagraaf bij elk component, gekoppeld aan de verplichtingen uit Section 508`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`IBM Carbon`}),(0,c.jsx)(n.td,{children:`Een apart tabblad per component met volledige tabellen voor toetsenbordbediening`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Adobe Spectrum / React Aria`}),(0,c.jsx)(n.td,{children:`Gedrag ondergebracht in getoetste headless hooks, getest op een matrix van echte screenreaders`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Atlassian Design System`}),(0,c.jsx)(n.td,{children:`Richtlijnen per component plus een definition of done op teamniveau`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Shopify Polaris`}),(0,c.jsx)(n.td,{children:`Toegankelijkheid als expliciet fundament, met do's en don'ts per component`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`W3C ARIA Authoring Practices`}),(0,c.jsx)(n.td,{children:`Geen design system: de referentie-implementatie voor elk widgetpatroon`})]})]})]}),`
`,(0,c.jsx)(n.h2,{id:`wat-de-moeite-waard-is-om-over-te-nemen`,children:`Wat de moeite waard is om over te nemen`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Leg de criteria per component vast, niet per systeem.`}),` Het sterkste idee van GOV.UK zijn de
acceptatiecriteria voor toegankelijkheid: een korte lijst, gekoppeld aan het component, van wat waar
moet zijn voordat het af is. Daarmee wordt "is dit toegankelijk?" van een inschatting een checklist die
iemand zonder specialistische kennis kan aflopen.`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Documenteer het toetsenbordcontract.`}),` Zowel Carbon als de ARIA Authoring Practices Guide publiceren
een tabel met elke toets waarop een component reageert. Dat is het nuttigste dat de documentatie van een
component kan bevatten: het is in tien seconden te testen, en het is het eerste dat misgaat wanneer
iemand het component zelf namaakt.`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Publiceer bekende problemen in plaats van ze te verbergen.`}),` GOV.UK vermeldt per component welke
toegankelijkheidsproblemen nog niet zijn opgelost. Dat is ongemakkelijk en enorm bruikbaar: gebruikers
kunnen een geïnformeerde keuze maken in plaats van aan te nemen dat het systeem alles heeft afgedekt.`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Stop gedrag in een getoetste laag.`}),` React Aria van Adobe en de Brain-laag van Spartan delen hetzelfde
uitgangspunt: interactielogica is te subtiel om per product opnieuw te bouwen, dus hoort die in een
primitief dat tegen echte hulpsoftware is getest. Curve maakt dezelfde scheiding: Base UI in React,
Brain in Angular: en daarom gaan deze richtlijnen vooral over samenstellen en niet over het bouwen van
widgets.`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Noem het WCAG-criterium waar een regel bij hoort.`}),` Het NL Design System is hier goed in, en het
verandert hoe richtlijnen overkomen: "geef het invoerveld een label" is een mening, terwijl "1.3.1 Info
en relaties" een eis is met een bijbehorende test.`]}),`
`,(0,c.jsx)(n.h2,{id:`waar-curve-nu-staat`,children:`Waar Curve nu staat`}),`
`,(0,c.jsx)(n.p,{children:`Curve erft zijn componentgedrag van Base UI en Spartan Brain, en zijn kleurcombinaties van design
tokens waarvan het contrast is gecontroleerd. Wat nog ontbreekt is de laag per component waar de
systemen hierboven naartoe zijn gegroeid: toetsenbordtabellen, acceptatiecriteria voor toegankelijkheid,
en een eerlijke lijst met bekende problemen op de documentatiepagina van elk component.`}),`
`,(0,c.jsx)(n.p,{children:`Voeg je een component toe of beoordeel je er een, dan is dat de waardevolste documentatie die je kunt
achterlaten: waardevoller dan nog een gebruiksvoorbeeld.`})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
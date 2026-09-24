import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Ontbrekende skiplinks`}),`
`,(0,c.jsx)(n.h1,{id:`ontbrekende-skiplinks`,children:`Ontbrekende skiplinks`}),`
`,(0,c.jsx)(n.p,{children:`Een skiplink is de eerste focusbare link op een pagina. Hij slaat de herhaalde schil over: logo,
navigatie, zoekveld: en zet de focus op de hoofdinhoud. Zonder die sprong tabt iemand die geen
muis gebruikt op iedere pagina opnieuw door hetzelfde menu.`}),`
`,(0,c.jsx)(n.p,{children:`Dat is WCAG 2.4.1 (Blokken omzeilen). Het is ook gewoon beleefd: de chrome is voor wie hem nodig
heeft, niet voor wie hem al twintig keer is gepasseerd.`}),`
`,(0,c.jsx)(n.h2,{id:`voor-wie-het-verschil-maakt`,children:`Voor wie het verschil maakt`}),`
`,(0,c.jsxs)(`dl`,{children:[(0,c.jsx)(`dt`,{children:`Toetsenbord`}),(0,c.jsx)(`dd`,{children:(0,c.jsxs)(n.p,{children:[`Elke `,(0,c.jsx)(`kbd`,{children:`Tab`}),` is werk. Twintig stops vóór het artikel is twintig stops te veel, op elke
pagina opnieuw.`]})}),(0,c.jsx)(`dt`,{children:`Screenreader`}),(0,c.jsx)(`dd`,{children:(0,c.jsxs)(n.p,{children:[`Landmarks (`,(0,c.jsx)(`code`,{children:`main`}),`, `,(0,c.jsx)(`code`,{children:`nav`}),`) helpen, maar een skiplink is de kortste route en
werkt ook als de landmarks ontbreken of dubbel zijn.`]})}),(0,c.jsx)(`dt`,{children:`Beperkte motoriek`}),(0,c.jsx)(`dd`,{children:`Minder toetsaanslagen is minder pijn, minder tremor, minder tijd.`})]}),`
`,(0,c.jsx)(n.p,{children:`Op een component in isolatie: een knop, een veld, een dialoog: heb je geen skiplink nodig. Op
een volledige pagina of applicatiescherm met herhaalde navigatie wel. Curve levert hem niet: hij
hoort in de schil van het product.`}),`
`,(0,c.jsx)(n.h2,{id:`hoe-je-hem-maakt`,children:`Hoe je hem maakt`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<a class="skip-link" href="#main">Ga naar de inhoud</a>
<header>…logo, navigatie, zoekveld…</header>
<main id="main" tabindex="-1">
  <!-- de unieke inhoud van deze pagina -->
</main>
`})}),`
`,(0,c.jsx)(n.p,{children:`Vier regels, allemaal nodig:`}),`
`,(0,c.jsxs)(n.ol,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Eerste focusbare element.`}),` Zet de link bovenaan in de DOM, vóór de navigatie. Niet visueel
"ergens links", terwijl er al drie andere links aan voorafgaan.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Een echt doel.`}),` `,(0,c.jsx)(n.code,{children:`href="#main"`}),` wijst naar een `,(0,c.jsx)(n.code,{children:`id`}),` die bestaat. Een dode anker is erger dan
geen skiplink: de focus blijft waar hij was en de gebruiker denkt dat het product kapot is.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Het doel kan focus krijgen.`}),` `,(0,c.jsx)(n.code,{children:`<main>`}),` is van nature niet focusbaar. Zonder
`,(0,c.jsx)(n.code,{children:`tabindex="-1"`}),` springt de pagina wel, maar de volgende `,(0,c.jsx)(`kbd`,{children:`Tab`}),` begint opnieuw bovenin,
of de screenreader leest niet vanaf de inhoud. `,(0,c.jsx)(n.code,{children:`tabindex="-1"`}),` maakt het doel programmeerbaar
focusbaar zonder het in de tabvolgorde te zetten.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Verberg hem tot hij focus heeft.`}),` `,(0,c.jsx)(n.code,{children:`display: none`}),` of `,(0,c.jsx)(n.code,{children:`visibility: hidden`}),` haalt hem uit de
tabvolgorde: dan bestaat hij niet. Gebruik een visueel-verborgen patroon dat bij `,(0,c.jsx)(n.code,{children:`:focus`}),`
weer zichtbaar wordt (een utility als `,(0,c.jsx)(n.code,{children:`sr-only`}),` die je bij focus ongedaan maakt), of laat hem
altijd staan.`]}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`.skip-link {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  transform: translateY(-200%);
}

.skip-link:focus {
  transform: none;
}
`})}),`
`,(0,c.jsx)(n.p,{children:`De zichtbare tekst is gewoon Nederlands: "Ga naar de inhoud". Niet "Skip to main content" op een
Nederlandse pagina, en niet "Klik hier".`}),`
`,(0,c.jsx)(n.h2,{id:`meer-dan-één`,children:`Meer dan één`}),`
`,(0,c.jsxs)(n.p,{children:[`Eén skiplink naar `,(0,c.jsx)(n.code,{children:`main`}),` is het minimum. Heeft de pagina een groot zoekveld of een tweede
navigatie die op iedere view terugkomt, dan mag je er twee of drie zetten: naar de inhoud, naar
de zoekfunctie, naar het menu: zolang ze vooraan staan en hun doel halen.`]}),`
`,(0,c.jsx)(n.p,{children:`Zet geen skiplink naar iets dat niet herhaald wordt. Een sprong naar "paragraaf 4" is geen
skiplink, dat is een inhoudsopgave.`}),`
`,(0,c.jsx)(n.h2,{id:`hoe-je-hem-test`,children:`Hoe je hem test`}),`
`,(0,c.jsxs)(n.p,{children:[`De test staat ook in de
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-je-werk-testen--handmatig-testen`,children:`toetsenbordronde`}),`. Hij duurt tien
seconden:`]}),`
`,(0,c.jsxs)(n.ol,{children:[`
`,(0,c.jsx)(n.li,{children:`Herlaad de pagina.`}),`
`,(0,c.jsxs)(n.li,{children:[`Klik in de adresbalk en druk op `,(0,c.jsx)(`kbd`,{children:`Tab`}),`.`]}),`
`,(0,c.jsx)(n.li,{children:`De skiplink is het eerste wat focus krijgt, en hij is nu zichtbaar.`}),`
`,(0,c.jsxs)(n.li,{children:[`Druk op `,(0,c.jsx)(`kbd`,{children:`Enter`}),`. De focus staat in de hoofdinhoud; de volgende `,(0,c.jsx)(`kbd`,{children:`Tab`}),` landt op
het eerste bedienbare element `,(0,c.jsx)(n.em,{children:`in`}),` die inhoud, niet opnieuw in de header.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`Faalt stap 3, dan is hij te laat in de DOM of met `,(0,c.jsx)(n.code,{children:`display: none`}),` weggestopt. Faalt stap 4, dan
mist het doel een `,(0,c.jsx)(n.code,{children:`id`}),` of `,(0,c.jsx)(n.code,{children:`tabindex="-1"`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
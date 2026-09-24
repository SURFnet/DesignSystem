import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor designers`,name:`Touch en vergroting`}),`
`,(0,c.jsx)(n.h1,{id:`touch-en-vergroting`,children:`Touch en vergroting`}),`
`,(0,c.jsxs)(n.p,{children:[`Op een telefoon zijn de doelen kleiner, de vingers onnauwkeuriger, en is zoom de enige manier om tekst te lezen. Dezelfde drempels gelden voor mensen met `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-designers--toegankelijk-ontwerpen`,children:`beperkte motoriek`}),` en voor mensen met `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-designers--toegankelijk-ontwerpen`,children:`slechtziendheid`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`aanraakdoelen`,children:`Aanraakdoelen`}),`
`,(0,c.jsxs)(n.p,{children:[`WCAG 2.2 vraagt minimaal `,(0,c.jsx)(n.strong,{children:`24×24 CSS-pixels`}),` voor elk bedienbaar element (2.5.8). `,(0,c.jsx)(n.strong,{children:`44×44`}),` is
comfortabel: dat is wat je duim haalt zonder te mikken, en wat Apple en Android al jaren als
richtlijn geven.`]}),`
`,(0,c.jsx)(n.p,{children:`Dat geldt voor knoppen, links, selectievakjes, icoontjes in een toolbar, en de sluitknop van een
dialoog. Een tekstlink in een alinea mag kleiner, omdat de regel ernaast per ongeluk tikken
ondervangt. Losse icoonknoppen hebben die ruimte niet.`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Zet ruimte `,(0,c.jsx)(n.em,{children:`tussen`}),` doelen, niet alleen grotere iconen. Twee 24-pixel-iconen tegen elkaar aan
zijn één verkeerde tik.`]}),`
`,(0,c.jsx)(n.li,{children:`Het klikvlak mag groter zijn dan de tekening. Padding telt; een 16-pixel-icoon in een
44-pixel-knop is in orde.`}),`
`,(0,c.jsx)(n.li,{children:`Curve-componenten zitten aan de ruime kant. Maak ze niet kleiner om een toolbar "strakker" te krijgen.`}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`Alles wat je sleept: een slider, een kaart, een rangschiklijst: heeft een alternatief met één tik of met het toetsenbord nodig. Sleep is als een 'progressive enhancement' voor wie het kan, niet de enige manier om een doel te bereiken.`}),`
`,(0,c.jsx)(n.h2,{id:`gebruik-op-een-telefoon`,children:`Gebruik op een telefoon`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Geen hover-menu's als enige toegang.`}),` Een telefoon heeft geen hover. Zorg dat dezelfde inhoud
ook met een tik te openen is, en weer weg te tikken zonder de vinger te verplaatsen.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Blokkeer zoomen niet.`}),` Wie de tekst niet kan vergroten, kan de pagina niet gebruiken. Zoom
uitzetten om te voorkomen dat invoervelden "raar" inzoomen, is geen oplossing: het is verboden.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Invoervelden niet kleiner dan 16px.`}),` iOS zoomt anders de hele pagina in zodra je het veld
aantikt: hinderlijk, en een signaal dat het veld te klein was.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Geen actie die alleen een gebaar is`}),` (swipe om te verwijderen, pinch om te openen) zonder een
zichtbare knop die hetzelfde doet.`]}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`Test op een echt toestel, met je vinger in plaats van de precisie van een muis. Tik de sluitknop,
de secundaire actie, de checkbox in een lijst. Wat je mist, mist iedereen in de trein.`}),`
`,(0,c.jsx)(n.h2,{id:`de-pagina-vergroten`,children:`De pagina vergroten`}),`
`,(0,c.jsx)(n.p,{children:`Vergroten is geen extra functie: mensen gebruiken de zoom van hun browser. Jouw layout moet dat
overleven.`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Bij `,(0,c.jsx)(n.strong,{children:`200% zoom`}),` blijft alles leesbaar: geen overlapping, geen afgesneden labels, geen tekst
die in zijn kader verdwijnt.`]}),`
`,(0,c.jsxs)(n.li,{children:[`Bij `,(0,c.jsx)(n.strong,{children:`400% zoom`}),` (of een venster van 320px breed) vouwt de opmaak terug naar één kolom. Eén
scrollrichting. Horizontaal scrollen door de hele pagina is niet toegestaan (WCAG 1.4.10).`]}),`
`,(0,c.jsx)(n.li,{children:`Vaste breedtes, tekst die niet mag afbreken, en kaders met een vaste hoogte die overlopende
inhoud afsnijden, zijn de drie oorzaken die je bijna altijd vindt.`}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`De stappen om dit na te lopen staan in
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-je-werk-testen--handmatig-testen`,children:`Handmatig testen`}),`. Doe ze op het
scherm dat je net hebt ontworpen, niet alleen op de homepage.`]}),`
`,(0,c.jsx)(n.h2,{id:`inzoomen-op-een-afbeelding`,children:`Inzoomen op een afbeelding`}),`
`,(0,c.jsx)(n.p,{children:`Pagina-zoom helpt niet als de informatie in een plaatje zit dat zelf niet groter wordt, of dat
bij vergroting een onleesbare brij van pixels is. Denk aan een schema, een kaart, een screenshot
van een interface, een poster, een tabel die als plaatje is aangeleverd.`}),`
`,(0,c.jsx)(n.p,{children:`Wat je dan doet:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Zet de informatie óók als tekst`}),` als dat kan. Een grafiek met één boodschap hoort die
boodschap in de lopende tekst of in de
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--slechte-alt-tekst`,children:`alt-tekst`}),`.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Lever een grotere versie.`}),` Een vector schaalt mee. Een foto of screenshot heeft een bestand
nodig dat 200–400% zoom overleeft, of een link naar de originele, grotere versie.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Geef een expliciete vergroot-actie`}),` als de afbeelding in een klein kader staat: "Open de
figuur groter", of een pagina met alleen die afbeelding. Inzoomen met twee vingers op een
thumbnail in een carrousel is geen betrouwbare route: die vangt de pagina of de carrousel vaak
af.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Laat inzoomen met twee vingers werken`}),`, ook in een overlay. Een pop-up die alle gebaren
opeist, maakt de afbeelding erin onleesbaar.`]}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`Een sfeerfoto hoeft niet vergroot te kunnen. Een afbeelding waar iemand een beslissing aan
ontleent, wel.`}),`
`,(0,c.jsx)(n.h2,{id:`affordance-op-een-klein-oppervlak`,children:`Affordance op een klein oppervlak`}),`
`,(0,c.jsxs)(n.p,{children:[`Iets dat eruitziet als een knop moet een knop zijn, en groot genoeg om die knop te `,(0,c.jsx)(n.em,{children:`zijn`}),`. Een
onderstreepte zin is een link. Een grijs veld is invoer. Als het ontwerp die signalen wegpoetst
om "rustig" te ogen, weet niemand wat tikt: met muis niet, met duim niet, met spraak niet.`]}),`
`,(0,c.jsx)(n.p,{children:`Knoppen zonder zichtbaar label, en extra's die alleen bij hover verschijnen, vallen op een
telefoon harder door de mand dan op een desktop.`}),`
`,(0,c.jsx)(n.h2,{id:`checklist-is-dit-ontwerp-toegankelijk-op-een-telefoon-of-sterk-ingezoomed`,children:`Checklist: is dit ontwerp toegankelijk op een telefoon of sterk ingezoomed?`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`Elk tikdoel is minimaal 24×24 pixels (44×44 is comfortabel), met ruimte ertussen.`}),`
`,(0,c.jsx)(n.li,{children:`Icoonknoppen hebben een klikvlak dat groter is dan het icoon zelf.`}),`
`,(0,c.jsx)(n.li,{children:`Alles wat je sleept of swipet, kan ook met één tik.`}),`
`,(0,c.jsx)(n.li,{children:`Hover-menu's zijn ook met een tik te openen en te sluiten.`}),`
`,(0,c.jsx)(n.li,{children:`Zoomen is niet geblokkeerd.`}),`
`,(0,c.jsx)(n.li,{children:`Invoervelden zijn minimaal 16px.`}),`
`,(0,c.jsx)(n.li,{children:`Bij 200% zoom overlapt niets en wordt geen tekst afgesneden.`}),`
`,(0,c.jsx)(n.li,{children:`Bij 400% zoom (of 320px breed) is er één kolom en één scrollrichting.`}),`
`,(0,c.jsx)(n.li,{children:`Tekst mag afbreken; kaders knippen geen inhoud af bij een vaste hoogte.`}),`
`,(0,c.jsx)(n.li,{children:`Informatie in een afbeelding staat óók als tekst, of de afbeelding is te vergroten.`}),`
`,(0,c.jsx)(n.li,{children:`Knoppen, links en invoervelden zien eruit zoals ze werken, met een zichtbaar label.`}),`
`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
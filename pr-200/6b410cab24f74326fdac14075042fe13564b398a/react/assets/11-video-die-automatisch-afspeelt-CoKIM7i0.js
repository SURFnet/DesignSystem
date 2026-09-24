import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-CLxla1pI.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-D_KkBYRM.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Wat vaak mis gaat`,name:`Video die automatisch afspeelt`}),`
`,(0,c.jsx)(n.h1,{id:`video-die-automatisch-afspeelt`,children:`Video die automatisch afspeelt`}),`
`,(0,c.jsxs)(n.p,{children:[`Een `,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers--toegankelijk-bouwen`,children:`screenreadergebruiker`}),`
luistert naar de pagina. Een video die vanzelf begint, praat daaroverheen.`]}),`
`,(0,c.jsx)(n.h2,{id:`het-probleem`,children:`Het probleem`}),`
`,(0,c.jsx)(n.p,{children:`Automatisch geluid vecht met de spraak van de screenreader. De gebruiker hoort twee stemmen
tegelijk, kwijt de plek in de pagina, en moet eerst een pauzeknop vinden die hij niet kan zien.`}),`
`,(0,c.jsx)(n.p,{children:`Hetzelfde geldt voor achtergrondvideo met geluid, een hero-loop, of een chatbot die ongevraagd
begint te praten. Wie het geluid niet kan pauzeren binnen een paar seconden, kan de rest van de
pagina niet gebruiken. WCAG 1.4.2 (Audio Control) eist dat je dat geluid kunt stoppen.`}),`
`,(0,c.jsxs)(n.p,{children:[`Bewegend beeld zonder geluid is minder luid, maar nog steeds een afleiding. Dat raakt vooral de
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-wat-vaak-mis-gaat--automatische-beweging`,children:`cognitieve persona`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`de-oplossing`,children:`De oplossing`}),`
`,(0,c.jsxs)(n.p,{children:[`Speel niets af totdat iemand erom vraagt. Geen `,(0,c.jsx)(n.code,{children:`autoplay`}),`, en al helemaal niet met geluid.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Niet doen -->
<video src="intro.mp4" autoplay muted loop></video>

<!-- Wel doen: stilstaand beeld, gebruiker start zelf -->
<video src="intro.mp4" controls poster="intro.jpg">
  <track kind="captions" src="intro.nl.vtt" srclang="nl" label="Nederlands" />
</video>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Moet iets wél vanzelf lopen (een stille sfeerloop), dan: zonder geluid, pauzeerbaar, en stil bij
`,(0,c.jsx)(n.code,{children:`prefers-reduced-motion`}),`. De pauzeknop moet met het toetsenbord bereikbaar zijn en een naam hebben.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Ondertiteling, transcript en audiodescriptie staan bij
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-designers--video-en-audio`,children:`Video en audio`}),`.`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
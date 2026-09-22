import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,o as n,v as r}from"./blocks-BAoneT7p.js";import{t as i}from"./jsx-runtime-CaZkqeYb.js";import{t as a}from"./mdx-react-shim-lbHL14Bs.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Curve/Voor developers/Je werk testen`,name:`Geautomatiseerd testen`}),`
`,(0,c.jsx)(n.h1,{id:`geautomatiseerd-testen`,children:`Geautomatiseerd testen`}),`
`,(0,c.jsxs)(n.p,{children:[`Automatisering bestaat om te voorkomen dat je dezelfde fout steeds opnieuw ontdekt. Het vertelt je niet
of je interface ergens op slaat, maar het vindt wél elke keer, op elke branch en gratis het ontbrekende
label, de tekst met 3:1 contrast en de dubbele `,(0,c.jsx)(n.code,{children:`id`}),`.`]}),`
`,(0,c.jsx)(n.p,{children:`Vier lagen, van goedkoop naar duur.`}),`
`,(0,c.jsx)(n.h2,{id:`1-linten-tijdens-het-typen`,children:`1. Linten tijdens het typen`}),`
`,(0,c.jsx)(n.p,{children:`Een linter vangt een hele categorie fouten op bij de cursor, nog voordat er een browser aan te pas komt.
Zet de regelset aan die bij jouw templatetaal hoort, en schakel regels niet uit zonder een benoemde,
beoordeelde uitzondering.`}),`
`,(0,c.jsxs)(`dl`,{children:[(0,c.jsx)(`dt`,{children:`React / JSX`}),(0,c.jsx)(`dd`,{children:(0,c.jsxs)(n.p,{children:[(0,c.jsx)(`a`,{href:`https://github.com/jsx-eslint/eslint-plugin-jsx-a11y`,children:`eslint-plugin-jsx-a11y`}),`,`,` `,`
`,(0,c.jsx)(`code`,{children:`recommended`}),` of `,(0,c.jsx)(`code`,{children:`strict`}),`.`]})}),(0,c.jsx)(`dt`,{children:`Angular`}),(0,c.jsx)(`dd`,{children:(0,c.jsxs)(n.p,{children:[`De templateregels van`,` `,`
`,(0,c.jsx)(`a`,{href:`https://github.com/angular-eslint/angular-eslint`,children:`angular-eslint`}),` (
`,(0,c.jsx)(`code`,{children:`@angular-eslint/template-accessibility-*`}),`).`]})}),(0,c.jsx)(`dt`,{children:`Editor`}),(0,c.jsx)(`dd`,{children:(0,c.jsx)(n.p,{children:`De axe Accessibility Linter-extensie voor VS Code / Cursor markeert problemen in HTML en JSX
terwijl je typt.`})})]}),`
`,(0,c.jsxs)(n.p,{children:[`Linters zien alleen statische opmaak, dus ze kunnen niet weten dat bij `,(0,c.jsx)(n.code,{children:`role="tab"`}),` het bijbehorende
`,(0,c.jsx)(n.code,{children:`tabpanel`}),` ontbreekt. Het blijft het waardevolste uur dat je eraan besteedt.`]}),`
`,(0,c.jsx)(n.h2,{id:`2-de-storybook-addon-voor-toegankelijkheid`,children:`2. De Storybook-addon voor toegankelijkheid`}),`
`,(0,c.jsxs)(n.p,{children:[`Beide Curve-Storybooks bevatten
`,(0,c.jsx)(n.a,{href:`https://storybook.js.org/docs/writing-tests/accessibility-testing`,rel:`nofollow`,children:(0,c.jsx)(n.code,{children:`@storybook/addon-a11y`})}),`, die
axe-core loslaat op de weergegeven story. Open het paneel `,(0,c.jsx)(n.strong,{children:`Accessibility`}),` in de addonbalk terwijl je
een component bekijkt.`]}),`
`,(0,c.jsx)(n.p,{children:`Dit is de beste plek om contrast- en naamgevingsproblemen te vinden, omdat een story het component
isoleert van de ruis van een volledige pagina. Projecten die Curve gebruiken, doen er goed aan dezelfde
addon in hun eigen Storybook te zetten.`}),`
`,(0,c.jsx)(n.p,{children:`Een component los bekijken legt bovendien iets bloot dat een volledige pagina verbergt: een component
dat alleen toegankelijk is dankzij opmaak die zijn ouder toevallig meelevert.`}),`
`,(0,c.jsx)(n.h2,{id:`3-component--en-end-to-endtests`,children:`3. Component- en end-to-endtests`}),`
`,(0,c.jsx)(n.p,{children:`Laat axe los op weergegeven UI in je tests. Probeer niet elke pixel van de applicatie te scannen: dek de
routes af die ertoe doen: inloggen, de belangrijkste formulieren, navigatie, en elke dialoog of overlay.`}),`
`,(0,c.jsxs)(`dl`,{children:[(0,c.jsx)(`dt`,{children:`Componenttests`}),(0,c.jsx)(`dd`,{children:(0,c.jsxs)(n.p,{children:[(0,c.jsx)(`a`,{href:`https://github.com/nickcolley/jest-axe`,children:`jest-axe`}),` of `,(0,c.jsx)(`code`,{children:`vitest-axe`}),` op een
weergegeven component.`]})}),(0,c.jsx)(`dt`,{children:`End-to-end`}),(0,c.jsxs)(`dd`,{children:[(0,c.jsx)(`a`,{href:`https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright`,children:(0,c.jsx)(n.p,{children:`@axe-core/playwright`})}),` `,(0,c.jsxs)(n.p,{children:[`of `,(0,c.jsx)(`code`,{children:`cypress-axe`}),` op de belangrijkste gebruikersroutes.`]})]}),(0,c.jsx)(`dt`,{children:`Storybook`}),(0,c.jsx)(`dd`,{children:(0,c.jsx)(n.p,{children:`De test runner kan de a11y-controles voor elke story in CI uitvoeren, wat je met nauwelijks
schrijfwerk brede dekking oplevert.`})})]}),`
`,(0,c.jsxs)(n.p,{children:[`Test op meer dan axe wanneer het gedrag specifiek is. axe kan niet vaststellen dat de focus in de dialoog
belandde, dat `,(0,c.jsx)(`kbd`,{children:`Esc`}),` hem sloot en dat de focus terugkeerde naar de knop: een test wel:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`await userEvent.click(screen.getByRole('button', { name: 'Instellingen openen' }));
const dialog = screen.getByRole('dialog', { name: 'Instellingen' });
expect(dialog).toContainElement(document.activeElement);

await userEvent.keyboard('{Escape}');
expect(dialog).not.toBeInTheDocument();
expect(screen.getByRole('button', { name: 'Instellingen openen' })).toHaveFocus();
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Zoeken op rol en toegankelijke naam, zoals hierboven, is zelf al een toegankelijkheidstest: kan
`,(0,c.jsx)(n.code,{children:`getByRole('button', { name: ... })`}),` jouw knop niet vinden, dan een screenreader ook niet.`]}),`
`,(0,c.jsx)(n.h2,{id:`4-continuous-integration`,children:`4. Continuous integration`}),`
`,(0,c.jsxs)(n.p,{children:[`Controles die alleen lokaal draaien, worden overgeslagen zodra de druk oploopt. Zet een dunne, betrouwbare
selectie op elke pull request en laat de tragere scans op `,(0,c.jsx)(n.code,{children:`main`}),` of 's nachts draaien.`]}),`
`,(0,c.jsxs)(`dl`,{children:[(0,c.jsx)(`dt`,{children:`Elke pull request`}),(0,c.jsx)(`dd`,{children:`Linten inclusief a11y-regels, plus unittests met axe-asserties.`}),(0,c.jsx)(`dd`,{children:`Een korte Playwright- of Cypress-run met axe op de belangrijkste routes.`}),(0,c.jsx)(`dt`,{children:(0,c.jsxs)(n.p,{children:[`'s Nachts of op `,(0,c.jsx)(`code`,{children:`main`})]})}),(0,c.jsx)(`dd`,{children:(0,c.jsxs)(n.p,{children:[`De toegankelijkheidscategorie van`,` `,`
`,(0,c.jsx)(`a`,{href:`https://github.com/GoogleChrome/lighthouse-ci`,children:`Lighthouse CI`}),`,`,` `,`
`,(0,c.jsx)(`a`,{href:`https://github.com/pa11y/pa11y-ci`,children:`pa11y-ci`}),`, of een volledige run van de Storybook
test runner.`]})})]}),`
`,(0,c.jsx)(n.p,{children:`Laat de build falen op nieuwe fouten in de code die wordt aangeraakt. Houd bekende problemen bij als
issues met een eigenaar, niet als een permanent rode pipeline die iedereen heeft leren negeren.`}),`
`,(0,c.jsx)(n.h2,{id:`5-visuele-regressie-playwright`,children:`5. Visuele regressie (Playwright)`}),`
`,(0,c.jsx)(n.p,{children:`Curve screenshot de gebouwde Storybooks met Playwright. Dat vangt twee dingen: een React-component
die per ongeluk anders gaat uitzien, en een React- en Angular-story met dezelfde id die niet meer
op elkaar lijken.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`pnpm build-storybook
pnpm test:visual
`})}),`
`,(0,c.jsxs)(n.p,{children:[`De React-baselines staan in `,(0,c.jsx)(n.code,{children:`tests/visual/__screenshots__/`}),` en worden in CI vergeleken. Parity-tests
bewaren geen snapshots: ze zetten dezelfde story in beide Storybooks naast elkaar. Tag een story
`,(0,c.jsx)(n.code,{children:`skip-visual`}),` als die niet stabiel te fotograferen is (animatie, willekeurige data).`]}),`
`,(0,c.jsx)(n.h2,{id:`wat-hier-allemaal-niet-uit-komt`,children:`Wat hier allemaal niet uit komt`}),`
`,(0,c.jsxs)(n.p,{children:[`Alles wat een afweging vraagt: of de kopstructuur een verhaal vertelt, of iets een link had moeten zijn,
of de tabvolgorde het ontwerp volgt, of de foutmelding helpt, of de flow werkt met een screenreader.
Automatisering verkleint de handmatige ronde: zie
`,(0,c.jsx)(n.a,{href:`?path=/docs/curve-voor-developers-je-werk-testen--handmatig-testen`,children:`Handmatig testen`}),`: maar
schaft hem nooit af.`]}),`
`,(0,c.jsx)(n.h2,{id:`gereedschap`,children:`Gereedschap`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:`https://www.deque.com/axe/devtools/`,rel:`nofollow`,children:`axe DevTools`}),`: browserextensie; dezelfde motor als de
Storybook-addon en de CI-packages.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:`https://accessibilityinsights.io/`,rel:`nofollow`,children:`Accessibility Insights`}),`: begeleide handmatige controles, met een
visualisatie van de tabvolgorde die focusproblemen meteen zichtbaar maakt.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:`https://wave.webaim.org/extension/`,rel:`nofollow`,children:`WAVE`}),`: zet de bevindingen op de pagina zelf; handig om iemand
zonder technische achtergrond te laten zien wat er mis is.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:`https://www.tpgi.com/color-contrast-checker/`,rel:`nofollow`,children:`Colour Contrast Analyser`}),`: om een ontwerp te
controleren voordat het gebouwd wordt.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:`https://www.nvaccess.org/download/`,rel:`nofollow`,children:`NVDA`}),`: gratis screenreader voor Windows; na JAWS de meest
gebruikte.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:`https://webaim.org/articles/voiceover/`,rel:`nofollow`,children:`VoiceOver-handleiding (WebAIM)`}),`: hoe je de screenreader
bedient die al op je Mac staat.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`testen-en-ci`,children:`Testen en CI`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:`https://github.com/dequelabs/axe-core`,rel:`nofollow`,children:`axe-core`}),`: de regelmotor, inclusief welke regels bestaan en wat
ze niet kunnen zien.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:`https://webaim.org/projects/million/`,rel:`nofollow`,children:`WebAIM Million`}),`: het jaarlijkse onderzoek naar een miljoen
homepages. Ontnuchterend, en bruikbaar als je moet onderbouwen waarom hier tijd naartoe gaat.`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};
import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{T as n,n as r,r as i,t as a}from"./utils-DTlAv2QJ.js";var o,s,c=e((()=>{o=`_skipLink_l94lb_5`,s={skipLink:o}}));function l(e){if(!e?.startsWith(`#`)||e.length<2)return!1;let t=document.getElementById(decodeURIComponent(e.slice(1)));return t?(t.tabIndex<0&&!t.hasAttribute(`tabindex`)&&(t.setAttribute(`tabindex`,`-1`),t.addEventListener(`blur`,()=>t.removeAttribute(`tabindex`),{once:!0})),t.focus(),document.activeElement===t):!1}function u({className:e,href:t=`#main-content`,onClick:n,...r}){return(0,d.jsx)(`a`,{"data-slot":`skip-link`,href:t,className:a(s.skipLink,e),onClick:e=>{n?.(e),!e.defaultPrevented&&l(t)&&e.preventDefault()},...r})}var d,f=e((()=>{r(),c(),d=t(),u.__docgenInfo={description:``,methods:[],displayName:`SkipLink`,props:{href:{defaultValue:{value:`'#main-content'`,computed:!1},required:!1}}}}));function p({mainId:e,navId:t,children:n}){return(0,m.jsxs)(`div`,{className:`relative w-96 rounded-lg border`,children:[n,(0,m.jsx)(`div`,{className:`border-b p-4`,children:(0,m.jsxs)(`div`,{id:t,className:`flex gap-4 text-sm`,children:[(0,m.jsx)(`a`,{href:`#`,children:`Home`}),(0,m.jsx)(`a`,{href:`#`,children:`Services`}),(0,m.jsx)(`a`,{href:`#`,children:`About`}),(0,m.jsx)(`a`,{href:`#`,children:`Contact`})]})}),(0,m.jsxs)(`div`,{id:e,className:`p-4 text-sm`,children:[(0,m.jsx)(`h2`,{className:`text-lg font-semibold`,children:`Main content`}),(0,m.jsx)(`p`,{children:`Press Tab from the top of the page to reveal the skip link, then Enter to move focus here.`})]})]})}var m,h,g,_,v,y;e((()=>{i(),f(),m=t(),h={title:`Components/SkipLink`,component:u,parameters:{docs:{description:{component:n.docs.description}}},args:{children:`Skip to main content`,href:`#main-content`},argTypes:{children:{control:`text`},href:{control:`text`}}},g={render:e=>(0,m.jsx)(p,{mainId:`main-content`,children:(0,m.jsx)(u,{...e})})},_={args:{href:`#focused-main-content`},render:e=>(0,m.jsx)(p,{mainId:`focused-main-content`,children:(0,m.jsx)(u,{...e})}),play:async({canvasElement:e})=>{e.querySelector(`[data-slot="skip-link"]`)?.focus()}},v={render:()=>(0,m.jsxs)(p,{mainId:`multiple-main-content`,navId:`multiple-navigation`,children:[(0,m.jsx)(u,{href:`#multiple-main-content`,children:`Skip to main content`}),(0,m.jsx)(u,{href:`#multiple-navigation`,children:`Skip to navigation`})]})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <Page mainId="main-content">
      <SkipLink {...args} />
    </Page>
}`,...g.parameters?.docs?.source},description:{story:`Hidden until it receives keyboard focus — click the canvas, then press Tab.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    href: '#focused-main-content'
  },
  render: args => <Page mainId="focused-main-content">
      <SkipLink {...args} />
    </Page>,
  play: async ({
    canvasElement
  }) => {
    canvasElement.querySelector<HTMLAnchorElement>('[data-slot="skip-link"]')?.focus();
  }
}`,..._.parameters?.docs?.source},description:{story:`The visible state, as shown once the link has keyboard focus.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Page mainId="multiple-main-content" navId="multiple-navigation">
      <SkipLink href="#multiple-main-content">Skip to main content</SkipLink>
      <SkipLink href="#multiple-navigation">Skip to navigation</SkipLink>
    </Page>
}`,...v.parameters?.docs?.source},description:{story:`Several skip links in a row; each one only shows while it has focus.`,...v.parameters?.docs?.description}}},y=[`Default`,`Focused`,`MultipleLinks`]}))();export{g as Default,_ as Focused,v as MultipleLinks,y as __namedExportsOrder,h as default};
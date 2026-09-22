import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{O as n}from"./iframe-CbBuQ8p6.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{Et as i,r as a}from"./utils-C5n3ayfX.js";import{H as o,I as s,P as c,V as l,t as u}from"./index.es-SHpUsVh6.js";import{a as d,i as f,n as p,o as m,r as h,s as g,t as _}from"./input-group-DB4th6YD.js";import{a as v,l as y,r as b,t as x}from"./dropdown-menu-CT1IOcQC.js";import{t as S}from"./dropdown-menu-C_AAWzey.js";function C(){let[e,t]=(0,w.useState)(`All`);return(0,T.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,T.jsxs)(_,{children:[(0,T.jsx)(p,{children:(0,T.jsxs)(x,{children:[(0,T.jsx)(y,{render:(0,T.jsx)(h,{variant:`ghost`,children:e})}),(0,T.jsx)(b,{children:k.map(e=>(0,T.jsx)(v,{onClick:()=>t(e),children:e},e))})]})}),(0,T.jsx)(f,{placeholder:`Search ${e.toLowerCase()}…`})]})})}var w,T,E,D,O,k,A,j,M;e((()=>{u(),a(),w=t(n(),1),S(),g(),T=r(),E={title:`Components/InputGroup`,component:_,parameters:{docs:{description:{component:i.docs.description}}}},D={render:()=>(0,T.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,T.jsxs)(_,{children:[(0,T.jsx)(p,{children:(0,T.jsx)(l,{})}),(0,T.jsx)(f,{placeholder:`Search…`}),(0,T.jsx)(p,{align:`inline-end`,children:`12 results`})]})})},O={render:()=>(0,T.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,T.jsxs)(_,{children:[(0,T.jsx)(p,{children:(0,T.jsx)(d,{children:`https://`})}),(0,T.jsx)(f,{placeholder:`example.com`,className:`pl-1`}),(0,T.jsx)(p,{align:`inline-end`,children:(0,T.jsx)(h,{className:`rounded-full`,size:`icon-xs`,"aria-label":`Open tooltip`,children:(0,T.jsx)(o,{})})})]})})},k=[`All`,`Articles`,`Pages`],A={render:()=>(0,T.jsx)(C,{})},j={render:()=>(0,T.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,T.jsxs)(_,{children:[(0,T.jsx)(m,{"aria-label":`Ask, search or chat…`,placeholder:`Ask, search or chat…`}),(0,T.jsxs)(p,{align:`block-end`,children:[(0,T.jsxs)(h,{variant:`outline`,className:`rounded-full`,size:`icon-xs`,"aria-label":`Add`,children:[(0,T.jsx)(c,{}),(0,T.jsx)(`span`,{className:`sr-only`,children:`Add attachment`})]}),(0,T.jsx)(d,{className:`ml-auto`,children:`52% used`}),(0,T.jsxs)(h,{variant:`default`,className:`rounded-full`,size:`icon-xs`,"aria-label":`Send`,children:[(0,T.jsx)(s,{}),(0,T.jsx)(`span`,{className:`sr-only`,children:`Send`})]})]})]})})},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" />
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </div>
}`,...D.parameters?.docs?.source},description:{story:`Search field with a leading icon and trailing result count.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" className="pl-1" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton className="rounded-full" size="icon-xs" aria-label="Open tooltip">
            <InfoIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
}`,...O.parameters?.docs?.source},description:{story:`URL input with a text prefix on the leading side.`,...O.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <LeadingDropdownExample />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupTextarea aria-label="Ask, search or chat…" placeholder="Ask, search or chat…" />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="outline" className="rounded-full" size="icon-xs" aria-label="Add">
            <PlusIcon />
            <span className="sr-only">Add attachment</span>
          </InputGroupButton>
          <InputGroupText className="ml-auto">52% used</InputGroupText>
          <InputGroupButton variant="default" className="rounded-full" size="icon-xs" aria-label="Send">
            <PaperPlaneTiltIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
}`,...j.parameters?.docs?.source},description:{story:`Chat-style textarea with a block-end toolbar row.`,...j.parameters?.docs?.description}}},M=[`WithLeadingAndTrailingAddon`,`WithTextPrefix`,`WithLeadingDropdown`,`TextareaWithBlockEndToolbar`]}))();export{j as TextareaWithBlockEndToolbar,D as WithLeadingAndTrailingAddon,A as WithLeadingDropdown,O as WithTextPrefix,M as __namedExportsOrder,E as default};
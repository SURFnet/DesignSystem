import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{$t as n,n as r,r as i,t as a}from"./utils-C5n3ayfX.js";import{o,r as s}from"./useRenderElement-BYddqi09.js";import{V as c,it as l,t as u,tt as d}from"./index.es-SHpUsVh6.js";import{t as f}from"./button-C7hzrQPx.js";import{t as p}from"./button-C6o-rz-l.js";import{r as m,t as h}from"./use-render-CnlJCyna.js";import{t as g}from"./input-Cp1tmlZ-.js";import{t as _}from"./input-k4V9cG6h.js";import{t as v}from"./separator-CRxzAMFb.js";import{t as y}from"./separator-j5Z_Fu6A.js";var b,x,S,C,w=e((()=>{b=`_group_qvtgp_1`,x=`_text_qvtgp_66`,S=`_separator_qvtgp_85`,C={group:b,text:x,separator:S}}));function T({className:e}={}){return a(C.group,e)}function E({className:e,orientation:t=`horizontal`,...n}){return(0,k.jsx)(`div`,{role:`group`,"data-slot":`button-group`,"data-orientation":t,className:a(T({orientation:t}),e),...n})}function D({className:e,render:t,...n}){return m({defaultTagName:`div`,props:o({className:a(C.text,e)},n),render:t,state:{slot:`button-group-text`}})}function O({className:e,orientation:t=`vertical`,...n}){return(0,k.jsx)(v,{"data-slot":`button-group-separator`,orientation:t,className:a(C.separator,e),...n})}var k,A=e((()=>{s(),h(),r(),y(),w(),k=t(),E.__docgenInfo={description:``,methods:[],displayName:`ButtonGroup`,props:{orientation:{required:!1,tsType:{name:`ButtonGroupOrientationName`},description:``,defaultValue:{value:`'horizontal'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}}},O.__docgenInfo={description:``,methods:[],displayName:`ButtonGroupSeparator`,props:{orientation:{defaultValue:{value:`'vertical'`,computed:!1},required:!1}}}})),j,M,N,P,F,I,L,R;e((()=>{u(),i(),p(),_(),A(),j=t(),M={title:`Components/ButtonGroup`,component:E,parameters:{docs:{description:{component:n.docs.description}}},argTypes:{orientation:{control:`inline-radio`,options:n.props.orientations,description:n.props.orientations.map(e=>`\`${e}\` — ${n.docs.orientations[e]}`).join(`

`),table:{defaultValue:{summary:n.defaults.orientations}}}},args:{orientation:n.defaults.orientations}},N={render:e=>(0,j.jsxs)(E,{...e,children:[(0,j.jsx)(f,{variant:`outline`,children:`One`}),(0,j.jsx)(f,{variant:`outline`,children:`Two`}),(0,j.jsx)(f,{variant:`outline`,children:`Three`})]})},P={render:()=>(0,j.jsxs)(E,{orientation:`vertical`,children:[(0,j.jsx)(f,{variant:`outline`,children:`One`}),(0,j.jsx)(f,{variant:`outline`,children:`Two`}),(0,j.jsx)(f,{variant:`outline`,children:`Three`})]})},F={render:()=>(0,j.jsxs)(E,{children:[(0,j.jsx)(E,{children:(0,j.jsx)(f,{variant:`outline`,size:`icon`,"aria-label":`Copy`,children:(0,j.jsx)(l,{})})}),(0,j.jsx)(O,{}),(0,j.jsxs)(E,{children:[(0,j.jsx)(f,{variant:`outline`,children:`Cut`}),(0,j.jsx)(f,{variant:`outline`,children:`Paste`})]})]})},I={render:()=>(0,j.jsxs)(E,{children:[(0,j.jsx)(f,{variant:`outline`,children:`Previous`}),(0,j.jsx)(D,{children:`Page 1 of 10`}),(0,j.jsx)(f,{variant:`outline`,children:`Next`})]})},L={render:()=>(0,j.jsxs)(E,{className:`w-80`,children:[(0,j.jsx)(g,{placeholder:`Search…`,"aria-label":`Search`}),(0,j.jsx)(f,{variant:`outline`,size:`icon`,"aria-label":`Search`,children:(0,j.jsx)(c,{})}),(0,j.jsx)(f,{variant:`outline`,size:`icon`,"aria-label":`More options`,children:(0,j.jsx)(d,{})})]})},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => <ButtonGroup {...args}>
      <Button variant="outline">One</Button>
      <Button variant="outline">Two</Button>
      <Button variant="outline">Three</Button>
    </ButtonGroup>
}`,...N.parameters?.docs?.source},description:{story:"The default button group — rendered with the default args; tweak `orientation` via the controls.",...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup orientation="vertical">
      <Button variant="outline">One</Button>
      <Button variant="outline">Two</Button>
      <Button variant="outline">Three</Button>
    </ButtonGroup>
}`,...P.parameters?.docs?.source},description:{story:`Buttons stacked in a column instead of a row.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Copy">
          <CopyIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroupSeparator />
      <ButtonGroup>
        <Button variant="outline">Cut</Button>
        <Button variant="outline">Paste</Button>
      </ButtonGroup>
    </ButtonGroup>
}`,...F.parameters?.docs?.source},description:{story:"Nesting groups (with a `ButtonGroupSeparator` between them) splits the buttons into\nlogical clusters while keeping the connected-border look within each cluster.",...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <ButtonGroupText>Page 1 of 10</ButtonGroupText>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
}`,...I.parameters?.docs?.source},description:{story:"`ButtonGroupText` renders a non-interactive, label-styled slot alongside the buttons.",...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup className="w-80">
      <Input placeholder="Search…" aria-label="Search" />
      <Button variant="outline" size="icon" aria-label="Search">
        <MagnifyingGlassIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="More options">
        <DotsThreeIcon />
      </Button>
    </ButtonGroup>
}`,...L.parameters?.docs?.source},description:{story:"A real-world composed example: a search field grouped with a submit button and an\noverflow menu trigger. The group's CSS makes the `<Input>` flex to fill the space.",...L.parameters?.docs?.description}}},R=[`Default`,`Vertical`,`WithSeparator`,`WithText`,`WithInput`]}))();export{N as Default,P as Vertical,L as WithInput,F as WithSeparator,I as WithText,R as __namedExportsOrder,M as default};
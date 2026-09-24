import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{O as n}from"./iframe-CaelJD7u.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{_ as i,n as a,r as o,t as s}from"./utils-C5n3ayfX.js";import{t as c}from"./label-BIuij8Xz.js";import{t as l}from"./label-G-MH7fEg.js";import{i as u,n as d,t as f}from"./switch-DGlZ59SX.js";var p,m,h=e((()=>{p=`_thumb_1uehf_61`,m={switch:`_switch_1uehf_1`,thumb:p}}));function g({className:e,size:t=`default`,...n}){return(0,_.jsx)(u,{"data-slot":`switch`,"data-size":t,className:s(m.switch,e),...n,children:(0,_.jsx)(d,{"data-slot":`switch-thumb`,className:m.thumb})})}var _,v=e((()=>{f(),a(),h(),_=r(),g.__docgenInfo={description:``,methods:[],displayName:`Switch`,props:{size:{required:!1,tsType:{name:`SwitchSizeName`},description:``,defaultValue:{value:`'default'`,computed:!1}}}}})),y,b,x,S,C,w,T,E;e((()=>{y=t(n(),1),o(),l(),v(),b=r(),x={title:`Components/Switch`,component:g,parameters:{docs:{description:{component:i.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=60-438`}},argTypes:{size:{control:`inline-radio`,options:i.props.sizes,description:i.props.sizes.map(e=>`\`${e}\` — ${i.docs.sizes[e]}`).join(`

`),table:{defaultValue:{summary:i.defaults.sizes}}},disabled:{control:`boolean`}},args:{size:i.defaults.sizes,disabled:!1}},S={render:e=>{let[t,n]=(0,y.useState)(!0);return(0,b.jsx)(g,{...e,"aria-label":`Enable notifications`,checked:t,onCheckedChange:n})}},C={render:()=>(0,b.jsxs)(c,{className:`gap-2`,children:[(0,b.jsx)(g,{defaultChecked:!0}),`Enable notifications`]})},w={render:()=>(0,b.jsx)(`div`,{className:`flex flex-wrap items-center gap-6`,children:i.props.sizes.map(e=>(0,b.jsxs)(c,{className:`gap-2`,children:[(0,b.jsx)(g,{size:e,defaultChecked:!0,title:i.docs.sizes[e]}),e]},e))})},T={render:()=>(0,b.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,b.jsxs)(c,{className:`gap-2`,children:[(0,b.jsx)(g,{}),`Unchecked`]}),(0,b.jsxs)(c,{className:`gap-2`,children:[(0,b.jsx)(g,{defaultChecked:!0}),`Checked`]}),(0,b.jsxs)(c,{className:`gap-2`,children:[(0,b.jsx)(g,{disabled:!0}),`Disabled`]}),(0,b.jsxs)(c,{className:`gap-2`,children:[(0,b.jsx)(g,{defaultChecked:!0,disabled:!0}),`Disabled checked`]})]})},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(true);
    return <Switch {...args} aria-label="Enable notifications" checked={checked} onCheckedChange={setChecked} />;
  }
}`,...S.parameters?.docs?.source},description:{story:`A controlled switch driven by React state — the typical usage pattern.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Label className="gap-2">
      <Switch defaultChecked />
      Enable notifications
    </Label>
}`,...C.parameters?.docs?.source},description:{story:`A switch paired with a clickable label.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-6">
      {switchContract.props.sizes.map(size => <Label key={size} className="gap-2">
          <Switch size={size} defaultChecked title={switchContract.docs.sizes[size]} />
          {size}
        </Label>)}
    </div>
}`,...w.parameters?.docs?.source},description:{story:`Every size declared in the contract.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <Label className="gap-2">
        <Switch />
        Unchecked
      </Label>
      <Label className="gap-2">
        <Switch defaultChecked />
        Checked
      </Label>
      <Label className="gap-2">
        <Switch disabled />
        Disabled
      </Label>
      <Label className="gap-2">
        <Switch defaultChecked disabled />
        Disabled checked
      </Label>
    </div>
}`,...T.parameters?.docs?.source},description:{story:`Every state side by side.`,...T.parameters?.docs?.description}}},E=[`Default`,`WithLabel`,`Sizes`,`States`]}))();export{S as Default,w as Sizes,T as States,C as WithLabel,E as __namedExportsOrder,x as default};
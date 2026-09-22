import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{O as n}from"./iframe-CbBuQ8p6.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{B as i,n as a,r as o,t as s}from"./utils-C5n3ayfX.js";import{a as c,i as l,n as u,s as d,t as f}from"./radio-group-aBa9Y_yf.js";import{t as p}from"./label-Bojel3y0.js";import{t as m}from"./label-CquwVvOo.js";import{a as h,c as g,n as _,o as v}from"./field-Lp-w-mT6.js";import{t as y}from"./field-Dp3BaMoo.js";var b,x,S,C,w,T=e((()=>{b=`_group_csy69_1`,x=`_item_csy69_7`,S=`_indicator_csy69_66`,C=`_dot_csy69_74`,w={group:b,item:x,indicator:S,dot:C}}));function E({className:e,...t}){return(0,O.jsx)(u,{"data-slot":`radio-group`,className:s(w.group,e),...t})}function D({className:e,...t}){return(0,O.jsx)(d,{"data-slot":`radio-group-item`,className:s(w.item,e),...t,children:(0,O.jsx)(c,{"data-slot":`radio-group-indicator`,className:w.indicator,children:(0,O.jsx)(`span`,{className:w.dot})})})}var O,k=e((()=>{l(),f(),a(),T(),O=r(),E.__docgenInfo={description:``,methods:[],displayName:`RadioGroup`},D.__docgenInfo={description:``,methods:[],displayName:`RadioGroupItem`}})),A,j,M,N,P,F,I,L;e((()=>{A=t(n(),1),o(),y(),m(),k(),j=r(),M={title:`Components/RadioGroup`,component:E,parameters:{docs:{description:{component:i.docs.description}}},argTypes:{disabled:{control:`boolean`}},args:{disabled:!1}},N={render:e=>{let[t,n]=(0,A.useState)(`comfortable`);return(0,j.jsxs)(E,{...e,value:t,onValueChange:n,children:[(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`default`,id:`r1`}),(0,j.jsx)(p,{htmlFor:`r1`,children:`Default`})]}),(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`comfortable`,id:`r2`}),(0,j.jsx)(p,{htmlFor:`r2`,children:`Comfortable`})]}),(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`compact`,id:`r3`}),(0,j.jsx)(p,{htmlFor:`r3`,children:`Compact`})]})]})}},P={render:()=>(0,j.jsxs)(g,{className:`w-80`,children:[(0,j.jsx)(v,{children:`Notification preference`}),(0,j.jsx)(_,{children:`Choose how you'd like to receive updates.`}),(0,j.jsxs)(E,{defaultValue:`email`,children:[(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`email`,id:`notif-email`}),(0,j.jsx)(h,{htmlFor:`notif-email`,children:`Email`})]}),(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`push`,id:`notif-push`}),(0,j.jsx)(h,{htmlFor:`notif-push`,children:`Push notification`})]}),(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`none`,id:`notif-none`}),(0,j.jsx)(h,{htmlFor:`notif-none`,children:`None`})]})]})]})},F={render:()=>(0,j.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,j.jsxs)(E,{defaultValue:`comfortable`,className:`w-fit`,children:[(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`default`,id:`d1`,disabled:!0}),(0,j.jsx)(p,{htmlFor:`d1`,children:`Default (item disabled)`})]}),(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`comfortable`,id:`d2`}),(0,j.jsx)(p,{htmlFor:`d2`,children:`Comfortable`})]})]}),(0,j.jsxs)(E,{defaultValue:`comfortable`,disabled:!0,className:`w-fit`,children:[(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`default`,id:`d3`}),(0,j.jsx)(p,{htmlFor:`d3`,children:`Default`})]}),(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`comfortable`,id:`d4`}),(0,j.jsx)(p,{htmlFor:`d4`,children:`Comfortable (group disabled)`})]})]})]})},I={render:()=>(0,j.jsxs)(E,{defaultValue:`one`,className:`w-fit`,children:[(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`one`,id:`i1`,"aria-invalid":!0}),(0,j.jsx)(p,{htmlFor:`i1`,children:`Option one`})]}),(0,j.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,j.jsx)(D,{value:`two`,id:`i2`,"aria-invalid":!0}),(0,j.jsx)(p,{htmlFor:`i2`,children:`Option two`})]})]})},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('comfortable');
    return <RadioGroup {...args} value={value} onValueChange={setValue}>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>;
  }
}`,...N.parameters?.docs?.source},description:{story:`A controlled radio group driven by React state — the typical usage pattern.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <FieldSet className="w-80">
      <FieldLegend>Notification preference</FieldLegend>
      <FieldDescription>Choose how you&apos;d like to receive updates.</FieldDescription>
      <RadioGroup defaultValue="email">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="email" id="notif-email" />
          <FieldLabel htmlFor="notif-email">Email</FieldLabel>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="push" id="notif-push" />
          <FieldLabel htmlFor="notif-push">Push notification</FieldLabel>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="none" id="notif-none" />
          <FieldLabel htmlFor="notif-none">None</FieldLabel>
        </div>
      </RadioGroup>
    </FieldSet>
}`,...P.parameters?.docs?.source},description:{story:"A realistic composed example: a `FieldSet` with a legend and description groups the\nradio group, and each option's `Label` doubles as the click target for its item.",...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6">
      <RadioGroup defaultValue="comfortable" className="w-fit">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="d1" disabled />
          <Label htmlFor="d1">Default (item disabled)</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="d2" />
          <Label htmlFor="d2">Comfortable</Label>
        </div>
      </RadioGroup>
      <RadioGroup defaultValue="comfortable" disabled className="w-fit">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="d3" />
          <Label htmlFor="d3">Default</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="d4" />
          <Label htmlFor="d4">Comfortable (group disabled)</Label>
        </div>
      </RadioGroup>
    </div>
}`,...F.parameters?.docs?.source},description:{story:`Disabling a single item versus disabling the whole group.`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="one" className="w-fit">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="one" id="i1" aria-invalid />
        <Label htmlFor="i1">Option one</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="two" id="i2" aria-invalid />
        <Label htmlFor="i2">Option two</Label>
      </div>
    </RadioGroup>
}`,...I.parameters?.docs?.source},description:{story:"Invalid state, driven by `aria-invalid` on the selected item.",...I.parameters?.docs?.description}}},L=[`Default`,`InFieldset`,`Disabled`,`Invalid`]}))();export{N as Default,F as Disabled,P as InFieldset,I as Invalid,L as __namedExportsOrder,M as default};
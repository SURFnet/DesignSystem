import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{O as n}from"./iframe-CbBuQ8p6.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{qt as i,r as a}from"./utils-C5n3ayfX.js";import{t as o}from"./label-Bojel3y0.js";import{t as s}from"./label-CquwVvOo.js";import{n as c,t as l}from"./checkbox-B_KUDsOF.js";var u,d,f,p,m,h,g;e((()=>{u=t(n(),1),a(),s(),c(),d=r(),f={title:`Components/Checkbox`,component:l,parameters:{docs:{description:{component:i.docs.description}}},argTypes:{disabled:{control:`boolean`}},args:{disabled:!1}},p={render:e=>{let[t,n]=(0,u.useState)(!0);return(0,d.jsx)(l,{...e,checked:t,onCheckedChange:n,"aria-label":`Checkbox`})}},m={render:()=>(0,d.jsxs)(o,{className:`gap-2`,children:[(0,d.jsx)(l,{defaultChecked:!0}),`Accept terms and conditions`]})},h={render:()=>(0,d.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,d.jsxs)(o,{className:`gap-2`,children:[(0,d.jsx)(l,{}),`Unchecked`]}),(0,d.jsxs)(o,{className:`gap-2`,children:[(0,d.jsx)(l,{defaultChecked:!0}),`Checked`]}),(0,d.jsxs)(o,{className:`gap-2`,children:[(0,d.jsx)(l,{indeterminate:!0}),`Indeterminate`]}),(0,d.jsxs)(o,{className:`gap-2`,children:[(0,d.jsx)(l,{disabled:!0}),`Disabled`]}),(0,d.jsxs)(o,{className:`gap-2`,children:[(0,d.jsx)(l,{defaultChecked:!0,disabled:!0}),`Disabled checked`]})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(true);
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} aria-label="Checkbox" />;
  }
}`,...p.parameters?.docs?.source},description:{story:`A controlled checkbox driven by React state — the typical usage pattern.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Label className="gap-2">
      <Checkbox defaultChecked />
      Accept terms and conditions
    </Label>
}`,...m.parameters?.docs?.source},description:{story:`A checkbox paired with a clickable label.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <Label className="gap-2">
        <Checkbox />
        Unchecked
      </Label>
      <Label className="gap-2">
        <Checkbox defaultChecked />
        Checked
      </Label>
      <Label className="gap-2">
        <Checkbox indeterminate />
        Indeterminate
      </Label>
      <Label className="gap-2">
        <Checkbox disabled />
        Disabled
      </Label>
      <Label className="gap-2">
        <Checkbox defaultChecked disabled />
        Disabled checked
      </Label>
    </div>
}`,...h.parameters?.docs?.source},description:{story:`Every state side by side.`,...h.parameters?.docs?.description}}},g=[`Default`,`WithLabel`,`States`]}))();export{p as Default,h as States,m as WithLabel,g as __namedExportsOrder,f as default};
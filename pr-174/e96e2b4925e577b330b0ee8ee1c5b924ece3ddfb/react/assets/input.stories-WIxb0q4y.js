import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{Ot as n,r}from"./utils-C5n3ayfX.js";import{n as i,t as a}from"./input-Cp1tmlZ-.js";var o,s,c,l,u,d,f;e((()=>{r(),i(),o=t(),s={title:`Components/Input`,tags:[`a11y-minor`],component:a,parameters:{docs:{description:{component:n.docs.description}}},argTypes:{type:{control:`select`,options:[`text`,`email`,`password`,`number`,`search`,`tel`,`url`],description:`The native input type.`},placeholder:{control:`text`},disabled:{control:`boolean`}},args:{type:`text`,placeholder:`Type something…`,disabled:!1}},c={},l={render:()=>(0,o.jsxs)(`div`,{className:`flex w-72 flex-col gap-3`,children:[(0,o.jsx)(a,{type:`text`,placeholder:`Text`}),(0,o.jsx)(a,{type:`email`,placeholder:`Email`}),(0,o.jsx)(a,{type:`password`,placeholder:`Password`}),(0,o.jsx)(a,{type:`search`,placeholder:`Search`})]})},u={args:{disabled:!0,placeholder:`Disabled`}},d={render:()=>(0,o.jsx)(a,{"aria-invalid":!0,placeholder:`Invalid value`,className:`w-72`})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source},description:{story:`The default input — tweak it via the controls.`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-72 flex-col gap-3">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="search" placeholder="Search" />
    </div>
}`,...l.parameters?.docs?.source},description:{story:`Common input types side by side.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'Disabled'
  }
}`,...u.parameters?.docs?.source},description:{story:`Disabled state.`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Input aria-invalid placeholder="Invalid value" className="w-72" />
}`,...d.parameters?.docs?.source},description:{story:"Invalid state, driven by `aria-invalid`.",...d.parameters?.docs?.description}}},f=[`Default`,`Types`,`Disabled`,`Invalid`]}))();export{c as Default,u as Disabled,d as Invalid,l as Types,f as __namedExportsOrder,s as default};
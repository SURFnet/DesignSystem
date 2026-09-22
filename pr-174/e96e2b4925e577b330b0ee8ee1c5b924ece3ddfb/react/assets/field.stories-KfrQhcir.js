import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{jt as n,r}from"./utils-C5n3ayfX.js";import{t as i}from"./input-Cp1tmlZ-.js";import{t as a}from"./input-k4V9cG6h.js";import{t as o}from"./checkbox-B_KUDsOF.js";import{t as s}from"./checkbox-Uo0cAstB.js";import{a as c,i as l,l as u,n as d,r as f,s as p,t as m}from"./field-Lp-w-mT6.js";var h,g,_,v,y,b,x;e((()=>{r(),s(),a(),u(),h=t(),g={title:`Components/Field`,component:m,parameters:{docs:{description:{component:n.docs.description}}},argTypes:{orientation:{control:`inline-radio`,options:n.props.orientations,description:n.props.orientations.map(e=>`\`${e}\` — ${n.docs.orientations[e]}`).join(`

`),table:{defaultValue:{summary:n.defaults.orientations}}}},args:{orientation:n.defaults.orientations}},_={render:e=>(0,h.jsxs)(m,{...e,className:`w-72`,children:[(0,h.jsx)(c,{htmlFor:`email`,children:`Email`}),(0,h.jsx)(i,{id:`email`,type:`email`,placeholder:`you@surf.nl`}),(0,h.jsx)(d,{children:`This is an input description.`})]})},v={render:()=>(0,h.jsxs)(m,{orientation:`horizontal`,className:`w-72`,children:[(0,h.jsx)(o,{id:`remember`}),(0,h.jsx)(c,{htmlFor:`remember`,children:`Remember me`})]})},y={render:()=>(0,h.jsxs)(m,{"data-invalid":!0,className:`w-72`,children:[(0,h.jsx)(c,{htmlFor:`password`,children:`Password`}),(0,h.jsx)(i,{id:`password`,type:`password`,"aria-invalid":!0}),(0,h.jsx)(f,{children:`Password must be at least 8 characters.`})]})},b={render:()=>(0,h.jsxs)(l,{className:`w-72`,children:[(0,h.jsxs)(m,{children:[(0,h.jsx)(c,{htmlFor:`g-email`,children:`Email`}),(0,h.jsx)(i,{id:`g-email`,type:`email`,placeholder:`you@surf.nl`})]}),(0,h.jsx)(p,{children:`Or continue with`}),(0,h.jsxs)(m,{children:[(0,h.jsx)(c,{htmlFor:`g-password`,children:`Password`}),(0,h.jsx)(i,{id:`g-password`,type:`password`})]})]})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <Field {...args} className="w-72">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="you@surf.nl" />
      <FieldDescription>This is an input description.</FieldDescription>
    </Field>
}`,..._.parameters?.docs?.source},description:{story:`A label, input, and helper description.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Field orientation="horizontal" className="w-72">
      <Checkbox id="remember" />
      <FieldLabel htmlFor="remember">Remember me</FieldLabel>
    </Field>
}`,...v.parameters?.docs?.source},description:{story:`A horizontal field, e.g. a checkbox with its label.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Field data-invalid className="w-72">
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <Input id="password" type="password" aria-invalid />
      <FieldError>Password must be at least 8 characters.</FieldError>
    </Field>
}`,...y.parameters?.docs?.source},description:{story:`An invalid field showing an error message.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <FieldGroup className="w-72">
      <Field>
        <FieldLabel htmlFor="g-email">Email</FieldLabel>
        <Input id="g-email" type="email" placeholder="you@surf.nl" />
      </Field>
      <FieldSeparator>Or continue with</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="g-password">Password</FieldLabel>
        <Input id="g-password" type="password" />
      </Field>
    </FieldGroup>
}`,...b.parameters?.docs?.source},description:{story:`Several fields grouped, with a labelled separator.`,...b.parameters?.docs?.description}}},x=[`Default`,`Horizontal`,`WithError`,`Group`]}))();export{_ as Default,b as Group,v as Horizontal,y as WithError,x as __namedExportsOrder,g as default};
import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{M as n,r}from"./utils-C5n3ayfX.js";import{n as i,t as a}from"./separator-CRxzAMFb.js";var o,s,c,l,u,d;e((()=>{r(),i(),o=t(),s={title:`Components/Separator`,component:a,parameters:{docs:{description:{component:n.docs.description}}},argTypes:{orientation:{control:`inline-radio`,options:n.props.orientations,description:n.props.orientations.map(e=>`\`${e}\` — ${n.docs.orientations[e]}`).join(`

`),table:{defaultValue:{summary:n.defaults.orientations}}}},args:{orientation:n.defaults.orientations}},c={render:e=>(0,o.jsxs)(`div`,{className:e.orientation===`vertical`?`flex h-5 items-center gap-3 text-sm`:`flex w-72 flex-col gap-3 text-sm`,children:[(0,o.jsx)(`span`,{children:`One`}),(0,o.jsx)(a,{...e}),(0,o.jsx)(`span`,{children:`Two`})]})},l={render:()=>(0,o.jsxs)(`div`,{className:`w-72`,children:[(0,o.jsx)(`p`,{className:`text-sm`,children:`Curve`}),(0,o.jsx)(a,{className:`my-3`}),(0,o.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Components for React and Angular.`})]})},u={render:()=>(0,o.jsxs)(`div`,{className:`flex h-5 items-center gap-3 text-sm`,children:[(0,o.jsx)(`span`,{children:`Docs`}),(0,o.jsx)(a,{orientation:`vertical`}),(0,o.jsx)(`span`,{children:`Source`}),(0,o.jsx)(a,{orientation:`vertical`}),(0,o.jsx)(`span`,{children:`Storybook`})]})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <div className={args.orientation === 'vertical' ? 'flex h-5 items-center gap-3 text-sm' : 'flex w-72 flex-col gap-3 text-sm'}>
      <span>One</span>
      <Separator {...args} />
      <span>Two</span>
    </div>
}`,...c.parameters?.docs?.source},description:{story:"Interactive playground — flip `orientation` in the controls to see both directions.",...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-72">
      <p className="text-sm">Curve</p>
      <Separator className="my-3" />
      <p className="text-sm text-muted-foreground">Components for React and Angular.</p>
    </div>
}`,...l.parameters?.docs?.source},description:{story:`A horizontal divider between stacked blocks of text.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex h-5 items-center gap-3 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Source</span>
      <Separator orientation="vertical" />
      <span>Storybook</span>
    </div>
}`,...u.parameters?.docs?.source},description:{story:`A vertical divider between inline items.`,...u.parameters?.docs?.description}}},d=[`Default`,`Horizontal`,`Vertical`]}))();export{c as Default,l as Horizontal,u as Vertical,d as __namedExportsOrder,s as default};
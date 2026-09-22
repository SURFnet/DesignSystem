import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{ln as n,r}from"./utils-C5n3ayfX.js";import{a as i,i as a,n as o,o as s,r as c,t as l}from"./avatar-DYHtj2A9.js";var u,d,f,p,m,h,g;e((()=>{r(),s(),u=t(),d={title:`Components/Avatar`,component:l,parameters:{docs:{description:{component:n.docs.description}}},argTypes:{size:{control:`inline-radio`,options:n.props.sizes,description:n.props.sizes.map(e=>`\`${e}\` — ${n.docs.sizes[e]}`).join(`

`),table:{defaultValue:{summary:n.defaults.sizes}}}},args:{size:n.defaults.sizes}},f={render:e=>(0,u.jsxs)(l,{...e,children:[(0,u.jsx)(i,{src:`https://i.pravatar.cc/80?img=12`,alt:`Ada Lovelace`}),(0,u.jsx)(o,{children:`AL`})]})},p={render:()=>(0,u.jsxs)(l,{children:[(0,u.jsx)(i,{src:`https://example.com/does-not-exist.jpg`,alt:`Grace Hopper`}),(0,u.jsx)(o,{children:`GH`})]})},m={render:()=>(0,u.jsx)(`div`,{className:`flex items-center gap-3`,children:n.props.sizes.map(e=>(0,u.jsx)(l,{size:e,title:n.docs.sizes[e],children:(0,u.jsx)(o,{children:e.slice(0,2).toUpperCase()})},e))})},h={render:()=>(0,u.jsxs)(c,{children:[(0,u.jsx)(l,{children:(0,u.jsx)(o,{children:`AL`})}),(0,u.jsx)(l,{children:(0,u.jsx)(o,{children:`GH`})}),(0,u.jsx)(l,{children:(0,u.jsx)(o,{children:`KJ`})}),(0,u.jsx)(a,{children:`+3`})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ada Lovelace" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
}`,...f.parameters?.docs?.source},description:{story:`An avatar with an image and a fallback.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Avatar>
      <AvatarImage src="https://example.com/does-not-exist.jpg" alt="Grace Hopper" />
      <AvatarFallback>GH</AvatarFallback>
    </Avatar>
}`,...p.parameters?.docs?.source},description:{story:`When the image fails to load, the initials fallback shows.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      {avatarContract.props.sizes.map(size => <Avatar key={size} size={size} title={avatarContract.docs.sizes[size]}>
          <AvatarFallback>{size.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>)}
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Every size declared in the contract.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <AvatarGroup>
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>KJ</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
}`,...h.parameters?.docs?.source},description:{story:`Stacked avatars with an overflow count.`,...h.parameters?.docs?.description}}},g=[`Default`,`Fallback`,`Sizes`,`Group`]}))();export{f as Default,p as Fallback,h as Group,m as Sizes,g as __namedExportsOrder,d as default};
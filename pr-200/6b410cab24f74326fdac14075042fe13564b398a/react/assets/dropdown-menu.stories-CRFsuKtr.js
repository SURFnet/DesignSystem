import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{Ft as n,r}from"./utils-C5n3ayfX.js";import{$ as i,t as a}from"./index.es-CbcVOFsO.js";import{t as o}from"./button-CRJ3TT6y.js";import{t as s}from"./button-LAilQtZl.js";import{a as c,c as l,i as u,l as d,n as f,o as p,r as m,s as h,t as g,u as _}from"./dropdown-menu-C1idh2P1.js";var v,y,b,x,S,C;e((()=>{r(),a(),s(),_(),v=t(),y={title:`Components/DropdownMenu`,component:g,parameters:{docs:{description:{component:n.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=430-17941&t=vT3gKkMDSpQaeqci-0`}}},b={render:()=>(0,v.jsxs)(g,{children:[(0,v.jsx)(d,{render:(0,v.jsx)(o,{variant:`outline`,children:`Open menu`})}),(0,v.jsxs)(m,{align:`start`,className:`w-48`,children:[(0,v.jsxs)(u,{children:[(0,v.jsx)(p,{children:`My account`}),(0,v.jsxs)(c,{title:n.docs.variants.default,children:[`Profile`,(0,v.jsx)(l,{children:`⇧⌘P`})]}),(0,v.jsx)(c,{children:`Settings`})]}),(0,v.jsx)(h,{}),(0,v.jsx)(c,{variant:`destructive`,title:n.docs.variants.destructive,children:`Delete`})]})]})},x={render:()=>(0,v.jsxs)(g,{children:[(0,v.jsx)(d,{render:(0,v.jsx)(o,{variant:`ghost`,size:`icon-sm`,"aria-label":`Row actions`,children:(0,v.jsx)(i,{})})}),(0,v.jsxs)(m,{align:`end`,className:`w-40`,children:[(0,v.jsx)(c,{children:`View`}),(0,v.jsx)(c,{children:`Edit`}),(0,v.jsx)(h,{}),(0,v.jsx)(c,{variant:`destructive`,children:`Remove`})]})]})},S={render:()=>(0,v.jsxs)(g,{children:[(0,v.jsx)(d,{render:(0,v.jsx)(o,{variant:`outline`,children:`Columns`})}),(0,v.jsx)(m,{align:`start`,className:`w-44`,children:(0,v.jsxs)(u,{children:[(0,v.jsx)(p,{children:`Toggle columns`}),(0,v.jsx)(f,{checked:!0,children:`Name`}),(0,v.jsx)(f,{checked:!0,children:`Category`}),(0,v.jsx)(f,{children:`Status`})]})})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Open menu</Button>} />
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuItem title={dropdownMenuContract.docs.variants.default}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" title={dropdownMenuContract.docs.variants.destructive}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...b.parameters?.docs?.source},description:{story:`A menu with a label, grouped items, and a destructive action.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Row actions">
            <DotsThreeVerticalIcon />
          </Button>} />
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...x.parameters?.docs?.source},description:{story:`The "⋯" row-actions pattern from a data table.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Columns</Button>} />
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked>Name</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Category</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...S.parameters?.docs?.source},description:{story:`Checkbox items for toggling options.`,...S.parameters?.docs?.description}}},C=[`Default`,`RowActions`,`WithCheckboxItems`]}))();export{b as Default,x as RowActions,S as WithCheckboxItems,C as __namedExportsOrder,y as default};
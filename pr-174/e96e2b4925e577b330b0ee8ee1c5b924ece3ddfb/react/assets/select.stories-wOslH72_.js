import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{P as n,r}from"./utils-C5n3ayfX.js";import{a as i,c as a,i as o,n as s,o as c,r as l,s as u,t as d}from"./select-Bx-UQoL_.js";var f,p,m,h,g,_,v;e((()=>{r(),a(),f=t(),p={title:`Components/Select`,component:d,parameters:{docs:{description:{component:n.docs.description}}}},m={render:()=>(0,f.jsxs)(d,{children:[(0,f.jsx)(c,{className:`w-56`,"aria-label":`Category`,children:(0,f.jsx)(u,{placeholder:`Category: All`})}),(0,f.jsxs)(s,{children:[(0,f.jsx)(o,{value:`all`,children:`All`}),(0,f.jsx)(o,{value:`identity`,children:`Identity`}),(0,f.jsx)(o,{value:`storage`,children:`Storage`}),(0,f.jsx)(o,{value:`marketplace`,children:`Marketplace`})]})]})},h={render:()=>(0,f.jsxs)(d,{defaultValue:`identity`,children:[(0,f.jsx)(c,{className:`w-56`,"aria-label":`Category`,children:(0,f.jsx)(u,{placeholder:`Pick a category`})}),(0,f.jsx)(s,{children:(0,f.jsxs)(l,{children:[(0,f.jsx)(i,{children:`Categories`}),(0,f.jsx)(o,{value:`identity`,children:`Identity`}),(0,f.jsx)(o,{value:`storage`,children:`Storage`}),(0,f.jsx)(o,{value:`marketplace`,children:`Marketplace`})]})})]})},g={render:()=>(0,f.jsxs)(d,{disabled:!0,children:[(0,f.jsx)(c,{className:`w-56`,"aria-label":`Category`,children:(0,f.jsx)(u,{placeholder:`Category: All`})}),(0,f.jsx)(s,{children:(0,f.jsx)(o,{value:`all`,children:`All`})})]})},_={render:()=>(0,f.jsx)(`div`,{className:`flex items-center gap-3`,children:n.props.sizes.map(e=>(0,f.jsxs)(d,{defaultValue:`all`,children:[(0,f.jsx)(c,{size:e,className:`w-40`,title:n.docs.sizes[e],children:(0,f.jsx)(u,{placeholder:`Category`})}),(0,f.jsxs)(s,{children:[(0,f.jsx)(o,{value:`all`,children:`All`}),(0,f.jsx)(o,{value:`identity`,children:`Identity`})]})]},e))})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Select>
      <SelectTrigger className="w-56" aria-label="Category">
        <SelectValue placeholder="Category: All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="identity">Identity</SelectItem>
        <SelectItem value="storage">Storage</SelectItem>
        <SelectItem value="marketplace">Marketplace</SelectItem>
      </SelectContent>
    </Select>
}`,...m.parameters?.docs?.source},description:{story:`A select with a placeholder until a value is chosen.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Select defaultValue="identity">
      <SelectTrigger className="w-56" aria-label="Category">
        <SelectValue placeholder="Pick a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="identity">Identity</SelectItem>
          <SelectItem value="storage">Storage</SelectItem>
          <SelectItem value="marketplace">Marketplace</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
}`,...h.parameters?.docs?.source},description:{story:`A pre-selected value with grouped, labelled options.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Select disabled>
      <SelectTrigger className="w-56" aria-label="Category">
        <SelectValue placeholder="Category: All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
      </SelectContent>
    </Select>
}`,...g.parameters?.docs?.source},description:{story:`Disabled trigger.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      {selectContract.props.sizes.map(size => <Select key={size} defaultValue="all">
          <SelectTrigger size={size} className="w-40" title={selectContract.docs.sizes[size]}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="identity">Identity</SelectItem>
          </SelectContent>
        </Select>)}
    </div>
}`,..._.parameters?.docs?.source},description:{story:`Every trigger size declared in the contract.`,..._.parameters?.docs?.description}}},v=[`Default`,`Grouped`,`Disabled`,`Sizes`]}))();export{m as Default,g as Disabled,h as Grouped,_ as Sizes,v as __namedExportsOrder,p as default};
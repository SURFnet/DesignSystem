import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{l as n,r}from"./utils-C5n3ayfX.js";import{Tt as i,_ as a,t as o,v as s,x as c}from"./index.es-CbcVOFsO.js";import{n as l,t as u}from"./toggle-DPnTnRdh.js";var d,f,p,m,h,g,_,v,y;e((()=>{o(),r(),l(),d=t(),f={title:`Components/Toggle`,component:u,parameters:{docs:{description:{component:n.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=132-1671`}},argTypes:{variant:{control:`select`,options:n.props.variants,description:`Visual style of the toggle.`,table:{defaultValue:{summary:n.defaults.variants}}},size:{control:`select`,options:n.props.sizes,description:`Size of the toggle.`,table:{defaultValue:{summary:n.defaults.sizes}}},disabled:{control:`boolean`}},args:{children:`Toggle`,variant:n.defaults.variants,size:n.defaults.sizes,disabled:!1}},p={},m={render:()=>(0,d.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:n.props.variants.map(e=>(0,d.jsx)(u,{variant:e,title:n.docs.variants[e],children:e.charAt(0).toUpperCase()+e.slice(1)},e))})},h={render:()=>(0,d.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:n.props.sizes.map(e=>(0,d.jsx)(u,{size:e,title:n.docs.sizes[e],children:e.charAt(0).toUpperCase()+e.slice(1)},e))})},g={render:()=>(0,d.jsxs)(u,{variant:`outline`,"aria-label":`Toggle bookmark`,children:[(0,d.jsx)(i,{"data-icon":`inline-start`}),`Bookmark`]})},_={render:()=>(0,d.jsxs)(`div`,{className:`flex items-center gap-1 rounded-md border border-input p-1`,children:[(0,d.jsx)(u,{"aria-label":`Toggle bold`,defaultPressed:!0,children:(0,d.jsx)(c,{})}),(0,d.jsx)(u,{"aria-label":`Toggle italic`,children:(0,d.jsx)(s,{})}),(0,d.jsx)(u,{"aria-label":`Toggle underline`,children:(0,d.jsx)(a,{})})]})},v={render:()=>(0,d.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,d.jsx)(u,{disabled:!0,children:`Default`}),(0,d.jsx)(u,{variant:`outline`,disabled:!0,children:`Outline`})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{}`,...p.parameters?.docs?.source},description:{story:`The default toggle — rendered with the default args; tweak them via the controls.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      {toggleContract.props.variants.map(variant => <Toggle key={variant} variant={variant} title={toggleContract.docs.variants[variant]}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Toggle>)}
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Every visual variant side by side.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      {toggleContract.props.sizes.map(size => <Toggle key={size} size={size} title={toggleContract.docs.sizes[size]}>
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </Toggle>)}
    </div>
}`,...h.parameters?.docs?.source},description:{story:`Every size side by side.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Toggle variant="outline" aria-label="Toggle bookmark">
      <BookmarkSimpleIcon data-icon="inline-start" />
      Bookmark
    </Toggle>
}`,...g.parameters?.docs?.source},description:{story:'Icon alongside text. Tag the icon with `data-icon="inline-start"` or\n`data-icon="inline-end"` so the toggle tightens the padding on that side.',...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-1 rounded-md border border-input p-1">
      <Toggle aria-label="Toggle bold" defaultPressed>
        <TextBIcon />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <TextItalicIcon />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <TextUnderlineIcon />
      </Toggle>
    </div>
}`,..._.parameters?.docs?.source},description:{story:`A realistic composed usage: a formatting toolbar built from standalone,
independently pressed toggles — each one tracks its own on/off state.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Toggle disabled>Default</Toggle>
      <Toggle variant="outline" disabled>
        Outline
      </Toggle>
    </div>
}`,...v.parameters?.docs?.source},description:{story:`Disabled state across the main variants.`,...v.parameters?.docs?.description}}},y=[`Default`,`Variants`,`Sizes`,`WithIcon`,`FormattingToolbar`,`Disabled`]}))();export{p as Default,v as Disabled,_ as FormattingToolbar,h as Sizes,m as Variants,g as WithIcon,y as __namedExportsOrder,f as default};
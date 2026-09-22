import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{r as n,tn as r}from"./utils-C5n3ayfX.js";import{P as i,jt as a,t as o}from"./index.es-SHpUsVh6.js";import{r as s,t as c}from"./button-C7hzrQPx.js";var l,u,d,f,p,m,h,g,_,v,y;e((()=>{o(),n(),s(),l=t(),u={title:`Components/Button`,tags:[`a11y-minor`],component:c,parameters:{docs:{description:{component:r.docs.description}}},argTypes:{variant:{control:`select`,options:r.props.variants,description:`Visual style of the button.`,table:{defaultValue:{summary:r.defaults.variants}}},size:{control:`select`,options:r.props.sizes,description:`Size of the button.`,table:{defaultValue:{summary:r.defaults.sizes}}},disabled:{control:`boolean`}},args:{children:`Button`,variant:r.defaults.variants,size:r.defaults.sizes,disabled:!1}},d={},f={render:()=>(0,l.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:r.props.variants.map(e=>(0,l.jsx)(c,{variant:e,title:r.docs.variants[e],children:e.charAt(0).toUpperCase()+e.slice(1)},e))})},p={render:()=>(0,l.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,l.jsx)(c,{size:`sm`,children:`Small`}),(0,l.jsx)(c,{size:`default`,children:`Default`}),(0,l.jsx)(c,{size:`lg`,children:`Large`})]})},m={render:()=>(0,l.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,l.jsx)(c,{size:`icon-xs`,"aria-label":`Add`,children:(0,l.jsx)(i,{})}),(0,l.jsx)(c,{size:`icon-sm`,"aria-label":`Add`,children:(0,l.jsx)(i,{})}),(0,l.jsx)(c,{size:`icon`,"aria-label":`Add`,children:(0,l.jsx)(i,{})}),(0,l.jsx)(c,{size:`icon-lg`,"aria-label":`Add`,children:(0,l.jsx)(i,{})})]})},h={render:()=>(0,l.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(i,{"data-icon":`inline-start`}),`Add item`]}),(0,l.jsxs)(c,{variant:`secondary`,children:[`Continue`,(0,l.jsx)(a,{"data-icon":`inline-end`})]})]})},g={render:()=>(0,l.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,l.jsx)(c,{variant:`destructive`,children:`Delete`}),(0,l.jsx)(c,{variant:`destructive`,className:`bg-destructive/90`,children:`Delete (hover)`}),(0,l.jsx)(c,{variant:`destructive`,disabled:!0,children:`Delete (disabled)`})]})},_={render:()=>(0,l.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,l.jsx)(c,{disabled:!0,children:`Default`}),(0,l.jsx)(c,{variant:`outline`,disabled:!0,children:`Outline`}),(0,l.jsx)(c,{variant:`destructive`,disabled:!0,children:`Destructive`})]})},v={render:()=>(0,l.jsx)(c,{variant:`link`,render:(0,l.jsx)(`a`,{href:`https://www.surf.nl`}),children:`Visit SURF`})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source},description:{story:`The default button — rendered with the default args; tweak them via the controls.`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      {buttonContract.props.variants.map(variant => <Button key={variant} variant={variant} title={buttonContract.docs.variants[variant]}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>)}
    </div>
}`,...f.parameters?.docs?.source},description:{story:`Every visual variant side by side.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
}`,...p.parameters?.docs?.source},description:{story:`Text sizes from small to large.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Button size="icon-xs" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon-sm" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon-lg" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
}`,...m.parameters?.docs?.source},description:{story:"Square icon-only sizes. Drop a Phosphor icon (`@phosphor-icons/react`) inside the button —\nthe button's CSS auto-sizes the SVG per size, so no `size-*` class is needed.",...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Button>
        <PlusIcon data-icon="inline-start" />
        Add item
      </Button>
      <Button variant="secondary">
        Continue
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
}`,...h.parameters?.docs?.source},description:{story:'Icons alongside text. Tag the icon with `data-icon="inline-start"` or\n`data-icon="inline-end"` so the button tightens the padding on that side.',...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Button variant="destructive">Delete</Button>
      <Button variant="destructive" className="bg-destructive/90">
        Delete (hover)
      </Button>
      <Button variant="destructive" disabled>
        Delete (disabled)
      </Button>
    </div>
}`,...g.parameters?.docs?.source},description:{story:"The destructive variant is a solid `--destructive` fill with `--destructive-foreground`\ntext. Hover darkens it with the same alpha layer the primary button uses. The middle\nbutton hard-codes that hover layer so the state is visible without a pointer.",...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Default</Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
    </div>
}`,..._.parameters?.docs?.source},description:{story:`Disabled state across the main variants.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Button variant="link" render={<a href="https://www.surf.nl" />}>
      Visit SURF
    </Button>
}`,...v.parameters?.docs?.source},description:{story:"Base UI's polymorphic `render` prop swaps the underlying element while keeping\nthe button styling — here the button renders as an anchor.",...v.parameters?.docs?.description}}},y=[`Default`,`Variants`,`Sizes`,`IconSizes`,`WithIcon`,`DestructiveStates`,`Disabled`,`AsLink`]}))();export{v as AsLink,d as Default,g as DestructiveStates,_ as Disabled,m as IconSizes,p as Sizes,f as Variants,h as WithIcon,y as __namedExportsOrder,u as default};
import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{a as n,r}from"./utils-C5n3ayfX.js";import{P as i,t as a}from"./index.es-SHpUsVh6.js";import{t as o}from"./button-C7hzrQPx.js";import{t as s}from"./button-C6o-rz-l.js";import{r as c,t as l}from"./kbd-znIw2J6m.js";import{a as u,i as d,n as f,r as p,t as m}from"./tooltip-DHnVDrgr.js";var h=e((()=>{c()})),g,_,v,y,b,x,S,C;e((()=>{a(),r(),s(),h(),u(),g=t(),_={title:`Components/Tooltip`,component:m,parameters:{docs:{description:{component:n.docs.description}}}},v={render:()=>(0,g.jsx)(p,{children:(0,g.jsxs)(m,{children:[(0,g.jsx)(d,{render:(0,g.jsx)(o,{variant:`outline`,children:`Hover me`})}),(0,g.jsx)(f,{children:`Add to library`})]})})},y={render:()=>(0,g.jsx)(p,{children:(0,g.jsx)(`div`,{className:`flex flex-wrap items-center justify-center gap-8 p-12`,children:[`top`,`right`,`bottom`,`left`].map(e=>(0,g.jsxs)(m,{children:[(0,g.jsx)(d,{render:(0,g.jsx)(o,{variant:`outline`,children:e})}),(0,g.jsxs)(f,{side:e,children:[`Positioned on the `,e,`.`]})]},e))})})},b={render:()=>(0,g.jsx)(p,{children:(0,g.jsxs)(m,{children:[(0,g.jsx)(d,{render:(0,g.jsx)(o,{variant:`outline`,size:`icon`,"aria-label":`Add item`,children:(0,g.jsx)(i,{})})}),(0,g.jsx)(f,{children:`Add item`})]})})},x={render:()=>(0,g.jsx)(p,{children:(0,g.jsxs)(m,{children:[(0,g.jsx)(d,{render:(0,g.jsx)(o,{variant:`outline`,children:`Save`})}),(0,g.jsxs)(f,{children:[`Save changes`,(0,g.jsx)(l,{children:`⌘S`})]})]})})},S={render:()=>(0,g.jsx)(p,{delay:700,children:(0,g.jsxs)(m,{children:[(0,g.jsx)(d,{render:(0,g.jsx)(o,{variant:`outline`,children:`Hover and hold`})}),(0,g.jsx)(f,{children:`Appears after ~700ms`})]})})},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
}`,...v.parameters?.docs?.source},description:{story:"A button trigger with a short informative label. Wrap the tree in `TooltipProvider` once.",...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider>
      <div className="flex flex-wrap items-center justify-center gap-8 p-12">
        {(['top', 'right', 'bottom', 'left'] as const).map(side => <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline">{side}</Button>} />
            <TooltipContent side={side}>Positioned on the {side}.</TooltipContent>
          </Tooltip>)}
      </div>
    </TooltipProvider>
}`,...y.parameters?.docs?.source},description:{story:`The popup can open on any side of the trigger, flipping to stay in view.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Add item">
              <PlusIcon />
            </Button>} />
        <TooltipContent>Add item</TooltipContent>
      </Tooltip>
    </TooltipProvider>
}`,...b.parameters?.docs?.source},description:{story:`An icon-only action still needs an accessible name — the tooltip surfaces it visually too.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Save</Button>} />
        <TooltipContent>
          Save changes
          <Kbd>⌘S</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
}`,...x.parameters?.docs?.source},description:{story:"A `Kbd` inside the content renders with matching contrast against the tooltip background.",...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider delay={700}>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover and hold</Button>} />
        <TooltipContent>Appears after ~700ms</TooltipContent>
      </Tooltip>
    </TooltipProvider>
}`,...S.parameters?.docs?.source},description:{story:"`TooltipProvider`'s `delay` (milliseconds before the first tooltip in a group opens)\ndefaults to `0` in this package, unlike upstream Base UI. Raise it to require a\ndeliberate hover before the popup appears.",...S.parameters?.docs?.description}}},C=[`Default`,`Placement`,`IconTrigger`,`WithShortcut`,`DelayedOpen`]}))();export{v as Default,S as DelayedOpen,b as IconTrigger,y as Placement,x as WithShortcut,C as __namedExportsOrder,_ as default};
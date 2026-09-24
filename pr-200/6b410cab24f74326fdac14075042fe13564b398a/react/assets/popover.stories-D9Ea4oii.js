import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{W as n,r}from"./utils-C5n3ayfX.js";import{t as i}from"./button-CRJ3TT6y.js";import{t as a}from"./button-LAilQtZl.js";import{t as o}from"./input-DZxxRqOI.js";import{t as s}from"./input-BZK46_hD.js";import{a as c,i as l,n as u,o as d,r as f,s as p,t as m}from"./popover-Dc7vx47J.js";import{t as h}from"./label-BIuij8Xz.js";import{t as g}from"./label-G-MH7fEg.js";var _,v,y,b,x,S;e((()=>{r(),a(),s(),g(),p(),_=t(),v={title:`Components/Popover`,component:m,parameters:{docs:{description:{component:n.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=193-1388`}}},y={render:()=>(0,_.jsxs)(m,{children:[(0,_.jsx)(d,{render:(0,_.jsx)(i,{variant:`outline`,children:`Open popover`})}),(0,_.jsxs)(u,{children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(c,{children:`Dimensions`}),(0,_.jsx)(f,{children:`Set the dimensions for the layer.`})]}),(0,_.jsxs)(`div`,{className:`grid gap-2`,children:[(0,_.jsxs)(`div`,{className:`grid grid-cols-3 items-center gap-4`,children:[(0,_.jsx)(h,{htmlFor:`width`,children:`Width`}),(0,_.jsx)(o,{id:`width`,defaultValue:`100%`,className:`col-span-2 h-8`})]}),(0,_.jsxs)(`div`,{className:`grid grid-cols-3 items-center gap-4`,children:[(0,_.jsx)(h,{htmlFor:`maxWidth`,children:`Max. width`}),(0,_.jsx)(o,{id:`maxWidth`,defaultValue:`300px`,className:`col-span-2 h-8`})]}),(0,_.jsxs)(`div`,{className:`grid grid-cols-3 items-center gap-4`,children:[(0,_.jsx)(h,{htmlFor:`height`,children:`Height`}),(0,_.jsx)(o,{id:`height`,defaultValue:`25px`,className:`col-span-2 h-8`})]})]})]})]})},b={render:()=>(0,_.jsx)(`div`,{className:`flex flex-wrap items-center justify-center gap-8 p-12`,children:[`top`,`right`,`bottom`,`left`].map(e=>(0,_.jsxs)(m,{children:[(0,_.jsx)(d,{render:(0,_.jsx)(i,{variant:`outline`,children:e})}),(0,_.jsx)(u,{side:e,className:`w-48`,children:(0,_.jsxs)(`p`,{className:`text-sm`,children:[`Positioned on the `,e,`.`]})})]},e))})},x={render:()=>(0,_.jsx)(`div`,{className:`flex flex-wrap items-center justify-center gap-8 p-12`,children:[`start`,`center`,`end`].map(e=>(0,_.jsxs)(m,{children:[(0,_.jsx)(d,{render:(0,_.jsx)(i,{variant:`outline`,children:e})}),(0,_.jsx)(u,{align:e,className:`w-48`,children:(0,_.jsxs)(`p`,{className:`text-sm`,children:[`Aligned to `,e,`.`]})})]},e))})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Popover>
      <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxWidth">Max. width</Label>
            <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
}`,...y.parameters?.docs?.source},description:{story:`A composed popover with a header, description, and a small form.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center justify-center gap-8 p-12">
      {(['top', 'right', 'bottom', 'left'] as const).map(side => <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline">{side}</Button>} />
          <PopoverContent side={side} className="w-48">
            <p className="text-sm">Positioned on the {side}.</p>
          </PopoverContent>
        </Popover>)}
    </div>
}`,...b.parameters?.docs?.source},description:{story:`The popup can open on any side of the trigger, flipping to stay in view.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center justify-center gap-8 p-12">
      {(['start', 'center', 'end'] as const).map(align => <Popover key={align}>
          <PopoverTrigger render={<Button variant="outline">{align}</Button>} />
          <PopoverContent align={align} className="w-48">
            <p className="text-sm">Aligned to {align}.</p>
          </PopoverContent>
        </Popover>)}
    </div>
}`,...x.parameters?.docs?.source},description:{story:`The popup can align to the start, center, or end of the trigger.`,...x.parameters?.docs?.description}}},S=[`Default`,`Placement`,`Align`]}))();export{x as Align,y as Default,b as Placement,S as __namedExportsOrder,v as default};
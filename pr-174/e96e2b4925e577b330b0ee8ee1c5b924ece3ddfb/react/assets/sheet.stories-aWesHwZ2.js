import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{A as n,r}from"./utils-C5n3ayfX.js";import{t as i}from"./button-C7hzrQPx.js";import{t as a}from"./button-C6o-rz-l.js";import{t as o}from"./input-Cp1tmlZ-.js";import{t as s}from"./input-k4V9cG6h.js";import{t as c}from"./label-Bojel3y0.js";import{t as l}from"./label-CquwVvOo.js";import{a as u,c as d,i as f,l as p,n as m,o as h,r as g,s as _,t as v}from"./sheet-BxBVgqo8.js";var y,b,x,S,C,w;e((()=>{r(),a(),s(),l(),p(),y=t(),b={title:`Components/Sheet`,component:v,parameters:{docs:{description:{component:n.docs.description}}}},x={render:()=>(0,y.jsxs)(v,{children:[(0,y.jsx)(d,{render:(0,y.jsx)(i,{variant:`outline`,children:`Edit profile`})}),(0,y.jsxs)(g,{children:[(0,y.jsxs)(h,{children:[(0,y.jsx)(_,{children:`Edit profile`}),(0,y.jsx)(f,{children:`Make changes to your profile here. Click save when you're done.`})]}),(0,y.jsxs)(`div`,{className:`grid gap-4 px-4`,children:[(0,y.jsxs)(`div`,{className:`grid gap-2`,children:[(0,y.jsx)(c,{htmlFor:`sheet-name`,children:`Name`}),(0,y.jsx)(o,{id:`sheet-name`,defaultValue:`Pedro Duarte`})]}),(0,y.jsxs)(`div`,{className:`grid gap-2`,children:[(0,y.jsx)(c,{htmlFor:`sheet-username`,children:`Username`}),(0,y.jsx)(o,{id:`sheet-username`,defaultValue:`@peduarte`})]})]}),(0,y.jsxs)(u,{children:[(0,y.jsx)(i,{type:`submit`,children:`Save changes`}),(0,y.jsx)(m,{render:(0,y.jsx)(i,{variant:`outline`,children:`Cancel`})})]})]})]})},S={render:()=>(0,y.jsxs)(v,{children:[(0,y.jsx)(d,{render:(0,y.jsx)(i,{variant:`outline`,children:`Show terms`})}),(0,y.jsxs)(g,{showCloseButton:!1,children:[(0,y.jsxs)(h,{children:[(0,y.jsx)(_,{children:`Terms of service`}),(0,y.jsx)(f,{children:`Please read and accept our terms of service before continuing.`})]}),(0,y.jsx)(u,{children:(0,y.jsx)(m,{render:(0,y.jsx)(i,{variant:`outline`,children:`Close`})})})]})]})},C={render:()=>(0,y.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[{side:`top`,label:`Top`},{side:`right`,label:`Right`},{side:`bottom`,label:`Bottom`},{side:`left`,label:`Left`}].map(({side:e,label:t})=>(0,y.jsxs)(v,{children:[(0,y.jsx)(d,{render:(0,y.jsx)(i,{variant:`outline`,children:t})}),(0,y.jsxs)(g,{side:e,children:[(0,y.jsxs)(h,{children:[(0,y.jsxs)(_,{children:[t,` sheet`]}),(0,y.jsxs)(f,{children:[`Slides in from the `,t.toLowerCase(),` of the screen.`]})]}),(0,y.jsx)(u,{children:(0,y.jsx)(m,{render:(0,y.jsx)(i,{variant:`outline`,children:`Close`})})})]})]},e))})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger render={<Button variant="outline">Edit profile</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          <div className="grid gap-2">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-username">Username</Label>
            <Input id="sheet-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose render={<Button variant="outline">Cancel</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...x.parameters?.docs?.source},description:{story:`A composed sheet with a trigger, a form, and a footer action — slides in from the right.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger render={<Button variant="outline">Show terms</Button>} />
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Terms of service</SheetTitle>
          <SheetDescription>
            Please read and accept our terms of service before continuing.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...S.parameters?.docs?.source},description:{story:"`showCloseButton={false}` on `SheetContent` hides the corner close icon — pair it with an\nexplicit `SheetClose` action in the footer so the user still has a way to dismiss.",...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      {([{
      side: 'top',
      label: 'Top'
    }, {
      side: 'right',
      label: 'Right'
    }, {
      side: 'bottom',
      label: 'Bottom'
    }, {
      side: 'left',
      label: 'Left'
    }] as const).map(({
      side,
      label
    }) => <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline">{label}</Button>} />
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{label} sheet</SheetTitle>
              <SheetDescription>
                Slides in from the {label.toLowerCase()} of the screen.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose render={<Button variant="outline">Close</Button>} />
            </SheetFooter>
          </SheetContent>
        </Sheet>)}
    </div>
}`,...C.parameters?.docs?.source},description:{story:"Every edge the sheet can slide in from, set via `side` on `SheetContent`.",...C.parameters?.docs?.description}}},w=[`Default`,`WithoutCloseButton`,`Sides`]}))();export{x as Default,C as Sides,S as WithoutCloseButton,w as __namedExportsOrder,b as default};
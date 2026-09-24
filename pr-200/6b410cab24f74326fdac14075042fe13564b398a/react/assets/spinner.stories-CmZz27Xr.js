import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{n,r,t as i,y as a}from"./utils-C5n3ayfX.js";import{j as o,t as s}from"./index.es-CbcVOFsO.js";import{t as c}from"./button-CRJ3TT6y.js";import{t as l}from"./button-LAilQtZl.js";import{r as u,t as d}from"./card-DdSnmOG7.js";import{t as f}from"./card-DKRde8Nw.js";import{a as p,i as m,r as h,s as g,t as _}from"./empty-DtxcPaaE.js";var v=e((()=>{g()})),y,b,x,S=e((()=>{y=`_spinner_1urzx_7`,b=`_spinnerSpin_1urzx_1`,x={spinner:y,spinnerSpin:b}}));function C({className:e,...t}){return(0,w.jsx)(o,{"data-slot":`spinner`,role:`status`,"aria-label":`Loading`,className:i(x.spinner,e),...t})}var w,T=e((()=>{s(),n(),S(),w=t(),C.__docgenInfo={description:``,methods:[],displayName:`Spinner`}})),E,D,O,k,A,j,M,N,P;e((()=>{r(),l(),f(),v(),T(),E=t(),D={title:`Components/Spinner`,component:C,tags:[`skip-visual`],parameters:{docs:{description:{component:a.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=184-890`}}},O={render:()=>(0,E.jsx)(C,{})},k={render:()=>(0,E.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4`,children:[(0,E.jsx)(C,{className:`size-4`}),(0,E.jsx)(C,{className:`size-6`}),(0,E.jsx)(C,{className:`size-8`}),(0,E.jsx)(C,{className:`size-10`})]})},A={render:()=>(0,E.jsxs)(`div`,{className:`flex items-center gap-2 text-sm text-muted-foreground`,children:[(0,E.jsx)(C,{}),`Loading…`]})},j={render:()=>(0,E.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,E.jsxs)(c,{disabled:!0,children:[(0,E.jsx)(C,{"data-icon":`inline-start`}),`Please wait`]}),(0,E.jsx)(c,{variant:`secondary`,size:`icon`,disabled:!0,"aria-label":`Loading`,children:(0,E.jsx)(C,{})})]})},M={render:()=>(0,E.jsx)(d,{className:`w-64`,children:(0,E.jsx)(u,{className:`flex items-center justify-center py-10`,children:(0,E.jsx)(C,{className:`size-6 text-muted-foreground`})})})},N={render:()=>(0,E.jsx)(_,{className:`w-full max-w-sm`,children:(0,E.jsxs)(m,{children:[(0,E.jsx)(p,{children:(0,E.jsx)(C,{className:`size-8`})}),(0,E.jsx)(h,{children:`Fetching your documents…`})]})})},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <Spinner />
}`,...O.parameters?.docs?.source},description:{story:"The default spinner at its default `size-4`.",...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-4">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
      <Spinner className="size-10" />
    </div>
}`,...k.parameters?.docs?.source},description:{story:"Sizes are just utility classes — override `size-*` to scale the icon.",...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner />
      Loading…
    </div>
}`,...A.parameters?.docs?.source},description:{story:`Paired with text, inline, for a lightweight loading message.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>
      <Button variant="secondary" size="icon" disabled aria-label="Loading">
        <Spinner />
      </Button>
    </div>
}`,...j.parameters?.docs?.source},description:{story:"Inside a disabled `Button` while an action is in flight.",...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-64">
      <CardContent className="flex items-center justify-center py-10">
        <Spinner className="size-6 text-muted-foreground" />
      </CardContent>
    </Card>
}`,...M.parameters?.docs?.source},description:{story:"As the sole content of a `Card`, centering the spinner while data loads.",...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <Empty className="w-full max-w-sm">
      <EmptyHeader>
        <EmptyMedia>
          <Spinner className="size-8" />
        </EmptyMedia>
        <EmptyDescription>Fetching your documents…</EmptyDescription>
      </EmptyHeader>
    </Empty>
}`,...N.parameters?.docs?.source},description:{story:"As the media of an `Empty` state, e.g. while a list is being fetched.",...N.parameters?.docs?.description}}},P=[`Default`,`Sizes`,`WithLabel`,`InButton`,`CardLoading`,`EmptyLoading`]}))();export{M as CardLoading,O as Default,N as EmptyLoading,j as InButton,k as Sizes,A as WithLabel,P as __namedExportsOrder,D as default};
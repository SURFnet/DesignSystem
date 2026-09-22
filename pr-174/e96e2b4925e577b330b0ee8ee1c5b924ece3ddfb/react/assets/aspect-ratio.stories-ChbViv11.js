import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{dn as n,n as r,r as i,t as a}from"./utils-C5n3ayfX.js";import{i as o,o as s,r as c,s as l,t as u}from"./card-COHUMxdJ.js";import{t as d}from"./card-CdoXr9F4.js";var f,p,m=e((()=>{f=`_root_13c5y_1`,p={root:f}}));function h({ratio:e,className:t,...n}){return(0,g.jsx)(`div`,{"data-slot":`aspect-ratio`,style:{"--ratio":e},className:a(p.root,t),...n})}var g,_=e((()=>{r(),m(),g=t(),h.__docgenInfo={description:``,methods:[],displayName:`AspectRatio`,props:{ratio:{required:!0,tsType:{name:`number`},description:``}}}})),v,y,b,x,S,C;e((()=>{i(),d(),_(),v=t(),y={title:`Components/AspectRatio`,component:h,parameters:{docs:{description:{component:n.docs.description}}},argTypes:{ratio:{control:`number`,description:`Width / height ratio the content is constrained to.`}},args:{ratio:16/9}},b={render:e=>(0,v.jsx)(h,{...e,className:`w-80 overflow-hidden rounded-lg bg-muted`,children:(0,v.jsx)(`img`,{src:`https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80`,alt:`Mountain landscape`,className:`size-full object-cover`})})},x={render:()=>(0,v.jsx)(`div`,{className:`flex flex-wrap gap-4`,children:[{ratio:1,label:`Square — 1/1`},{ratio:4/3,label:`Standard — 4/3`},{ratio:16/9,label:`Widescreen — 16/9`},{ratio:21/9,label:`Ultrawide — 21/9`}].map(({ratio:e,label:t})=>(0,v.jsxs)(`figure`,{className:`w-40`,children:[(0,v.jsx)(h,{ratio:e,className:`overflow-hidden rounded-lg bg-muted`,children:(0,v.jsx)(`img`,{src:`https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80`,alt:t,className:`size-full object-cover`})}),(0,v.jsx)(`figcaption`,{className:`mt-1 text-center text-xs text-muted-foreground`,children:t})]},t))})},S={render:()=>(0,v.jsxs)(u,{className:`w-80`,children:[(0,v.jsxs)(s,{children:[(0,v.jsx)(l,{children:`Mountain sunrise`}),(0,v.jsx)(o,{children:`A 16/9 image constrained by AspectRatio.`})]}),(0,v.jsx)(c,{children:(0,v.jsx)(h,{ratio:16/9,className:`overflow-hidden rounded-lg bg-muted`,children:(0,v.jsx)(`img`,{src:`https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80`,alt:`Mountain range at sunrise`,className:`size-full object-cover`})})})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <AspectRatio {...args} className="w-80 overflow-hidden rounded-lg bg-muted">
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" alt="Mountain landscape" className="size-full object-cover" />
    </AspectRatio>
}`,...b.parameters?.docs?.source},description:{story:"The default aspect ratio — tweak `ratio` via the controls.",...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      {([{
      ratio: 1,
      label: 'Square — 1/1'
    }, {
      ratio: 4 / 3,
      label: 'Standard — 4/3'
    }, {
      ratio: 16 / 9,
      label: 'Widescreen — 16/9'
    }, {
      ratio: 21 / 9,
      label: 'Ultrawide — 21/9'
    }] as const).map(({
      ratio,
      label
    }) => <figure key={label} className="w-40">
          <AspectRatio ratio={ratio} className="overflow-hidden rounded-lg bg-muted">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" alt={label} className="size-full object-cover" />
          </AspectRatio>
          <figcaption className="mt-1 text-center text-xs text-muted-foreground">
            {label}
          </figcaption>
        </figure>)}
    </div>
}`,...x.parameters?.docs?.source},description:{story:`Common ratios side by side, each constraining the same photo.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-80">
      <CardHeader>
        <CardTitle>Mountain sunrise</CardTitle>
        <CardDescription>A 16/9 image constrained by AspectRatio.</CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-muted">
          <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80" alt="Mountain range at sunrise" className="size-full object-cover" />
        </AspectRatio>
      </CardContent>
    </Card>
}`,...S.parameters?.docs?.source},description:{story:"Composed inside `Card` — a media block constrained to 16/9 above the copy.",...S.parameters?.docs?.description}}},C=[`Default`,`Ratios`,`InCard`]}))();export{b as Default,S as InCard,x as Ratios,C as __namedExportsOrder,y as default};
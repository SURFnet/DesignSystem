import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{I as n,n as r,r as i,t as a}from"./utils-C5n3ayfX.js";import{t as o}from"./separator-CRxzAMFb.js";import{t as s}from"./separator-j5Z_Fu6A.js";import{c,i as l,n as u,o as d,t as f,u as p}from"./scroll-area-CoOuKF7U.js";var m,h,g,_,v,y=e((()=>{m=`_root_p3bzq_1`,h=`_viewport_p3bzq_5`,g=`_scrollbar_p3bzq_20`,_=`_thumb_p3bzq_43`,v={root:m,viewport:h,scrollbar:g,thumb:_}}));function b({className:e,children:t,...n}){return(0,S.jsxs)(p,{"data-slot":`scroll-area`,className:a(v.root,e),...n,children:[(0,S.jsx)(c,{"data-slot":`scroll-area-viewport`,tabIndex:0,className:v.viewport,children:t}),(0,S.jsx)(x,{}),(0,S.jsx)(u,{})]})}function x({className:e,orientation:t=`vertical`,...n}){return(0,S.jsx)(d,{"data-slot":`scroll-area-scrollbar`,"data-orientation":t,orientation:t,className:a(v.scrollbar,e),...n,children:(0,S.jsx)(l,{"data-slot":`scroll-area-thumb`,className:v.thumb})})}var S,C=e((()=>{f(),r(),y(),S=t(),b.__docgenInfo={description:``,methods:[],displayName:`ScrollArea`},x.__docgenInfo={description:``,methods:[],displayName:`ScrollBar`,props:{orientation:{defaultValue:{value:`'vertical'`,computed:!1},required:!1}}}})),w,T,E,D,O,k;e((()=>{i(),s(),C(),w=t(),T={title:`Components/ScrollArea`,component:b,parameters:{docs:{description:{component:n.docs.description}}}},E=Array.from({length:50}).map((e,t,n)=>`v1.2.0-beta.${n.length-t}`),D={render:()=>(0,w.jsx)(b,{className:`h-72 w-48 rounded-md border`,children:(0,w.jsxs)(`div`,{className:`p-4`,children:[(0,w.jsx)(`h4`,{className:`mb-4 text-sm leading-none font-medium`,children:`Tags`}),E.map(e=>(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{className:`text-sm`,children:e}),(0,w.jsx)(o,{className:`my-2`})]},e))]})})},O={render:()=>(0,w.jsxs)(b,{className:`w-96 rounded-md border whitespace-nowrap`,children:[(0,w.jsx)(`div`,{className:`flex w-max gap-4 p-4`,children:[`Ornella Binni`,`Tom Byrom`,`Vladimir Malyavko`].map(e=>(0,w.jsxs)(`figure`,{className:`shrink-0`,children:[(0,w.jsx)(`div`,{className:`flex aspect-[3/4] h-40 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground`,children:`Artwork`}),(0,w.jsxs)(`figcaption`,{className:`pt-2 text-xs text-muted-foreground`,children:[`Photo by `,(0,w.jsx)(`span`,{className:`font-semibold text-foreground`,children:e})]})]},e))}),(0,w.jsx)(x,{orientation:`horizontal`})]})},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map(tag => <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>)}
      </div>
    </ScrollArea>
}`,...D.parameters?.docs?.source},description:{story:`A vertical scroll area constraining a long list of tags.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {['Ornella Binni', 'Tom Byrom', 'Vladimir Malyavko'].map(artist => <figure key={artist} className="shrink-0">
            <div className="flex aspect-[3/4] h-40 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
              Artwork
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by <span className="font-semibold text-foreground">{artist}</span>
            </figcaption>
          </figure>)}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
}`,...O.parameters?.docs?.source},description:{story:'`ScrollBar orientation="horizontal"` swaps in a horizontal track — pair it with a\n`whitespace-nowrap` and `flex w-max` content wrapper so the row doesn\'t collapse.',...O.parameters?.docs?.description}}},k=[`Default`,`Horizontal`]}))();export{D as Default,O as Horizontal,k as __namedExportsOrder,T as default};
import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{Nt as n,r}from"./utils-C5n3ayfX.js";import{P as i,V as a,X as o,h as s,t as c}from"./index.es-CbcVOFsO.js";import{t as l}from"./button-CRJ3TT6y.js";import{t as u}from"./button-LAilQtZl.js";import{a as d,i as f,n as p,o as m,r as h,s as g,t as _}from"./empty-DtxcPaaE.js";var v,y,b,x,S,C,w;e((()=>{c(),r(),u(),g(),v=t(),y={title:`Components/Empty`,component:_,parameters:{docs:{description:{component:n.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=18672-1039`}}},b={render:()=>(0,v.jsxs)(_,{className:`w-full max-w-sm`,children:[(0,v.jsxs)(f,{children:[(0,v.jsx)(d,{variant:`icon`,title:n.docs.variants.icon,children:(0,v.jsx)(o,{})}),(0,v.jsx)(m,{children:`No documents yet`}),(0,v.jsx)(h,{children:`Create your first document to get started.`})]}),(0,v.jsx)(p,{children:(0,v.jsxs)(l,{children:[(0,v.jsx)(i,{"data-icon":`inline-start`}),`New document`]})})]})},x={render:()=>(0,v.jsx)(`div`,{className:`flex flex-wrap gap-8`,children:n.props.variants.map(e=>(0,v.jsx)(_,{className:`w-64`,children:(0,v.jsxs)(f,{children:[(0,v.jsx)(d,{variant:e,title:n.docs.variants[e],children:(0,v.jsx)(o,{className:e==="default"?`size-10`:void 0})}),(0,v.jsx)(m,{children:e.charAt(0).toUpperCase()+e.slice(1)}),(0,v.jsx)(h,{children:n.docs.variants[e]})]})},e))})},S={render:()=>(0,v.jsx)(_,{className:`w-full max-w-sm`,children:(0,v.jsxs)(f,{children:[(0,v.jsx)(d,{children:(0,v.jsx)(a,{className:`size-10`})}),(0,v.jsx)(m,{children:`No results found`}),(0,v.jsx)(h,{children:`Try adjusting your search or filters.`})]})})},C={render:()=>(0,v.jsxs)(_,{className:`w-full max-w-sm`,children:[(0,v.jsxs)(f,{children:[(0,v.jsx)(d,{variant:`icon`,children:(0,v.jsx)(s,{})}),(0,v.jsx)(m,{children:`Inbox zero`}),(0,v.jsx)(h,{children:`You're all caught up — nothing left to review.`})]}),(0,v.jsx)(p,{children:(0,v.jsxs)(`div`,{className:`flex gap-2`,children:[(0,v.jsx)(l,{variant:`outline`,children:`Import messages`}),(0,v.jsx)(l,{children:`Compose`})]})})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Empty className="w-full max-w-sm">
      <EmptyHeader>
        <EmptyMedia variant="icon" title={emptyContract.docs.variants.icon}>
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No documents yet</EmptyTitle>
        <EmptyDescription>Create your first document to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusIcon data-icon="inline-start" />
          New document
        </Button>
      </EmptyContent>
    </Empty>
}`,...b.parameters?.docs?.source},description:{story:`A "no documents" state with an icon-badged media, title, description, and a call to action.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-8">
      {emptyContract.props.variants.map(variant => <Empty key={variant} className="w-64">
          <EmptyHeader>
            <EmptyMedia variant={variant} title={emptyContract.docs.variants[variant]}>
              <FolderIcon className={variant === 'default' ? 'size-10' : undefined} />
            </EmptyMedia>
            <EmptyTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</EmptyTitle>
            <EmptyDescription>{emptyContract.docs.variants[variant]}</EmptyDescription>
          </EmptyHeader>
        </Empty>)}
    </div>
}`,...x.parameters?.docs?.source},description:{story:"The two `EmptyMedia` variants side by side — `icon` renders a rounded badge background,\n`default` renders the media as-is (for a custom illustration), so it needs an explicit icon size.",...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Empty className="w-full max-w-sm">
      <EmptyHeader>
        <EmptyMedia>
          <MagnifyingGlassIcon className="size-10" />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
      </EmptyHeader>
    </Empty>
}`,...S.parameters?.docs?.source},description:{story:'A "no results" search state — plain (`default`) media lets a larger illustrative icon sit un-badged.',...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Empty className="w-full max-w-sm">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TrayIcon />
        </EmptyMedia>
        <EmptyTitle>Inbox zero</EmptyTitle>
        <EmptyDescription>You&apos;re all caught up — nothing left to review.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button variant="outline">Import messages</Button>
          <Button>Compose</Button>
        </div>
      </EmptyContent>
    </Empty>
}`,...C.parameters?.docs?.source},description:{story:"An empty inbox with two competing actions in `EmptyContent`.",...C.parameters?.docs?.description}}},w=[`Default`,`MediaVariants`,`NoResults`,`WithMultipleActions`]}))();export{b as Default,x as MediaVariants,S as NoResults,C as WithMultipleActions,w as __namedExportsOrder,y as default};
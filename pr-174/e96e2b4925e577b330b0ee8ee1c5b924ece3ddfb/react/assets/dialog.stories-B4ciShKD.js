import{i as e}from"./preload-helper-xPQekRTU.js";import{O as t}from"./iframe-CbBuQ8p6.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";import{Lt as r,n as i,r as a,t as o}from"./utils-C5n3ayfX.js";import{i as s,t as c}from"./index.es-SHpUsVh6.js";import{t as l}from"./button-C7hzrQPx.js";import{t as u}from"./button-C6o-rz-l.js";import{a as d,d as f,l as p,p as m,r as h,s as g,t as _}from"./DialogTrigger-BOk8aK2b.js";import{t as v}from"./input-Cp1tmlZ-.js";import{t as y}from"./input-k4V9cG6h.js";import{t as b}from"./label-Bojel3y0.js";import{t as x}from"./label-CquwVvOo.js";import{n as S,t as C}from"./dialog-B2SaHccG.js";var w,T,E,D,O,k,A,j,M,N=e((()=>{w=`_overlay_1i9o4_1`,T=`_content_1i9o4_15`,E=`_closeButton_1i9o4_41`,D=`_header_1i9o4_47`,O=`_footer_1i9o4_53`,k=`_title_1i9o4_66`,A=`_description_1i9o4_72`,j=`_srOnly_1i9o4_87`,M={overlay:w,content:T,closeButton:E,header:D,footer:O,title:k,description:A,srOnly:j}}));function P({...e}){return(0,W.jsx)(S,{"data-slot":`dialog`,...e})}function F({...e}){return(0,W.jsx)(_,{"data-slot":`dialog-trigger`,...e})}function I({...e}){return(0,W.jsx)(d,{"data-slot":`dialog-portal`,...e})}function L({...e}){return(0,W.jsx)(f,{"data-slot":`dialog-close`,...e})}function R({className:e,...t}){return(0,W.jsx)(m,{"data-slot":`dialog-overlay`,className:o(M.overlay,e),...t})}function z({className:e,children:t,showCloseButton:n=!0,...r}){return(0,W.jsxs)(I,{children:[(0,W.jsx)(R,{}),(0,W.jsxs)(g,{"data-slot":`dialog-content`,className:o(M.content,e),...r,children:[t,n&&(0,W.jsxs)(f,{"data-slot":`dialog-close`,render:(0,W.jsx)(l,{variant:`ghost`,className:M.closeButton,size:`icon-sm`}),children:[(0,W.jsx)(s,{}),(0,W.jsx)(`span`,{className:M.srOnly,children:`Close`})]})]})]})}function B({className:e,...t}){return(0,W.jsx)(`div`,{"data-slot":`dialog-header`,className:o(M.header,e),...t})}function V({className:e,showCloseButton:t=!1,children:n,...r}){return(0,W.jsxs)(`div`,{"data-slot":`dialog-footer`,className:o(M.footer,e),...r,children:[n,t&&(0,W.jsx)(f,{render:(0,W.jsx)(l,{variant:`outline`}),children:`Close`})]})}function H({className:e,...t}){return(0,W.jsx)(h,{"data-slot":`dialog-title`,className:o(M.title,e),...t})}function U({className:e,...t}){return(0,W.jsx)(p,{"data-slot":`dialog-description`,className:o(M.description,e),...t})}var W,G=e((()=>{t(),C(),i(),u(),c(),N(),W=n(),P.__docgenInfo={description:``,methods:[],displayName:`Dialog`},L.__docgenInfo={description:``,methods:[],displayName:`DialogClose`},z.__docgenInfo={description:``,methods:[],displayName:`DialogContent`,props:{showCloseButton:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}}}},U.__docgenInfo={description:``,methods:[],displayName:`DialogDescription`},V.__docgenInfo={description:``,methods:[],displayName:`DialogFooter`,props:{showCloseButton:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}},B.__docgenInfo={description:``,methods:[],displayName:`DialogHeader`},R.__docgenInfo={description:``,methods:[],displayName:`DialogOverlay`},I.__docgenInfo={description:``,methods:[],displayName:`DialogPortal`},H.__docgenInfo={description:``,methods:[],displayName:`DialogTitle`},F.__docgenInfo={description:``,methods:[],displayName:`DialogTrigger`}})),K,q,J,Y,X;e((()=>{a(),u(),y(),x(),G(),K=n(),q={title:`Components/Dialog`,component:P,parameters:{docs:{description:{component:r.docs.description}}}},J={render:()=>(0,K.jsxs)(P,{children:[(0,K.jsx)(F,{render:(0,K.jsx)(l,{variant:`outline`,children:`Edit profile`})}),(0,K.jsxs)(z,{children:[(0,K.jsxs)(B,{children:[(0,K.jsx)(H,{children:`Edit profile`}),(0,K.jsx)(U,{children:`Make changes to your profile here. Click save when you're done.`})]}),(0,K.jsxs)(`div`,{className:`grid gap-4`,children:[(0,K.jsxs)(`div`,{className:`grid gap-2`,children:[(0,K.jsx)(b,{htmlFor:`name`,children:`Name`}),(0,K.jsx)(v,{id:`name`,defaultValue:`Pedro Duarte`})]}),(0,K.jsxs)(`div`,{className:`grid gap-2`,children:[(0,K.jsx)(b,{htmlFor:`username`,children:`Username`}),(0,K.jsx)(v,{id:`username`,defaultValue:`@peduarte`})]})]}),(0,K.jsxs)(V,{children:[(0,K.jsx)(L,{render:(0,K.jsx)(l,{variant:`outline`,children:`Cancel`})}),(0,K.jsx)(l,{type:`submit`,children:`Save changes`})]})]})]})},Y={render:()=>(0,K.jsxs)(P,{children:[(0,K.jsx)(F,{render:(0,K.jsx)(l,{variant:`outline`,children:`Show terms`})}),(0,K.jsxs)(z,{showCloseButton:!1,children:[(0,K.jsxs)(B,{children:[(0,K.jsx)(H,{children:`Terms of service`}),(0,K.jsx)(U,{children:`Please read and accept our terms of service before continuing.`})]}),(0,K.jsx)(V,{showCloseButton:!0,children:(0,K.jsx)(l,{children:`Accept`})})]})]})},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger render={<Button variant="outline">Edit profile</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...J.parameters?.docs?.source},description:{story:`A composed dialog with a trigger, a form, and a footer action.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger render={<Button variant="outline">Show terms</Button>} />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>
            Please read and accept our terms of service before continuing.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...Y.parameters?.docs?.source},description:{story:"`showCloseButton={false}` on `DialogContent` hides the corner close icon; pair it with\n`DialogFooter`'s own `showCloseButton` to give the user a single, explicit way to dismiss.",...Y.parameters?.docs?.description}}},X=[`Default`,`WithoutCloseButton`]}))();export{J as Default,Y as WithoutCloseButton,X as __namedExportsOrder,q as default};
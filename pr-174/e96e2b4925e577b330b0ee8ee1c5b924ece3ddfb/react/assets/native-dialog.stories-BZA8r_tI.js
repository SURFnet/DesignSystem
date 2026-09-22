import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{O as n}from"./iframe-CbBuQ8p6.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{ft as i,n as a,r as o,t as s}from"./utils-C5n3ayfX.js";import{t as c}from"./button-C7hzrQPx.js";import{t as l}from"./button-C6o-rz-l.js";var u,d,f,p,m,h,g,_=e((()=>{u=`_dialog_1lo3l_1`,d=`_header_1lo3l_18`,f=`_title_1lo3l_25`,p=`_description_1lo3l_32`,m=`_footer_1lo3l_37`,h=`_close_1lo3l_45`,g={dialog:u,header:d,title:f,description:p,footer:m,close:h}}));function v({className:e,...t}){return(0,w.jsx)(`div`,{"data-slot":`native-dialog-header`,className:s(g.header,e),...t})}function y({className:e,...t}){return(0,w.jsx)(`h2`,{"data-slot":`native-dialog-title`,className:s(g.title,e),...t})}function b({className:e,...t}){return(0,w.jsx)(`p`,{"data-slot":`native-dialog-description`,className:s(g.description,e),...t})}function x({className:e,...t}){return(0,w.jsx)(`div`,{"data-slot":`native-dialog-footer`,className:s(g.footer,e),...t})}function S({className:e,dialogRef:t,onClick:n,...r}){return(0,w.jsx)(`button`,{type:`button`,"data-slot":`native-dialog-close`,className:s(g.close,e),onClick:e=>{t?.current?.close(),n?.(e)},...r})}var C,w,T,E=e((()=>{C=t(n(),1),a(),_(),w=r(),T=C.forwardRef(function({className:e,...t},n){return(0,w.jsx)(`dialog`,{ref:n,"data-slot":`native-dialog`,className:s(g.dialog,e),...t})}),T.__docgenInfo={description:``,methods:[],displayName:`NativeDialog`},S.__docgenInfo={description:``,methods:[],displayName:`NativeDialogClose`,props:{dialogRef:{required:!1,tsType:{name:`ReactRefObject`,raw:`React.RefObject<HTMLDialogElement | null>`,elements:[{name:`union`,raw:`HTMLDialogElement | null`,elements:[{name:`HTMLDialogElement`},{name:`null`}]}]},description:``}}},b.__docgenInfo={description:``,methods:[],displayName:`NativeDialogDescription`},x.__docgenInfo={description:``,methods:[],displayName:`NativeDialogFooter`},v.__docgenInfo={description:``,methods:[],displayName:`NativeDialogHeader`},y.__docgenInfo={description:``,methods:[],displayName:`NativeDialogTitle`}})),D,O,k,A,j;e((()=>{D=t(n(),1),o(),l(),E(),O=r(),k={title:`Components/NativeDialog`,component:T,parameters:{docs:{description:{component:i.docs.description}}}},A={render:()=>{let e=(0,D.useRef)(null);return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(c,{type:`button`,onClick:()=>e.current?.showModal(),children:`Open dialog`}),(0,O.jsxs)(T,{ref:e,children:[(0,O.jsx)(S,{dialogRef:e,"aria-label":`Close`,children:`×`}),(0,O.jsxs)(v,{children:[(0,O.jsx)(y,{children:`Native dialog`}),(0,O.jsxs)(b,{children:[`Uses the platform `,(0,O.jsx)(`code`,{children:`<dialog>`}),` element with `,(0,O.jsx)(`code`,{children:`showModal()`}),`.`]})]}),(0,O.jsxs)(x,{children:[(0,O.jsx)(c,{type:`button`,variant:`outline`,onClick:()=>e.current?.close(),children:`Cancel`}),(0,O.jsx)(c,{type:`button`,onClick:()=>e.current?.close(),children:`Confirm`})]})]})]})}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDialogElement>(null);
    return <>
        <Button type="button" onClick={() => ref.current?.showModal()}>
          Open dialog
        </Button>
        <NativeDialog ref={ref}>
          <NativeDialogClose dialogRef={ref} aria-label="Close">
            ×
          </NativeDialogClose>
          <NativeDialogHeader>
            <NativeDialogTitle>Native dialog</NativeDialogTitle>
            <NativeDialogDescription>
              Uses the platform <code>&lt;dialog&gt;</code> element with <code>showModal()</code>.
            </NativeDialogDescription>
          </NativeDialogHeader>
          <NativeDialogFooter>
            <Button type="button" variant="outline" onClick={() => ref.current?.close()}>
              Cancel
            </Button>
            <Button type="button" onClick={() => ref.current?.close()}>
              Confirm
            </Button>
          </NativeDialogFooter>
        </NativeDialog>
      </>;
  }
}`,...A.parameters?.docs?.source}}},j=[`Default`]}))();export{A as Default,j as __namedExportsOrder,k as default};
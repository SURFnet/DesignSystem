import{i as e}from"./preload-helper-xPQekRTU.js";import{O as t}from"./iframe-CaelJD7u.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";import{n as r,pn as i,r as a,t as o}from"./utils-C5n3ayfX.js";import{l as s,t as c}from"./index.es-CbcVOFsO.js";import{t as l}from"./button-CRJ3TT6y.js";import{t as u}from"./button-LAilQtZl.js";import{a as d,d as f,l as p,p as m,r as h,s as g}from"./DialogTrigger-Ue-BiEXO.js";import{i as _,n as v,t as y}from"./alert-dialog-CfXz_tEa.js";var b,x,S,C,w,T,E,D,O,k=e((()=>{b=`_overlay_1jmdy_1`,x=`_content_1jmdy_15`,S=`_header_1jmdy_43`,C=`_footer_1jmdy_67`,w=`_media_1jmdy_85`,T=`_title_1jmdy_107`,E=`_description_1jmdy_119`,D=`_srOnly_1jmdy_141`,O={overlay:b,content:x,header:S,footer:C,media:w,title:T,description:E,srOnly:D}}));function A({...e}){return(0,H.jsx)(_,{"data-slot":`alert-dialog`,...e})}function j({...e}){return(0,H.jsx)(v,{"data-slot":`alert-dialog-trigger`,...e})}function M({...e}){return(0,H.jsx)(d,{"data-slot":`alert-dialog-portal`,...e})}function N({className:e,...t}){return(0,H.jsx)(m,{"data-slot":`alert-dialog-overlay`,className:o(O.overlay,e),...t})}function P({className:e,size:t=`default`,...n}){return(0,H.jsxs)(M,{children:[(0,H.jsx)(N,{}),(0,H.jsx)(g,{"data-slot":`alert-dialog-content`,"data-size":t,className:o(O.content,e),...n})]})}function F({className:e,...t}){return(0,H.jsx)(`div`,{"data-slot":`alert-dialog-header`,className:o(O.header,e),...t})}function I({className:e,...t}){return(0,H.jsx)(`div`,{"data-slot":`alert-dialog-footer`,className:o(O.footer,e),...t})}function L({className:e,...t}){return(0,H.jsx)(`div`,{"data-slot":`alert-dialog-media`,className:o(O.media,e),...t})}function R({className:e,...t}){return(0,H.jsx)(h,{"data-slot":`alert-dialog-title`,className:o(O.title,e),...t})}function z({className:e,...t}){return(0,H.jsx)(p,{"data-slot":`alert-dialog-description`,className:o(O.description,e),...t})}function B({className:e,...t}){return(0,H.jsx)(l,{"data-slot":`alert-dialog-action`,className:o(e),...t})}function V({className:e,variant:t=`outline`,size:n=`default`,...r}){return(0,H.jsx)(f,{"data-slot":`alert-dialog-cancel`,className:o(e),render:(0,H.jsx)(l,{variant:t,size:n}),...r})}var H,U=e((()=>{t(),y(),r(),u(),k(),H=n(),A.__docgenInfo={description:``,methods:[],displayName:`AlertDialog`},B.__docgenInfo={description:``,methods:[],displayName:`AlertDialogAction`},V.__docgenInfo={description:``,methods:[],displayName:`AlertDialogCancel`,props:{variant:{defaultValue:{value:`'outline'`,computed:!1},required:!1},size:{defaultValue:{value:`'default'`,computed:!1},required:!1}}},P.__docgenInfo={description:``,methods:[],displayName:`AlertDialogContent`,props:{size:{required:!1,tsType:{name:`AlertDialogSizeName`},description:``,defaultValue:{value:`'default'`,computed:!1}}}},z.__docgenInfo={description:``,methods:[],displayName:`AlertDialogDescription`},I.__docgenInfo={description:``,methods:[],displayName:`AlertDialogFooter`},F.__docgenInfo={description:``,methods:[],displayName:`AlertDialogHeader`},L.__docgenInfo={description:``,methods:[],displayName:`AlertDialogMedia`},N.__docgenInfo={description:``,methods:[],displayName:`AlertDialogOverlay`},M.__docgenInfo={description:``,methods:[],displayName:`AlertDialogPortal`},R.__docgenInfo={description:``,methods:[],displayName:`AlertDialogTitle`},j.__docgenInfo={description:``,methods:[],displayName:`AlertDialogTrigger`}})),W,G,K,q,J,Y;e((()=>{c(),a(),u(),U(),W=n(),G={title:`Components/AlertDialog`,component:A,parameters:{docs:{description:{component:i.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=22-307&p=f&t=vT3gKkMDSpQaeqci-0`}}},K={render:()=>(0,W.jsxs)(A,{children:[(0,W.jsx)(j,{render:(0,W.jsx)(l,{variant:`outline`,children:`Show dialog`})}),(0,W.jsxs)(P,{children:[(0,W.jsxs)(F,{children:[(0,W.jsx)(R,{children:`Are you absolutely sure?`}),(0,W.jsx)(z,{children:`This action cannot be undone. This will permanently delete your account and remove your data from our servers.`})]}),(0,W.jsxs)(I,{children:[(0,W.jsx)(V,{children:`Cancel`}),(0,W.jsx)(B,{children:`Continue`})]})]})]})},q={render:()=>(0,W.jsxs)(A,{children:[(0,W.jsx)(j,{render:(0,W.jsx)(l,{variant:`destructive`,children:`Delete account`})}),(0,W.jsxs)(P,{children:[(0,W.jsxs)(F,{children:[(0,W.jsx)(L,{children:(0,W.jsx)(s,{})}),(0,W.jsx)(R,{children:`Delete account?`}),(0,W.jsx)(z,{children:`This will permanently delete your account and all associated data. This action cannot be undone.`})]}),(0,W.jsxs)(I,{children:[(0,W.jsx)(V,{children:`Cancel`}),(0,W.jsx)(B,{variant:`destructive`,children:`Delete account`})]})]})]})},J={render:()=>(0,W.jsxs)(A,{children:[(0,W.jsx)(j,{render:(0,W.jsx)(l,{variant:`outline`,children:`Leave page`})}),(0,W.jsxs)(P,{size:`sm`,children:[(0,W.jsxs)(F,{children:[(0,W.jsx)(R,{children:`Leave without saving?`}),(0,W.jsx)(z,{children:`Your changes will be lost.`})]}),(0,W.jsxs)(I,{children:[(0,W.jsx)(V,{children:`Stay`}),(0,W.jsx)(B,{children:`Leave`})]})]})]})},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline">Show dialog</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...K.parameters?.docs?.source},description:{story:`The confirm/cancel pattern — interrupts the user before an irreversible action.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive">Delete account</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <WarningIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete account?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your account and all associated data. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...q.parameters?.docs?.source},description:{story:`A destructive confirmation, using an icon in the media slot and a destructive action button.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline">Leave page</Button>} />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
          <AlertDialogDescription>Your changes will be lost.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay</AlertDialogCancel>
          <AlertDialogAction>Leave</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...J.parameters?.docs?.source},description:{story:"The compact (`sm`) content size — footer buttons switch to a two-column grid.",...J.parameters?.docs?.description}}},Y=[`Default`,`WithMedia`,`Small`]}))();export{K as Default,J as Small,q as WithMedia,Y as __namedExportsOrder,G as default};
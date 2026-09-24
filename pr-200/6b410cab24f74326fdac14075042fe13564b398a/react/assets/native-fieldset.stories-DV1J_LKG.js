import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{n,r,t as i,ut as a}from"./utils-C5n3ayfX.js";import{a as o,c as s,i as c,n as l,s as u,t as d}from"./native-radio-Dnc8Tgzl.js";var f,p,m,h,g,_,v,y=e((()=>{f=`_fieldset_147jv_1`,p=`_legend_147jv_18`,m=`_content_147jv_25`,h=`_row_147jv_32`,g=`_label_147jv_38`,_=`_hint_147jv_44`,v={fieldset:f,legend:p,content:m,row:h,label:g,hint:_}}));function b({className:e,...t}){return(0,E.jsx)(`fieldset`,{"data-slot":`native-fieldset`,className:i(v.fieldset,e),...t})}function x({className:e,...t}){return(0,E.jsx)(`legend`,{"data-slot":`native-legend`,className:i(v.legend,e),...t})}function S({className:e,...t}){return(0,E.jsx)(`div`,{"data-slot":`native-fieldset-content`,className:i(v.content,e),...t})}function C({className:e,...t}){return(0,E.jsx)(`div`,{"data-slot":`native-fieldset-row`,className:i(v.row,e),...t})}function w({className:e,...t}){return(0,E.jsx)(`label`,{"data-slot":`native-fieldset-label`,className:i(v.label,e),...t})}function T({className:e,...t}){return(0,E.jsx)(`p`,{"data-slot":`native-fieldset-hint`,className:i(v.hint,e),...t})}var E,D=e((()=>{n(),y(),E=t(),b.__docgenInfo={description:``,methods:[],displayName:`NativeFieldset`},S.__docgenInfo={description:``,methods:[],displayName:`NativeFieldsetContent`},T.__docgenInfo={description:``,methods:[],displayName:`NativeFieldsetHint`},w.__docgenInfo={description:``,methods:[],displayName:`NativeFieldsetLabel`},C.__docgenInfo={description:``,methods:[],displayName:`NativeFieldsetRow`},x.__docgenInfo={description:``,methods:[],displayName:`NativeLegend`}})),O,k,A,j;e((()=>{r(),u(),c(),d(),D(),O=t(),k={title:`Components/NativeFieldset`,component:b,parameters:{docs:{description:{component:a.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=28934-79420`}}},A={render:()=>(0,O.jsxs)(b,{children:[(0,O.jsx)(x,{children:`Notification settings`}),(0,O.jsxs)(S,{children:[(0,O.jsxs)(C,{children:[(0,O.jsx)(s,{id:`native-email`,name:`email`,defaultChecked:!0}),(0,O.jsx)(w,{htmlFor:`native-email`,children:`Email updates`})]}),(0,O.jsxs)(C,{children:[(0,O.jsx)(l,{id:`native-daily`,name:`digest`,value:`daily`,defaultChecked:!0}),(0,O.jsx)(w,{htmlFor:`native-daily`,children:`Daily digest`})]}),(0,O.jsxs)(C,{children:[(0,O.jsx)(l,{id:`native-weekly`,name:`digest`,value:`weekly`}),(0,O.jsx)(w,{htmlFor:`native-weekly`,children:`Weekly digest`})]}),(0,O.jsx)(o,{id:`native-reply-to`,name:`reply-to`,type:`email`,placeholder:`Reply-to email`}),(0,O.jsx)(T,{children:`Changes apply to this workspace only.`})]})]})},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <NativeFieldset>
      <NativeLegend>Notification settings</NativeLegend>
      <NativeFieldsetContent>
        <NativeFieldsetRow>
          <NativeCheckbox id="native-email" name="email" defaultChecked />
          <NativeFieldsetLabel htmlFor="native-email">Email updates</NativeFieldsetLabel>
        </NativeFieldsetRow>
        <NativeFieldsetRow>
          <NativeRadio id="native-daily" name="digest" value="daily" defaultChecked />
          <NativeFieldsetLabel htmlFor="native-daily">Daily digest</NativeFieldsetLabel>
        </NativeFieldsetRow>
        <NativeFieldsetRow>
          <NativeRadio id="native-weekly" name="digest" value="weekly" />
          <NativeFieldsetLabel htmlFor="native-weekly">Weekly digest</NativeFieldsetLabel>
        </NativeFieldsetRow>
        <NativeInput id="native-reply-to" name="reply-to" type="email" placeholder="Reply-to email" />
        <NativeFieldsetHint>Changes apply to this workspace only.</NativeFieldsetHint>
      </NativeFieldsetContent>
    </NativeFieldset>
}`,...A.parameters?.docs?.source}}},j=[`Default`]}))();export{A as Default,j as __namedExportsOrder,k as default};
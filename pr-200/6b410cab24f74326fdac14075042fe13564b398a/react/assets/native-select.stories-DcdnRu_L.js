import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{O as n}from"./iframe-CaelJD7u.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{Q as i,n as a,r as o,t as s}from"./utils-C5n3ayfX.js";import{t as c,vt as l}from"./index.es-CbcVOFsO.js";import{t as u}from"./label-BIuij8Xz.js";import{t as d}from"./label-G-MH7fEg.js";var f,p,m,h,g,_=e((()=>{f=`_wrapper_f74fb_1`,p=`_select_f74fb_10`,m=`_icon_f74fb_70`,h=`_option_f74fb_82`,g={wrapper:f,select:p,icon:m,option:h}}));function v({className:e,size:t=`default`,...n}){return(0,x.jsxs)(`div`,{className:s(g.wrapper,e),"data-slot":`native-select-wrapper`,"data-size":t,children:[(0,x.jsx)(`select`,{"data-slot":`native-select`,"data-size":t,className:g.select,...n}),(0,x.jsx)(l,{className:g.icon,"aria-hidden":`true`,"data-slot":`native-select-icon`})]})}function y({className:e,...t}){return(0,x.jsx)(`option`,{"data-slot":`native-select-option`,className:s(g.option,e),...t})}function b({className:e,...t}){return(0,x.jsx)(`optgroup`,{"data-slot":`native-select-optgroup`,className:s(g.option,e),...t})}var x,S=e((()=>{n(),c(),a(),_(),x=r(),v.__docgenInfo={description:``,methods:[],displayName:`NativeSelect`,props:{size:{required:!1,tsType:{name:`NativeSelectSizeName`},description:``,defaultValue:{value:`'default'`,computed:!1}}}},b.__docgenInfo={description:``,methods:[],displayName:`NativeSelectOptGroup`},y.__docgenInfo={description:``,methods:[],displayName:`NativeSelectOption`}})),C,w,T,E,D,O,k,A,j;e((()=>{C=t(n(),1),o(),d(),S(),w=r(),T={title:`Components/NativeSelect`,component:v,parameters:{docs:{description:{component:i.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=21886-14793`}},argTypes:{size:{control:`select`,options:i.props.sizes,description:`Size of the native select.`,table:{defaultValue:{summary:i.defaults.sizes}}},disabled:{control:`boolean`},"aria-label":{control:`text`}},args:{size:i.defaults.sizes,disabled:!1,"aria-label":`Select an option`}},E={render:e=>(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(u,{htmlFor:`default-select`,className:`sr-only`,children:`Select label`}),(0,w.jsxs)(v,{...e,id:`default-select`,children:[(0,w.jsx)(y,{value:`apple`,children:`Apple`}),(0,w.jsx)(y,{value:`banana`,children:`Banana`}),(0,w.jsx)(y,{value:`cherry`,children:`Cherry`})]})]})},D={render:()=>(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(u,{htmlFor:`with-option-groups-select`,className:`sr-only`,children:`With Option Groups select`}),(0,w.jsxs)(v,{"aria-label":`Favorite fruit or vegetable`,id:`with-option-groups-select`,defaultValue:`apple`,children:[(0,w.jsxs)(b,{label:`Fruit`,children:[(0,w.jsx)(y,{value:`apple`,children:`Apple`}),(0,w.jsx)(y,{value:`banana`,children:`Banana`}),(0,w.jsx)(y,{value:`cherry`,children:`Cherry`})]}),(0,w.jsxs)(b,{label:`Vegetable`,children:[(0,w.jsx)(y,{value:`carrot`,children:`Carrot`}),(0,w.jsx)(y,{value:`potato`,children:`Potato`})]})]})]})},O={render:()=>(0,w.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:i.props.sizes.map(e=>(0,w.jsxs)(C.Fragment,{children:[(0,w.jsxs)(u,{htmlFor:`${i.docs.sizes[e]}-select`,className:`sr-only`,children:[i.docs.sizes[e],` select`]}),(0,w.jsxs)(v,{size:e,title:i.docs.sizes[e],id:`${i.docs.sizes[e]}-select`,children:[(0,w.jsx)(y,{value:`apple`,children:`Apple`}),(0,w.jsx)(y,{value:`banana`,children:`Banana`}),(0,w.jsx)(y,{value:`cherry`,children:`Cherry`})]})]},e))})},k={render:()=>(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(u,{htmlFor:`disabled-select`,className:`sr-only`,children:`Disabled select`}),(0,w.jsxs)(v,{id:`disabled-select`,disabled:!0,defaultValue:`apple`,children:[(0,w.jsx)(y,{value:`apple`,children:`Apple`}),(0,w.jsx)(y,{value:`banana`,children:`Banana`})]})]})},A={render:()=>(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(u,{htmlFor:`invalid-select`,className:`sr-only`,children:`Invalid select`}),(0,w.jsxs)(v,{id:`invalid-select`,"aria-invalid":!0,defaultValue:``,children:[(0,w.jsx)(y,{value:``,disabled:!0,children:`Choose an option`}),(0,w.jsx)(y,{value:`apple`,children:`Apple`}),(0,w.jsx)(y,{value:`banana`,children:`Banana`})]})]})},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => <>
      <Label htmlFor="default-select" className="sr-only">
        Select label
      </Label>
      <NativeSelect {...args} id="default-select">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
      </NativeSelect>
    </>
}`,...E.parameters?.docs?.source},description:{story:`The default native select — rendered with the default args; tweak them via the controls.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <Label htmlFor="with-option-groups-select" className="sr-only">
        With Option Groups select
      </Label>
      <NativeSelect aria-label="Favorite fruit or vegetable" id="with-option-groups-select" defaultValue="apple">
        <NativeSelectOptGroup label="Fruit">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Vegetable">
          <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
          <NativeSelectOption value="potato">Potato</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </>
}`,...D.parameters?.docs?.source},description:{story:`Composed usage with grouped options, mirroring a real form field.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      {nativeSelectContract.props.sizes.map(size => <React.Fragment key={size}>
          <Label htmlFor={\`\${nativeSelectContract.docs.sizes[size]}-select\`} className="sr-only">
            {nativeSelectContract.docs.sizes[size]} select
          </Label>
          <NativeSelect size={size} title={nativeSelectContract.docs.sizes[size]} id={\`\${nativeSelectContract.docs.sizes[size]}-select\`}>
            <NativeSelectOption value="apple">Apple</NativeSelectOption>
            <NativeSelectOption value="banana">Banana</NativeSelectOption>
            <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
          </NativeSelect>
        </React.Fragment>)}
    </div>
}`,...O.parameters?.docs?.source},description:{story:`Both sizes side by side.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <Label htmlFor="disabled-select" className="sr-only">
        Disabled select
      </Label>
      <NativeSelect id="disabled-select" disabled defaultValue="apple">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
    </>
}`,...k.parameters?.docs?.source},description:{story:`Disabled state.`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <Label htmlFor="invalid-select" className="sr-only">
        Invalid select
      </Label>
      <NativeSelect id="invalid-select" aria-invalid defaultValue="">
        <NativeSelectOption value="" disabled>
          Choose an option
        </NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
    </>
}`,...A.parameters?.docs?.source},description:{story:"Invalid state, driven by `aria-invalid`.",...A.parameters?.docs?.description}}},j=[`Default`,`WithOptionGroups`,`Sizes`,`Disabled`,`Invalid`]}))();export{E as Default,k as Disabled,A as Invalid,O as Sizes,D as WithOptionGroups,j as __namedExportsOrder,T as default};
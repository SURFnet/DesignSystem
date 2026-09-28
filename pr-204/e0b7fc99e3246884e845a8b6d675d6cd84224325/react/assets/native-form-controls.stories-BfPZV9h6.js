import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{Q as n,it as r,n as i,nt as a,r as o,t as s,ut as c,vt as l}from"./utils-DkbT84Er.js";import{a as u,c as d,d as f,i as p,n as m,s as h,t as g,u as _}from"./native-radio-jGIpSr46.js";function v({className:e,...t}){return(0,y.jsx)(`input`,{type:`range`,"data-slot":`native-range`,className:s(_.range,e),...t})}var y,b=e((()=>{i(),f(),y=t(),v.__docgenInfo={description:``,methods:[],displayName:`NativeRange`}})),x=e((()=>{b()}));function S({className:e,...t}){return(0,C.jsx)(`textarea`,{"data-slot":`native-textarea`,className:s(_.textField,_.textarea,e),...t})}var C,w=e((()=>{i(),f(),C=t(),S.__docgenInfo={description:``,methods:[],displayName:`NativeTextarea`}})),T=e((()=>{w()})),E,D,O,k,A;e((()=>{o(),h(),p(),x(),g(),T(),E=t(),D={title:`Components/NativeFormControls`,parameters:{docs:{description:{component:[c.docs.description,n.docs.description,l.docs.description,r.docs.description,a.docs.description].join(`

`)}}}},O={render:()=>(0,E.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`1rem`,maxWidth:384},children:[(0,E.jsx)(u,{placeholder:`Text`}),(0,E.jsx)(u,{type:`email`,placeholder:`Email`}),(0,E.jsx)(u,{type:`password`,placeholder:`Password`}),(0,E.jsx)(u,{type:`search`,placeholder:`Search`}),(0,E.jsx)(u,{type:`date`}),(0,E.jsx)(u,{type:`time`}),(0,E.jsx)(u,{type:`number`,placeholder:`Number`}),(0,E.jsx)(u,{type:`file`}),(0,E.jsx)(u,{size:`sm`,placeholder:`Small`}),(0,E.jsx)(S,{placeholder:`Message`,rows:3})]})},k={render:()=>(0,E.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`0.75rem`},children:[(0,E.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:`0.5rem`},children:[(0,E.jsx)(d,{defaultChecked:!0}),`Subscribe`]}),(0,E.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:`0.5rem`},children:[(0,E.jsx)(m,{name:`plan`,value:`free`,defaultChecked:!0}),`Free`]}),(0,E.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:`0.5rem`},children:[(0,E.jsx)(m,{name:`plan`,value:`pro`}),`Pro`]}),(0,E.jsx)(v,{defaultValue:40})]})},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: 24 * 16
  }}>
      <NativeInput placeholder="Text" />
      <NativeInput type="email" placeholder="Email" />
      <NativeInput type="password" placeholder="Password" />
      <NativeInput type="search" placeholder="Search" />
      <NativeInput type="date" />
      <NativeInput type="time" />
      <NativeInput type="number" placeholder="Number" />
      <NativeInput type="file" />
      <NativeInput size="sm" placeholder="Small" />
      <NativeTextarea placeholder="Message" rows={3} />
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  }}>
      <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
        <NativeCheckbox defaultChecked />
        Subscribe
      </label>
      <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
        <NativeRadio name="plan" value="free" defaultChecked />
        Free
      </label>
      <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
        <NativeRadio name="plan" value="pro" />
        Pro
      </label>
      <NativeRange defaultValue={40} />
    </div>
}`,...k.parameters?.docs?.source}}},A=[`TextFields`,`ChoiceControls`]}))();export{k as ChoiceControls,O as TextFields,A as __namedExportsOrder,D as default};
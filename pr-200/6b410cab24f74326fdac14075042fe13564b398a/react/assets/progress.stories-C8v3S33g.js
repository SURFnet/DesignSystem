import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{H as n,n as r,r as i,t as a}from"./utils-C5n3ayfX.js";import{c as o,i as s,n as c,o as l,t as u,u as d}from"./progress-TVgo2OYe.js";var f,p,m,h,g,_,v=e((()=>{f=`_root_b7cur_1`,p=`_track_b7cur_7`,m=`_indicator_b7cur_18`,h=`_label_b7cur_24`,g=`_value_b7cur_29`,_={root:f,track:p,indicator:m,label:h,value:g}}));function y({className:e,children:t,value:n,...r}){return(0,w.jsxs)(d,{value:n,role:`progressbar`,"data-slot":`progress`,className:a(_.root,e),...r,children:[t,(0,w.jsx)(b,{children:(0,w.jsx)(x,{})})]})}function b({className:e,...t}){return(0,w.jsx)(o,{className:a(_.track,e),"data-slot":`progress-track`,...t})}function x({className:e,...t}){return(0,w.jsx)(l,{"data-slot":`progress-indicator`,className:a(_.indicator,e),...t})}function S({className:e,...t}){return(0,w.jsx)(c,{className:a(_.label,e),"data-slot":`progress-label`,...t})}function C({className:e,...t}){return(0,w.jsx)(s,{className:a(_.value,e),"data-slot":`progress-value`,...t})}var w,T=e((()=>{u(),r(),v(),w=t(),y.__docgenInfo={description:``,methods:[],displayName:`Progress`},b.__docgenInfo={description:``,methods:[],displayName:`ProgressTrack`},x.__docgenInfo={description:``,methods:[],displayName:`ProgressIndicator`},S.__docgenInfo={description:``,methods:[],displayName:`ProgressLabel`},C.__docgenInfo={description:``,methods:[],displayName:`ProgressValue`}})),E,D,O,k,A,j,M;e((()=>{i(),T(),E=t(),D={title:`Components/Progress`,component:y,parameters:{docs:{description:{component:n.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=65-441`}},argTypes:{label:{control:`text`,description:"Accessible name for the progress bar. Use `aria-label` when the name is not shown visually, or visible text linked with `aria-labelledby`."},value:{control:{type:`range`,min:0,max:100,step:1},description:"The current value, from `0` to `max`. `null` renders an indeterminate progress bar."}},args:{value:50,label:`Progress`}},O={render:({label:e,...t})=>(0,E.jsx)(y,{...t,"aria-label":e,className:`w-72`})},k={args:{label:`Uploading file…`},render:({label:e,...t})=>(0,E.jsx)(y,{...t,"aria-labelledby":`upload-label`,className:`w-72`,children:(0,E.jsxs)(`div`,{className:`flex justify-between text-sm`,children:[(0,E.jsx)(`span`,{id:`upload-label`,children:e}),(0,E.jsx)(C,{})]})})},A={args:{value:null,label:`Loading…`},render:({label:e,...t})=>(0,E.jsx)(y,{...t,"aria-label":e,className:`w-72`})},j={args:{label:`Task`},render:({label:e})=>(0,E.jsx)(`div`,{className:`flex w-72 flex-col gap-4`,children:[10,40,75,100].map(t=>(0,E.jsx)(y,{value:t,"aria-labelledby":`task-${t}-label`,children:(0,E.jsxs)(`div`,{className:`flex justify-between text-sm`,children:[(0,E.jsxs)(`span`,{id:`task-${t}-label`,children:[e,` `,t]}),(0,E.jsx)(C,{})]})},t))})},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: ({
    label,
    ...args
  }) => <Progress {...args} aria-label={label} className="w-72" />
}`,...O.parameters?.docs?.source},description:{story:"The default progress bar — tweak `value` via the controls.",...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Uploading file…'
  },
  render: ({
    label,
    ...args
  }) => <Progress {...args} aria-labelledby="upload-label" className="w-72">
      <div className="flex justify-between text-sm">
        <span id="upload-label">{label}</span>
        <ProgressValue />
      </div>
    </Progress>
}`,...k.parameters?.docs?.source},description:{story:"A labelled progress bar — a visible label linked with `aria-labelledby`.",...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    value: null,
    label: 'Loading…'
  },
  render: ({
    label,
    ...args
  }) => <Progress {...args} aria-label={label} className="w-72" />
}`,...A.parameters?.docs?.source},description:{story:"Indeterminate state — `value` is `null` while the task's completion is unknown.",...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Task'
  },
  render: ({
    label
  }) => <div className="flex w-72 flex-col gap-4">
      {[10, 40, 75, 100].map(value => <Progress key={value} value={value} aria-labelledby={\`task-\${value}-label\`}>
          <div className="flex justify-between text-sm">
            <span id={\`task-\${value}-label\`}>
              {label} {value}
            </span>
            <ProgressValue />
          </div>
        </Progress>)}
    </div>
}`,...j.parameters?.docs?.source},description:{story:`Several tasks at different points of completion, each labelled with its percentage.`,...j.parameters?.docs?.description}}},M=[`Default`,`WithLabel`,`Indeterminate`,`Values`]}))();export{O as Default,A as Indeterminate,j as Values,k as WithLabel,M as __namedExportsOrder,D as default};
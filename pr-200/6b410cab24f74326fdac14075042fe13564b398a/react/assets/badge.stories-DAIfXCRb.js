import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{n,r,sn as i,t as a}from"./utils-C5n3ayfX.js";import{o,r as s}from"./useRenderElement-DXYQSaW_.js";import{lt as c,t as l}from"./index.es-CbcVOFsO.js";import{r as u,t as d}from"./use-render-Buh8asWE.js";var f,p,m,h,g,_,v,y,b,x,S,C=e((()=>{f=`_badge_7bftj_1`,p=`_variantDefault_7bftj_49`,m=`_variantSecondary_7bftj_60`,h=`_variantInfo_7bftj_71`,g=`_variantSuccess_7bftj_92`,_=`_variantWarning_7bftj_113`,v=`_variantDanger_7bftj_134`,y=`_variantOutline_7bftj_155`,b=`_variantGhost_7bftj_167`,x=`_variantLink_7bftj_184`,S={badge:f,variantDefault:p,variantSecondary:m,variantInfo:h,variantSuccess:g,variantWarning:_,variantDanger:v,variantOutline:y,variantGhost:b,variantLink:x}}));function w({variant:e=`default`,className:t}={}){return a(E.badge,D[e],t)}function T({className:e,variant:t=`default`,render:n,...r}){return u({defaultTagName:`span`,props:o({className:w({variant:t,className:e})},r),render:n,state:{slot:`badge`,variant:t}})}var E,D,O=e((()=>{s(),d(),n(),C(),E=S,D={default:E.variantDefault,secondary:E.variantSecondary,info:E.variantInfo,success:E.variantSuccess,warning:E.variantWarning,danger:E.variantDanger,outline:E.variantOutline,ghost:E.variantGhost,link:E.variantLink}})),k,A,j,M,N,P,F,I,L;e((()=>{l(),r(),O(),k=t(),A={title:`Components/Badge`,component:T,parameters:{docs:{description:{component:i.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=300-1086&t=vT3gKkMDSpQaeqci-4`}},argTypes:{variant:{control:`select`,options:i.props.variants,description:`Visual style of the badge.`,table:{defaultValue:{summary:i.defaults.variants}}}},args:{children:`Badge`,variant:i.defaults.variants}},j={},M={render:()=>(0,k.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:i.props.variants.map(e=>(0,k.jsx)(T,{variant:e,title:i.docs.variants[e],children:e.charAt(0).toUpperCase()+e.slice(1)},e))})},N={render:()=>(0,k.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:(0,k.jsxs)(T,{variant:`secondary`,children:[(0,k.jsx)(c,{"data-icon":`inline-start`}),`Verified`]})})},P={render:()=>(0,k.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,k.jsx)(T,{className:`h-5 min-w-5 rounded-full px-1 font-mono tabular-nums`,children:`8`}),(0,k.jsx)(T,{variant:`danger`,className:`h-5 min-w-5 rounded-full px-1 font-mono tabular-nums`,children:`99`}),(0,k.jsx)(T,{variant:`outline`,className:`h-5 min-w-5 rounded-full px-1 font-mono tabular-nums`,children:`20+`})]})},F={render:()=>(0,k.jsx)(T,{variant:`link`,render:(0,k.jsx)(`a`,{href:`https://www.surf.nl`}),children:`Visit SURF`})},I={render:()=>(0,k.jsxs)(`ul`,{className:`flex w-80 flex-col gap-2 text-sm`,children:[(0,k.jsxs)(`li`,{className:`flex items-center justify-between rounded-md border border-border px-3 py-2`,children:[(0,k.jsx)(`span`,{children:`Deploy to production`}),(0,k.jsx)(T,{variant:`default`,children:`Live`})]}),(0,k.jsxs)(`li`,{className:`flex items-center justify-between rounded-md border border-border px-3 py-2`,children:[(0,k.jsx)(`span`,{children:`Migrate database schema`}),(0,k.jsx)(T,{variant:`secondary`,children:`In progress`})]}),(0,k.jsxs)(`li`,{className:`flex items-center justify-between rounded-md border border-border px-3 py-2`,children:[(0,k.jsx)(`span`,{children:`Rotate API credentials`}),(0,k.jsx)(T,{variant:`danger`,children:`Overdue`})]}),(0,k.jsxs)(`li`,{className:`flex items-center justify-between rounded-md border border-border px-3 py-2`,children:[(0,k.jsx)(`span`,{children:`Archive old backups`}),(0,k.jsx)(T,{variant:`outline`,children:`Scheduled`})]})]})},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{}`,...j.parameters?.docs?.source},description:{story:`The default badge — rendered with the default args; tweak them via the controls.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      {badgeContract.props.variants.map(variant => <Badge key={variant} variant={variant} title={badgeContract.docs.variants[variant]}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>)}
    </div>
}`,...M.parameters?.docs?.source},description:{story:`Every visual variant side by side.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Badge variant="secondary">
        <CheckIcon data-icon="inline-start" />
        Verified
      </Badge>
    </div>
}`,...N.parameters?.docs?.source},description:{story:'Icons alongside text. Tag the icon with `data-icon="inline-start"` or\n`data-icon="inline-end"` so the badge tightens the padding on that side.',...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
      <Badge variant="danger" className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
        99
      </Badge>
      <Badge variant="outline" className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
        20+
      </Badge>
    </div>
}`,...P.parameters?.docs?.source},description:{story:`Numeric counts, sized to stay circular at one or two digits.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <Badge variant="link" render={<a href="https://www.surf.nl" />}>
      Visit SURF
    </Badge>
}`,...F.parameters?.docs?.source},description:{story:"Base UI's polymorphic `render` prop swaps the underlying element while keeping\nthe badge styling — here the badge renders as an anchor.",...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <ul className="flex w-80 flex-col gap-2 text-sm">
      <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
        <span>Deploy to production</span>
        <Badge variant="default">Live</Badge>
      </li>
      <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
        <span>Migrate database schema</span>
        <Badge variant="secondary">In progress</Badge>
      </li>
      <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
        <span>Rotate API credentials</span>
        <Badge variant="danger">Overdue</Badge>
      </li>
      <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
        <span>Archive old backups</span>
        <Badge variant="outline">Scheduled</Badge>
      </li>
    </ul>
}`,...I.parameters?.docs?.source},description:{story:`Realistic composed usage: status labels attached to a list of items.`,...I.parameters?.docs?.description}}},L=[`Default`,`Variants`,`WithIcon`,`Counts`,`AsLink`,`StatusList`]}))();export{F as AsLink,P as Counts,j as Default,I as StatusList,M as Variants,N as WithIcon,L as __namedExportsOrder,A as default};
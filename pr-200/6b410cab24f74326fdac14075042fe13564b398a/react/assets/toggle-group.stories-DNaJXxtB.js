import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{O as n}from"./iframe-CaelJD7u.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{l as i,n as a,r as o,s,t as c}from"./utils-C5n3ayfX.js";import{D as l,S as u,T as d,_ as f,t as p,v as m,x as h}from"./index.es-CbcVOFsO.js";import{n as g,t as _}from"./toggle-DIQhKErA.js";import{n as v,t as y}from"./toggle-group-DIj3bC8B.js";import{n as b,r as x}from"./toggle-DPnTnRdh.js";var S=e((()=>{b()})),C,w,T,E=e((()=>{C=`_group_1ndfy_1`,w=`_item_1ndfy_20`,T={group:C,item:w}}));function D({className:e,variant:t,size:n,spacing:r=2,orientation:i=`horizontal`,children:a,...o}){return(0,A.jsx)(v,{"data-slot":`toggle-group`,"data-variant":t,"data-size":n,"data-spacing":r,"data-orientation":i,"aria-orientation":void 0,style:{"--gap":r},className:c(T.group,e),...o,children:(0,A.jsx)(j.Provider,{value:{variant:t,size:n,spacing:r,orientation:i},children:a})})}function O({className:e,children:t,variant:n=`default`,size:r=`default`,...i}){let a=k.useContext(j);return(0,A.jsx)(g,{"data-slot":`toggle-group-item`,"data-variant":a.variant||n,"data-size":a.size||r,"data-spacing":a.spacing,className:c(T.item,x({variant:a.variant||n,size:a.size||r}),e),...i,children:t})}var k,A,j,M=e((()=>{k=t(n(),1),_(),y(),a(),S(),E(),A=r(),j=k.createContext({size:`default`,variant:`default`,spacing:2,orientation:`horizontal`}),D.__docgenInfo={description:``,methods:[],displayName:`ToggleGroup`,props:{spacing:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`2`,computed:!1}},orientation:{required:!1,tsType:{name:`ToggleGroupOrientationName`},description:``,defaultValue:{value:`'horizontal'`,computed:!1}}}},O.__docgenInfo={description:``,methods:[],displayName:`ToggleGroupItem`,props:{variant:{defaultValue:{value:`'default'`,computed:!1},required:!1},size:{defaultValue:{value:`'default'`,computed:!1},required:!1}}}}));function N(){let[e,t]=(0,F.useState)([`bold`]);return(0,I.jsxs)(D,{variant:`outline`,multiple:!0,value:e,onValueChange:t,children:[(0,I.jsx)(O,{value:`bold`,"aria-label":`Toggle bold`,children:(0,I.jsx)(h,{})}),(0,I.jsx)(O,{value:`italic`,"aria-label":`Toggle italic`,children:(0,I.jsx)(m,{})}),(0,I.jsx)(O,{value:`underline`,"aria-label":`Toggle underline`,children:(0,I.jsx)(f,{})})]})}function P(){let[e,t]=(0,F.useState)([`left`]);return(0,I.jsxs)(D,{value:e,onValueChange:t,children:[(0,I.jsx)(O,{value:`left`,"aria-label":`Align left`,children:(0,I.jsx)(d,{})}),(0,I.jsx)(O,{value:`center`,"aria-label":`Align center`,children:(0,I.jsx)(l,{})}),(0,I.jsx)(O,{value:`right`,"aria-label":`Align right`,children:(0,I.jsx)(u,{})})]})}var F,I,L,R,z,B,V,H,U,W,G;e((()=>{F=t(n(),1),p(),o(),M(),I=r(),L={title:`Components/ToggleGroup`,component:D,parameters:{docs:{description:{component:s.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=123-75`}},argTypes:{variant:{control:`select`,options:i.props.variants,description:i.props.variants.map(e=>`\`${e}\` — ${i.docs.variants[e]}`).join(`

`),table:{defaultValue:{summary:i.defaults.variants}}},size:{control:`select`,options:i.props.sizes,description:i.props.sizes.map(e=>`\`${e}\` — ${i.docs.sizes[e]}`).join(`

`),table:{defaultValue:{summary:i.defaults.sizes}}},orientation:{control:`inline-radio`,options:[`horizontal`,`vertical`],description:`Lays items out in a row, or stacks them in a column.`,table:{defaultValue:{summary:`horizontal`}}},multiple:{control:`boolean`,description:`Allows more than one item to be pressed at once.`,table:{defaultValue:{summary:`false`}}},disabled:{control:`boolean`}},args:{variant:i.defaults.variants,size:i.defaults.sizes,orientation:`horizontal`,multiple:!1,disabled:!1}},R={render:e=>(0,I.jsxs)(D,{...e,defaultValue:[`bold`],children:[(0,I.jsx)(O,{value:`bold`,"aria-label":`Toggle bold`,children:(0,I.jsx)(h,{})}),(0,I.jsx)(O,{value:`italic`,"aria-label":`Toggle italic`,children:(0,I.jsx)(m,{})}),(0,I.jsx)(O,{value:`underline`,"aria-label":`Toggle underline`,children:(0,I.jsx)(f,{})})]})},z={render:()=>(0,I.jsx)(`div`,{className:`flex flex-col gap-4`,children:i.props.variants.map(e=>(0,I.jsxs)(D,{variant:e,defaultValue:[`bold`],children:[(0,I.jsx)(O,{value:`bold`,"aria-label":`Toggle bold`,children:(0,I.jsx)(h,{})}),(0,I.jsx)(O,{value:`italic`,"aria-label":`Toggle italic`,children:(0,I.jsx)(m,{})}),(0,I.jsx)(O,{value:`underline`,"aria-label":`Toggle underline`,children:(0,I.jsx)(f,{})})]},e))})},B={render:()=>(0,I.jsx)(`div`,{className:`flex flex-col items-start gap-4`,children:i.props.sizes.map(e=>(0,I.jsxs)(D,{size:e,defaultValue:[`bold`],children:[(0,I.jsx)(O,{value:`bold`,"aria-label":`Toggle bold`,children:(0,I.jsx)(h,{})}),(0,I.jsx)(O,{value:`italic`,"aria-label":`Toggle italic`,children:(0,I.jsx)(m,{})}),(0,I.jsx)(O,{value:`underline`,"aria-label":`Toggle underline`,children:(0,I.jsx)(f,{})})]},e))})},V={render:()=>(0,I.jsxs)(D,{orientation:`vertical`,defaultValue:[`bold`],children:[(0,I.jsx)(O,{value:`bold`,"aria-label":`Toggle bold`,children:(0,I.jsx)(h,{})}),(0,I.jsx)(O,{value:`italic`,"aria-label":`Toggle italic`,children:(0,I.jsx)(m,{})}),(0,I.jsx)(O,{value:`underline`,"aria-label":`Toggle underline`,children:(0,I.jsx)(f,{})})]})},H={render:()=>(0,I.jsx)(N,{})},U={render:()=>(0,I.jsx)(P,{})},W={render:()=>(0,I.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,I.jsxs)(D,{defaultValue:[`bold`],disabled:!0,children:[(0,I.jsx)(O,{value:`bold`,"aria-label":`Toggle bold`,children:(0,I.jsx)(h,{})}),(0,I.jsx)(O,{value:`italic`,"aria-label":`Toggle italic`,children:(0,I.jsx)(m,{})}),(0,I.jsx)(O,{value:`underline`,"aria-label":`Toggle underline`,children:(0,I.jsx)(f,{})})]}),(0,I.jsxs)(D,{defaultValue:[`bold`],children:[(0,I.jsx)(O,{value:`bold`,"aria-label":`Toggle bold`,children:(0,I.jsx)(h,{})}),(0,I.jsx)(O,{value:`italic`,"aria-label":`Toggle italic`,disabled:!0,children:(0,I.jsx)(m,{})}),(0,I.jsx)(O,{value:`underline`,"aria-label":`Toggle underline`,children:(0,I.jsx)(f,{})})]})]})},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => <ToggleGroup {...args} defaultValue={['bold']}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextBIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <TextUnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
}`,...R.parameters?.docs?.source},description:{story:`The default toggle group — rendered with the default args; tweak them via the controls.`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      {toggleContract.props.variants.map(variant => <ToggleGroup key={variant} variant={variant} defaultValue={['bold']}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <TextBIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <TextItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <TextUnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>)}
    </div>
}`,...z.parameters?.docs?.source},description:{story:"Every visual variant, borrowed from `Toggle`, side by side.",...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col items-start gap-4">
      {toggleContract.props.sizes.map(size => <ToggleGroup key={size} size={size} defaultValue={['bold']}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <TextBIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <TextItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <TextUnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>)}
    </div>
}`,...B.parameters?.docs?.source},description:{story:"Every size, borrowed from `Toggle`, side by side.",...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <ToggleGroup orientation="vertical" defaultValue={['bold']}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextBIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <TextUnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
}`,...V.parameters?.docs?.source},description:{story:`Items stacked in a column instead of a row.`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <TextFormattingExample />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <TextAlignmentExample />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <ToggleGroup defaultValue={['bold']} disabled>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <TextBIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <TextItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <TextUnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={['bold']}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <TextBIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic" disabled>
          <TextItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <TextUnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
}`,...W.parameters?.docs?.source},description:{story:`Disabling the whole group versus disabling a single item within it.`,...W.parameters?.docs?.description}}},G=[`Default`,`Variants`,`Sizes`,`Vertical`,`TextFormatting`,`TextAlignment`,`Disabled`]}))();export{R as Default,W as Disabled,B as Sizes,U as TextAlignment,H as TextFormatting,z as Variants,V as Vertical,G as __namedExportsOrder,L as default};
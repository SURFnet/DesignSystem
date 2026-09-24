import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{_n as n,n as r,r as i,t as a}from"./utils-C5n3ayfX.js";import{c as o,i as s,n as c,o as l,t as u,u as d}from"./accordion-BM8nEmb8.js";import{pt as f,t as p,vt as m}from"./index.es-CbcVOFsO.js";var h,g,_,v,y,b,x,S,C,w,T=e((()=>{h=`_root_1p40f_1`,g=`_item_1p40f_7`,_=`_header_1p40f_11`,v=`_trigger_1p40f_15`,y=`_triggerIcon_1p40f_45`,b=`_iconCollapsed_1p40f_54`,x=`_iconExpanded_1p40f_58`,S=`_panel_1p40f_70`,C=`_panelInner_1p40f_75`,w={root:h,item:g,header:_,trigger:v,triggerIcon:y,iconCollapsed:b,iconExpanded:x,panel:S,panelInner:C}}));function E({className:e,...t}){return(0,A.jsx)(d,{"data-slot":`accordion`,className:a(w.root,e),...t})}function D({className:e,...t}){return(0,A.jsx)(o,{"data-slot":`accordion-item`,className:a(w.item,e),...t})}function O({className:e,children:t,...n}){return(0,A.jsx)(l,{className:w.header,children:(0,A.jsxs)(s,{"data-slot":`accordion-trigger`,className:a(w.trigger,e),...n,children:[t,(0,A.jsx)(m,{"data-slot":`accordion-trigger-icon`,className:a(w.triggerIcon,w.iconCollapsed)}),(0,A.jsx)(f,{"data-slot":`accordion-trigger-icon`,className:a(w.triggerIcon,w.iconExpanded)})]})})}function k({className:e,children:t,...n}){return(0,A.jsx)(c,{"data-slot":`accordion-content`,className:w.panel,...n,children:(0,A.jsx)(`div`,{className:a(w.panelInner,e),children:t})})}var A,j=e((()=>{u(),r(),p(),T(),A=t(),E.__docgenInfo={description:``,methods:[],displayName:`Accordion`},D.__docgenInfo={description:``,methods:[],displayName:`AccordionItem`},O.__docgenInfo={description:``,methods:[],displayName:`AccordionTrigger`},k.__docgenInfo={description:``,methods:[],displayName:`AccordionContent`}})),M,N,P,F,I,L,R;e((()=>{i(),j(),M=t(),N={title:`Components/Accordion`,component:E,parameters:{docs:{description:{component:n.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=1-434&p=f&t=vT3gKkMDSpQaeqci-0`}},argTypes:{multiple:{control:`boolean`,description:`Whether multiple items can be expanded at the same time.`,table:{defaultValue:{summary:`false`}}},orientation:{control:!1,table:{disable:!0}},disabled:{control:`boolean`,description:`Whether the whole accordion should ignore user interaction.`,table:{defaultValue:{summary:`false`}}}},args:{multiple:!1,disabled:!1}},P=[{value:`item-1`,question:`Is it accessible?`,answer:`Yes. It adheres to the WAI-ARIA accordion design pattern.`},{value:`item-2`,question:`Is it styled?`,answer:`Yes. It comes with default styles that match the rest of the design system.`},{value:`item-3`,question:`Is it animated?`,answer:`Yes. It's animated by default, but you can disable it if you prefer.`}],F={render:e=>(0,M.jsx)(E,{...e,defaultValue:[`item-1`],className:`w-96`,children:P.map(({value:e,question:t,answer:n})=>(0,M.jsxs)(D,{value:e,children:[(0,M.jsx)(O,{children:t}),(0,M.jsx)(k,{children:n})]},e))})},I={render:()=>(0,M.jsx)(E,{multiple:!0,defaultValue:[`item-1`,`item-2`],className:`w-96`,children:P.map(({value:e,question:t,answer:n})=>(0,M.jsxs)(D,{value:e,children:[(0,M.jsx)(O,{children:t}),(0,M.jsx)(k,{children:n})]},e))})},L={render:()=>(0,M.jsxs)(E,{defaultValue:[`item-1`],className:`w-96`,children:[(0,M.jsxs)(D,{value:`item-1`,children:[(0,M.jsx)(O,{children:`Is it accessible?`}),(0,M.jsx)(k,{children:`Yes. It adheres to the WAI-ARIA accordion design pattern.`})]}),(0,M.jsxs)(D,{value:`item-2`,disabled:!0,children:[(0,M.jsx)(O,{children:`Disabled item`}),(0,M.jsx)(k,{children:`This content is unreachable while the item is disabled.`})]})]})},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => <Accordion {...args} defaultValue={['item-1']} className="w-96">
      {faqItems.map(({
      value,
      question,
      answer
    }) => <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>)}
    </Accordion>
}`,...F.parameters?.docs?.source},description:{story:"The default accordion — tweak `multiple` and `disabled` via the controls.",...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Accordion multiple defaultValue={['item-1', 'item-2']} className="w-96">
      {faqItems.map(({
      value,
      question,
      answer
    }) => <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>)}
    </Accordion>
}`,...I.parameters?.docs?.source},description:{story:"With `multiple`, several items can stay expanded at the same time.",...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <Accordion defaultValue={['item-1']} className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA accordion design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled item</AccordionTrigger>
        <AccordionContent>This content is unreachable while the item is disabled.</AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...L.parameters?.docs?.source},description:{story:`A single item can be disabled independently of the rest of the accordion.`,...L.parameters?.docs?.description}}},R=[`Default`,`Multiple`,`DisabledItem`]}))();export{F as Default,L as DisabledItem,I as Multiple,R as __namedExportsOrder,N as default};
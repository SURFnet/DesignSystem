import{i as e}from"./preload-helper-xPQekRTU.js";import{O as t}from"./iframe-CbBuQ8p6.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";import{n as r,r as i,rn as a,t as o}from"./utils-C5n3ayfX.js";import{o as s,r as c}from"./useRenderElement-BYddqi09.js";import{mt as l,t as u,tt as d}from"./index.es-SHpUsVh6.js";import{r as f,t as p}from"./use-render-CnlJCyna.js";var m,h,g,_,v,y,b,x,S=e((()=>{m=`_list_5nsmc_1`,h=`_item_5nsmc_18`,g=`_link_5nsmc_24`,_=`_page_5nsmc_32`,v=`_separator_5nsmc_37`,y=`_ellipsis_5nsmc_42`,b=`_srOnly_5nsmc_55`,x={list:m,item:h,link:g,page:_,separator:v,ellipsis:y,srOnly:b}}));function C({className:e,...t}){return(0,A.jsx)(`nav`,{"aria-label":`You are here: `,"data-slot":`breadcrumb`,className:o(e),...t})}function w({className:e,...t}){return(0,A.jsx)(`ol`,{"data-slot":`breadcrumb-list`,className:o(x.list,e),...t})}function T({className:e,...t}){return(0,A.jsx)(`li`,{"data-slot":`breadcrumb-item`,className:o(x.item,e),...t})}function E({className:e,render:t,...n}){return f({defaultTagName:`a`,props:s({className:o(x.link,e)},n),render:t,state:{slot:`breadcrumb-link`}})}function D({className:e,...t}){return(0,A.jsx)(`span`,{"data-slot":`breadcrumb-page`,role:`link`,"aria-disabled":`true`,"aria-current":`page`,className:o(x.page,e),...t})}function O({children:e,className:t,...n}){return(0,A.jsx)(`li`,{"data-slot":`breadcrumb-separator`,role:`presentation`,"aria-hidden":`true`,className:o(x.separator,t),...n,children:e??(0,A.jsx)(l,{})})}function k({className:e,...t}){return(0,A.jsxs)(`span`,{"data-slot":`breadcrumb-ellipsis`,"aria-hidden":`true`,className:o(x.ellipsis,e),...t,children:[(0,A.jsx)(d,{}),(0,A.jsx)(`span`,{className:x.srOnly,children:`More`})]})}var A,j=e((()=>{t(),c(),p(),u(),r(),S(),A=n(),C.__docgenInfo={description:``,methods:[],displayName:`Breadcrumb`},w.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbList`},T.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbItem`},D.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbPage`},O.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbSeparator`},k.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbEllipsis`}})),M,N,P,F,I;e((()=>{i(),j(),M=n(),N={title:`Components/Breadcrumb`,component:C,parameters:{docs:{description:{component:a.docs.description}}}},P={render:()=>(0,M.jsx)(C,{children:(0,M.jsxs)(w,{children:[(0,M.jsx)(T,{children:(0,M.jsx)(E,{href:`#`,children:`Home`})}),(0,M.jsx)(O,{}),(0,M.jsx)(T,{children:(0,M.jsx)(E,{href:`#`,children:`Apps`})}),(0,M.jsx)(O,{}),(0,M.jsx)(T,{children:(0,M.jsx)(D,{children:`App catalog`})})]})})},F={render:()=>(0,M.jsx)(C,{children:(0,M.jsxs)(w,{children:[(0,M.jsx)(T,{children:(0,M.jsx)(E,{href:`#`,children:`Home`})}),(0,M.jsx)(O,{}),(0,M.jsx)(T,{children:(0,M.jsx)(k,{})}),(0,M.jsx)(O,{}),(0,M.jsx)(T,{children:(0,M.jsx)(D,{children:`App catalog`})})]})})},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Apps</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>App catalog</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...P.parameters?.docs?.source},description:{story:`A typical trail ending on the current page.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>App catalog</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...F.parameters?.docs?.source},description:{story:`A long trail collapsed with an ellipsis.`,...F.parameters?.docs?.description}}},I=[`Default`,`WithEllipsis`]}))();export{P as Default,F as WithEllipsis,I as __namedExportsOrder,N as default};
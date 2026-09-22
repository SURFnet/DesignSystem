import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{O as n}from"./iframe-CbBuQ8p6.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{K as i,n as a,r as o,t as s}from"./utils-C5n3ayfX.js";import{_t as c,mt as l,t as u,tt as d}from"./index.es-SHpUsVh6.js";import{t as f}from"./button-C7hzrQPx.js";import{t as p}from"./button-C6o-rz-l.js";import{c as m,i as ee,n as h,o as g,r as _,s as v,t as te}from"./select-Bx-UQoL_.js";var y=e((()=>{m()})),b,x,S,C,w,T,E,D,O,ne=e((()=>{b=`_root_luq3c_1`,x=`_content_luq3c_8`,S=`_linkPaddingStart_luq3c_14`,C=`_linkPaddingEnd_luq3c_18`,w=`_ellipsis_luq3c_22`,T=`_srOnly_luq3c_35`,E=`_hideSm_luq3c_47`,D=`_rtlFlip_luq3c_57`,O={root:b,content:x,linkPaddingStart:S,linkPaddingEnd:C,ellipsis:w,srOnly:T,hideSm:E,rtlFlip:D}}));function k({className:e,...t}){return(0,I.jsx)(`nav`,{role:`navigation`,"aria-label":`pagination`,"data-slot":`pagination`,className:s(O.root,e),...t})}function A({className:e,...t}){return(0,I.jsx)(`ul`,{"data-slot":`pagination-content`,className:s(O.content,e),...t})}function j({...e}){return(0,I.jsx)(`li`,{"data-slot":`pagination-item`,...e})}function M({className:e,isActive:t,size:n=`icon`,...r}){return(0,I.jsx)(f,{variant:t?`outline`:`ghost`,size:n,className:s(e),nativeButton:!1,render:(0,I.jsx)(`a`,{"aria-current":t?`page`:void 0,"data-slot":`pagination-link`,"data-active":t,...r})})}function N({className:e,text:t=`Previous`,iconOnly:n=!1,"aria-label":r=`Go to previous page`,...i}){return(0,I.jsxs)(M,{"aria-label":r,size:n?`icon`:`default`,className:s(!n&&O.linkPaddingStart,e),...i,children:[(0,I.jsx)(c,{"data-icon":`inline-start`,className:O.rtlFlip}),(0,I.jsx)(`span`,{className:n?O.srOnly:O.hideSm,children:t})]})}function P({className:e,text:t=`Next`,iconOnly:n=!1,"aria-label":r=`Go to next page`,...i}){return(0,I.jsxs)(M,{"aria-label":r,size:n?`icon`:`default`,className:s(!n&&O.linkPaddingEnd,e),...i,children:[(0,I.jsx)(`span`,{className:n?O.srOnly:O.hideSm,children:t}),(0,I.jsx)(l,{"data-icon":`inline-end`,className:O.rtlFlip})]})}function F({className:e,srOnlyText:t=`More pages`,...n}){return(0,I.jsxs)(`span`,{"data-slot":`pagination-ellipsis`,className:s(O.ellipsis,e),...n,children:[(0,I.jsx)(d,{"aria-hidden":!0}),(0,I.jsx)(`span`,{className:O.srOnly,children:t})]})}var I,L=e((()=>{n(),u(),a(),p(),ne(),I=r(),k.__docgenInfo={description:``,methods:[],displayName:`Pagination`},A.__docgenInfo={description:``,methods:[],displayName:`PaginationContent`},F.__docgenInfo={description:``,methods:[],displayName:`PaginationEllipsis`,props:{srOnlyText:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'More pages'`,computed:!1}}}},j.__docgenInfo={description:``,methods:[],displayName:`PaginationItem`},M.__docgenInfo={description:``,methods:[],displayName:`PaginationLink`,props:{isActive:{required:!1,tsType:{name:`boolean`},description:``},size:{defaultValue:{value:`'icon'`,computed:!1},required:!1}}},P.__docgenInfo={description:``,methods:[],displayName:`PaginationNext`,props:{text:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Next'`,computed:!1}},iconOnly:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},"aria-label":{defaultValue:{value:`'Go to next page'`,computed:!1},required:!1}}},N.__docgenInfo={description:``,methods:[],displayName:`PaginationPrevious`,props:{text:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Previous'`,computed:!1}},iconOnly:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},"aria-label":{defaultValue:{value:`'Go to previous page'`,computed:!1},required:!1}}}})),R,z,B,V,H,re=e((()=>{R=`_root_75mym_1`,z=`_meta_75mym_9`,B=`_controls_75mym_18`,V=`_pageSize_75mym_24`,H={root:R,meta:z,controls:B,pageSize:V}}));function U({currentPage:e,onCurrentPageChange:t,itemsPerPage:n,onItemsPerPageChange:r,totalItems:i,maxSize:a=7,showEdges:o=!0,pageSizes:c=[10,20,50,100],className:l,...u}){let d=i<1?1:Math.ceil(i/n),f=ie(i,n,e);W.useEffect(()=>{f!==e&&t(f)},[f,e,t]);let p=ae(f,n,i,a),m=c.includes(n)?c:[...c,n].sort((e,t)=>e-t),y=f===1,b=f===d;return(0,G.jsxs)(`div`,{"data-slot":`numbered-pagination`,className:s(H.root,l),...u,children:[(0,G.jsxs)(`div`,{className:H.meta,children:[(0,G.jsx)(`b`,{children:i}),`total items |`,(0,G.jsx)(`b`,{children:d}),`pages`]}),(0,G.jsx)(k,{children:(0,G.jsxs)(A,{children:[o&&!y?(0,G.jsx)(j,{children:(0,G.jsx)(N,{href:`#`,onClick:e=>{e.preventDefault(),t(f-1)}})}):null,p.map((e,n)=>(0,G.jsx)(j,{children:e===`...`?(0,G.jsx)(F,{}):(0,G.jsx)(M,{href:`#`,isActive:f===e,onClick:n=>{n.preventDefault(),t(e)},children:e})},e===`...`?`ellipsis-${n}`:e)),o&&!b?(0,G.jsx)(j,{children:(0,G.jsx)(P,{href:`#`,onClick:e=>{e.preventDefault(),t(f+1)}})}):null]})}),(0,G.jsxs)(te,{value:String(n),onValueChange:e=>{e!=null&&r(Number(e))},children:[(0,G.jsx)(g,{className:H.pageSize,"aria-label":`Items per page`,children:(0,G.jsx)(v,{})}),(0,G.jsx)(h,{children:(0,G.jsx)(_,{children:m.map(e=>(0,G.jsx)(ee,{value:String(e),children:e},e))})})]})]})}function ie(e,t,n){let r=Math.ceil(e/t);return r<n&&0<r?r:n<1?1:n}function ae(e,t,n,r){r=+r;let i=[],a=Math.max(Math.ceil(n/t),1),o=Math.ceil(r/2),s=e<=o,c=a-o<e,l=!s&&!c,u=r<a,d=1;for(;d<=a&&d<=r;){let t,n=oe(d,e,r,a),o=d===2&&(l||c),f=d===r-1&&(l||s);t=u&&(o||f)?`...`:n,i.push(t),d++}return i}function oe(e,t,n,r){let i=Math.ceil(n/2);return e===n?r:e===1?e:n<r?r-i<t?r-n+e:i<t?t-i+e:e:e}var W,G,se=e((()=>{W=t(n(),1),a(),y(),L(),re(),G=r(),U.__docgenInfo={description:``,methods:[],displayName:`NumberedPagination`,props:{currentPage:{required:!0,tsType:{name:`number`},description:`The current (active) page.`},onCurrentPageChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(page: number) => void`,signature:{arguments:[{type:{name:`number`},name:`page`}],return:{name:`void`}}},description:`Called when the active page should change.`},itemsPerPage:{required:!0,tsType:{name:`number`},description:`The number of items per paginated page.`},onItemsPerPageChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(itemsPerPage: number) => void`,signature:{arguments:[{type:{name:`number`},name:`itemsPerPage`}],return:{name:`void`}}},description:`Called when the page size should change.`},totalItems:{required:!0,tsType:{name:`number`},description:`The total number of items in the collection. Only useful when doing
server-side paging, where the collection size is limited to a single
page returned by the server API.`},maxSize:{required:!1,tsType:{name:`number`},description:`The number of page links to show. Defaults to 7.`,defaultValue:{value:`7`,computed:!1}},showEdges:{required:!1,tsType:{name:`boolean`},description:`Show the previous/next edge controls. Defaults to true.`,defaultValue:{value:`true`,computed:!1}},pageSizes:{required:!1,tsType:{name:`Array`,elements:[{name:`number`}],raw:`number[]`},description:`The page sizes to show. Defaults to [10, 20, 50, 100].`,defaultValue:{value:`[10, 20, 50, 100]`,computed:!1}}}}})),K,q,J,Y,X,Z,Q,$;e((()=>{K=t(n(),1),o(),se(),L(),q=r(),J={title:`Components/Pagination`,component:k,parameters:{docs:{description:{component:i.docs.description}}}},Y={render:()=>(0,q.jsx)(k,{children:(0,q.jsxs)(A,{children:[(0,q.jsx)(j,{children:(0,q.jsx)(N,{href:`#`})}),(0,q.jsx)(j,{children:(0,q.jsx)(M,{href:`#`,children:`1`})}),(0,q.jsx)(j,{children:(0,q.jsx)(M,{href:`#`,isActive:!0,children:`2`})}),(0,q.jsx)(j,{children:(0,q.jsx)(M,{href:`#`,children:`3`})}),(0,q.jsx)(j,{children:(0,q.jsx)(F,{})}),(0,q.jsx)(j,{children:(0,q.jsx)(P,{href:`#`})})]})})},X={render:()=>(0,q.jsx)(k,{children:(0,q.jsxs)(A,{children:[(0,q.jsx)(j,{children:(0,q.jsx)(N,{href:`#`})}),(0,q.jsx)(j,{children:(0,q.jsx)(M,{href:`#`,children:`1`})}),(0,q.jsx)(j,{children:(0,q.jsx)(F,{})}),(0,q.jsx)(j,{children:(0,q.jsx)(M,{href:`#`,children:`4`})}),(0,q.jsx)(j,{children:(0,q.jsx)(M,{href:`#`,isActive:!0,children:`5`})}),(0,q.jsx)(j,{children:(0,q.jsx)(M,{href:`#`,children:`6`})}),(0,q.jsx)(j,{children:(0,q.jsx)(F,{})}),(0,q.jsx)(j,{children:(0,q.jsx)(M,{href:`#`,children:`10`})}),(0,q.jsx)(j,{children:(0,q.jsx)(P,{href:`#`})})]})})},Z={render:()=>{let[e,t]=(0,K.useState)(1);return(0,q.jsx)(k,{children:(0,q.jsxs)(A,{children:[(0,q.jsx)(j,{children:(0,q.jsx)(N,{href:`#`,"aria-disabled":e===1,className:e===1?`pointer-events-none opacity-50`:void 0,onClick:e=>{e.preventDefault(),t(e=>Math.max(1,e-1))}})}),Array.from({length:5},(e,t)=>t+1).map(n=>(0,q.jsx)(j,{children:(0,q.jsx)(M,{href:`#`,isActive:n===e,onClick:e=>{e.preventDefault(),t(n)},children:n})},n)),(0,q.jsx)(j,{children:(0,q.jsx)(P,{href:`#`,"aria-disabled":e===5,className:e===5?`pointer-events-none opacity-50`:void 0,onClick:e=>{e.preventDefault(),t(e=>Math.min(5,e+1))}})})]})})}},Q={name:`NumberedPagination`,render:()=>{let[e,t]=(0,K.useState)(1),[n,r]=(0,K.useState)(10);return(0,q.jsx)(U,{currentPage:e,onCurrentPageChange:t,itemsPerPage:n,onItemsPerPageChange:r,totalItems:237})}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...Y.parameters?.docs?.source},description:{story:`A typical page trail with previous/next controls and an active page.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...X.parameters?.docs?.source},description:{story:`A long page trail collapsed with ellipses on both ends.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const totalPages = 5;
    const [page, setPage] = useState(1);
    return <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" aria-disabled={page === 1} className={page === 1 ? 'pointer-events-none opacity-50' : undefined} onClick={event => {
            event.preventDefault();
            setPage(current => Math.max(1, current - 1));
          }} />
          </PaginationItem>
          {Array.from({
          length: totalPages
        }, (_, index) => index + 1).map(pageNumber => <PaginationItem key={pageNumber}>
              <PaginationLink href="#" isActive={pageNumber === page} onClick={event => {
            event.preventDefault();
            setPage(pageNumber);
          }}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>)}
          <PaginationItem>
            <PaginationNext href="#" aria-disabled={page === totalPages} className={page === totalPages ? 'pointer-events-none opacity-50' : undefined} onClick={event => {
            event.preventDefault();
            setPage(current => Math.min(totalPages, current + 1));
          }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>;
  }
}`,...Z.parameters?.docs?.source},description:{story:`A stateful trail — clicking a page or the previous/next controls updates the active page.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'NumberedPagination',
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    return <NumberedPagination currentPage={currentPage} onCurrentPageChange={setCurrentPage} itemsPerPage={itemsPerPage} onItemsPerPageChange={setItemsPerPage} totalItems={237} />;
  }
}`,...Q.parameters?.docs?.source},description:{story:"The composed numbered-pagination block: page links, previous/next controls, and a\npage-size selector, driven by `currentPage` / `itemsPerPage` state.",...Q.parameters?.docs?.description}}},$=[`Default`,`ManyPages`,`Interactive`,`NumberedPaginationStory`]}))();export{Y as Default,Z as Interactive,X as ManyPages,Q as NumberedPaginationStory,$ as __namedExportsOrder,J as default};
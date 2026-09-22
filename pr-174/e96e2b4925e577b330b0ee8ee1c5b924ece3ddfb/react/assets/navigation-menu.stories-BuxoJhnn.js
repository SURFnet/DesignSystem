import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{J as n,n as r,r as i,t as a}from"./utils-C5n3ayfX.js";import{G as o,Y as s,d as c,t as l,vt as u}from"./index.es-SHpUsVh6.js";import{S as d,b as f,c as p,f as m,g as h,i as g,m as _,n as v,o as ee,t as te,u as ne,v as y}from"./navigation-menu-C9k57uNA.js";var b,x,S,C,w,T,E,D,O,k,A,j,M,re=e((()=>{b=`_root_79oo4_1`,x=`_list_79oo4_10`,S=`_item_79oo4_25`,C=`_trigger_79oo4_29`,w=`_triggerCaret_79oo4_67`,T=`_content_79oo4_81`,E=`_positioner_79oo4_101`,D=`_popup_79oo4_109`,O=`_viewport_79oo4_120`,k=`_link_79oo4_127`,A=`_indicator_79oo4_170`,j=`_indicatorArrow_79oo4_180`,M={root:b,list:x,item:S,trigger:C,triggerCaret:w,content:T,positioner:E,popup:D,viewport:O,link:k,indicator:A,indicatorArrow:j}}));function N({align:e=`start`,className:t,children:n,orientation:r=`horizontal`,...i}){return(0,H.jsxs)(d,{"data-slot":`navigation-menu`,"data-orientation":r,orientation:r,className:a(M.root,t),...i,children:[n,(0,H.jsx)(z,{align:e,side:r===`vertical`?`right`:`bottom`})]})}function P({className:e,...t}){return(0,H.jsx)(f,{"data-slot":`navigation-menu-list`,className:a(M.list,e),...t})}function F({className:e,...t}){return(0,H.jsx)(y,{"data-slot":`navigation-menu-item`,className:a(M.item,e),...t})}function I(){return M.trigger}function L({className:e,children:t,...n}){return(0,H.jsxs)(_,{"data-slot":`navigation-menu-trigger`,className:a(I(),e),...n,children:[t,` `,(0,H.jsx)(u,{className:M.triggerCaret,"aria-hidden":`true`})]})}function R({className:e,...t}){return(0,H.jsx)(h,{"data-slot":`navigation-menu-content`,className:a(M.content,e),...t})}function z({className:e,side:t=`bottom`,sideOffset:n=8,align:r=`start`,alignOffset:i=0,...o}){return(0,H.jsx)(m,{children:(0,H.jsx)(ne,{side:t,sideOffset:n,align:r,alignOffset:i,className:a(M.positioner,e),...o,children:(0,H.jsx)(ee,{className:M.popup,children:(0,H.jsx)(p,{className:M.viewport})})})})}function B({className:e,...t}){return(0,H.jsx)(g,{"data-slot":`navigation-menu-link`,className:a(M.link,e),...t})}function V({className:e,...t}){return(0,H.jsx)(v,{"data-slot":`navigation-menu-indicator`,className:a(M.indicator,e),...t,children:(0,H.jsx)(`div`,{className:M.indicatorArrow})})}var H,U=e((()=>{te(),r(),l(),re(),H=t(),N.__docgenInfo={description:``,methods:[],displayName:`NavigationMenu`,props:{align:{defaultValue:{value:`'start'`,computed:!1},required:!1},orientation:{defaultValue:{value:`'horizontal'`,computed:!1},required:!1}}},R.__docgenInfo={description:``,methods:[],displayName:`NavigationMenuContent`},V.__docgenInfo={description:``,methods:[],displayName:`NavigationMenuIndicator`},F.__docgenInfo={description:``,methods:[],displayName:`NavigationMenuItem`},B.__docgenInfo={description:``,methods:[],displayName:`NavigationMenuLink`},P.__docgenInfo={description:``,methods:[],displayName:`NavigationMenuList`},L.__docgenInfo={description:``,methods:[],displayName:`NavigationMenuTrigger`},z.__docgenInfo={description:``,methods:[],displayName:`NavigationMenuPositioner`,props:{side:{defaultValue:{value:`'bottom'`,computed:!1},required:!1},sideOffset:{defaultValue:{value:`8`,computed:!1},required:!1},align:{defaultValue:{value:`'start'`,computed:!1},required:!1},alignOffset:{defaultValue:{value:`0`,computed:!1},required:!1}}}}));function W({title:e,children:t,href:n}){return(0,G.jsx)(`li`,{children:(0,G.jsxs)(B,{href:n,children:[(0,G.jsx)(`div`,{className:`text-sm leading-none font-medium`,children:e}),(0,G.jsx)(`p`,{className:`line-clamp-2 text-sm leading-snug text-muted-foreground`,children:t})]})})}var G,K,q,J,Y,X,Z,Q,$;e((()=>{l(),i(),U(),G=t(),K={title:`Components/NavigationMenu`,component:N,parameters:{docs:{description:{component:n.docs.description}}}},q=[{title:`Alert Dialog`,href:`#alert-dialog`,description:`A modal dialog that interrupts the user with important content and expects a response.`},{title:`Hover Card`,href:`#hover-card`,description:`For sighted users to preview content available behind a link.`},{title:`Progress`,href:`#progress`,description:`Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.`},{title:`Tabs`,href:`#tabs`,description:`A set of layered sections of content that are displayed one at a time.`}],J={render:()=>(0,G.jsx)(N,{children:(0,G.jsxs)(P,{children:[(0,G.jsxs)(F,{children:[(0,G.jsx)(L,{children:`Home`}),(0,G.jsx)(R,{children:(0,G.jsxs)(`ul`,{className:`grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]`,children:[(0,G.jsx)(`li`,{className:`row-span-3`,children:(0,G.jsxs)(B,{href:`#`,className:`story-nav-featured`,children:[(0,G.jsx)(`div`,{className:`mb-2 text-lg font-medium`,children:`Curve`}),(0,G.jsx)(`p`,{className:`text-sm leading-tight text-muted-foreground`,children:`SURF's design system, built on shadcn/ui and Base UI.`})]})}),q.map(e=>(0,G.jsx)(W,{title:e.title,href:e.href,children:e.description},e.title))]})})]}),(0,G.jsxs)(F,{children:[(0,G.jsx)(L,{children:`Components`}),(0,G.jsx)(R,{children:(0,G.jsx)(`ul`,{className:`grid w-[300px] gap-4`,children:(0,G.jsxs)(`li`,{children:[(0,G.jsxs)(B,{href:`#`,children:[(0,G.jsx)(`div`,{className:`font-medium`,children:`Components`}),(0,G.jsx)(`div`,{className:`text-muted-foreground`,children:`Browse all components in the library.`})]}),(0,G.jsxs)(B,{href:`#`,children:[(0,G.jsx)(`div`,{className:`font-medium`,children:`Documentation`}),(0,G.jsx)(`div`,{className:`text-muted-foreground`,children:`Learn how to use the library.`})]})]})})})]}),(0,G.jsx)(F,{children:(0,G.jsx)(B,{href:`#`,className:I(),children:`Docs`})})]})})},Y={render:()=>(0,G.jsx)(N,{children:(0,G.jsx)(P,{children:(0,G.jsxs)(F,{children:[(0,G.jsx)(L,{children:`Dashboard`}),(0,G.jsx)(R,{children:(0,G.jsx)(`ul`,{className:`grid w-[220px] gap-1`,children:(0,G.jsxs)(`li`,{children:[(0,G.jsxs)(B,{href:`#`,className:`flex-row items-center gap-2`,children:[(0,G.jsx)(s,{}),`Analytics`]}),(0,G.jsxs)(B,{href:`#`,className:`flex-row items-center gap-2`,children:[(0,G.jsx)(c,{}),`Team`]}),(0,G.jsxs)(B,{href:`#`,className:`flex-row items-center gap-2`,children:[(0,G.jsx)(o,{}),`Settings`]})]})})})]})})})},X={render:()=>(0,G.jsx)(N,{children:(0,G.jsxs)(P,{children:[(0,G.jsx)(F,{children:(0,G.jsx)(B,{href:`#`,className:I(),active:!0,children:`Home`})}),(0,G.jsx)(F,{children:(0,G.jsx)(B,{href:`#`,className:I(),children:`About`})}),(0,G.jsx)(F,{children:(0,G.jsx)(B,{href:`#`,className:I(),children:`Contact`})})]})})},Z={render:()=>(0,G.jsx)(`div`,{className:`flex flex-col gap-10`,children:[`start`,`center`,`end`].map(e=>(0,G.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,G.jsxs)(`span`,{className:`text-xs text-muted-foreground`,children:[`align="`,e,`"`]}),(0,G.jsx)(N,{align:e,children:(0,G.jsx)(P,{children:(0,G.jsxs)(F,{children:[(0,G.jsx)(L,{children:`Menu`}),(0,G.jsx)(R,{children:(0,G.jsx)(`ul`,{className:`grid w-[200px] gap-4`,children:(0,G.jsxs)(`li`,{children:[(0,G.jsx)(B,{href:`#`,children:`Components`}),(0,G.jsx)(B,{href:`#`,children:`Documentation`})]})})})]})})})]},e))})},Q={render:()=>(0,G.jsx)(N,{orientation:`vertical`,children:(0,G.jsxs)(P,{className:`w-40`,children:[(0,G.jsxs)(F,{children:[(0,G.jsx)(L,{className:`w-full`,children:`Menu`}),(0,G.jsx)(R,{children:(0,G.jsx)(`ul`,{className:`w-[200px]`,children:(0,G.jsxs)(`li`,{children:[(0,G.jsx)(B,{href:`#`,children:`Components`}),(0,G.jsx)(B,{href:`#`,children:`Documentation`})]})})})]}),(0,G.jsx)(F,{children:(0,G.jsx)(B,{href:`#`,className:`w-full`,children:`Docs`})})]})})},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink href="#" className="story-nav-featured">
                  <div className="mb-2 text-lg font-medium">Curve</div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    SURF's design system, built on shadcn/ui and Base UI.
                  </p>
                </NavigationMenuLink>
              </li>
              {components.map(component => <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>)}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink href="#">
                  <div className="font-medium">Components</div>
                  <div className="text-muted-foreground">Browse all components in the library.</div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div className="font-medium">Documentation</div>
                  <div className="text-muted-foreground">Learn how to use the library.</div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
}`,...J.parameters?.docs?.source},description:{story:"A composed menu with a two-column featured item, a grid of links, and a plain link\nitem styled with `navigationMenuTriggerStyle`.",...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[220px] gap-1">
              <li>
                <NavigationMenuLink href="#" className="flex-row items-center gap-2">
                  <GaugeIcon />
                  Analytics
                </NavigationMenuLink>
                <NavigationMenuLink href="#" className="flex-row items-center gap-2">
                  <UsersIcon />
                  Team
                </NavigationMenuLink>
                <NavigationMenuLink href="#" className="flex-row items-center gap-2">
                  <GearSixIcon />
                  Settings
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
}`,...Y.parameters?.docs?.source},description:{story:`Sub-items paired with a leading icon.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()} active>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
}`,...X.parameters?.docs?.source},description:{story:"A row of plain links with no dropdown content, styled with `navigationMenuTriggerStyle`.",...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-10">
      {(['start', 'center', 'end'] as const).map(align => <div key={align} className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">align="{align}"</span>
          <NavigationMenu align={align}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      <NavigationMenuLink href="#">Components</NavigationMenuLink>
                      <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>)}
    </div>
}`,...Z.parameters?.docs?.source},description:{story:"The `align` prop controls where the popup is anchored relative to its trigger.",...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <NavigationMenu orientation="vertical">
      <NavigationMenuList className="w-40">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="w-full">Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[200px]">
              <li>
                <NavigationMenuLink href="#">Components</NavigationMenuLink>
                <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className="w-full">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
}`,...Q.parameters?.docs?.source},description:{story:"The `orientation` prop switches roving focus to the up/down arrow keys and stacks the list.",...Q.parameters?.docs?.description}}},$=[`Default`,`WithIcon`,`SimpleLinks`,`Alignment`,`Vertical`]}))();export{Z as Alignment,J as Default,X as SimpleLinks,Q as Vertical,Y as WithIcon,$ as __namedExportsOrder,K as default};
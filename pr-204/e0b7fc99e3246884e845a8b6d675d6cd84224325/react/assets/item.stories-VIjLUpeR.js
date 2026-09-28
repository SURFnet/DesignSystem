import{i as e}from"./preload-helper-xPQekRTU.js";import{O as t}from"./iframe-BoIz8djc.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";import{n as r,r as i,t as a,wt as o}from"./utils-DkbT84Er.js";import{o as ee,r as te}from"./useRenderElement-YRAz7Rky.js";import{Dt as s,G as c,nt as l,p as u,t as ne}from"./index.es-Dj2msvYY.js";import{t as d}from"./button-Uj4nJS78.js";import{t as f}from"./button-CwmB1qyl.js";import{r as re,t as ie}from"./use-render-BdPmp3wn.js";import{t as ae}from"./separator-D1iO2mF8.js";import{t as oe}from"./separator-j_0LrNAM.js";var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,se=e((()=>{p=`_itemGroup_9lucp_1`,m=`_itemSeparator_9lucp_17`,h=`_item_9lucp_1`,g=`_variantDefault_9lucp_49`,_=`_variantOutline_9lucp_54`,v=`_variantMuted_9lucp_59`,y=`_sizeDefault_9lucp_65`,b=`_sizeSm_9lucp_71`,x=`_sizeXs_9lucp_77`,S=`_media_9lucp_82`,C=`_content_9lucp_127`,w=`_title_9lucp_142`,T=`_description_9lucp_156`,E=`_actions_9lucp_181`,D=`_header_9lucp_187`,O=`_footer_9lucp_188`,k={itemGroup:p,itemSeparator:m,item:h,variantDefault:g,variantOutline:_,variantMuted:v,sizeDefault:y,sizeSm:b,sizeXs:x,media:S,content:C,title:w,description:T,actions:E,header:D,footer:O}}));function ce({variant:e=`default`,size:t=`default`,className:n}={}){return a(V.item,H[e],U[t],n)}function A({className:e,...t}){return(0,B.jsx)(`ul`,{"data-slot":`item-group`,className:a(V.itemGroup,e),...t})}function j({className:e,...t}){return(0,B.jsx)(`li`,{"aria-hidden":`true`,children:(0,B.jsx)(ae,{"data-slot":`item-separator`,orientation:`horizontal`,className:a(V.itemSeparator,e),...t})})}function M({className:e,variant:t=`default`,size:n=`default`,render:r,...i}){return re({defaultTagName:`div`,props:ee({className:ce({variant:t,size:n,className:e})},i),render:r,state:{slot:`item`,variant:t,size:n}})}function N({className:e,variant:t=`default`,...n}){return(0,B.jsx)(`div`,{"data-slot":`item-media`,"data-variant":t,className:a(V.media,e),...n})}function P({className:e,...t}){return(0,B.jsx)(`div`,{"data-slot":`item-content`,className:a(V.content,e),...t})}function F({className:e,...t}){return(0,B.jsx)(`div`,{"data-slot":`item-title`,className:a(V.title,e),...t})}function I({className:e,...t}){return(0,B.jsx)(`p`,{"data-slot":`item-description`,className:a(V.description,e),...t})}function L({className:e,...t}){return(0,B.jsx)(`div`,{"data-slot":`item-actions`,className:a(V.actions,e),...t})}function R({className:e,...t}){return(0,B.jsx)(`div`,{"data-slot":`item-header`,className:a(V.header,e),...t})}function z({className:e,...t}){return(0,B.jsx)(`div`,{"data-slot":`item-footer`,className:a(V.footer,e),...t})}var B,V,H,U,W=e((()=>{t(),te(),ie(),r(),oe(),se(),B=n(),V=k,H={default:V.variantDefault,outline:V.variantOutline,muted:V.variantMuted},U={default:V.sizeDefault,sm:V.sizeSm,xs:V.sizeXs},N.__docgenInfo={description:``,methods:[],displayName:`ItemMedia`,props:{variant:{required:!1,tsType:{name:`ItemMediaVariantName`},description:``,defaultValue:{value:`'default'`,computed:!1}}}},P.__docgenInfo={description:``,methods:[],displayName:`ItemContent`},L.__docgenInfo={description:``,methods:[],displayName:`ItemActions`},A.__docgenInfo={description:``,methods:[],displayName:`ItemGroup`},j.__docgenInfo={description:``,methods:[],displayName:`ItemSeparator`},F.__docgenInfo={description:``,methods:[],displayName:`ItemTitle`},I.__docgenInfo={description:``,methods:[],displayName:`ItemDescription`},R.__docgenInfo={description:``,methods:[],displayName:`ItemHeader`},z.__docgenInfo={description:``,methods:[],displayName:`ItemFooter`}})),G,K,q,J,Y,X,Z,Q,$;e((()=>{ne(),i(),f(),W(),G=n(),K={title:`Components/Item`,component:M,parameters:{docs:{description:{component:o.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=18709-94348&t=e05qWfQcPmc0GJEw-4`}},argTypes:{variant:{control:`select`,options:o.props.variants,description:o.props.variants.map(e=>`\`${e}\` — ${o.docs.variants[e]}`).join(`

`),table:{defaultValue:{summary:o.defaults.variants}}},size:{control:`select`,options:o.props.sizes,description:o.props.sizes.map(e=>`\`${e}\` — ${o.docs.sizes[e]}`).join(`

`),table:{defaultValue:{summary:o.defaults.sizes}}}},args:{variant:o.defaults.variants,size:o.defaults.sizes}},q={render:e=>(0,G.jsxs)(M,{...e,className:`w-full max-w-md`,children:[(0,G.jsx)(N,{variant:`icon`,children:(0,G.jsx)(s,{})}),(0,G.jsxs)(P,{children:[(0,G.jsx)(F,{children:`Notifications`}),(0,G.jsx)(I,{children:`Receive alerts about account activity.`})]}),(0,G.jsx)(L,{children:(0,G.jsx)(d,{variant:`outline`,size:`sm`,children:`Enable`})})]})},J={render:()=>(0,G.jsx)(`div`,{className:`flex w-full max-w-md flex-col gap-3`,children:o.props.variants.map(e=>(0,G.jsxs)(M,{variant:e,title:o.docs.variants[e],children:[(0,G.jsx)(N,{variant:`icon`,children:(0,G.jsx)(c,{})}),(0,G.jsxs)(P,{children:[(0,G.jsx)(F,{children:e.charAt(0).toUpperCase()+e.slice(1)}),(0,G.jsx)(I,{children:o.docs.variants[e]})]})]},e))})},Y={render:()=>(0,G.jsx)(`div`,{className:`flex w-full max-w-md flex-col gap-3`,children:o.props.sizes.map(e=>(0,G.jsxs)(M,{variant:`outline`,size:e,title:o.docs.sizes[e],children:[(0,G.jsx)(N,{variant:`icon`,children:(0,G.jsx)(u,{})}),(0,G.jsxs)(P,{children:[(0,G.jsx)(F,{children:e.charAt(0).toUpperCase()+e.slice(1)}),(0,G.jsx)(I,{children:o.docs.sizes[e]})]})]},e))})},X={render:()=>(0,G.jsxs)(`div`,{className:`flex w-full max-w-md flex-col gap-3`,children:[(0,G.jsxs)(M,{variant:`outline`,children:[(0,G.jsx)(N,{variant:`default`,title:o.docs.mediaVariants.default,children:(0,G.jsx)(u,{className:`size-8`})}),(0,G.jsxs)(P,{children:[(0,G.jsx)(F,{children:`Default`}),(0,G.jsx)(I,{children:o.docs.mediaVariants.default})]})]}),(0,G.jsxs)(M,{variant:`outline`,children:[(0,G.jsx)(N,{variant:`icon`,title:o.docs.mediaVariants.icon,children:(0,G.jsx)(l,{})}),(0,G.jsxs)(P,{children:[(0,G.jsx)(F,{children:`Icon`}),(0,G.jsx)(I,{children:o.docs.mediaVariants.icon})]})]}),(0,G.jsxs)(M,{variant:`outline`,children:[(0,G.jsx)(N,{variant:`image`,title:o.docs.mediaVariants.image,children:(0,G.jsx)(`img`,{src:`https://github.com/shadcn.png`,alt:``})}),(0,G.jsxs)(P,{children:[(0,G.jsx)(F,{children:`Image`}),(0,G.jsx)(I,{children:o.docs.mediaVariants.image})]})]})]})},Z={render:()=>(0,G.jsxs)(A,{className:`w-full max-w-md`,children:[(0,G.jsxs)(M,{render:(0,G.jsx)(`li`,{}),children:[(0,G.jsx)(N,{variant:`icon`,children:(0,G.jsx)(u,{})}),(0,G.jsxs)(P,{children:[(0,G.jsx)(F,{children:`Profile`}),(0,G.jsx)(I,{children:`Update your name, photo, and bio.`})]}),(0,G.jsx)(L,{children:(0,G.jsx)(d,{variant:`outline`,size:`sm`,children:`Edit`})})]}),(0,G.jsx)(j,{}),(0,G.jsxs)(M,{render:(0,G.jsx)(`li`,{}),children:[(0,G.jsx)(N,{variant:`icon`,children:(0,G.jsx)(l,{})}),(0,G.jsxs)(P,{children:[(0,G.jsx)(F,{children:`Billing`}),(0,G.jsx)(I,{children:`Manage your plan and payment methods.`})]}),(0,G.jsx)(L,{children:(0,G.jsx)(d,{variant:`outline`,size:`sm`,children:`Manage`})})]}),(0,G.jsx)(j,{}),(0,G.jsxs)(M,{render:(0,G.jsx)(`li`,{}),children:[(0,G.jsx)(N,{variant:`icon`,children:(0,G.jsx)(s,{})}),(0,G.jsxs)(P,{children:[(0,G.jsx)(F,{children:`Notifications`}),(0,G.jsx)(I,{children:`Choose what you want to be notified about.`})]}),(0,G.jsx)(L,{children:(0,G.jsx)(d,{variant:`outline`,size:`sm`,children:`Configure`})})]})]})},Q={render:()=>(0,G.jsxs)(M,{variant:`outline`,className:`w-full max-w-md`,children:[(0,G.jsxs)(R,{children:[(0,G.jsx)(F,{children:`Storage plan`}),(0,G.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`80% used`})]}),(0,G.jsx)(P,{children:(0,G.jsx)(I,{children:`You're approaching your storage limit.`})}),(0,G.jsxs)(z,{children:[(0,G.jsx)(d,{variant:`outline`,size:`sm`,children:`Manage storage`}),(0,G.jsx)(d,{size:`sm`,children:`Upgrade plan`})]})]})},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => <Item {...args} className="w-full max-w-md">
      <ItemMedia variant="icon">
        <BellIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Notifications</ItemTitle>
        <ItemDescription>Receive alerts about account activity.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Enable
        </Button>
      </ItemActions>
    </Item>
}`,...q.parameters?.docs?.source},description:{story:`The default item — media, title, description, and an action; tweak variant/size via the controls.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-md flex-col gap-3">
      {itemContract.props.variants.map(variant => <Item key={variant} variant={variant} title={itemContract.docs.variants[variant]}>
          <ItemMedia variant="icon">
            <GearSixIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</ItemTitle>
            <ItemDescription>{itemContract.docs.variants[variant]}</ItemDescription>
          </ItemContent>
        </Item>)}
    </div>
}`,...J.parameters?.docs?.source},description:{story:`Every visual variant side by side.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-md flex-col gap-3">
      {itemContract.props.sizes.map(size => <Item key={size} variant="outline" size={size} title={itemContract.docs.sizes[size]}>
          <ItemMedia variant="icon">
            <UserIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{size.charAt(0).toUpperCase() + size.slice(1)}</ItemTitle>
            <ItemDescription>{itemContract.docs.sizes[size]}</ItemDescription>
          </ItemContent>
        </Item>)}
    </div>
}`,...Y.parameters?.docs?.source},description:{story:`Every size, from extra-compact to standard.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-md flex-col gap-3">
      <Item variant="outline">
        <ItemMedia variant="default" title={itemContract.docs.mediaVariants.default}>
          <UserIcon className="size-8" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>{itemContract.docs.mediaVariants.default}</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon" title={itemContract.docs.mediaVariants.icon}>
          <CreditCardIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Icon</ItemTitle>
          <ItemDescription>{itemContract.docs.mediaVariants.icon}</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="image" title={itemContract.docs.mediaVariants.image}>
          <img src="https://github.com/shadcn.png" alt="" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Image</ItemTitle>
          <ItemDescription>{itemContract.docs.mediaVariants.image}</ItemDescription>
        </ItemContent>
      </Item>
    </div>
}`,...X.parameters?.docs?.source},description:{story:"`ItemMedia`'s own `variant` — a distinct axis from `Item`'s. `icon` badges an icon,\n`image` fixes a square thumbnail, `default` renders the media as-is.",...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <ItemGroup className="w-full max-w-md">
      <Item render={<li />}>
        <ItemMedia variant="icon">
          <UserIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Profile</ItemTitle>
          <ItemDescription>Update your name, photo, and bio.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item render={<li />}>
        <ItemMedia variant="icon">
          <CreditCardIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Billing</ItemTitle>
          <ItemDescription>Manage your plan and payment methods.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Manage
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item render={<li />}>
        <ItemMedia variant="icon">
          <BellIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Notifications</ItemTitle>
          <ItemDescription>Choose what you want to be notified about.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Configure
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
}`,...Z.parameters?.docs?.source},description:{story:`A grouped list of items with a separator, e.g. an account settings page.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <Item variant="outline" className="w-full max-w-md">
      <ItemHeader>
        <ItemTitle>Storage plan</ItemTitle>
        <span className="text-sm text-muted-foreground">80% used</span>
      </ItemHeader>
      <ItemContent>
        <ItemDescription>You&apos;re approaching your storage limit.</ItemDescription>
      </ItemContent>
      <ItemFooter>
        <Button variant="outline" size="sm">
          Manage storage
        </Button>
        <Button size="sm">Upgrade plan</Button>
      </ItemFooter>
    </Item>
}`,...Q.parameters?.docs?.source},description:{story:"`ItemHeader` and `ItemFooter` wrap content that spans the full width of the item, below the main row.",...Q.parameters?.docs?.description}}},$=[`Default`,`Variants`,`Sizes`,`MediaVariants`,`Group`,`WithHeaderAndFooter`]}))();export{q as Default,Z as Group,X as MediaVariants,Y as Sizes,J as Variants,Q as WithHeaderAndFooter,$ as __namedExportsOrder,K as default};
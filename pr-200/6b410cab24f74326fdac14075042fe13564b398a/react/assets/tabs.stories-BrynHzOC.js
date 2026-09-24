import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{n,p as r,r as i,t as a}from"./utils-C5n3ayfX.js";import{t as o}from"./button-CRJ3TT6y.js";import{t as s}from"./button-LAilQtZl.js";import{a as c,i as l,o as u,r as d,s as f,t as p}from"./card-DdSnmOG7.js";import{t as m}from"./card-DKRde8Nw.js";import{t as h}from"./input-DZxxRqOI.js";import{t as g}from"./input-BZK46_hD.js";import{t as _}from"./label-BIuij8Xz.js";import{t as v}from"./label-G-MH7fEg.js";import{c as y,i as b,n as x,o as S,t as C}from"./tabs-Dd8btpsy.js";var w,T,E,D,O,k,A,j=e((()=>{w=`_root_1tymz_1`,T=`_list_1tymz_11`,E=`_listDefault_1tymz_33`,D=`_listLine_1tymz_38`,O=`_trigger_1tymz_44`,k=`_content_1tymz_160`,A={root:w,list:T,listDefault:E,listLine:D,trigger:O,content:k}}));function M({variant:e=`default`,className:t}={}){return a(R.list,z[e],t)}function N({className:e,orientation:t=`horizontal`,...n}){return(0,L.jsx)(y,{"data-slot":`tabs`,"data-orientation":t,className:a(R.root,e),...n})}function P({className:e,variant:t=`default`,...n}){return(0,L.jsx)(x,{"data-slot":`tabs-list`,"data-variant":t,className:M({variant:t,className:e}),...n})}function F({className:e,...t}){return(0,L.jsx)(S,{"data-slot":`tabs-trigger`,className:a(R.trigger,e),...t})}function I({className:e,...t}){return(0,L.jsx)(b,{"data-slot":`tabs-content`,className:a(R.content,e),...t})}var L,R,z,B=e((()=>{C(),n(),j(),L=t(),R=A,z={default:R.listDefault,line:R.listLine},N.__docgenInfo={description:``,methods:[],displayName:`Tabs`,props:{orientation:{defaultValue:{value:`'horizontal'`,computed:!1},required:!1}}},P.__docgenInfo={description:``,methods:[],displayName:`TabsList`,props:{variant:{required:!1,tsType:{name:`TabsVariantName`},description:``,defaultValue:{value:`'default'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}}},F.__docgenInfo={description:``,methods:[],displayName:`TabsTrigger`},I.__docgenInfo={description:``,methods:[],displayName:`TabsContent`}})),V,H,U,W,G,K,q;e((()=>{i(),s(),m(),g(),v(),B(),V=t(),H={title:`Components/Tabs`,component:N,parameters:{docs:{description:{component:r.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=183-417`}}},U={render:()=>(0,V.jsxs)(N,{defaultValue:`account`,className:`w-96`,children:[(0,V.jsxs)(P,{children:[(0,V.jsx)(F,{value:`account`,children:`Account`}),(0,V.jsx)(F,{value:`password`,children:`Password`})]}),(0,V.jsx)(I,{value:`account`,children:(0,V.jsxs)(p,{children:[(0,V.jsxs)(u,{children:[(0,V.jsx)(f,{children:`Account`}),(0,V.jsx)(l,{children:`Make changes to your account here. Click save when you're done.`})]}),(0,V.jsxs)(d,{className:`grid gap-4`,children:[(0,V.jsxs)(`div`,{className:`grid gap-1.5`,children:[(0,V.jsx)(_,{htmlFor:`tabs-account-name`,children:`Name`}),(0,V.jsx)(h,{id:`tabs-account-name`,defaultValue:`Pedro Duarte`})]}),(0,V.jsxs)(`div`,{className:`grid gap-1.5`,children:[(0,V.jsx)(_,{htmlFor:`tabs-account-username`,children:`Username`}),(0,V.jsx)(h,{id:`tabs-account-username`,defaultValue:`@peduarte`})]})]}),(0,V.jsx)(c,{children:(0,V.jsx)(o,{children:`Save changes`})})]})}),(0,V.jsx)(I,{value:`password`,children:(0,V.jsxs)(p,{children:[(0,V.jsxs)(u,{children:[(0,V.jsx)(f,{children:`Password`}),(0,V.jsx)(l,{children:`Change your password here. After saving, you'll be logged out.`})]}),(0,V.jsxs)(d,{className:`grid gap-4`,children:[(0,V.jsxs)(`div`,{className:`grid gap-1.5`,children:[(0,V.jsx)(_,{htmlFor:`tabs-password-current`,children:`Current password`}),(0,V.jsx)(h,{id:`tabs-password-current`,type:`password`})]}),(0,V.jsxs)(`div`,{className:`grid gap-1.5`,children:[(0,V.jsx)(_,{htmlFor:`tabs-password-new`,children:`New password`}),(0,V.jsx)(h,{id:`tabs-password-new`,type:`password`})]})]}),(0,V.jsx)(c,{children:(0,V.jsx)(o,{children:`Save password`})})]})})]})},W={render:()=>(0,V.jsx)(`div`,{className:`flex flex-col gap-8`,children:r.props.variants.map(e=>(0,V.jsxs)(N,{defaultValue:`tab-1`,className:`w-96`,children:[(0,V.jsxs)(P,{variant:e,title:r.docs.variants[e],children:[(0,V.jsx)(F,{value:`tab-1`,children:`First tab`}),(0,V.jsx)(F,{value:`tab-2`,children:`Second tab`}),(0,V.jsx)(F,{value:`tab-3`,children:`Third tab`})]}),(0,V.jsx)(I,{value:`tab-1`,className:`text-muted-foreground`,children:r.docs.variants[e]})]},e))})},G={render:()=>(0,V.jsxs)(N,{defaultValue:`tab-1`,orientation:`vertical`,className:`w-96`,children:[(0,V.jsxs)(P,{children:[(0,V.jsx)(F,{value:`tab-1`,children:`First tab`}),(0,V.jsx)(F,{value:`tab-2`,children:`Second tab`}),(0,V.jsx)(F,{value:`tab-3`,children:`Third tab`})]}),(0,V.jsx)(I,{value:`tab-1`,children:`Content for the first tab.`}),(0,V.jsx)(I,{value:`tab-2`,children:`Content for the second tab.`}),(0,V.jsx)(I,{value:`tab-3`,children:`Content for the third tab.`})]})},K={render:()=>(0,V.jsxs)(N,{defaultValue:`tab-1`,className:`w-96`,children:[(0,V.jsxs)(P,{children:[(0,V.jsx)(F,{value:`tab-1`,children:`First tab`}),(0,V.jsx)(F,{value:`tab-2`,disabled:!0,children:`Disabled tab`}),(0,V.jsx)(F,{value:`tab-3`,children:`Third tab`})]}),(0,V.jsx)(I,{value:`tab-1`,children:`Content for the first tab.`}),(0,V.jsx)(I,{value:`tab-3`,children:`Content for the third tab.`})]})},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-account-name">Name</Label>
              <Input id="tabs-account-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-account-username">Username</Label>
              <Input id="tabs-account-username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-password-current">Current password</Label>
              <Input id="tabs-password-current" type="password" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-password-new">New password</Label>
              <Input id="tabs-password-new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
}`,...U.parameters?.docs?.source},description:{story:`A realistic composed example — a settings panel switching between two forms.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-8">
      {tabsContract.props.variants.map(variant => <Tabs key={variant} defaultValue="tab-1" className="w-96">
          <TabsList variant={variant} title={tabsContract.docs.variants[variant]}>
            <TabsTrigger value="tab-1">First tab</TabsTrigger>
            <TabsTrigger value="tab-2">Second tab</TabsTrigger>
            <TabsTrigger value="tab-3">Third tab</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1" className="text-muted-foreground">
            {tabsContract.docs.variants[variant]}
          </TabsContent>
        </Tabs>)}
    </div>
}`,...W.parameters?.docs?.source},description:{story:"The `TabsList` variants declared in the contract.",...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="tab-1" orientation="vertical" className="w-96">
      <TabsList>
        <TabsTrigger value="tab-1">First tab</TabsTrigger>
        <TabsTrigger value="tab-2">Second tab</TabsTrigger>
        <TabsTrigger value="tab-3">Third tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Content for the first tab.</TabsContent>
      <TabsContent value="tab-2">Content for the second tab.</TabsContent>
      <TabsContent value="tab-3">Content for the third tab.</TabsContent>
    </Tabs>
}`,...G.parameters?.docs?.source},description:{story:`Vertical orientation moves roving focus to the up/down arrow keys.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="tab-1" className="w-96">
      <TabsList>
        <TabsTrigger value="tab-1">First tab</TabsTrigger>
        <TabsTrigger value="tab-2" disabled>
          Disabled tab
        </TabsTrigger>
        <TabsTrigger value="tab-3">Third tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Content for the first tab.</TabsContent>
      <TabsContent value="tab-3">Content for the third tab.</TabsContent>
    </Tabs>
}`,...K.parameters?.docs?.source},description:{story:`An individual trigger can be disabled independently of the rest of the tabs.`,...K.parameters?.docs?.description}}},q=[`Default`,`Variants`,`Vertical`,`DisabledTrigger`]}))();export{U as Default,K as DisabledTrigger,W as Variants,G as Vertical,q as __namedExportsOrder,H as default};
import{i as e}from"./preload-helper-xPQekRTU.js";import{O as t}from"./iframe-CaelJD7u.js";import{t as n}from"./jsx-runtime-CaZkqeYb.js";import{hn as r,n as i,r as a,t as o}from"./utils-C5n3ayfX.js";import{H as s,l as c,o as l,ot as u,t as d}from"./index.es-CbcVOFsO.js";import{t as f}from"./button-CRJ3TT6y.js";import{t as p}from"./button-LAilQtZl.js";var m,h,g,_,v,y,b,x,S,C,w=e((()=>{m=`_alert_1vcfz_1`,h=`_variantDefault_1vcfz_32`,g=`_variantInfo_1vcfz_38`,_=`_variantSuccess_1vcfz_44`,v=`_variantWarning_1vcfz_50`,y=`_variantDanger_1vcfz_56`,b=`_title_1vcfz_72`,x=`_description_1vcfz_89`,S=`_action_1vcfz_115`,C={alert:m,variantDefault:h,variantInfo:g,variantSuccess:_,variantWarning:v,variantDanger:y,title:b,description:x,action:S}}));function T({className:e,variant:t=`default`,...n}){return(0,k.jsx)(`div`,{"data-slot":`alert`,role:`alert`,"data-variant":t,className:o(A.alert,j[t],e),...n})}function E({className:e,...t}){return(0,k.jsx)(`div`,{"data-slot":`alert-title`,className:o(A.title,e),...t})}function D({className:e,...t}){return(0,k.jsx)(`div`,{"data-slot":`alert-description`,className:o(A.description,e),...t})}function O({className:e,...t}){return(0,k.jsx)(`div`,{"data-slot":`alert-action`,className:o(A.action,e),...t})}var k,A,j,M=e((()=>{t(),i(),w(),k=n(),A=C,j={default:A.variantDefault,info:A.variantInfo,success:A.variantSuccess,warning:A.variantWarning,danger:A.variantDanger},T.__docgenInfo={description:``,methods:[],displayName:`Alert`,props:{variant:{required:!1,tsType:{name:`AlertVariantName`},description:``,defaultValue:{value:`'default'`,computed:!1}}}},E.__docgenInfo={description:``,methods:[],displayName:`AlertTitle`},D.__docgenInfo={description:``,methods:[],displayName:`AlertDescription`},O.__docgenInfo={description:``,methods:[],displayName:`AlertAction`}})),N,P,F,I,L,R,z,B,V;e((()=>{d(),a(),p(),M(),N=n(),P={default:(0,N.jsx)(u,{}),info:(0,N.jsx)(s,{}),success:(0,N.jsx)(u,{}),warning:(0,N.jsx)(c,{}),danger:(0,N.jsx)(l,{})},F={title:`Components/Alert`,component:T,parameters:{docs:{description:{component:r.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=21-322&p=f&t=vT3gKkMDSpQaeqci-0`}},argTypes:{variant:{control:`select`,options:r.props.variants,description:`Visual style of the alert.`,table:{defaultValue:{summary:r.defaults.variants}}}},args:{variant:r.defaults.variants}},I={render:e=>(0,N.jsxs)(T,{...e,className:`w-96`,children:[(0,N.jsx)(u,{}),(0,N.jsx)(E,{children:`Update available`}),(0,N.jsx)(D,{children:`A new version is ready to install.`})]})},L={render:()=>(0,N.jsx)(`div`,{className:`flex w-96 flex-col gap-3`,children:r.props.variants.map(e=>(0,N.jsxs)(T,{variant:e,title:r.docs.variants[e],children:[P[e],(0,N.jsx)(E,{children:e.charAt(0).toUpperCase()+e.slice(1)}),(0,N.jsx)(D,{children:r.docs.variants[e]})]},e))})},R={render:()=>(0,N.jsxs)(T,{variant:`danger`,className:`w-96`,children:[(0,N.jsx)(l,{}),(0,N.jsx)(E,{children:`Unable to process payment`}),(0,N.jsx)(D,{children:`Please verify your billing details and try again.`})]})},z={render:()=>(0,N.jsxs)(T,{className:`w-96`,children:[(0,N.jsx)(u,{}),(0,N.jsx)(E,{children:`Update available`}),(0,N.jsx)(D,{children:`A new version is ready to install.`}),(0,N.jsx)(O,{children:(0,N.jsx)(f,{size:`sm`,variant:`outline`,children:`Update`})})]})},B={render:()=>(0,N.jsx)(T,{className:`w-96`,children:(0,N.jsx)(E,{children:`Heads up, this action can't be undone.`})})},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => <Alert {...args} className="w-96">
      <CheckCircleIcon />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>A new version is ready to install.</AlertDescription>
    </Alert>
}`,...I.parameters?.docs?.source},description:{story:`The default alert — rendered with an icon, title, and description; tweak the variant via controls.`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-96 flex-col gap-3">
      {alertContract.props.variants.map(variant => <Alert key={variant} variant={variant} title={alertContract.docs.variants[variant]}>
          {variantIcons[variant]}
          <AlertTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</AlertTitle>
          <AlertDescription>{alertContract.docs.variants[variant]}</AlertDescription>
        </Alert>)}
    </div>
}`,...L.parameters?.docs?.source},description:{story:`Every visual variant side by side.`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <Alert variant="danger" className="w-96">
      <WarningCircleIcon />
      <AlertTitle>Unable to process payment</AlertTitle>
      <AlertDescription>Please verify your billing details and try again.</AlertDescription>
    </Alert>
}`,...R.parameters?.docs?.source},description:{story:`Danger alert used to surface an error, with title and description.`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <Alert className="w-96">
      <CheckCircleIcon />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>A new version is ready to install.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">
          Update
        </Button>
      </AlertAction>
    </Alert>
}`,...z.parameters?.docs?.source},description:{story:`An action slot (e.g. a button) anchored to the top-right of the alert.`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <Alert className="w-96">
      <AlertTitle>Heads up, this action can&apos;t be undone.</AlertTitle>
    </Alert>
}`,...B.parameters?.docs?.source},description:{story:`Title only — no icon or description.`,...B.parameters?.docs?.description}}},V=[`Default`,`Variants`,`Danger`,`WithAction`,`TitleOnly`]}))();export{R as Danger,I as Default,B as TitleOnly,L as Variants,z as WithAction,V as __namedExportsOrder,F as default};
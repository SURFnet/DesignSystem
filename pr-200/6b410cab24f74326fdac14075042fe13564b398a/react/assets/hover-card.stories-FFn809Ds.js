import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{kt as n,n as r,r as i,t as a}from"./utils-C5n3ayfX.js";import{St as o,t as s}from"./index.es-CbcVOFsO.js";import{t as c}from"./button-CRJ3TT6y.js";import{t as l}from"./button-LAilQtZl.js";import{a as u,n as d,o as f,t as p}from"./avatar-B6zChqJo.js";import{c as m,i as h,n as g,o as _,t as v,u as y}from"./preview-card-CIVgRZS6.js";var b=e((()=>{f()})),x,S,C,w=e((()=>{x=`_positioner_18dal_1`,S=`_content_18dal_6`,C={positioner:x,content:S}}));function T({...e}){return(0,O.jsx)(y,{"data-slot":`hover-card`,...e})}function E({...e}){return(0,O.jsx)(_,{"data-slot":`hover-card-trigger`,...e})}function D({className:e,side:t=`bottom`,sideOffset:n=4,align:r=`center`,alignOffset:i=4,...o}){return(0,O.jsx)(m,{"data-slot":`hover-card-portal`,children:(0,O.jsx)(h,{align:r,alignOffset:i,side:t,sideOffset:n,className:C.positioner,children:(0,O.jsx)(g,{"data-slot":`hover-card-content`,className:a(C.content,e),...o})})})}var O,k=e((()=>{v(),r(),w(),O=t(),T.__docgenInfo={description:``,methods:[],displayName:`HoverCard`},E.__docgenInfo={description:``,methods:[],displayName:`HoverCardTrigger`},D.__docgenInfo={description:``,methods:[],displayName:`HoverCardContent`,props:{side:{defaultValue:{value:`'bottom'`,computed:!1},required:!1},sideOffset:{defaultValue:{value:`4`,computed:!1},required:!1},align:{defaultValue:{value:`'center'`,computed:!1},required:!1},alignOffset:{defaultValue:{value:`4`,computed:!1},required:!1}}}})),A,j,M,N,P,F;e((()=>{s(),i(),b(),l(),k(),A=t(),j={title:`Components/HoverCard`,component:T,parameters:{docs:{description:{component:n.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=216-2886`}}},M={render:()=>(0,A.jsxs)(T,{children:[(0,A.jsx)(E,{render:(0,A.jsx)(c,{variant:`link`,className:`px-0`,children:`@surfnet`})}),(0,A.jsx)(D,{children:(0,A.jsxs)(`div`,{className:`flex gap-3`,children:[(0,A.jsxs)(p,{children:[(0,A.jsx)(u,{src:`https://i.pravatar.cc/80?img=5`,alt:`@surfnet`}),(0,A.jsx)(d,{children:`SF`})]}),(0,A.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,A.jsx)(`p`,{className:`text-sm font-medium`,children:`@surfnet`}),(0,A.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Dutch collaborative organisation for IT in education and research.`}),(0,A.jsxs)(`div`,{className:`flex items-center gap-1 pt-1 text-xs text-muted-foreground`,children:[(0,A.jsx)(o,{}),(0,A.jsx)(`span`,{children:`Joined December 2010`})]})]})]})})]})},N={render:()=>(0,A.jsx)(`div`,{className:`flex flex-wrap items-center justify-center gap-8 p-12`,children:[`top`,`right`,`bottom`,`left`].map(e=>(0,A.jsxs)(T,{children:[(0,A.jsx)(E,{render:(0,A.jsx)(c,{variant:`outline`,children:e})}),(0,A.jsx)(D,{side:e,className:`w-48`,children:(0,A.jsxs)(`p`,{className:`text-sm`,children:[`Positioned on the `,e,`.`]})})]},e))})},P={render:()=>(0,A.jsxs)(`p`,{className:`max-w-sm text-sm`,children:[`Curve is maintained by`,` `,(0,A.jsxs)(T,{children:[(0,A.jsx)(E,{href:`#`,className:`font-medium underline underline-offset-4`,children:`SURF`}),(0,A.jsx)(D,{children:(0,A.jsx)(`p`,{className:`text-sm`,children:`SURF is the collaborative organisation for IT in Dutch education and research.`})})]}),`, providing a shared design system for React and Angular.`]})},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <HoverCard>
      <HoverCardTrigger render={<Button variant="link" className="px-0">
            @surfnet
          </Button>} />
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="@surfnet" />
            <AvatarFallback>SF</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">@surfnet</p>
            <p className="text-sm text-muted-foreground">
              Dutch collaborative organisation for IT in education and research.
            </p>
            <div className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
              <CalendarBlankIcon />
              <span>Joined December 2010</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
}`,...M.parameters?.docs?.source},description:{story:`A profile preview shown when hovering (or focusing) the trigger.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center justify-center gap-8 p-12">
      {(['top', 'right', 'bottom', 'left'] as const).map(side => <HoverCard key={side}>
          <HoverCardTrigger render={<Button variant="outline">{side}</Button>} />
          <HoverCardContent side={side} className="w-48">
            <p className="text-sm">Positioned on the {side}.</p>
          </HoverCardContent>
        </HoverCard>)}
    </div>
}`,...N.parameters?.docs?.source},description:{story:`The popup can open on any side of the trigger, flipping to stay in view.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <p className="max-w-sm text-sm">
      Curve is maintained by{' '}
      <HoverCard>
        <HoverCardTrigger href="#" className="font-medium underline underline-offset-4">
          SURF
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="text-sm">
            SURF is the collaborative organisation for IT in Dutch education and research.
          </p>
        </HoverCardContent>
      </HoverCard>
      , providing a shared design system for React and Angular.
    </p>
}`,...P.parameters?.docs?.source},description:{story:`The trigger renders an anchor by default, so inline text links work without extra markup.`,...P.parameters?.docs?.description}}},F=[`Default`,`Placement`,`TextTrigger`]}))();export{M as Default,N as Placement,P as TextTrigger,F as __namedExportsOrder,j as default};
import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{an as n,r}from"./utils-C5n3ayfX.js";import{t as i}from"./button-C7hzrQPx.js";import{t as a}from"./button-C6o-rz-l.js";import{a as o,c as s,i as c,n as l,o as u,r as d,s as f,t as p}from"./card-COHUMxdJ.js";var m,h,g,_,v,y,b;e((()=>{r(),a(),s(),m=t(),h={title:`Components/Card`,component:p,parameters:{docs:{description:{component:n.docs.description}}},argTypes:{size:{control:`radio`,options:[`default`,`sm`],description:`Spacing density of the card.`,table:{defaultValue:{summary:`default`}}}},args:{size:`default`}},g={render:e=>(0,m.jsxs)(p,{...e,className:`w-80`,children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Card title`}),(0,m.jsx)(c,{children:`A short description of what this card is about.`})]}),(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{className:`text-muted-foreground`,children:`Card body content goes here.`})}),(0,m.jsxs)(o,{className:`justify-end gap-2`,children:[(0,m.jsx)(i,{variant:`outline`,children:`Cancel`}),(0,m.jsx)(i,{children:`Confirm`})]})]})},_={render:()=>(0,m.jsxs)(p,{size:`sm`,className:`w-80`,children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Small card`}),(0,m.jsx)(c,{children:`Compact spacing variant.`})]}),(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{className:`text-muted-foreground`,children:`Less padding all round.`})})]})},v={render:()=>(0,m.jsxs)(p,{className:`w-80`,children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`With action`}),(0,m.jsx)(c,{children:`An action button lives in the header.`}),(0,m.jsx)(l,{children:(0,m.jsx)(i,{variant:`ghost`,size:`sm`,children:`Edit`})})]}),(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{className:`text-muted-foreground`,children:`Content area.`})})]})},y={render:()=>(0,m.jsx)(p,{className:`w-80`,children:(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{children:`Just a card with content and no header or footer.`})})})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>A short description of what this card is about.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Card body content goes here.</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
}`,...g.parameters?.docs?.source},description:{story:`Default card with header, content, and footer.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Card size="sm" className="w-80">
      <CardHeader>
        <CardTitle>Small card</CardTitle>
        <CardDescription>Compact spacing variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Less padding all round.</p>
      </CardContent>
    </Card>
}`,..._.parameters?.docs?.source},description:{story:"Compact (`sm`) card with tighter spacing.",..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-80">
      <CardHeader>
        <CardTitle>With action</CardTitle>
        <CardDescription>An action button lives in the header.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content area.</p>
      </CardContent>
    </Card>
}`,...v.parameters?.docs?.source},description:{story:`Card with an action slot in the header (e.g. a menu trigger).`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-80">
      <CardContent>
        <p>Just a card with content and no header or footer.</p>
      </CardContent>
    </Card>
}`,...y.parameters?.docs?.source},description:{story:`Card with only a content area — no header or footer.`,...y.parameters?.docs?.description}}},b=[`Default`,`Small`,`WithHeaderAction`,`ContentOnly`]}))();export{y as ContentOnly,g as Default,_ as Small,v as WithHeaderAction,b as __namedExportsOrder,h as default};
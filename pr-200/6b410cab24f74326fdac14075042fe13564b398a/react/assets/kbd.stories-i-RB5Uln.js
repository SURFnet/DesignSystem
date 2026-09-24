import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{bt as n,r}from"./utils-C5n3ayfX.js";import{t as i}from"./button-CRJ3TT6y.js";import{t as a}from"./button-LAilQtZl.js";import{i as o,n as s,t as c}from"./input-group-5N5KZi7w.js";import{t as l}from"./input-group-kf96T2jw.js";import{n as u,r as d,t as f}from"./kbd-znIw2J6m.js";var p,m,h,g,_,v,y,b;e((()=>{r(),a(),l(),d(),p=t(),m={title:`Components/Kbd`,component:f,parameters:{docs:{description:{component:n.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=18679-17681&t=e05qWfQcPmc0GJEw-4`}},args:{children:`⌘`}},h={},g={render:()=>(0,p.jsxs)(`div`,{className:`flex flex-col items-center gap-4`,children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(f,{children:`⌘`}),(0,p.jsx)(f,{children:`⇧`}),(0,p.jsx)(f,{children:`⌥`}),(0,p.jsx)(f,{children:`⌃`})]}),(0,p.jsxs)(u,{children:[(0,p.jsx)(f,{children:`Ctrl`}),(0,p.jsx)(`span`,{children:`+`}),(0,p.jsx)(f,{children:`B`})]})]})},_={render:()=>(0,p.jsxs)(`p`,{className:`max-w-xs text-sm text-muted-foreground`,children:[`Use`,` `,(0,p.jsxs)(u,{children:[(0,p.jsx)(f,{children:`Ctrl + B`}),(0,p.jsx)(f,{children:`Ctrl + K`})]}),` `,`to open the command palette.`]})},v={render:()=>(0,p.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4`,children:[(0,p.jsxs)(i,{variant:`outline`,size:`sm`,className:`pr-2`,children:[`Accept `,(0,p.jsx)(f,{children:`⏎`})]}),(0,p.jsxs)(i,{variant:`outline`,size:`sm`,className:`pr-2`,children:[`Cancel `,(0,p.jsx)(f,{children:`Esc`})]})]})},y={render:()=>(0,p.jsx)(`div`,{className:`w-full max-w-xs`,children:(0,p.jsxs)(c,{children:[(0,p.jsx)(o,{placeholder:`Search…`}),(0,p.jsxs)(s,{align:`inline-end`,children:[(0,p.jsx)(f,{children:`⌘`}),(0,p.jsx)(f,{children:`K`})]})]})})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{}`,...h.parameters?.docs?.source},description:{story:`A single key — tweak the label via the controls.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
}`,...g.parameters?.docs?.source},description:{story:"Modifier keys grouped together, and a combination spelled out with a `+`.",...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <p className="max-w-xs text-sm text-muted-foreground">
      Use{' '}
      <KbdGroup>
        <Kbd>Ctrl + B</Kbd>
        <Kbd>Ctrl + K</Kbd>
      </KbdGroup>{' '}
      to open the command palette.
    </p>
}`,..._.parameters?.docs?.source},description:{story:`Referencing a shortcut inline in body copy.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm" className="pr-2">
        Accept <Kbd>⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm" className="pr-2">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
}`,...v.parameters?.docs?.source},description:{story:`Hinting a button's shortcut key.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-xs">
      <InputGroup>
        <InputGroupInput placeholder="Search…" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
}`,...y.parameters?.docs?.source},description:{story:`Surfacing a search shortcut inside an input's trailing addon.`,...y.parameters?.docs?.description}}},b=[`Default`,`Groups`,`InText`,`InButton`,`InInputGroup`]}))();export{h as Default,g as Groups,v as InButton,y as InInputGroup,_ as InText,b as __namedExportsOrder,m as default};
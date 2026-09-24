import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./jsx-runtime-CaZkqeYb.js";import{h as n,r}from"./utils-C5n3ayfX.js";import{a as i,c as a,i as o,n as s,o as c,r as l,s as u,t as d}from"./table-Byn_7JEf.js";var f,p,m,h,g;e((()=>{r(),a(),f=t(),p={title:`Components/Table`,component:d,parameters:{docs:{description:{component:n.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=184-890`}}},m=[{name:`SURFconext`,category:`Identity`,status:`Active`},{name:`SURFdrive`,category:`Storage`,status:`Active`},{name:`SURFspot`,category:`Marketplace`,status:`Inactive`}],h={render:()=>(0,f.jsxs)(d,{className:`w-[28rem]`,children:[(0,f.jsx)(l,{children:`A list of available apps.`}),(0,f.jsx)(c,{children:(0,f.jsxs)(u,{children:[(0,f.jsx)(i,{children:`Name`}),(0,f.jsx)(i,{children:`Category`}),(0,f.jsx)(i,{className:`text-right`,children:`Status`})]})}),(0,f.jsx)(s,{children:m.map(e=>(0,f.jsxs)(u,{children:[(0,f.jsx)(o,{className:`font-medium`,children:e.name}),(0,f.jsx)(o,{children:e.category}),(0,f.jsx)(o,{className:`text-right`,children:e.status})]},e.name))})]})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Table className="w-[28rem]">
      <TableCaption>A list of available apps.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apps.map(app => <TableRow key={app.name}>
            <TableCell className="font-medium">{app.name}</TableCell>
            <TableCell>{app.category}</TableCell>
            <TableCell className="text-right">{app.status}</TableCell>
          </TableRow>)}
      </TableBody>
    </Table>
}`,...h.parameters?.docs?.source},description:{story:`A basic table with a header, body, and caption.`,...h.parameters?.docs?.description}}},g=[`Default`]}))();export{h as Default,g as __namedExportsOrder,p as default};
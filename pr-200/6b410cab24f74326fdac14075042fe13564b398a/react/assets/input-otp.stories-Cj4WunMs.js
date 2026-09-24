import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{O as n}from"./iframe-CaelJD7u.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{n as i,r as a,t as o,wt as s}from"./utils-C5n3ayfX.js";import{R as c,t as l}from"./index.es-CbcVOFsO.js";import{t as u}from"./button-CRJ3TT6y.js";import{t as d}from"./button-LAilQtZl.js";import{a as f,n as ee,t as p}from"./field-CipfrSBH.js";import{t as m}from"./field-C2o-_yf1.js";function te(e){return[setTimeout(e,0),setTimeout(e,10),setTimeout(e,50)]}function ne(e){let t=_.useRef();return _.useEffect(()=>{t.current=e}),t.current}function re({containerRef:e,inputRef:t,pushPasswordManagerStrategy:n,isFocused:r}){let[i,a]=v.useState(!1),[o,s]=v.useState(!1),[c,l]=v.useState(!1),u=v.useMemo(()=>n===`none`?!1:(n===`increase-width`||n===`experimental-no-flickering`)&&i&&o,[i,o,n]),d=v.useCallback(()=>{let r=e.current,i=t.current;if(!r||!i||c||n===`none`)return;let o=r,s=o.getBoundingClientRect().left+o.offsetWidth,u=o.getBoundingClientRect().top+o.offsetHeight/2,d=s-T,f=u;document.querySelectorAll(O).length===0&&document.elementFromPoint(d,f)===r||(a(!0),l(!0))},[e,t,c,n]);return v.useEffect(()=>{let t=e.current;if(!t||n===`none`)return;function r(){s(window.innerWidth-t.getBoundingClientRect().right>=E)}r();let i=setInterval(r,1e3);return()=>{clearInterval(i)}},[e,n]),v.useEffect(()=>{let e=r||document.activeElement===t.current;if(n===`none`||!e)return;let i=setTimeout(d,0),a=setTimeout(d,2e3),o=setTimeout(d,5e3),s=setTimeout(()=>{l(!0)},6e3);return()=>{clearTimeout(i),clearTimeout(a),clearTimeout(o),clearTimeout(s)}},[t,r,n,d]),{hasPWMBadge:i,willPushPWMBadge:u,PWM_BADGE_SPACE_WIDTH:D}}function h(e,t){try{e.insertRule(t)}catch{console.error(`input-otp could not insert CSS rule:`,t)}}var g,_,v,y,b,ie,x,S,C,w,ae,oe,se,T,E,D,O,k,A,ce,j,M=e((()=>{g=t(n(),1),_=t(n(),1),v=t(n(),1),y=Object.defineProperty,b=Object.defineProperties,ie=Object.getOwnPropertyDescriptors,x=Object.getOwnPropertySymbols,S=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable,w=(e,t,n)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ae=(e,t)=>{for(var n in t||={})S.call(t,n)&&w(e,n,t[n]);if(x)for(var n of x(t))C.call(t,n)&&w(e,n,t[n]);return e},oe=(e,t)=>b(e,ie(t)),se=(e,t)=>{var n={};for(var r in e)S.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&x)for(var r of x(e))t.indexOf(r)<0&&C.call(e,r)&&(n[r]=e[r]);return n},T=18,E=40,D=`${E}px`,O=[`[data-lastpass-icon-root]`,`com-1password-button`,`[data-dashlanecreated]`,`[style$="2147483647 !important;"]`].join(`,`),k=g.createContext({}),A=g.forwardRef((e,t)=>{var n=e,{value:r,onChange:i,maxLength:a,textAlign:o=`left`,pattern:s,placeholder:c,inputMode:l=`numeric`,onComplete:u,pushPasswordManagerStrategy:d=`increase-width`,pasteTransformer:f,containerClassName:ee,noScriptCSSFallback:p=ce,render:m,children:_}=n,v=se(n,[`value`,`onChange`,`maxLength`,`textAlign`,`pattern`,`placeholder`,`inputMode`,`onComplete`,`pushPasswordManagerStrategy`,`pasteTransformer`,`containerClassName`,`noScriptCSSFallback`,`render`,`children`]),y;let[b,ie]=g.useState(typeof v.defaultValue==`string`?v.defaultValue:``),x=r??b,S=ne(x),C=g.useCallback(e=>{i?.(e),ie(e)},[i]),w=g.useMemo(()=>s?typeof s==`string`?new RegExp(s):s:null,[s]),T=g.useRef(null),E=g.useRef(null),D=g.useRef({value:x,onChange:C,isIOS:typeof window<`u`&&((y=window==null?void 0:window.CSS)?.supports)?.call(y,`-webkit-touch-callout`,`none`)}),O=g.useRef({prev:[T.current?.selectionStart,T.current?.selectionEnd,T.current?.selectionDirection]});g.useImperativeHandle(t,()=>T.current,[]),g.useEffect(()=>{let e=T.current,t=E.current;if(!e||!t)return;D.current.value!==e.value&&D.current.onChange(e.value),O.current.prev=[e.selectionStart,e.selectionEnd,e.selectionDirection];function n(){if(document.activeElement!==e){F(null),L(null);return}let t=e.selectionStart,n=e.selectionEnd,r=e.selectionDirection,i=e.maxLength,a=e.value,o=O.current.prev,s=-1,c=-1,l;if(a.length!==0&&t!==null&&n!==null){let e=t===n,r=t===a.length&&a.length<i;if(e&&!r){let e=t;if(e===0)s=0,c=1,l=`forward`;else if(e===i)s=e-1,c=e,l=`backward`;else if(i>1&&a.length>1){let t=0;if(o[0]!==null&&o[1]!==null){l=e<o[1]?`backward`:`forward`;let n=o[0]===o[1]&&o[0]<i;l===`backward`&&!n&&(t=-1)}s=t+e,c=t+e+1}}s!==-1&&c!==-1&&s!==c&&T.current.setSelectionRange(s,c,l)}let u=s===-1?t:s,d=c===-1?n:c,f=l??r;F(u),L(d),O.current.prev=[u,d,f]}if(document.addEventListener(`selectionchange`,n,{capture:!0}),n(),document.activeElement===e&&N(!0),!document.getElementById(`input-otp-style`)){let e=document.createElement(`style`);if(e.id=`input-otp-style`,document.head.appendChild(e),e.sheet){let t=`background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;`;h(e.sheet,`[data-input-otp]::selection { background: transparent !important; color: transparent !important; }`),h(e.sheet,`[data-input-otp]:autofill { ${t} }`),h(e.sheet,`[data-input-otp]:-webkit-autofill { ${t} }`),h(e.sheet,`@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }`),h(e.sheet,`[data-input-otp] + * { pointer-events: all !important; }`)}}let r=()=>{t&&t.style.setProperty(`--root-height`,`${e.clientHeight}px`)};r();let i=new ResizeObserver(r);return i.observe(e),()=>{document.removeEventListener(`selectionchange`,n,{capture:!0}),i.disconnect()}},[]);let[A,j]=g.useState(!1),[M,N]=g.useState(!1),[P,F]=g.useState(null),[I,L]=g.useState(null);g.useEffect(()=>{te(()=>{var e;(e=T.current)==null||e.dispatchEvent(new Event(`input`));let t=T.current?.selectionStart,n=T.current?.selectionEnd,r=T.current?.selectionDirection;t!==null&&n!==null&&(F(t),L(n),O.current.prev=[t,n,r])})},[x,M]),g.useEffect(()=>{S!==void 0&&x!==S&&S.length<a&&x.length===a&&u?.(x)},[a,u,S,x]);let R=re({containerRef:E,inputRef:T,pushPasswordManagerStrategy:d,isFocused:M}),z=g.useCallback(e=>{let t=e.currentTarget.value.slice(0,a);if(t.length>0&&w&&!w.test(t)){e.preventDefault();return}typeof S==`string`&&t.length<S.length&&document.dispatchEvent(new Event(`selectionchange`)),C(t)},[a,C,S,w]),B=g.useCallback(()=>{var e;if(T.current){let t=Math.min(T.current.value.length,a-1),n=T.current.value.length;(e=T.current)==null||e.setSelectionRange(t,n),F(t),L(n)}N(!0)},[a]),V=g.useCallback(e=>{let t=T.current;if(!f&&(!D.current.isIOS||!e.clipboardData||!t))return;let n=e.clipboardData.getData(`text/plain`),r=f?f(n):n;e.preventDefault();let i=T.current?.selectionStart,o=T.current?.selectionEnd,s=(i===o?x.slice(0,i)+r+x.slice(i):x.slice(0,i)+r+x.slice(o)).slice(0,a);if(s.length>0&&w&&!w.test(s))return;t.value=s,C(s);let c=Math.min(s.length,a-1),l=s.length;t.setSelectionRange(c,l),F(c),L(l)},[a,C,w,x]),H=g.useMemo(()=>({position:`relative`,cursor:v.disabled?`default`:`text`,userSelect:`none`,WebkitUserSelect:`none`,pointerEvents:`none`}),[v.disabled]),U=g.useMemo(()=>({position:`absolute`,inset:0,width:R.willPushPWMBadge?`calc(100% + ${R.PWM_BADGE_SPACE_WIDTH})`:`100%`,clipPath:R.willPushPWMBadge?`inset(0 ${R.PWM_BADGE_SPACE_WIDTH} 0 0)`:void 0,height:`100%`,display:`flex`,textAlign:o,opacity:`1`,color:`transparent`,pointerEvents:`all`,background:`transparent`,caretColor:`transparent`,border:`0 solid transparent`,outline:`0 solid transparent`,boxShadow:`none`,lineHeight:`1`,letterSpacing:`-.5em`,fontSize:`var(--root-height)`,fontFamily:`monospace`,fontVariantNumeric:`tabular-nums`}),[R.PWM_BADGE_SPACE_WIDTH,R.willPushPWMBadge,o]),W=g.useMemo(()=>g.createElement(`input`,oe(ae({autoComplete:v.autoComplete||`one-time-code`},v),{"data-input-otp":!0,"data-input-otp-placeholder-shown":x.length===0||void 0,"data-input-otp-mss":P,"data-input-otp-mse":I,inputMode:l,pattern:w?.source,"aria-placeholder":c,style:U,maxLength:a,value:x,ref:T,onPaste:e=>{var t;V(e),(t=v.onPaste)==null||t.call(v,e)},onChange:z,onMouseOver:e=>{var t;j(!0),(t=v.onMouseOver)==null||t.call(v,e)},onMouseLeave:e=>{var t;j(!1),(t=v.onMouseLeave)==null||t.call(v,e)},onFocus:e=>{var t;B(),(t=v.onFocus)==null||t.call(v,e)},onBlur:e=>{var t;N(!1),(t=v.onBlur)==null||t.call(v,e)}})),[z,B,V,l,U,a,I,P,v,w?.source,x]),G=g.useMemo(()=>({slots:Array.from({length:a}).map((e,t)=>{let n=M&&P!==null&&I!==null&&(P===I&&t===P||t>=P&&t<I),r=x[t]===void 0?null:x[t];return{char:r,placeholderChar:x[0]===void 0?c?.[t]??null:null,isActive:n,hasFakeCaret:n&&r===null}}),isFocused:M,isHovering:!v.disabled&&A}),[M,A,a,I,P,v.disabled,x]),K=g.useMemo(()=>m?m(G):g.createElement(k.Provider,{value:G},_),[_,G,m]);return g.createElement(g.Fragment,null,p!==null&&g.createElement(`noscript`,null,g.createElement(`style`,null,p)),g.createElement(`div`,{ref:E,"data-input-otp-container":!0,style:H,className:ee},K,g.createElement(`div`,{style:{position:`absolute`,inset:0,pointerEvents:`none`}},W)))}),A.displayName=`Input`,ce=`
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`,j=`^\\d+$`})),N,P,F,I,L,R,z,B,V,H,U=e((()=>{N=`_container_1w2en_14`,P=`_input_1w2en_23`,F=`_group_1w2en_31`,I=`_slot_1w2en_45`,L=`_caretWrap_1w2en_91`,R=`_caret_1w2en_91`,z=`_caretBlink_1w2en_1`,B=`_separator_1w2en_107`,V=`_srOnly_1w2en_117`,H={container:N,input:P,group:F,slot:I,caretWrap:L,caret:R,caretBlink:z,separator:B,srOnly:V}}));function W({className:e,containerClassName:t,value:n,defaultValue:r,onChange:i,maxLength:a,completeAnnouncement:s=`Verification code complete`,...c}){let[l,u]=le.useState(()=>typeof r==`string`?r:``),d=n===void 0?l:n;return(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(A,{"data-slot":`input-otp`,containerClassName:o(H.container,t),spellCheck:!1,className:o(H.input,e),...c,value:n,defaultValue:r,maxLength:a,onChange:e=>{n===void 0&&u(e),i?.(e)}}),(0,J.jsx)(`div`,{"data-slot":`input-otp-status`,role:`status`,"aria-live":`polite`,"aria-atomic":!0,className:H.srOnly,children:d.length===a?s:``})]})}function G({className:e,...t}){return(0,J.jsx)(`div`,{"data-slot":`input-otp-group`,className:o(H.group,e),...t})}function K({index:e,className:t,...n}){let{char:r,hasFakeCaret:i,isActive:a}=le.useContext(k)?.slots[e]??{};return(0,J.jsxs)(`div`,{"data-slot":`input-otp-slot`,"data-active":a,className:o(H.slot,t),...n,children:[r,i?(0,J.jsx)(`div`,{className:H.caretWrap,children:(0,J.jsx)(`div`,{className:H.caret})}):null]})}function q({...e}){return(0,J.jsx)(`div`,{"data-slot":`input-otp-separator`,className:H.separator,role:`separator`,...e,children:(0,J.jsx)(c,{})})}var le,J,ue=e((()=>{le=t(n(),1),M(),l(),i(),U(),J=r(),W.__docgenInfo={description:``,methods:[],displayName:`InputOTP`,props:{containerClassName:{required:!1,tsType:{name:`string`},description:``},completeAnnouncement:{required:!1,tsType:{name:`string`},description:`Screen-reader announcement when every slot is filled, including after paste.`,defaultValue:{value:`'Verification code complete'`,computed:!1}}}},G.__docgenInfo={description:``,methods:[],displayName:`InputOTPGroup`},K.__docgenInfo={description:``,methods:[],displayName:`InputOTPSlot`,props:{index:{required:!0,tsType:{name:`number`},description:``}}},q.__docgenInfo={description:``,methods:[],displayName:`InputOTPSeparator`}})),de,Y,fe,X,Z,Q,$,pe;e((()=>{de=t(n(),1),a(),M(),d(),m(),ue(),Y=r(),fe={title:`Components/InputOTP`,tags:[`a11y-gap`],component:W,parameters:{docs:{description:{component:s.docs.description}},design:{type:`figma`,url:`https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=430-17451&t=e05qWfQcPmc0GJEw-4`}},argTypes:{completeAnnouncement:{control:`text`,description:`Screen-reader announcement when every slot is filled, including after paste.`}}},X={args:{maxLength:6,children:null},render:()=>(0,Y.jsx)(W,{maxLength:6,"aria-label":`One-time password`,children:(0,Y.jsxs)(G,{children:[(0,Y.jsx)(K,{index:0}),(0,Y.jsx)(K,{index:1}),(0,Y.jsx)(K,{index:2}),(0,Y.jsx)(K,{index:3}),(0,Y.jsx)(K,{index:4}),(0,Y.jsx)(K,{index:5})]})})},Z={args:{maxLength:6,children:null},render:()=>(0,Y.jsxs)(W,{maxLength:6,"aria-label":`One-time password`,children:[(0,Y.jsxs)(G,{children:[(0,Y.jsx)(K,{index:0}),(0,Y.jsx)(K,{index:1}),(0,Y.jsx)(K,{index:2})]}),(0,Y.jsx)(q,{}),(0,Y.jsxs)(G,{children:[(0,Y.jsx)(K,{index:3}),(0,Y.jsx)(K,{index:4}),(0,Y.jsx)(K,{index:5})]})]})},Q={args:{maxLength:6,children:null},render:()=>(0,Y.jsxs)(W,{maxLength:6,disabled:!0,defaultValue:`123456`,"aria-label":`One-time password`,children:[(0,Y.jsxs)(G,{children:[(0,Y.jsx)(K,{index:0}),(0,Y.jsx)(K,{index:1}),(0,Y.jsx)(K,{index:2})]}),(0,Y.jsx)(q,{}),(0,Y.jsxs)(G,{children:[(0,Y.jsx)(K,{index:3}),(0,Y.jsx)(K,{index:4}),(0,Y.jsx)(K,{index:5})]})]})},$={args:{maxLength:6,children:null},render:()=>{let[e,t]=(0,de.useState)(``),[n,r]=(0,de.useState)(``);return(0,Y.jsxs)(p,{className:`w-72`,children:[(0,Y.jsx)(f,{htmlFor:`otp`,children:`Verification code`}),(0,Y.jsxs)(W,{id:`otp`,maxLength:6,pattern:j,value:e,onChange:t,onComplete:r,children:[(0,Y.jsxs)(G,{children:[(0,Y.jsx)(K,{index:0}),(0,Y.jsx)(K,{index:1}),(0,Y.jsx)(K,{index:2})]}),(0,Y.jsx)(q,{}),(0,Y.jsxs)(G,{children:[(0,Y.jsx)(K,{index:3}),(0,Y.jsx)(K,{index:4}),(0,Y.jsx)(K,{index:5})]})]}),(0,Y.jsx)(ee,{children:n?`Code ${n} verified.`:`Enter the 6-digit code sent to your email.`}),(0,Y.jsx)(u,{disabled:e.length<6,children:`Verify`})]})}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    maxLength: 6,
    children: null
  },
  render: () => <InputOTP maxLength={6} aria-label="One-time password">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...X.parameters?.docs?.source},description:{story:"The default 6-digit OTP input. `maxLength`/`disabled` aren't exposed as live\ncontrols — the underlying `input-otp` library also defines its own `render` prop,\nwhich collides with Storybook's own `render` story field when spread through\n`{...args}`, so this story hardcodes its props instead.",...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    maxLength: 6,
    children: null
  },
  render: () => <InputOTP maxLength={6} aria-label="One-time password">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...Z.parameters?.docs?.source},description:{story:`Slots split into two groups with a separator, the common six-digit layout.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    maxLength: 6,
    children: null
  },
  render: () => <InputOTP maxLength={6} disabled defaultValue="123456" aria-label="One-time password">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
}`,...Q.parameters?.docs?.source},description:{story:`Disabled state, pre-filled with a value.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    maxLength: 6,
    children: null
  },
  render: () => {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState('');
    return <Field className="w-72">
        <FieldLabel htmlFor="otp">Verification code</FieldLabel>
        <InputOTP id="otp" maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={value} onChange={setValue} onComplete={setSubmitted}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          {submitted ? \`Code \${submitted} verified.\` : 'Enter the 6-digit code sent to your email.'}
        </FieldDescription>
        <Button disabled={value.length < 6}>Verify</Button>
      </Field>;
  }
}`,...$.parameters?.docs?.source},description:{story:`A realistic composed example: a labelled, digit-only verification code field that
enables its submit button once all slots are filled.`,...$.parameters?.docs?.description}}},pe=[`Default`,`WithSeparator`,`Disabled`,`VerificationForm`]}))();export{X as Default,Q as Disabled,$ as VerificationForm,Z as WithSeparator,pe as __namedExportsOrder,fe as default};
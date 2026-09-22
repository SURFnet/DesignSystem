import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{O as n}from"./iframe-CbBuQ8p6.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{Zt as i,r as a}from"./utils-C5n3ayfX.js";import{t as o}from"./button-C7hzrQPx.js";import{t as s}from"./button-C6o-rz-l.js";import{r as c,t as l}from"./card-COHUMxdJ.js";import{t as u}from"./card-CdoXr9F4.js";import{n as d,o as f,s as p,t as m}from"./popover-v-bsUqEE.js";import{n as h,t as g}from"./calendar-D3wmAuiW.js";var _,v,y,b,x,S,C,w,T,E,D,O,k,A;e((()=>{_=t(n(),1),a(),s(),u(),p(),h(),v=r(),y={title:`Components/Calendar`,component:g,parameters:{docs:{description:{component:i.docs.description}}},argTypes:{captionLayout:{control:`select`,options:[`label`,`dropdown`,`dropdown-months`,`dropdown-years`],description:`How the month/year caption is rendered — a plain label or dropdown selectors.`,table:{defaultValue:{summary:`label`}}},showOutsideDays:{control:`boolean`,description:`Show the leading/trailing days of adjacent months to fill out the grid.`,table:{defaultValue:{summary:`true`}}}},args:{captionLayout:`label`,showOutsideDays:!0}},b={},x={render:function(){let[e,t]=_.useState(new Date);return(0,v.jsx)(g,{mode:`single`,selected:e,onSelect:t,className:`rounded-md ring-1 ring-foreground/10`})}},S={render:function(){let[e,t]=_.useState(void 0);return(0,v.jsx)(g,{mode:`multiple`,selected:e,onSelect:t,className:`rounded-md ring-1 ring-foreground/10`})}},C={render:function(){let[e,t]=_.useState(void 0);return(0,v.jsx)(g,{mode:`range`,selected:e,onSelect:t,className:`rounded-md ring-1 ring-foreground/10`})}},w={render:function(){let[e,t]=_.useState(void 0);return(0,v.jsx)(g,{mode:`range`,numberOfMonths:2,selected:e,onSelect:t,className:`rounded-md ring-1 ring-foreground/10`})}},T={render:function(){let[e,t]=_.useState(new Date);return(0,v.jsx)(g,{mode:`single`,captionLayout:`dropdown`,selected:e,onSelect:t,className:`rounded-md ring-1 ring-foreground/10`})}},E={render:function(){let[e,t]=_.useState(void 0);return(0,v.jsx)(g,{mode:`single`,selected:e,onSelect:t,disabled:{dayOfWeek:[0,6]},className:`rounded-md ring-1 ring-foreground/10`})}},D={render:function(){let[e,t]=_.useState(void 0);return(0,v.jsx)(g,{mode:`single`,selected:e,onSelect:t,footer:e?`Selected: ${e.toLocaleDateString()}`:`Pick a day.`,className:`rounded-md ring-1 ring-foreground/10`})}},O={render:function(){let[e,t]=_.useState(new Date);return(0,v.jsx)(l,{className:`w-fit p-0`,children:(0,v.jsx)(c,{className:`px-0`,children:(0,v.jsx)(g,{mode:`single`,selected:e,onSelect:t})})})}},k={render:function(){let[e,t]=_.useState(void 0);return(0,v.jsxs)(m,{children:[(0,v.jsx)(f,{render:(0,v.jsx)(o,{variant:`outline`,className:`w-56 justify-start font-normal`}),children:e?e.toLocaleDateString():`Pick a date`}),(0,v.jsx)(d,{className:`w-auto p-0`,align:`start`,children:(0,v.jsx)(g,{mode:`single`,selected:e,onSelect:t})})]})}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source},description:{story:`A plain month grid with no selection wired up — tweak the caption and outside-days controls.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: function SingleCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md ring-1 ring-foreground/10" />;
  }
}`,...x.parameters?.docs?.source},description:{story:`Single-date selection, the most common mode, driven by React state.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: function MultipleCalendar() {
    const [dates, setDates] = React.useState<Date[] | undefined>(undefined);
    return <Calendar mode="multiple" selected={dates} onSelect={setDates} className="rounded-md ring-1 ring-foreground/10" />;
  }
}`,...S.parameters?.docs?.source},description:{story:`Multiple, individually toggled dates.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: function RangeCalendar() {
    const [range, setRange] = React.useState<DateRange | undefined>(undefined);
    return <Calendar mode="range" selected={range} onSelect={setRange} className="rounded-md ring-1 ring-foreground/10" />;
  }
}`,...C.parameters?.docs?.source},description:{story:`A contiguous range with a start and end date.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: function TwoMonthsCalendar() {
    const [range, setRange] = React.useState<DateRange | undefined>(undefined);
    return <Calendar mode="range" numberOfMonths={2} selected={range} onSelect={setRange} className="rounded-md ring-1 ring-foreground/10" />;
  }
}`,...w.parameters?.docs?.source},description:{story:`Two months side by side — the layout typically used for a date-range picker.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: function DropdownCaptionCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Calendar mode="single" captionLayout="dropdown" selected={date} onSelect={setDate} className="rounded-md ring-1 ring-foreground/10" />;
  }
}`,...T.parameters?.docs?.source},description:{story:`Dropdown month/year selectors instead of a static caption — useful for jumping across years (e.g. a birthdate field).`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: function DisabledDatesCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return <Calendar mode="single" selected={date} onSelect={setDate} disabled={{
      dayOfWeek: [0, 6]
    }} className="rounded-md ring-1 ring-foreground/10" />;
  }
}`,...E.parameters?.docs?.source},description:{story:`Weekends disabled via a day-of-week matcher — disabled days cannot be selected.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: function WithFooterCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return <Calendar mode="single" selected={date} onSelect={setDate} footer={date ? \`Selected: \${date.toLocaleDateString()}\` : 'Pick a day.'} className="rounded-md ring-1 ring-foreground/10" />;
  }
}`,...D.parameters?.docs?.source},description:{story:`A footer acting as a live region, announcing the current selection — recommended for accessibility.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: function CalendarInCard() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Card className="w-fit p-0">
        <CardContent className="px-0">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </CardContent>
      </Card>;
  }
}`,...O.parameters?.docs?.source},description:{story:`Composed inside a Card — the calendar's own styles already treat a parent
\`data-slot="card-content"\` as transparent, so it blends with the card background.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: function CalendarInPopover() {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return <Popover>
        <PopoverTrigger render={<Button variant="outline" className="w-56 justify-start font-normal" />}>
          {date ? date.toLocaleDateString() : 'Pick a date'}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>;
  }
}`,...k.parameters?.docs?.source},description:{story:"Composed inside a Popover trigger — the classic date-picker anatomy (trigger + popover\ncontent). See the dedicated `DatePicker` component for a ready-made version of this pattern.",...k.parameters?.docs?.description}}},A=[`Default`,`Single`,`Multiple`,`Range`,`TwoMonths`,`DropdownCaption`,`DisabledDates`,`WithFooter`,`InCard`,`InPopover`]}))();export{b as Default,E as DisabledDates,T as DropdownCaption,O as InCard,k as InPopover,S as Multiple,C as Range,x as Single,w as TwoMonths,D as WithFooter,A as __namedExportsOrder,y as default};
import{r as e,R as t,j as i}from"./react-vendor-mP65msGK.js";import{B as a}from"./Block-BD7PERss.js";import{d as n}from"./styled-DA0GsMuf.js";import{B as r,T as s,L as l}from"./index-D7FjMF91.js";import{c as o,P as d,p as c}from"./icons-CVa_ZadQ.js";import{G as m}from"./functions-CCafmNLR.js";import"./vendor-DOAUwEz1.js";const p=n(r)`
    flex-direction: column;
    flex: 0 0 auto;
    width: calc(16.666% - 25px);
    min-width: 180px;
    max-width: 250px;
    justify-content: flex-start;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 249, 250, 0.6));
    border-radius: 25px;
    padding: 20px;
    transition: all 0.3s ease;
    border: 1px solid transparent;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        border-color: #28a745;
    }
    
    @media (max-width: 1400px) {
        width: calc(20% - 24px);
    }
    
    @media (max-width: 1200px) {
        width: calc(25% - 22.5px);
    }
    
    @media (max-width: 992px) {
        width: calc(33.333% - 20px);
    }
    
    @media (max-width: 768px) {
        width: calc(50% - 15px);
        min-width: 160px;
        padding: 15px;
    }
    
    @media (max-width: 900px) and (orientation: landscape) {
        width: calc(33.333% - 20px);
        min-width: 140px;
        padding: 12px;
    }
    
    @media (max-width: 480px) {
        width: 100%;
        min-width: unset;
        max-width: 100%;
        margin: 0;
    }
`,x=e.memo(n=>{const r=t.useRef(null),[l,c]=e.useState(52);return e.useEffect(()=>{if(r.current){const e=r.current.offsetHeight;c(.35*e)}},[]),i.jsxs(p,{children:[n.src&&i.jsx("img",{style:{width:"150px",height:"150px",objectFit:"cover",objectPosition:"center top",borderRadius:"50%"},src:n.src,loading:"lazy"}),!n.src&&i.jsxs(a,{ref:r,style:{width:"150px",height:"150px",borderRadius:"50%",backgroundColor:n.name.name?"#28a745":"#28a7465d",gap:0,justifyContent:"center",padding:0},children:[n.name.name&&n.name.patronymic&&i.jsxs(i.Fragment,{children:[i.jsx(s,{style:{color:"white",fontSize:l},children:n.name.name[0].toUpperCase()}),i.jsx(s,{style:{color:"white",fontSize:l},children:n.name.patronymic[0].toUpperCase()})]}),!n.name.name&&i.jsx(s,{style:{color:"white",fontSize:l},children:"..."})]}),i.jsxs(a,{style:{flexDirection:"column",gap:5,padding:0},children:[i.jsx(s,{bold:"bolder",style:{textAlign:"center"},children:n.name.surname}),i.jsxs(s,{bold:"bolder",style:{textAlign:"center"},children:[n.name.name," ",n.name.patronymic?` ${n.name.patronymic}`:""]}),i.jsx(s,{style:{color:"#4e8c51",textAlign:"center",marginTop:5},children:n.job_title})]}),(n.email||n.phone)&&i.jsxs(a,{style:{flexDirection:"column",gap:10,padding:0,marginTop:5},children:[n.email&&i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[i.jsx(o,{style:{width:"1rem",height:"1rem",color:"#28a745"}}),i.jsx(s,{children:n.email})]}),n.phone&&n.phone.map((e,t)=>i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[i.jsx(d,{style:{width:"1rem",height:"1rem",color:"#28a745"}}),i.jsx(s,{children:e})]},t))]})]})}),h=n(r)`
    flex-direction: column;
    padding: 20px;
    
    @media (max-width: 768px) {
        padding: 15px 10px;
    }
`,g=n.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    animation: fadeIn 0.6s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`,j=e=>i.jsxs(p,{style:{gap:10},children:[e.src&&i.jsx("img",{style:{width:"150px",height:"150px",maxWidth:"100%",objectFit:"cover",objectPosition:"center top"},src:`departments/${e.src}`,alt:e.name}),i.jsx(s,{style:{textAlign:"center"},bold:"bolder",children:e.name}),(e.email||e.phone||e.fax)&&i.jsxs(a,{style:{flexDirection:"column",gap:10,padding:0},children:[e.email&&i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[i.jsx(o,{style:{width:"1rem",height:"1rem",color:"#28a745"}}),i.jsx(s,{children:e.email})]}),e.phone&&e.phone.map((e,t)=>i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[i.jsx(d,{style:{width:"1rem",height:"1rem",color:"#28a745"}}),i.jsx(s,{children:e})]},t)),e.fax&&e.fax.map((e,t)=>i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[i.jsx(c,{style:{width:"1rem",height:"1rem",color:"#28a745"}}),i.jsxs(s,{children:[e," (факс)"]})]},t))]})]}),y=()=>i.jsx("iframe",{src:"https://yandex.ru/map-widget/v1/?um=constructor%3Afbbfce6fbec3e826b84037d585245ed917a16c8e49cd4fb79e3c33bbb39b86b0&source=constructor",width:"100%",height:"404",frameBorder:"0",style:{borderRadius:10,maxWidth:"100%",minHeight:"300px"}}),f=()=>{const[t,n]=e.useState([]),[r,o]=e.useState([]),[d,c]=e.useState([]),[p,f]=e.useState([]),[b,u]=e.useState([]),[w,_]=e.useState(!1);e.useEffect(()=>{v()},[]);const v=async()=>{_(!0);try{await Promise.all([S(),I(),C(),k()])}catch(e){}finally{_(!1)}},S=async()=>{try{const e=await m("contacts"),t=["Директор","Первый заместитель директора - Главный инженер","Заместитель директора"],i=e.filter(e=>t.includes(e.job_title||"")).sort((e,t)=>{const i={"Директор":1,"Первый заместитель директора - Главный инженер":2,"Заместитель директора":3};return(i[e.job_title||""]||999)-(i[t.job_title||""]||999)});o(i),n(e.filter(e=>!t.includes(e.job_title||"")))}catch(e){}},I=async()=>{try{const e=await m("phone_contacts");c(e)}catch(e){}},C=async()=>{try{const e=await m("departments");f(e)}catch(e){}},k=async()=>{try{const e=await m("phone_departments");u(e)}catch(e){}};return i.jsxs(h,{children:[w&&i.jsx(l,{}),!w&&i.jsxs(g,{children:[i.jsx(s,{bold:"bolder",style:{color:"rgb(40, 167, 69)",fontSize:24},children:"Руководящий состав"}),r&&r.length>0&&i.jsx(a,{style:{gap:30,alignItems:"stretch",justifyContent:"center",width:"100%"},children:r.map(e=>i.jsx(x,{src:e.src,name:{name:e.name,surname:e.surname,patronymic:e.patronymic},job_title:e.job_title||"",email:e.email,phone:d.filter(t=>t.contact_id===e.id).map(e=>e.phone)},e.id))}),i.jsx(a,{style:{height:1,padding:0,width:"90%",backgroundColor:"rgb(40, 167, 69)"}}),t&&t.length>0&&i.jsx(a,{style:{gap:30,alignItems:"stretch",justifyContent:"center",width:"100%"},children:t.sort(e=>e.name?-1:1).map(e=>i.jsx(x,{src:e.src,name:{name:e.name,surname:e.surname,patronymic:e.patronymic},job_title:e.job_title||"",email:e.email,phone:d.filter(t=>t.contact_id===e.id).map(e=>e.phone)},e.id))}),i.jsx(a,{style:{height:2,padding:0,width:"90%",backgroundColor:"rgb(40, 167, 69)"}}),i.jsx(s,{bold:"bolder",style:{color:"rgb(40, 167, 69)",fontSize:24},children:"Отделы"}),i.jsx(a,{style:{gap:30,alignItems:"stretch",justifyContent:"center",width:"100%"},children:p.map((e,t)=>i.jsx(j,{name:e.name,email:e.email,src:e.src,phone:b.filter(t=>t.id_department===e.id&&!Number(t.is_fax)).map(e=>e.phone),fax:b.filter(t=>t.id_department===e.id&&Number(t.is_fax)).map(e=>e.phone)},t))}),i.jsx(a,{style:{height:1.5,padding:0,width:"90%",backgroundColor:"rgb(40, 167, 69)"}}),i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:20,marginTop:5,width:"90%",alignItems:"center"},children:[i.jsx(s,{bold:"bolder",style:{fontSize:"1.4rem",color:"rgb(40, 167, 69)",textAlign:"center"},children:"Мы находимся по адресу: г. Буда-Кошелёво, ул. Озёрная 3а"}),i.jsx(y,{})]})]})]})};export{f as default};

import{r as e,j as s}from"./react-vendor-mP65msGK.js";import{d as t}from"./styled-DA0GsMuf.js";import{H as r}from"./H1-9kKnwnEv.js";import{L as a,T as i,a as n}from"./index-D7FjMF91.js";import{B as o}from"./Block-BD7PERss.js";import{a3 as l,a4 as c}from"./icons-CVa_ZadQ.js";import"./vendor-DOAUwEz1.js";const d=t.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`,h=t.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`,p=t.p`
  color: #ff4d4f;
  margin: 0;
  font-size: 14px;
`,x=t.table`
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
`,j=t.th`
  text-align: left;
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
  color: #495057;
`,m=t.td`
  padding: 12px 16px;
  border-bottom: 1px solid #dee2e6;
  vertical-align: middle;
`,u=t.tr`
  transition: background 0.15s ease;
  
  &:hover {
    background: #f8fff9;
  }
`,f=t.button`
  background: #28a745;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background: #218838;
    transform: scale(1.05);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,b=()=>{const[t,r]=e.useState([]),[d,h]=e.useState([]),[p,b]=e.useState([]),[g,y]=e.useState([]),[k,w]=e.useState([]),[S,v]=e.useState(!0),[C,z]=e.useState("");return e.useEffect(()=>{(async()=>{v(!0),z("");try{const e=localStorage.getItem("adminToken"),[s,t,a,i]=await Promise.all([fetch("/backend/api.php/api/contacts",{headers:{Authorization:`Bearer ${e}`}}),fetch("/backend/api.php/api/phone_contacts",{headers:{Authorization:`Bearer ${e}`}}),fetch("/backend/api.php/api/departments",{headers:{Authorization:`Bearer ${e}`}}),fetch("/backend/api.php/api/phone_departments",{headers:{Authorization:`Bearer ${e}`}})]),n=await s.json(),o=await t.json(),l=await a.json(),c=await i.json();r(n.filter(e=>!e.is_primary)||[]),h(n.filter(e=>e.is_primary)||[]),b(o||[]),y(l||[]),w(c||[])}catch(e){z("Ошибка подключения к серверу")}finally{v(!1)}})()},[]),S?s.jsx(a,{}):C?s.jsx(i,{style:{color:"#dc3545",textAlign:"center"},children:C}):s.jsxs(s.Fragment,{children:[s.jsxs(o,{style:{justifyContent:"space-between",alignItems:"center"},children:[s.jsx(i,{bold:"bolder",style:{color:"rgb(40, 167, 69)",fontSize:24},children:"Сотрудники"}),s.jsxs(n,{style:{backgroundColor:"#28a745"},children:[s.jsx(l,{size:16,style:{marginRight:6}})," Добавить сотрудника"]})]}),s.jsxs(x,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx(j,{children:"Фамилия"}),s.jsx(j,{children:"Имя"}),s.jsx(j,{children:"Должность"}),s.jsx(j,{children:"Телефоны"}),s.jsx(j,{children:"Email"}),s.jsx(j,{style:{width:50}})]})}),s.jsx("tbody",{children:[...d,...t].map(e=>s.jsxs(u,{children:[s.jsx(m,{children:e.surname}),s.jsxs(m,{children:[e.name," ",e.patronymic||""]}),s.jsx(m,{children:e.job_title||"-"}),s.jsx(m,{children:p.filter(s=>s.contact_id===e.id).map(e=>e.phone).join(", ")||"-"}),s.jsx(m,{children:e.email||"-"}),s.jsx(m,{children:s.jsx(f,{onClick:()=>{},children:s.jsx(c,{})})})]},e.id))})]}),s.jsx("br",{}),s.jsxs(o,{style:{justifyContent:"space-between",alignItems:"center"},children:[s.jsx(i,{bold:"bolder",style:{color:"rgb(40, 167, 69)",fontSize:24},children:"Отделы"}),s.jsxs(n,{style:{backgroundColor:"#28a745"},children:[s.jsx(l,{size:16,style:{marginRight:6}})," Добавить отдел"]})]}),s.jsxs(x,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx(j,{children:"Название"}),s.jsx(j,{children:"Телефоны"}),s.jsx(j,{children:"Email"}),s.jsx(j,{style:{width:50}})]})}),s.jsx("tbody",{children:g.map(e=>s.jsxs(u,{children:[s.jsx(m,{children:e.name}),s.jsx(m,{children:k.filter(s=>s.id_department===e.id).map(e=>e.phone).join(", ")||"-"}),s.jsx(m,{children:e.email||"-"}),s.jsx(m,{children:s.jsx(f,{onClick:()=>{},children:s.jsx(c,{})})})]},e.id))})]})]})},g=()=>{const[t,a]=e.useState(""),[i,l]=e.useState(!1),[c,x]=e.useState(""),[j,m]=e.useState(!1),[u,f]=e.useState("contacts");e.useEffect(()=>{localStorage.getItem("adminToken")&&l(!0)},[]);const g=e.useCallback(async e=>{if(e.preventDefault(),t.trim()){m(!0),x("");try{const e=await fetch("/backend/api.php/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t})}),s=await e.json();e.ok&&s.success?(l(!0),localStorage.setItem("adminToken",s.token),a("")):x(s.message||"Неверный пароль")}catch(s){x("Ошибка при подключении к серверу")}finally{m(!1)}}else x("Введите пароль")},[t]),y=e.useCallback(()=>{l(!1),localStorage.removeItem("adminToken"),a(""),x(""),f("contacts")},[]),k=e.useMemo(()=>[{key:"contacts",label:"Контакты"},{key:"services",label:"Услуги"},{key:"documents",label:"Документы"},{key:"news",label:"Новости"}],[]),w=e.useMemo(()=>{switch(u){case"contacts":return s.jsx(b,{});case"services":return s.jsx("p",{children:"Редактирование услуг"});case"documents":return s.jsx("p",{children:"Редактирование документов"});case"news":return s.jsx("p",{children:"Редактирование новостей"});default:return s.jsx("p",{children:"Выберите раздел для редактирования"})}},[u]);return i?s.jsxs("div",{children:[s.jsx(r,{children:"Панель управления"}),s.jsx(o,{style:{gap:10,marginBottom:20,flexWrap:"wrap"},children:k.map(e=>s.jsx(n,{onClick:()=>f(e.key),style:{backgroundColor:u===e.key?"#28a745":"#6c757d"},"aria-pressed":u===e.key,children:e.label},e.key))}),s.jsx(o,{children:w}),s.jsx(n,{onClick:y,style:{marginTop:"20px"},children:"Выйти"})]}):s.jsxs("div",{children:[s.jsx(r,{children:"Вход в панель управления"}),s.jsxs(d,{onSubmit:g,children:[s.jsx(h,{type:"password",placeholder:"Введите пароль",value:t,onChange:e=>a(e.target.value),disabled:j,autoComplete:"current-password"}),c&&s.jsx(p,{role:"alert",children:c}),s.jsx(n,{style:{opacity:j?.7:1},children:j?"Загрузка...":"Войти"})]})]})};export{g as default};

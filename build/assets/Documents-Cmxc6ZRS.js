import{j as e,r as a}from"./react-vendor-mP65msGK.js";import{d as i}from"./styled-DA0GsMuf.js";import{B as t,L as r}from"./index-D7FjMF91.js";import{G as o}from"./functions-CCafmNLR.js";import{H as n}from"./H2-DmeoaPza.js";import{q as s,r as d,l as p,s as x,t as h}from"./icons-CVa_ZadQ.js";import{H as l}from"./H1-9kKnwnEv.js";import"./vendor-DOAUwEz1.js";const c=i.div`
    max-width: 90%;
    width: 100%;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    @media (max-width: 768px) {
        max-width: 95%;
    }
`,m=i.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.1);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    transition: all 0.3s ease-in-out;
    
    &:focus-within {
        border-color: #28a745;
        box-shadow: 0 4px 16px rgba(40, 167, 69, 0.25);
    }
    
    .search-icon {
        flex-shrink: 0;
    }
    
    @media (max-width: 768px) {
        padding: 10px 16px;
        gap: 10px;
    }
    
    @media (max-width: 480px) {
        padding: 8px 12px;
        border-radius: 10px;
        
        .search-icon {
            width: 18px !important;
            height: 18px !important;
        }
    }
`,g=i.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    color: #212529;
    
    &::placeholder {
        color: #6c757d;
    }
    
    @media (max-width: 768px) {
        font-size: 0.9375rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.875rem;
    }
`,f=i(t)`
    max-width: 90%;
    width: 100%;
    margin: 20px auto;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: 24px;
    
    @media (max-width: 1024px) {
        gap: 20px;
    }
    
    @media (max-width: 768px) {
        max-width: 95%;
        flex-direction: column;
        gap: 16px;
    }
    
    @media (max-width: 480px) {
        padding: 0 12px;
        margin: 16px auto;
    }
`,u=i(t)`
    flex-direction: column;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.1);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    padding: 10px;
    gap: 8px;
    height: fit-content;
    position: sticky;
    top: 20px;
    min-width: 250px;
    width: 250px;
    flex-shrink: 0;
    
    @media (max-width: 1024px) {
        min-width: 220px;
        width: 220px;
    }
    
    @media (max-width: 768px) {
        position: static;
        min-width: 100%;
        width: 100%;
        max-width: 100%;
        padding: 12px;
    }
    
    @media (max-width: 480px) {
        border-radius: 16px;
        padding: 10px;
    }
`;i.h3`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 12px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #e7f3e9;
`;const w=i.button`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 10px;
    background: ${e=>e.$isActive?"#28a745":"white"};
    color: ${e=>e.$isActive?"white":"#495057"};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.9375rem;
    font-weight: ${e=>e.$isActive?600:500};
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: ${e=>e.$isActive?"0 4px 12px rgba(40, 167, 69, 0.3)":"0 2px 4px rgba(0, 0, 0, 0.05)"};
    border: 1px solid ${e=>e.$isActive?"transparent":"rgba(40, 167, 69, 0.1)"};
    
    &:hover {
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
        background: ${e=>e.$isActive?"#28a745":"#e7f3e9"};
        color: ${e=>e.$isActive?"white":"#0c3e14"};
        border-color: ${e=>e.$isActive?"transparent":"#28a745"};
    }
    
    &:active {
        transform: translateX(2px);
        box-shadow: 0 2px 6px rgba(40, 167, 69, 0.2);
    }
    
    svg {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
    }
    
    span {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    @media (max-width: 768px) {
        &:hover {
            transform: none;
        }
        
        span {
            white-space: normal;
            word-break: break-word;
        }
    }
    
    @media (max-width: 480px) {
        padding: 10px 14px;
        font-size: 0.875rem;
        gap: 10px;
        
        svg {
            width: 18px;
            height: 18px;
        }
    }
`,b=i.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    padding: 0 8px;
    border-radius: 12px;
    background: ${e=>e.$isActive?"rgba(255, 255, 255, 0.2)":"#e7f3e9"};
    color: ${e=>e.$isActive?"white":"#28a745"};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    flex-shrink: 0;
`,v=a=>e.jsxs(u,{children:[e.jsx(n,{children:"Категории"}),a.groups&&a.groups.map((i,t)=>{const r=(o=i.id,a.documents.filter(e=>{const i=e.id_group===o,t=""===a.searchQuery||e.name.toLowerCase().includes(a.searchQuery.toLowerCase());return i&&t}).length);var o;return e.jsxs(w,{$isActive:a.selectedGroup?.id===i.id,onClick:()=>a.setSelectedGroup(i),children:[e.jsx(s,{style:{width:20,height:20}}),e.jsx("span",{children:i.name}),e.jsx(b,{$isActive:a.selectedGroup?.id===i.id,children:r})]},t)})]}),j=i(t)`
    flex-direction: column;
    gap: 16px;
    padding: 0;
    background: transparent;
    box-shadow: none;
    align-items: stretch;
    height: fit-content;
    flex: 1;
    
    @media (max-width: 768px) {
        gap: 12px;
        width: 100%;
    }
    
    @media (max-width: 480px) {
        gap: 10px;
    }
`,y=i.a`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.1);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    text-decoration: none;
    color: #495057;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: #28a745;
        transform: scaleY(0);
        transition: transform 0.3s ease-in-out;
    }
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(40, 167, 69, 0.25);
        border-color: #28a745;
        
        &::before {
            transform: scaleY(1);
        }
    }
    
    &:active {
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        gap: 14px;
        padding: 16px;
        
        &:hover {
            transform: translateY(-2px);
        }
    }
    
    @media (max-width: 480px) {
        gap: 12px;
        padding: 14px;
        border-radius: 10px;
        
        &:hover {
            transform: none;
        }
        
        &:active {
            transform: scale(0.98);
        }
    }
`,k=i.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: #e7f3e9;
    color: #28a745;
    flex-shrink: 0;
    
    svg {
        width: 24px;
        height: 24px;
    }
    
    @media (max-width: 480px) {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        
        svg {
            width: 20px;
            height: 20px;
        }
    }
`,$=i.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
`,z=i.span`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #212529;
    word-break: break-word;
    
    @media (max-width: 768px) {
        font-size: 0.9375rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.875rem;
    }
`,S=i.span`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.875rem;
    color: #6c757d;
    
    @media (max-width: 480px) {
        font-size: 0.8125rem;
    }
`,G=i.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #e7f3e9;
    color: #28a745;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    flex-shrink: 0;
    
    svg {
        width: 20px;
        height: 20px;
    }
    
    &:hover {
        background: #28a745;
        color: white;
        transform: scale(1.1);
    }
    
    &:active {
        transform: scale(0.95);
    }
    
    @media (max-width: 480px) {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        
        svg {
            width: 18px;
            height: 18px;
        }
        
        &:hover {
            transform: none;
            background: #28a745;
            color: white;
        }
    }
`,A=i.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    text-align: center;
    color: #6c757d;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    height: 100%;
    border-radius: 12px;
    
    svg {
        width: 64px;
        height: 64px;
        margin-bottom: 16px;
        opacity: 0.5;
        color: #28a745;
    }
    
    h3 {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.25rem;
        font-weight: 600;
        color: #212529;
        margin: 0 0 8px 0;
    }
    
    p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1rem;
        margin: 0;
    }
    
    @media (max-width: 768px) {
        padding: 36px 24px;
        
        svg {
            width: 56px;
            height: 56px;
        }
        
        h3 {
            font-size: 1.125rem;
        }
        
        p {
            font-size: 0.9375rem;
        }
    }
    
    @media (max-width: 480px) {
        padding: 32px 20px;
        
        svg {
            width: 48px;
            height: 48px;
            margin-bottom: 12px;
        }
        
        h3 {
            font-size: 1rem;
        }
        
        p {
            font-size: 0.875rem;
        }
    }
`,C=a=>a.documents&&0!==a.documents.length?e.jsx(j,{children:a.documents.map((a,i)=>e.jsxs(y,{href:a.src,target:"_blank",rel:"noopener noreferrer",children:[e.jsx(k,{children:e.jsx(p,{})}),e.jsxs($,{children:[e.jsx(z,{children:a.name}),e.jsx(S,{children:"PDF документ"})]}),e.jsx(G,{onClick:e=>((e,a,i)=>{e.preventDefault(),e.stopPropagation();const t=document.createElement("a");t.href=a,t.download=i,t.target="_blank",document.body.appendChild(t),t.click(),document.body.removeChild(t)})(e,a.src,a.name),children:e.jsx(x,{})})]},i))}):e.jsx(j,{style:{height:"100%",margin:"auto"},children:e.jsxs(A,{children:[e.jsx(d,{}),e.jsx("h3",{children:"Документы не найдены"}),e.jsx("p",{children:"В этой категории пока нет документов"})]})}),T=()=>{const[i,t]=a.useState(),[n,s]=a.useState(),[d,p]=a.useState(),[x,u]=a.useState(!1),[w,b]=a.useState("");a.useEffect(()=>{j()},[]);const j=async()=>{u(!0);try{const e=await o("documents_group"),a=await o("documents");t(e),s(a),p(e[0])}catch(e){}finally{setTimeout(()=>u(!1),1e3)}},y=n?.filter(e=>{const a=e.id_group===d?.id,i=""===w||e.name.toLowerCase().includes(w.toLowerCase());return a&&i});return e.jsxs(e.Fragment,{children:[e.jsxs(c,{children:[e.jsx(l,{children:"Документы"}),e.jsxs(m,{children:[e.jsx(h,{className:"search-icon",style:{width:20,height:20,color:"#28a745"}}),e.jsx(g,{type:"text",placeholder:"Поиск документов...",value:w,onChange:e=>b(e.target.value)})]})]}),e.jsxs(f,{children:[x&&e.jsx(r,{}),!x&&i&&n&&e.jsxs(e.Fragment,{children:[e.jsx(v,{selectedGroup:d,groups:i,documents:n,searchQuery:w,setSelectedGroup:p}),e.jsx(C,{documents:y})]})]})]})};export{T as default};

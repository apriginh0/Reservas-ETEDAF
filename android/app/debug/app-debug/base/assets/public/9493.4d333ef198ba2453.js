"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9493],{9493:(F,l,a)=>{a.r(l),a.d(l,{ProfessoresCadastradosPageModule:()=>v});var c=a(177),m=a(4341),r=a(4742),u=a(5260),s=a(4438),p=a(9885),f=a(1073);function g(o,n){if(1&o){const t=s.RV6();s.j41(0,"ion-item",5)(1,"ion-label",6)(2,"p",6),s.EFF(3),s.k0s(),s.j41(4,"p")(5,"strong"),s.EFF(6,"Fun\xe7\xe3o:"),s.k0s(),s.EFF(7),s.k0s()(),s.j41(8,"ion-button",7),s.bIt("click",function(){const i=s.eBV(t).$implicit,d=s.XpG();return s.Njj(d.changeRole(i.id,i.role))}),s.EFF(9),s.k0s()()}if(2&o){const t=n.$implicit;s.R7$(3),s.Lme("",t.name," (",t.email,")"),s.R7$(4),s.SpI(" ",t.role,""),s.R7$(2),s.SpI(" Mudar para ","teacher"===t.role?"Admin":"Teacher"," ")}}const P=[{path:"",component:(()=>{var o;class n{constructor(e,i){this.userService=e,this.location=i,this.approvedUsers=[]}ngOnInit(){this.loadApprovedUsers()}loadApprovedUsers(){this.userService.getApprovedUsers().subscribe(e=>{this.approvedUsers=e})}changeRole(e,i){this.userService.changeUserRole(e,"teacher"===i?"admin":"teacher").subscribe(()=>{this.loadApprovedUsers()})}voltar(){this.location.back()}}return(o=n).\u0275fac=function(e){return new(e||o)(s.rXU(p.D),s.rXU(c.aZ))},o.\u0275cmp=s.VBU({type:o,selectors:[["app-professores-cadastrados"]],decls:12,vars:1,consts:[["slot","start",3,"click"],["name","chevron-back-outline"],["slot","end"],[1,"ion-padding"],["class","custom-item",4,"ngFor","ngForOf"],[1,"custom-item"],["color","primary"],["color","primary",3,"click"]],template:function(e,i){1&e&&(s.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-button",0),s.bIt("click",function(){return i.voltar()}),s.nrm(3,"ion-icon",1),s.k0s(),s.j41(4,"ion-title"),s.EFF(5,"Professores Cadastrados"),s.k0s(),s.nrm(6,"app-logout-button",2),s.k0s()(),s.j41(7,"ion-content",3)(8,"p"),s.EFF(9,"Lista de professores cadastrados."),s.k0s(),s.j41(10,"ion-list"),s.DNE(11,g,10,4,"ion-item",4),s.k0s()()),2&e&&(s.R7$(11),s.Y8G("ngForOf",i.approvedUsers))},dependencies:[c.Sq,r.Jm,r.W9,r.eU,r.iq,r.uz,r.he,r.nf,r.BC,r.ai,f.m],styles:['@charset "UTF-8";ion-title[_ngcontent-%COMP%]{text-align:center}.custom-item[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.custom-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{flex:0 0 60%;max-width:60%}.custom-item[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{flex:0 0 38%;max-width:38%}']}),n})()}];let C=(()=>{var o;class n{}return(o=n).\u0275fac=function(e){return new(e||o)},o.\u0275mod=s.$C({type:o}),o.\u0275inj=s.G2t({imports:[u.iI.forChild(P),u.iI]}),n})();var h=a(3887);let v=(()=>{var o;class n{}return(o=n).\u0275fac=function(e){return new(e||o)},o.\u0275mod=s.$C({type:o}),o.\u0275inj=s.G2t({imports:[c.MD,m.YN,r.bv,C,h.G]}),n})()}}]);
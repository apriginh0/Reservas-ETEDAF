"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5075],{5075:(M,l,n)=>{n.r(l),n.d(l,{HomePageModule:()=>F});var d=n(177),i=n(4742),m=n(4341),c=n(5260),e=n(4438),g=n(4796),h=n(1626),v=n(1073);function f(o,r){if(1&o){const s=e.RV6();e.j41(0,"ion-card",2),e.bIt("click",function(){e.eBV(s);const a=e.XpG();return e.Njj(a.navigateTo("/gestao"))}),e.j41(1,"ion-card-header")(2,"ion-card-title"),e.EFF(3,"Gest\xe3o"),e.k0s()()()}}const p=[{path:"",component:(()=>{var o;class r{constructor(t,a,u){this.authService=t,this.router=a,this.http=u,this.isAdmin=!1}ngOnInit(){this.checkUserRole()}checkUserRole(){this.userSub=this.authService.getCurrentUser().subscribe({next:t=>{this.isAdmin="admin"===(null==t?void 0:t.role)},error:t=>{console.error("Erro ao obter usu\xe1rio:",t)}})}ngOnDestroy(){this.userSub&&this.userSub.unsubscribe()}navigateTo(t){this.router.navigate([t]).then(a=>console.log("Navega\xe7\xe3o bem-sucedida:",a),a=>console.error("Erro na navega\xe7\xe3o:",a))}}return(o=r).\u0275fac=function(t){return new(t||o)(e.rXU(g.u),e.rXU(c.Ix),e.rXU(h.Qq))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-home"]],decls:18,vars:1,consts:[["slot","end"],[1,"container","vertical"],[3,"click"],[3,"click",4,"ngIf"]],template:function(t,a){1&t&&(e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Home"),e.k0s(),e.nrm(4,"app-logout-button",0),e.k0s()(),e.j41(5,"ion-content")(6,"div",1)(7,"ion-card",2),e.bIt("click",function(){return a.navigateTo("/reserva-sala")}),e.j41(8,"ion-card-header")(9,"ion-card-title"),e.EFF(10,"Reserva de Sala"),e.k0s()()(),e.j41(11,"ion-card")(12,"ion-card-header")(13,"ion-card-title"),e.EFF(14,"Reserva de Equipamentos "),e.nrm(15,"hr"),e.EFF(16," (Em Breve)"),e.k0s()()(),e.DNE(17,f,4,0,"ion-card",3),e.k0s()()),2&t&&(e.R7$(17),e.Y8G("ngIf",a.isAdmin))},dependencies:[d.bT,i.b_,i.ME,i.tN,i.W9,i.eU,i.BC,i.ai,v.m],styles:['@charset "UTF-8";.vertical[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}ion-card[_ngcontent-%COMP%]{width:90%;margin:10px 0}ion-card-title[_ngcontent-%COMP%]{color:#0a0a0a}']}),r})()}];let P=(()=>{var o;class r{}return(o=r).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[c.iI.forChild(p),c.iI]}),r})();var H=n(3887);let F=(()=>{var o;class r{}return(o=r).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[d.MD,m.YN,i.bv,P,H.G]}),r})()}}]);
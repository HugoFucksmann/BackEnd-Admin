(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["child-routes-module"],{

/***/ "./src/app/guards/admin.guard.ts":
/*!***************************************!*\
  !*** ./src/app/guards/admin.guard.ts ***!
  \***************************************/
/*! exports provided: AdminGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminGuard", function() { return AdminGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../services/usuario.service */ "./src/app/services/usuario.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




class AdminGuard {
    constructor(usuarioService, router) {
        this.usuarioService = usuarioService;
        this.router = router;
    }
    canActivate(next, state) {
        if (this.usuarioService.role === 'ADMIN_ROLE') {
            return true;
        }
        else {
            this.router.navigateByUrl('/dashboard');
            return false;
        }
        //return (this.usuarioService.role === 'ADMIN_ROLE')? true : false; //!
    }
}
AdminGuard.ɵfac = function AdminGuard_Factory(t) { return new (t || AdminGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_usuario_service__WEBPACK_IMPORTED_MODULE_1__["UsuarioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AdminGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AdminGuard, factory: AdminGuard.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AdminGuard, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _services_usuario_service__WEBPACK_IMPORTED_MODULE_1__["UsuarioService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/pages/child-routes.module.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/child-routes.module.ts ***!
  \**********************************************/
/*! exports provided: ChildRoutesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChildRoutesModule", function() { return ChildRoutesModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _promesas_promesas_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./promesas/promesas.component */ "./src/app/pages/promesas/promesas.component.ts");
/* harmony import */ var _pages_grafica1_grafica1_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/grafica1/grafica1.component */ "./src/app/pages/grafica1/grafica1.component.ts");
/* harmony import */ var _pages_progress_progress_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pages/progress/progress.component */ "./src/app/pages/progress/progress.component.ts");
/* harmony import */ var _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pages/dashboard/dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _account_settings_account_settings_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./account-settings/account-settings.component */ "./src/app/pages/account-settings/account-settings.component.ts");
/* harmony import */ var _rxjs_rxjs_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rxjs/rxjs.component */ "./src/app/pages/rxjs/rxjs.component.ts");
/* harmony import */ var _perfil_perfil_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./perfil/perfil.component */ "./src/app/pages/perfil/perfil.component.ts");
/* harmony import */ var _guards_admin_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../guards/admin.guard */ "./src/app/guards/admin.guard.ts");
/* harmony import */ var _busqueda_busqueda_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./busqueda/busqueda.component */ "./src/app/pages/busqueda/busqueda.component.ts");
/* harmony import */ var _mantenimiento_medicos_medico_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mantenimiento/medicos/medico.component */ "./src/app/pages/mantenimiento/medicos/medico.component.ts");
/* harmony import */ var _mantenimiento_medicos_medicos_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mantenimiento/medicos/medicos.component */ "./src/app/pages/mantenimiento/medicos/medicos.component.ts");
/* harmony import */ var _mantenimiento_hospitales_hospitales_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./mantenimiento/hospitales/hospitales.component */ "./src/app/pages/mantenimiento/hospitales/hospitales.component.ts");
/* harmony import */ var _mantenimiento_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./mantenimiento/usuarios/usuarios.component */ "./src/app/pages/mantenimiento/usuarios/usuarios.component.ts");










//mantenimientos







const childRoutes = [
    { path: '', component: _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__["DashboardComponent"], data: { titulo: 'Dashboard' } },
    { path: 'buscar/:termino', component: _busqueda_busqueda_component__WEBPACK_IMPORTED_MODULE_10__["BusquedaComponent"], data: { titulo: 'busquedas' } },
    { path: 'progress', component: _pages_progress_progress_component__WEBPACK_IMPORTED_MODULE_4__["ProgressComponent"], data: { titulo: 'ProgressBar' } },
    { path: 'grafica1', component: _pages_grafica1_grafica1_component__WEBPACK_IMPORTED_MODULE_3__["Grafica1Component"], data: { titulo: 'Grafica #1' } },
    { path: 'account-settings', component: _account_settings_account_settings_component__WEBPACK_IMPORTED_MODULE_6__["AccountSettingsComponent"], data: { titulo: 'Ajustes' } },
    { path: 'promesas', component: _promesas_promesas_component__WEBPACK_IMPORTED_MODULE_2__["PromesasComponent"], data: { titulo: 'Promesas' } },
    { path: 'RXJS', component: _rxjs_rxjs_component__WEBPACK_IMPORTED_MODULE_7__["RxjsComponent"], data: { titulo: 'RXJS' } },
    { path: 'perfil', component: _perfil_perfil_component__WEBPACK_IMPORTED_MODULE_8__["PerfilComponent"], data: { titulo: 'Perfil de usuario' } },
    // Mantenimientos
    { path: 'hospitales', component: _mantenimiento_hospitales_hospitales_component__WEBPACK_IMPORTED_MODULE_13__["HospitalesComponent"], data: { titulo: 'mantenimiento hospitales' } },
    { path: 'medicos', component: _mantenimiento_medicos_medicos_component__WEBPACK_IMPORTED_MODULE_12__["MedicosComponent"], data: { titulo: 'mantenimiento medicos' } },
    { path: 'medico/:id', component: _mantenimiento_medicos_medico_component__WEBPACK_IMPORTED_MODULE_11__["MedicoComponent"], data: { titulo: 'Gestionar medicos' } },
    //Rutas de Admin
    { path: 'usuarios', canActivate: [_guards_admin_guard__WEBPACK_IMPORTED_MODULE_9__["AdminGuard"]], component: _mantenimiento_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_14__["UsuariosComponent"], data: { titulo: 'mantenimiento usuarios' } },
];
class ChildRoutesModule {
}
ChildRoutesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: ChildRoutesModule });
ChildRoutesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function ChildRoutesModule_Factory(t) { return new (t || ChildRoutesModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ChildRoutesModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ChildRoutesModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(childRoutes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]],
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=child-routes-module.js.map
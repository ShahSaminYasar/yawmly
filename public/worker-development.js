/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./worker/index.js":
/*!*************************!*\
  !*** ./worker/index.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval(__webpack_require__.ts("const SW_VERSION = \"V1.2.2\";\nself.addEventListener(\"install\", (event)=>{\n    self.skipWaiting();\n});\nself.addEventListener(\"activate\", (event)=>{\n    clients.claim();\n});\nself.addEventListener(\"push\", (e)=>{\n    const data = e.data.json();\n    //   console.log(\"SW Push Received: \", data);\n    const title = data.title || \"Notification\";\n    const body = data.body || \"Stay organized, be productive.\";\n    const options = {\n        body,\n        icon: \"/icons/android-chrome-192x192.png\",\n        badge: \"/icons/badge.png\",\n        data: {\n            url: data.url || \"https://yawmly.vercel.app/\"\n        }\n    };\n    e.waitUntil(self.registration.showNotification(title, options));\n});\nself.addEventListener(\"notificationclick\", (e)=>{\n    var _e_notification_data;\n    //   console.log(\"Notification clicked:\", e.notification);\n    e.notification.close();\n    const urlToOpen = ((_e_notification_data = e.notification.data) === null || _e_notification_data === void 0 ? void 0 : _e_notification_data.url) || \"https://yawmly.vercel.app/\";\n    e.waitUntil(clients.matchAll({\n        type: \"window\"\n    }).then((clientList)=>{\n        for (const client of clientList){\n            // ✅ Match exact production homepage URL\n            if (client.url === urlToOpen && \"focus\" in client) {\n                return client.focus();\n            }\n        }\n        // ✅ Open a new window if no matching client\n        if (clients.openWindow) {\n            return clients.openWindow(urlToOpen);\n        }\n    }));\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi93b3JrZXIvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsYUFBYTtBQUVuQkMsS0FBS0MsZ0JBQWdCLENBQUMsV0FBVyxDQUFDQztJQUNoQ0YsS0FBS0csV0FBVztBQUNsQjtBQUVBSCxLQUFLQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUNDO0lBQ2pDRSxRQUFRQyxLQUFLO0FBQ2Y7QUFFQUwsS0FBS0MsZ0JBQWdCLENBQUMsUUFBUSxDQUFDSztJQUM3QixNQUFNQyxPQUFPRCxFQUFFQyxJQUFJLENBQUNDLElBQUk7SUFDeEIsNkNBQTZDO0lBRTdDLE1BQU1DLFFBQVFGLEtBQUtFLEtBQUssSUFBSTtJQUM1QixNQUFNQyxPQUFPSCxLQUFLRyxJQUFJLElBQUk7SUFFMUIsTUFBTUMsVUFBVTtRQUNkRDtRQUNBRSxNQUFNO1FBQ05DLE9BQU87UUFDUE4sTUFBTTtZQUNKTyxLQUFLUCxLQUFLTyxHQUFHLElBQUk7UUFDbkI7SUFDRjtJQUVBUixFQUFFUyxTQUFTLENBQUNmLEtBQUtnQixZQUFZLENBQUNDLGdCQUFnQixDQUFDUixPQUFPRTtBQUN4RDtBQUVBWCxLQUFLQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQ0s7UUFHeEJBO0lBRmxCLDBEQUEwRDtJQUMxREEsRUFBRVksWUFBWSxDQUFDQyxLQUFLO0lBQ3BCLE1BQU1DLFlBQVlkLEVBQUFBLHVCQUFBQSxFQUFFWSxZQUFZLENBQUNYLElBQUksY0FBbkJELDJDQUFBQSxxQkFBcUJRLEdBQUcsS0FBSTtJQUU5Q1IsRUFBRVMsU0FBUyxDQUNUWCxRQUFRaUIsUUFBUSxDQUFDO1FBQUVDLE1BQU07SUFBUyxHQUFHQyxJQUFJLENBQUMsQ0FBQ0M7UUFDekMsS0FBSyxNQUFNQyxVQUFVRCxXQUFZO1lBQy9CLHdDQUF3QztZQUN4QyxJQUFJQyxPQUFPWCxHQUFHLEtBQUtNLGFBQWEsV0FBV0ssUUFBUTtnQkFDakQsT0FBT0EsT0FBT0MsS0FBSztZQUNyQjtRQUNGO1FBRUEsNENBQTRDO1FBQzVDLElBQUl0QixRQUFRdUIsVUFBVSxFQUFFO1lBQ3RCLE9BQU92QixRQUFRdUIsVUFBVSxDQUFDUDtRQUM1QjtJQUNGO0FBRUoiLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wbWVudFxcTmV4dEpTXFx5YXdtbHlcXHdvcmtlclxcaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU1dfVkVSU0lPTiA9IFwiVjEuMi4yXCI7XHJcblxyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnN0YWxsXCIsIChldmVudCkgPT4ge1xyXG4gIHNlbGYuc2tpcFdhaXRpbmcoKTtcclxufSk7XHJcblxyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJhY3RpdmF0ZVwiLCAoZXZlbnQpID0+IHtcclxuICBjbGllbnRzLmNsYWltKCk7XHJcbn0pO1xyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwicHVzaFwiLCAoZSkgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSBlLmRhdGEuanNvbigpO1xyXG4gIC8vICAgY29uc29sZS5sb2coXCJTVyBQdXNoIFJlY2VpdmVkOiBcIiwgZGF0YSk7XHJcblxyXG4gIGNvbnN0IHRpdGxlID0gZGF0YS50aXRsZSB8fCBcIk5vdGlmaWNhdGlvblwiO1xyXG4gIGNvbnN0IGJvZHkgPSBkYXRhLmJvZHkgfHwgXCJTdGF5IG9yZ2FuaXplZCwgYmUgcHJvZHVjdGl2ZS5cIjtcclxuXHJcbiAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIGJvZHksXHJcbiAgICBpY29uOiBcIi9pY29ucy9hbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZ1wiLFxyXG4gICAgYmFkZ2U6IFwiL2ljb25zL2JhZGdlLnBuZ1wiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICB1cmw6IGRhdGEudXJsIHx8IFwiaHR0cHM6Ly95YXdtbHkudmVyY2VsLmFwcC9cIixcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgZS53YWl0VW50aWwoc2VsZi5yZWdpc3RyYXRpb24uc2hvd05vdGlmaWNhdGlvbih0aXRsZSwgb3B0aW9ucykpO1xyXG59KTtcclxuXHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcIm5vdGlmaWNhdGlvbmNsaWNrXCIsIChlKSA9PiB7XHJcbiAgLy8gICBjb25zb2xlLmxvZyhcIk5vdGlmaWNhdGlvbiBjbGlja2VkOlwiLCBlLm5vdGlmaWNhdGlvbik7XHJcbiAgZS5ub3RpZmljYXRpb24uY2xvc2UoKTtcclxuICBjb25zdCB1cmxUb09wZW4gPSBlLm5vdGlmaWNhdGlvbi5kYXRhPy51cmwgfHwgXCJodHRwczovL3lhd21seS52ZXJjZWwuYXBwL1wiO1xyXG5cclxuICBlLndhaXRVbnRpbChcclxuICAgIGNsaWVudHMubWF0Y2hBbGwoeyB0eXBlOiBcIndpbmRvd1wiIH0pLnRoZW4oKGNsaWVudExpc3QpID0+IHtcclxuICAgICAgZm9yIChjb25zdCBjbGllbnQgb2YgY2xpZW50TGlzdCkge1xyXG4gICAgICAgIC8vIOKchSBNYXRjaCBleGFjdCBwcm9kdWN0aW9uIGhvbWVwYWdlIFVSTFxyXG4gICAgICAgIGlmIChjbGllbnQudXJsID09PSB1cmxUb09wZW4gJiYgXCJmb2N1c1wiIGluIGNsaWVudCkge1xyXG4gICAgICAgICAgcmV0dXJuIGNsaWVudC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8g4pyFIE9wZW4gYSBuZXcgd2luZG93IGlmIG5vIG1hdGNoaW5nIGNsaWVudFxyXG4gICAgICBpZiAoY2xpZW50cy5vcGVuV2luZG93KSB7XHJcbiAgICAgICAgcmV0dXJuIGNsaWVudHMub3BlbldpbmRvdyh1cmxUb09wZW4pO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiU1dfVkVSU0lPTiIsInNlbGYiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJza2lwV2FpdGluZyIsImNsaWVudHMiLCJjbGFpbSIsImUiLCJkYXRhIiwianNvbiIsInRpdGxlIiwiYm9keSIsIm9wdGlvbnMiLCJpY29uIiwiYmFkZ2UiLCJ1cmwiLCJ3YWl0VW50aWwiLCJyZWdpc3RyYXRpb24iLCJzaG93Tm90aWZpY2F0aW9uIiwibm90aWZpY2F0aW9uIiwiY2xvc2UiLCJ1cmxUb09wZW4iLCJtYXRjaEFsbCIsInR5cGUiLCJ0aGVuIiwiY2xpZW50TGlzdCIsImNsaWVudCIsImZvY3VzIiwib3BlbldpbmRvdyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./worker/index.js\n"));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	(() => {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = () => {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScript: (script) => (script)
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("nextjs#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script */
/******/ 	(() => {
/******/ 		__webpack_require__.ts = (script) => (__webpack_require__.tt().createScript(script));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/react refresh */
/******/ 	(() => {
/******/ 		if (__webpack_require__.i) {
/******/ 		__webpack_require__.i.push((options) => {
/******/ 			const originalFactory = options.factory;
/******/ 			options.factory = (moduleObject, moduleExports, webpackRequire) => {
/******/ 				const hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
/******/ 				const cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : () => {};
/******/ 				try {
/******/ 					originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 				} finally {
/******/ 					cleanup();
/******/ 				}
/******/ 			}
/******/ 		})
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	
/******/ 	// noop fns to prevent runtime errors during initialization
/******/ 	if (typeof self !== "undefined") {
/******/ 		self.$RefreshReg$ = function () {};
/******/ 		self.$RefreshSig$ = function () {
/******/ 			return function (type) {
/******/ 				return type;
/******/ 			};
/******/ 		};
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./worker/index.js");
/******/ 	
/******/ })()
;
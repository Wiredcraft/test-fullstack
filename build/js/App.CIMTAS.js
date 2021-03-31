var CIMTAS =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdateCIMTAS"];
/******/ 	window["webpackHotUpdateCIMTAS"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "hot/hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "hot/hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "3d2825785fd2cfb86771";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"App": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonpCIMTAS"] = window["webpackJsonpCIMTAS"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/polyfill/lib/index.js":
/*!****************************************************************************************!*\
  !*** delegated ./node_modules/@babel/polyfill/lib/index.js from dll-reference dll_Dll ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_Dll */ "dll-reference dll_Dll"))(977);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./src/components/HackerNews/HackerNews.css":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??ref--4-3!./src/components/HackerNews/HackerNews.css ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "body {\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: sans-serif;\r\n  background-color: #fbfbfb;\r\n}\r\n\r\n.sr-HackerNews {\r\n  width: 50%;\r\n  margin: 10px auto;\r\n  font-size: 14px;\r\n  background-color: #fff;\r\n  border: 1px solid #f1f1f1;\r\n  padding: 20px;\r\n}\r\n\r\n.news-input {\r\n  background-color: #fff;\r\n  border: 1px solid #f1f1f1;\r\n  padding: 20px;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.news-field {\r\n  margin-bottom: 15px;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.news-field .news-field-name {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-preferred-size: 100px;\r\n      flex-basis: 100px;\r\n  font-size: 14px;\r\n}\r\n\r\n.news-field .news-field-input {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex: 1;\r\n      flex: 1;\r\n}\r\n\r\n.news-field-input input,\r\n.news-field-input textarea {\r\n  border: 1px solid #e6e6e6;\r\n  border-radius: 3px;\r\n  padding: 5px;\r\n  outline: none;\r\n  font-size: 14px;\r\n  resize: none;\r\n  -ms-flex: 1;\r\n      flex: 1;\r\n  width: 100%;\r\n  font-family: sans-serif;\r\n}\r\n\r\n.news-field-input textarea {\r\n  height: 100px;\r\n}\r\n\r\n.news-field-button {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-pack: end;\r\n      justify-content: flex-end;\r\n}\r\n\r\n.news-field-button button {\r\n  padding: 5px 10px;\r\n  width: 80px;\r\n  border: none;\r\n  border-radius: 3px;\r\n  background-color: #00a3cf;\r\n  color: #fff;\r\n  outline: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.news-field-button button:active {\r\n  background: #13c1f1;\r\n}\r\n\r\n.news-list {\r\n  background-color: #fff;\r\n  border: 1px solid #f1f1f1;\r\n  padding: 20px;\r\n}\r\n\r\n.news {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  border-bottom: 1px solid #f1f1f1;\r\n  margin-bottom: 10px;\r\n  padding-bottom: 10px;\r\n  min-height: 50px;\r\n}\r\n\r\n.news .news-user {\r\n  -ms-flex-negative: 0;\r\n      flex-shrink: 0;\r\n}\r\n\r\n.news span {\r\n  color: #00a3cf;\r\n  font-style: italic;\r\n}\r\n\r\n.news p {\r\n  margin: 0;\r\n  width: 100%;\r\n}\r\n\r\n.sr-HackerNewsno {\r\n  color: #00a3cf;\r\n  padding: 5px 0px 6px 7px;\r\n  border-bottom: 1px solid #f1f1f1;\r\n  margin-bottom: 10px;\r\n  padding-bottom: 10px;\r\n}\r\n\r\n.sr-HackerNewsheader {\r\n  font-size: 18px;\r\n  padding: 20px;\r\n}\r\n\r\n.news-like-button {\r\n  -ms-flex-pack: end;\r\n      justify-content: flex-end;\r\n    width: 100%;\r\n    display: -ms-inline-flexbox;\r\n    display: inline-flex;\r\n    height: 26px;\r\n}\r\n\r\n.news-like-button button {\r\n  padding: 5px 10px;\r\n  width: 80px;\r\n  border: none;\r\n  border-radius: 3px;\r\n  background-color: #00a3cf;\r\n  color: #fff;\r\n  outline: none;\r\n  cursor: pointer;\r\n}", ""]);



/***/ }),

/***/ "./node_modules/react-dom/index.js":
/*!******************************************************************************!*\
  !*** delegated ./node_modules/react-dom/index.js from dll-reference dll_Dll ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_Dll */ "dll-reference dll_Dll"))(73);

/***/ }),

/***/ "./node_modules/react-router-dom/esm/react-router-dom.js":
/*!****************************************************************************************************!*\
  !*** delegated ./node_modules/react-router-dom/esm/react-router-dom.js from dll-reference dll_Dll ***!
  \****************************************************************************************************/
/*! exports provided: MemoryRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, __RouterContext, generatePath, matchPath, useHistory, useLocation, useParams, useRouteMatch, withRouter, BrowserRouter, HashRouter, Link, NavLink */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_Dll */ "dll-reference dll_Dll"))(972);

/***/ }),

/***/ "./node_modules/react/index.js":
/*!**************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference dll_Dll ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_Dll */ "dll-reference dll_Dll"))(0);

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!*************************************************************************************!*\
  !*** delegated ./node_modules/webpack/buildin/global.js from dll-reference dll_Dll ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_Dll */ "dll-reference dll_Dll"))(250);

/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/*! exports provided: App, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_HackerNews_HackerNews__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/HackerNews/HackerNews */ "./src/components/HackerNews/HackerNews.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.menus = {};
        _this.state = {
            info: undefined
        };
        return _this;
    }
    App.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["HashRouter"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "app" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "sr-app-content" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/", component: _components_HackerNews_HackerNews__WEBPACK_IMPORTED_MODULE_2__["default"] }))))));
    };
    App.prototype.componentDidMount = function () {
        this.onInitial();
    };
    /**
     * 初始化页面
     */
    App.prototype.onInitial = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                info = {
                    user: undefined,
                    userInfo: undefined,
                    message: "",
                    isShow: false,
                };
                try {
                    // let userInfo = await this.getUserInfo();
                    // info = await this.getSiteUserInfo(userInfo);
                    // this.setState({
                    //     info
                    // });
                }
                catch (e) {
                    info.message = e + "初始化失败";
                }
                return [2 /*return*/];
            });
        });
    };
    return App;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));

/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ "./src/components/HackerNews/HackerNews.css":
/*!**************************************************!*\
  !*** ./src/components/HackerNews/HackerNews.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/src??ref--4-3!./HackerNews.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./src/components/HackerNews/HackerNews.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/src??ref--4-3!./HackerNews.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./src/components/HackerNews/HackerNews.css", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/src??ref--4-3!./HackerNews.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./src/components/HackerNews/HackerNews.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/HackerNews/HackerNews.tsx":
/*!**************************************************!*\
  !*** ./src/components/HackerNews/HackerNews.tsx ***!
  \**************************************************/
/*! exports provided: HackerNews, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HackerNews", function() { return HackerNews; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _HackerNews_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HackerNews.css */ "./src/components/HackerNews/HackerNews.css");
/* harmony import */ var _HackerNews_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_HackerNews_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/logger */ "./src/services/logger/index.js");
/* harmony import */ var _NewsInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NewsInput */ "./src/components/HackerNews/NewsInput.tsx");
/* harmony import */ var _NewsList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NewsList */ "./src/components/HackerNews/NewsList.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






;
var HackerNews = /** @class */ (function (_super) {
    __extends(HackerNews, _super);
    function HackerNews(props) {
        var _this = _super.call(this, props) || this;
        _this.onInitial = function () { return __awaiter(_this, void 0, void 0, function () {
            var sampleNews;
            return __generator(this, function (_a) {
                try {
                    sampleNews = [
                        { topic: "Today is a beatiful day", user: "Allen", votes: 3 },
                        { topic: "I love China", user: "Li", votes: 0 },
                        { topic: "MAGA!", user: "Donald Trump", votes: 10 }
                    ];
                    //按投票结果排序
                    sampleNews = sampleNews.sort(this.sortVote);
                    this.setState({ news: sampleNews });
                }
                catch (e) {
                    _services_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].Error("HackerNews onInitial", e);
                }
                return [2 /*return*/];
            });
        }); };
        _this.onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var tempNews;
            return __generator(this, function (_a) {
                try {
                    if (!data)
                        return [2 /*return*/];
                    if (!data.user)
                        return [2 /*return*/, alert('Please enter user')];
                    if (!data.topic)
                        return [2 /*return*/, alert('Please enter topic')
                            // 此处只有API调用框架，并未实现后台API
                            // var request={user:data.user,topic:data.topic}
                            // let result = await HackerNewsAPI.add(request);
                            // if (result.success){
                            //     this.setState({news:result.data});
                            // }
                            //API接口失败则模拟处理
                        ];
                    tempNews = this.state.news;
                    tempNews.push(data);
                    //按投票结果排序
                    tempNews = tempNews.sort(this.sortVote);
                    this.setState({ news: tempNews });
                }
                catch (e) {
                    _services_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].Error("HackerNews onSubmit", e);
                }
                return [2 /*return*/];
            });
        }); };
        _this.state = {
            news: [],
        };
        document.title = "HackerNews";
        return _this;
    }
    HackerNews.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "sr-HackerNews" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "sr-HackerNewsheader" }, "HackerNews"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NewsList__WEBPACK_IMPORTED_MODULE_5__["default"], { news: this.state.news, onVote: this.onVotes.bind(this) }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NewsInput__WEBPACK_IMPORTED_MODULE_4__["default"], { onSubmit: this.onSubmit.bind(this) })));
    };
    HackerNews.prototype.componentDidMount = function () {
        this.onInitial();
    };
    HackerNews.prototype.onVotes = function (index) {
        var tempNews = this.state.news;
        tempNews[index].votes += 1;
        //按投票结果排序
        tempNews = tempNews.sort(this.sortVote);
        this.setState({ news: tempNews });
    };
    //JS对象按votes排序
    HackerNews.prototype.sortVote = function (a, b) {
        return b.votes - a.votes;
    };
    return HackerNews;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));

/* harmony default export */ __webpack_exports__["default"] = (HackerNews);
// 挂载组件
react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HackerNews, null), document.getElementById("app"));


/***/ }),

/***/ "./src/components/HackerNews/NewsInput.tsx":
/*!*************************************************!*\
  !*** ./src/components/HackerNews/NewsInput.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NewsInput = /** @class */ (function (_super) {
    __extends(NewsInput, _super);
    function NewsInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            user: "",
            topic: "",
        };
        return _this;
    }
    NewsInput.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'news-input' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'news-field' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: 'news-field-name' }, "User"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'news-field-input' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", { value: this.state.user, onChange: this.handleuserChange.bind(this) }))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'news-field' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: 'news-field-name' }, "Topic"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'news-field-input' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", { value: this.state.topic, onChange: this.handleTopicChange.bind(this) }))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'news-field-button' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { onClick: this.handleSubmit.bind(this) }, "Submit"))));
    };
    NewsInput.prototype.handleuserChange = function (event) {
        this.setState({
            user: event.target.value
        });
    };
    NewsInput.prototype.handleTopicChange = function (event) {
        this.setState({
            topic: event.target.value
        });
    };
    NewsInput.prototype.handleSubmit = function () {
        if (this.props.onSubmit) {
            this.props.onSubmit({ user: this.state.user, topic: this.state.topic, votes: 0 });
        }
        this.setState({ topic: "", user: "" });
    };
    return NewsInput;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (NewsInput);


/***/ }),

/***/ "./src/components/HackerNews/NewsList.tsx":
/*!************************************************!*\
  !*** ./src/components/HackerNews/NewsList.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NewsList = /** @class */ (function (_super) {
    __extends(NewsList, _super);
    function NewsList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            news: _this.props.news,
        };
        return _this;
    }
    NewsList.getDerivedStateFromProps = function (props, state) {
        if (state.news !== props.news) {
            return { news: props.news };
        }
    };
    NewsList.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.state.news.map(function (news, i) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'news' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'news-user' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null,
                        news.user,
                        " "),
                    "\uFF1A"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, news.topic),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: 'news-like-button' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { onClick: _this.handleVotes.bind(_this, i) },
                        "Like ",
                        news.votes)));
        })));
    };
    NewsList.prototype.handleVotes = function (index) {
        if (this.props.onVote) {
            this.props.onVote(index);
        }
    };
    return NewsList;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (NewsList);


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.tsx");



react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.getElementById("app"));


/***/ }),

/***/ "./src/services/logger/index.js":
/*!**************************************!*\
  !*** ./src/services/logger/index.js ***!
  \**************************************/
/*! exports provided: setting, Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log */ "./src/services/logger/log.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setting", function() { return _log__WEBPACK_IMPORTED_MODULE_0__["setting"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return _log__WEBPACK_IMPORTED_MODULE_0__["Logger"]; });




/***/ }),

/***/ "./src/services/logger/lajax/index.js":
/*!********************************************!*\
  !*** ./src/services/logger/lajax/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lajax_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lajax-module */ "./src/services/logger/lajax/lajax-module.js");
/**
 * lajax
 * log + ajax 前端日志解决方案
 * Author: Sky.Sun
 * Date: 2017/08/15
 */

window.Lajax = _lajax_module__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_lajax_module__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/services/logger/lajax/lajax-module.js":
/*!***************************************************!*\
  !*** ./src/services/logger/lajax/lajax-module.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * lajax
 * log + ajax 前端日志解决方案
 * Author: Sky.Sun
 * Date: 2017/08/15
 */
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function check(condiction, message) {
    if (condiction) {
        throw new Error(message);
    }
}
function getAttributeList(queue) {
    return queue.map(function (item) {
        return {
            Message: {
                value: encodeURI(JSON.stringify(item.messages)),
                type: "Text"
            },
            Time: {
                value: item.time,
                type: "Text"
            },
            Level: {
                value: item.level,
                type: "Text"
            },
            Agent: {
                value: item.agent,
                type: "Text"
            }
        };
    });
}
/**
 * 使 Error 对象支持 JSON 序列化
 */
if (!("toJSON" in Error.prototype)) {
    /* eslint-disable no-extend-native */
    Object.defineProperty(Error.prototype, "toJSON", {
        value: function () {
            var alt = {};
            Object.getOwnPropertyNames(this).forEach(function (key) {
                alt[key] = this[key];
            }, this);
            return alt;
        },
        configurable: true,
        writable: true
    });
    /* eslint-enable no-extend-native */
}
var Lajax = /** @class */ (function () {
    /* eslint-disable no-console, no-bitwise*/
    /**
     * @param {{JSOM: any,getFolderPath: any,url: string,autoLogError: boolean,autoLogRejection: boolean,autoLogAjax: boolean,logAjaxFilter: any,stylize: any,showDesc: any,customDesc: any,interval: number,maxErrorReq: number}} param
     */
    function Lajax(param) {
        var config = param;
        check(typeof config === "undefined", "log初始化错误 - 构造函数的参数不能为空！");
        if (typeof config === "string") {
            config = {
                url: param
            };
        }
        else if (typeof config === "object") {
            if (!param.JSOM) {
                check(typeof param.url !== "string", "log初始化错误 - 构造函数的参数 url 必须是一个字符串！");
                check(param.logAjaxFilter != null &&
                    typeof param.logAjaxFilter !== "function", "log初始化错误 - 构造函数的参数 logAjaxFilter 必须是一个函数！");
                check(param.customDesc != null && typeof param.customDesc !== "function", "log初始化错误 - 构造函数的参数 customDesc 必须是一个函数！");
            }
        }
        else {
            check(true, "log初始化错误 - 构造函数的参数格式不正确！");
        }
        this.JSOM = config.JSOM;
        /** 插入Item的文佳佳生成 */
        this.getFolderPath = config.getFolderPath ? config.getFolderPath : function () { return ""; };
        // 服务端 url 地址
        this.url = config.url;
        // 是否自动记录未捕获错误
        this.autoLogError =
            config.autoLogError == null ? true : config.autoLogError;
        // 是否自动记录 Promise 错误
        this.autoLogRejection =
            config.autoLogRejection == null ? true : config.autoLogRejection;
        // 是否自动记录 ajax
        this.autoLogAjax = config.autoLogAjax == null ? true : config.autoLogAjax;
        // 默认的 ajax 自动记录情况过滤
        var defaultLogAjaxFilter = function (ajaxUrl, ajaxMethod) { return true; };
        // ajax 自动记录情况过滤，返回 true 代表要记录日志，false 代表不记录日志
        this.logAjaxFilter =
            config.logAjaxFilter == null
                ? defaultLogAjaxFilter
                : config.logAjaxFilter;
        // 是否要格式化 console 打印的内容
        this.stylize = config.stylize == null ? true : config.stylize;
        this.stylize = this.stylize && this._stylizeSupport();
        // 是否显示描述信息
        this.showDesc = config.showDesc == null ? true : config.showDesc;
        // 自定义的描述信息内容
        this.customDesc = config.customDesc;
        // 默认的间隔发送时间（毫秒）
        var defaultInterval = 10000;
        // 间隔发送时间
        this.interval = config.interval == null ? defaultInterval : config.interval;
        // 默认的最大请求出错次数
        var defaultMaxErrorReq = 5;
        // 发送请求出错的最大次数，超过此次数则不再发送请求，但依然会记录请求到队列中
        this.maxErrorReq =
            config.maxErrorReq == null ? defaultMaxErrorReq : config.maxErrorReq;
        // 当前请求出错次数
        this.errorReq = 0;
        // 日志队列
        this.queue = [];
        // 发送日志请求的 xhr 对象
        this.xhr = null;
        // xhr 原生 open 方法
        this.xhrOpen = XMLHttpRequest.prototype.open;
        // xhr 原生 send 方法
        this.xhrSend = XMLHttpRequest.prototype.send;
        // 初始化
        this._init();
    }
    /**
     * 初始化方法
     *
     * @memberof Lajax
     */
    Lajax.prototype._init = function () {
        var _this = this;
        // 获取唯一请求id
        this._getReqId();
        // 加载之前未发送的历史日志
        this._loadFromStorage();
        // 打印描述信息
        this._printDesc();
        // 自动记录异常
        this._exceptionHandler();
        // 自动记录 ajax 请求
        this._ajaxHandler();
        // 绑定页面卸载事件
        this._storageUnsendData();
        // 定时发送日志请求
        this.timer = setInterval(function () {
            _this._send();
        }, this.interval);
    };
    /**
     * 获取或者生成唯一请求 id
     *
     * @memberof Lajax
     */
    Lajax.prototype._getReqId = function () {
        this.reqId = document.querySelector('[name="_reqId"]')
            ? document.querySelector('[name="_reqId"]').content
            : "";
        if (!this.reqId) {
            this.reqId = window._reqId;
        }
        if (this.reqId) {
            // 存在 reqId，说明这是一个服务器端生成的页面，设置一个标示
            this.idFromServer = true;
        }
        else {
            // 如果不存在 reqId，说明这是一个纯前端的页面，就自己生成一个 reqId https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
            var time_1 = Date.now();
            if (typeof performance !== "undefined" &&
                typeof performance.now === "function") {
                // 使用更高精度的时间
                time_1 += performance.now();
            }
            this.reqId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
                var rand = (time_1 + Math.random() * 16) % 16 | 0;
                time_1 = Math.floor(time_1 / 16);
                return (char === "x" ? rand : (rand & 0x3) | 0x8).toString(16);
            });
            this.idFromServer = false;
        }
    };
    /**
     * 默认的描述信息方法
     *
     * @param {number} lastUnsend - 上次页面卸载前未发送的日志数
     * @param {string} reqId - 请求id
     * @param {boolean} idFromServer - 请求id是否来自服务器
     * @returns 最终的描述信息
     * @memberof Lajax
     */
    Lajax.prototype._defaultDesc = function (lastUnsend, reqId, idFromServer) {
        return "\uD83D\uDE80 \u524D\u7AEF\u65E5\u5FD7\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210\u3002\n\u81EA\u52A8\u8BB0\u5F55\u9875\u9762\u9519\u8BEF\uFF1A      " + (this.autoLogError ? "✔" : "✘") + "\n\u81EA\u52A8\u8BB0\u5F55Promise\u5F02\u5E38\uFF1A   " + (this.autoLogRejection ? "✔" : "✘") + "\n\u81EA\u52A8\u8BB0\u5F55Ajax\u8BF7\u6C42\uFF1A      " + (this.autoLogAjax ? "✔" : "✘") + "\n\u5F53\u524D\u9875\u9762\u8BF7\u6C42id\uFF1A" + reqId + (idFromServer ? " (来自服务端)" : " (自动生成)");
    };
    /**
     * 打印描述信息
     *
     * @memberof Lajax
     */
    Lajax.prototype._printDesc = function () {
        if (console && this.showDesc) {
            var desc = void 0;
            if (this.customDesc) {
                // 自定义描述
                desc = this.customDesc(this.lastUnsend, this.reqId, this.idFromServer);
            }
            else {
                // 默认描述
                desc = this._defaultDesc(this.lastUnsend, this.reqId, this.idFromServer);
            }
            if (this.stylize) {
                console.log("%c" + desc, "color: " + Lajax.colorEnum.desc + "; font-family: \u5B8B\u4F53; line-height: 1.5;");
            }
            else {
                console.log(desc);
            }
        }
    };
    /**
     * 是否开启了无痕模式
     *
     * @returns
     * @memberof Lajax
     */
    Lajax.prototype._isSecret = function () {
        try {
            var testKey = "lajax-test";
            window.localStorage.setItem(testKey, "1");
            window.localStorage.removeItem(testKey);
            return false;
        }
        catch (error) {
            return true;
        }
    };
    /**
     * 从 localStorage 加载之前未发送的历史日志
     *
     * @memberof Lajax
     */
    Lajax.prototype._loadFromStorage = function () {
        if (!this._isSecret()) {
            var lastData = JSON.parse(window.localStorage.getItem("lajax"));
            if (Array.isArray(lastData) && lastData.length) {
                this.lastUnsend = lastData.length;
                this.queue = lastData;
                // 立即发送一次
                this._send();
            }
            window.localStorage.removeItem("lajax");
        }
    };
    /**
     * 自动记录异常
     *
     * @memberof Lajax
     */
    Lajax.prototype._exceptionHandler = function () {
        var _this = this;
        // 页面未捕获异常
        if (this.autoLogError) {
            window.addEventListener("error", function (err) {
                _this.error("[OnError]", err.message, "(" + err.lineno + "\u884C" + err.colno + "\u5217)");
            });
        }
        // Promise 未捕获异常
        if (this.autoLogRejection) {
            window.addEventListener("unhandledrejection", function (err) {
                _this.error("[OnRejection]", err.reason);
            });
        }
    };
    /**
     * 是否支持格式化 console 打印的内容
     * 只有 Chrome 和 firefox 浏览器开启
     *
     * @memberof Lajax
     */
    Lajax.prototype._stylizeSupport = function () {
        var isChrome = !!window.chrome;
        var isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
        return isChrome || isFirefox;
    };
    /**
     * 解析 url
     *
     * @param {string} url
     * @returns
     * @memberof Lajax
     */
    Lajax.prototype._resolveUrl = function (url) {
        var link = document.createElement("a");
        link.href = url;
        return link.protocol + "//" + link.host + link.pathname + link.search + link.hash;
    };
    /**
     * 自动记录 ajax 请求
     *
     * @memberof Lajax
     */
    Lajax.prototype._ajaxHandler = function () {
        if (this.autoLogAjax) {
            var that_1 = this;
            // 重写 open 方法
            XMLHttpRequest.prototype.open = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this._lajaxMethod = args[0];
                this._lajaxUrl = that_1._resolveUrl(args[1]);
                that_1.xhrOpen.apply(this, args);
            };
            // 重写 send 方法
            XMLHttpRequest.prototype.send = function (data) {
                // 请求开始时间
                var startTime = new Date();
                // 排除掉用户自定义不需要记录日志的 ajax
                if (that_1.logAjaxFilter(this._lajaxUrl, this._lajaxMethod)) {
                    // 添加一条日志到队列中
                    that_1._pushToQueue(startTime, Lajax.levelEnum.info, "[ajax] \u53D1\u9001" + this._lajaxMethod.toLowerCase() + "\u8BF7\u6C42\uFF1A" + this._lajaxUrl);
                    // 请求头中添加请求 id
                    this.setRequestHeader("X-Request-Id", that_1.reqId);
                }
                // 添加 readystatechange 事件
                this.addEventListener("readystatechange", function () {
                    // 排除掉用户自定义不需要记录日志的 ajax
                    if (that_1.logAjaxFilter(this._lajaxUrl, this._lajaxMethod)) {
                        try {
                            if (this.readyState === XMLHttpRequest.DONE) {
                                // 这里将发送接口请求的日志打印到控制台和添加到队列分开执行
                                if (console && console.group && that_1.stylize) {
                                    console.group("%cajax请求", "color: " + Lajax.colorEnum.ajaxGroup + ";");
                                }
                                that_1._printConsole(startTime, Lajax.levelEnum.info, "[ajax] \u53D1\u9001" + this._lajaxMethod.toLowerCase() + "\u8BF7\u6C42\uFF1A" + this._lajaxUrl);
                                // 请求结束时间
                                var endTime = new Date();
                                // 请求耗时
                                var costTime = (endTime - startTime) / 1000;
                                var msgs = [];
                                if (this.status >= 200 && this.status < 400) {
                                    msgs.push("接口请求成功。");
                                }
                                else {
                                    msgs.push("接口请求失败！");
                                }
                                msgs.push("\u8BF7\u6C42\u8017\u65F6\uFF1A" + costTime + "s URL\uFF1A" + this._lajaxUrl + " \u8BF7\u6C42\u65B9\u5F0F\uFF1A" + this._lajaxMethod);
                                if (this._lajaxMethod.toLowerCase() === "post") {
                                    msgs.push("表单数据：", data);
                                }
                                msgs.push("\u72B6\u6001\u7801\uFF1A" + this.status);
                                if (this.status >= 200 && this.status < 400) {
                                    that_1.info.apply(that_1, __spreadArrays(["[ajax]"], msgs));
                                }
                                else {
                                    that_1.error.apply(that_1, __spreadArrays(["[ajax]"], msgs));
                                }
                                if (console && console.group) {
                                    console.groupEnd();
                                }
                            }
                        }
                        catch (err) {
                            var msgs = [];
                            msgs.push("接口请求出错！");
                            msgs.push("URL\uFF1A" + this._lajaxUrl + " \u8BF7\u6C42\u65B9\u5F0F\uFF1A" + this._lajaxMethod);
                            if (this._lajaxMethod.toLowerCase() === "post") {
                                msgs.push("表单数据：", data);
                            }
                            msgs.push("\u72B6\u6001\u7801\uFF1A" + this.status);
                            msgs.push("ERROR\uFF1A" + err);
                            that_1.error.apply(that_1, __spreadArrays(["[ajax]"], msgs));
                        }
                    }
                });
                that_1.xhrSend.call(this, data);
            };
        }
    };
    /**
     * 页面卸载前检查是否还有未发送的日志
     *
     * @memberof Lajax
     */
    Lajax.prototype._storageUnsendData = function () {
        var _this = this;
        window.onunload = function () {
            // 处理未发送的数据
            if (_this.queue.length) {
                if (!_this.JSOM &&
                    navigator.sendBeacon &&
                    navigator.sendBeacon(_this.url, JSON.stringify(_this.queue))) {
                    // 如果客户端支持sendBeacon，且预计能够成功发送数据，则清空队列
                    _this.queue = [];
                }
                else if (!_this._isSecret()) {
                    // 不支持sendBeacon，且不是无痕模式，则存入localStorage，下次进入页面时会自动发送一次日志
                    window.localStorage.setItem("lajax", JSON.stringify(_this.queue));
                }
                else {
                    // 是无痕模式，只能尝试发送日志，成不成功就看造化了
                    _this._send();
                }
            }
        };
    };
    /**
     * 发送日志请求
     *
     * @memberof Lajax
     */
    Lajax.prototype._send = function () {
        if (this.queue.length) {
            if (this.JSOM) {
                this._sendByJSOM();
            }
            else {
                this._sendByAjax();
            }
        }
    };
    Lajax.prototype._sendByJSOM = function () {
        var that = this;
        var logCount = this.queue.length;
        var attributeList = getAttributeList(this.queue);
        function sendSuccess(result) {
            // 日志发送成功，从队列中去除已发送的
            that.queue.splice(0, logCount);
            // 重置请求出错次数
            that.errorReq = 0;
            if (console) {
                if (that.stylize) {
                    console.log("%c[" + that._getTimeString(null) + "] - " + logCount + "\u6761\u65E5\u5FD7\u53D1\u9001\u6210\u529F\uFF01", "color: " + Lajax.colorEnum.sendSuccess);
                }
                else {
                    console.log(logCount + "\u6761\u65E5\u5FD7\u53D1\u9001\u6210\u529F\uFF01");
                }
            }
            return result;
        }
        function sendError(result) {
            that._printConsole(null, Lajax.levelEnum.error, "JSOM\u53D1\u9001\u65E5\u5FD7\u8BF7\u6C42\u5931\u8D25\uFF01", result);
            that._checkErrorReq();
            return result;
        }
        return this.JSOM.refresh()
            .createListItems(this.getFolderPath(), attributeList)
            .then(sendSuccess, sendError);
    };
    Lajax.prototype._sendByAjax = function () {
        var _this = this;
        var logCount = this.queue.length;
        // 如果存在 this.xhr，说明上一次的请求还没有结束，就又准备发送新的请求了，则直接终止上次请求
        if (this.xhr) {
            // 这里必须将上次的回调设为null，否则会打印出请求失败
            this.xhr.onreadystatechange = null;
            this.xhr.abort();
        }
        try {
            this.xhr = new XMLHttpRequest();
            this.xhrOpen.call(this.xhr, "POST", this.url, true);
            this.xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            this.xhrSend.call(this.xhr, JSON.stringify(this.queue));
            this.xhr.onreadystatechange = function () {
                if (_this.xhr.readyState === XMLHttpRequest.DONE) {
                    if (_this.xhr.status >= 200 && _this.xhr.status < 400) {
                        // 日志发送成功，从队列中去除已发送的
                        _this.queue.splice(0, logCount);
                        // 重置请求出错次数
                        _this.errorReq = 0;
                        // 显示日志发送成功
                        if (console) {
                            if (_this.stylize) {
                                console.log("%c[" + _this._getTimeString(null) + "] - " + logCount + "\u6761\u65E5\u5FD7\u53D1\u9001\u6210\u529F\uFF01", "color: " + Lajax.colorEnum.sendSuccess);
                            }
                            else {
                                console.log(logCount + "\u6761\u65E5\u5FD7\u53D1\u9001\u6210\u529F\uFF01");
                            }
                        }
                    }
                    else {
                        _this._printConsole(null, Lajax.levelEnum.error, "\u53D1\u9001\u65E5\u5FD7\u8BF7\u6C42\u5931\u8D25\uFF01\u914D\u7F6E\u7684\u63A5\u53E3\u5730\u5740\uFF1A" + _this.url + " \u72B6\u6001\u7801\uFF1A" + _this.xhr.status);
                        _this._checkErrorReq();
                    }
                    _this.xhr = null;
                }
            };
        }
        catch (err) {
            this._printConsole(null, Lajax.levelEnum.error, "\u53D1\u9001\u65E5\u5FD7\u8BF7\u6C42\u5931\u8D25\uFF01\u914D\u7F6E\u7684\u63A5\u53E3\u5730\u5740\uFF1A" + this.url);
            this._checkErrorReq();
            this.xhr = null;
        }
    };
    /**
     * 检查请求出错次数
     *
     * @memberof Lajax
     */
    Lajax.prototype._checkErrorReq = function () {
        // 将出错次数 +1
        this.errorReq++;
        // 超过最大次数则认为服务器不可用，停止定时器
        if (this.errorReq >= this.maxErrorReq) {
            clearInterval(this.timer);
            this._printConsole(null, Lajax.levelEnum.warn, "\u53D1\u9001\u65E5\u5FD7\u8BF7\u6C42\u7684\u8FDE\u7EED\u5931\u8D25\u6B21\u6570\u8FC7\u591A\uFF0C\u5DF2\u505C\u6B62\u53D1\u9001\u65E5\u5FD7\u3002\u8BF7\u68C0\u67E5\u65E5\u5FD7\u63A5\u53E3 " + this.url + " \u662F\u5426\u6B63\u5E38\uFF01");
        }
    };
    /**
     * 获取时间字符串
     *
     * @param {Date} time - 记录时间
     * @returns
     * @memberof Lajax
     */
    Lajax.prototype._getTimeString = function (time) {
        var now = time === null ? new Date() : time;
        // 时
        var hour = String(now.getHours());
        if (hour.length === 1) {
            hour = "0" + hour;
        }
        // 分
        var minute = String(now.getMinutes());
        if (minute.length === 1) {
            minute = "0" + minute;
        }
        // 秒
        var second = String(now.getSeconds());
        if (second.length === 1) {
            second = "0" + second;
        }
        // 毫秒
        var millisecond = String(now.getMilliseconds());
        if (millisecond.length === 1) {
            millisecond = "00" + millisecond;
        }
        else if (millisecond.length === 2) {
            millisecond = "0" + millisecond;
        }
        return hour + ":" + minute + ":" + second + "." + millisecond;
    };
    /**
     * 获取日期时间字符串
     *
     * @param {Date} time - 记录时间
     * @returns
     * @memberof Lajax
     */
    Lajax.prototype._getDateTimeString = function (time) {
        var now = time === null ? new Date() : time;
        // 年
        var year = String(now.getFullYear());
        // 月
        var month = String(now.getMonth() + 1);
        if (month.length === 1) {
            month = "0" + month;
        }
        // 日
        var day = String(now.getDate());
        if (day.length === 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day + " " + this._getTimeString(now);
    };
    /**
     * 调用系统 console 打印日志
     *
     * @param {any} time
     * @param {any} level
     * @param {any} args
     * @memberof Lajax
     */
    Lajax.prototype._printConsole = function (time, level) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (console) {
            if (this.stylize) {
                console[level].apply(console, __spreadArrays(["%c[" + this._getTimeString(time) + "] [" + level.toUpperCase() + "] -",
                    "color: " + Lajax.colorEnum[level]], args));
            }
            else {
                // console[level](...args);
            }
        }
    };
    /**
     * 将日志添加到队列中
     *
     * @param {any} time
     * @param {any} level
     * @param {any} args
     * @memberof Lajax
     */
    Lajax.prototype._pushToQueue = function (time, level) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        args.unshift("{" + this.reqId + "}");
        this.queue.push({
            time: this._getDateTimeString(time),
            level: level,
            messages: args,
            url: window.location.href,
            agent: navigator.userAgent
        });
    };
    /**
     * 将日志打印到控制台并添加到队列
     *
     * @param {Date} time - 记录时间
     * @param {Lajax.levelEnum} level - 日志级别
     * @param {any} args - 日志内容
     * @memberof Lajax
     */
    Lajax.prototype._log = function (time, level) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // 调用系统 console 打印日志
        this._printConsole.apply(this, __spreadArrays([time, level], args));
        // 将日志添加到队列中
        this._pushToQueue.apply(this, __spreadArrays([time, level], args));
    };
    /**
     * 记录一条信息日志
     *
     * @param {any} args - 日志内容
     * @memberof Lajax
     */
    Lajax.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArrays([null, Lajax.levelEnum.info], args));
    };
    /**
     * 记录一条普通日志
     * info 方法的别名
     *
     * @param {any} args
     * @memberof Lajax
     */
    Lajax.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info.apply(this, args);
    };
    /**
     * 记录一条警告日志
     *
     * @param {any} args - 日志内容
     * @memberof Lajax
     */
    Lajax.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArrays([null, Lajax.levelEnum.warn], args));
    };
    /**
     * 记录一条错误日志
     *
     * @param {any} args - 日志内容
     * @memberof Lajax
     */
    Lajax.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArrays([null, Lajax.levelEnum.error], args));
    };
    return Lajax;
}());
/**
 * 日志级别枚举
 */
Lajax.levelEnum = {
    /**
     * 信息
     */
    info: "info",
    /**
     * 警告
     */
    warn: "warn",
    /**
     * 错误
     */
    error: "error"
};
/**
 * 日志颜色枚举
 */
Lajax.colorEnum = {
    /**
     * 信息日志颜色，默认宝蓝色
     */
    info: "DodgerBlue",
    /**
     * 警告日志颜色，默认橘黄色
     */
    warn: "orange",
    /**
     * 错误日志颜色，默认红色
     */
    error: "red",
    /**
     * ajax分组颜色，默认紫色
     */
    ajaxGroup: "#800080",
    /**
     * 日志发送成功颜色，默认绿色
     */
    sendSuccess: "green",
    /**
     * 描述文字颜色，默认粉红色
     */
    desc: "#d30775"
};
/* harmony default export */ __webpack_exports__["default"] = (Lajax);


/***/ }),

/***/ "./src/services/logger/log.js":
/*!************************************!*\
  !*** ./src/services/logger/log.js ***!
  \************************************/
/*! exports provided: setting, Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setting", function() { return setting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
/* harmony import */ var _lajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lajax */ "./src/services/logger/lajax/index.js");

function defaultLog() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    /* console.log("请先进行Log初始化");
    console.log(args); */
}
var methods = ["info", "error", "warn"];
var log = {
    info: defaultLog,
    error: defaultLog,
    warn: defaultLog
};
/**
 * JSOM: JSOM.create("site","list")
 *
 * getFolderPath: () => "path"
 *
 * url: 服务器接口url;
 *
 * autoLogError: 是否自动记录未捕获错误;
 *
 * autoLogRejection 是否自动记录预备;
 *
 * autoLogAjax: 是否自动记录ajax;
 *
 * logAjaxFilter: ajax日志过滤;
 *
 * stylize: 设置输出样式;
 *
 * showDesc: 描述信息;
 *
 * customDesc: 自定义描述信息;
 *
 * interval: 日志发送周期;
 *
 * maxErrorReq: 日志发送最大试错数;
 *
 * @param {{JSOM?: any,getFolderPath?: any,url?: string,autoLogError?: boolean,autoLogRejection?: boolean,autoLogAjax?: boolean,logAjaxFilter?: any,stylize?: any,showDesc?: any,customDesc?: any,interval?: number,maxErrorReq?: number}} param
 */
var setting = function (param) {
    if (param === void 0) { param = undefined; }
    log = new _lajax__WEBPACK_IMPORTED_MODULE_0__["default"](param);
    methods.forEach(function (method) {
        logger[method] = log[method].bind(log);
    });
};
var Logger = {
    Info: log.info,
    Error: log.error,
    Warn: log.warn,
    Setting: setting
};


/***/ }),

/***/ 1:
/*!*****************************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:9999 (webpack)/hot/dev-server.js @babel/polyfill ./src ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\Code\HW\node_modules\webpack-dev-server\client\index.js?http://localhost:9999 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:9999");
__webpack_require__(/*! D:\Code\HW\node_modules\webpack\hot\dev-server.js */"./node_modules/webpack/hot/dev-server.js");
__webpack_require__(/*! @babel/polyfill */"./node_modules/@babel/polyfill/lib/index.js");
module.exports = __webpack_require__(/*! D:\Code\HW\src */"./src/index.tsx");


/***/ }),

/***/ "dll-reference dll_Dll":
/*!**************************!*\
  !*** external "dll_Dll" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dll_Dll;

/***/ })

/******/ });
//# sourceMappingURL=App.CIMTAS.js.map
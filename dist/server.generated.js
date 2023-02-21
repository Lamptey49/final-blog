/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./backend/controllers/AuthController.js":
/*!***********************************************!*\
  !*** ./backend/controllers/AuthController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_UserModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/UserModel */ \"./backend/models/UserModel.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ \"./config/config.js\");\n\r\n\r\n\r\n\r\n\r\nconst authCtrl = {\r\n  signin : async(req, res) => {\r\n    try {\r\n      let user = await _models_UserModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\r\n          \"email\": req.body.email\r\n        })\r\n  \r\n        if (!user)\r\n          return res.status(401).json({\r\n            error: \"User not found\"\r\n          })\r\n  \r\n        if (!user.authenticate(req.body.password)) {\r\n          return res.status(401).send({\r\n            error: \"Email and password don't match.\"\r\n          })\r\n        }\r\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\r\n          _id: user._id\r\n        }, _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret)\r\n  \r\n        res.cookie(\"t\", token, {\r\n          expire: new Date() + 9999\r\n        })\r\n  \r\n        return res.json({\r\n          token,\r\n          user: {_id: user._id,\r\n             fullname: user.fullname,\r\n              email: user.email,\r\n              role:user.role,\r\n              admin:user.admin\r\n            }\r\n        })\r\n    } catch (err) {\r\n      return res.status(401).json({\r\n        error: \"Could not sign in\"\r\n      })\r\n    }\r\n  },\r\n  signout :(req, res) => {\r\n    res.clearCookie(\"t\")\r\n    return res.status(200).json({\r\n      message: \"signed out\"\r\n    })\r\n  },\r\n  hasAuthorization : (req, res, next) => {\r\n    const authorized = req.auth._id && req.user._id\r\n    _models_UserModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById({_id: authorized}).exec((err, user)=>{\r\n     \r\n    if (err || !user) {\r\n      return res.status(403).json({\r\n        error: \"User is not authorized\"\r\n      })\r\n    }\r\n    next()\r\n  })\r\n},\r\n  requireSignin : (0,express_jwt__WEBPACK_IMPORTED_MODULE_2__.expressjwt)({\r\n    secret: _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret,\r\n    userProperty: 'auth',\r\n    algorithms:['HS256']\r\n  })\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authCtrl);\r\n\n\n//# sourceURL=webpack://kiriikou-blog/./backend/controllers/AuthController.js?");

/***/ }),

/***/ "./backend/controllers/BlogController.js":
/*!***********************************************!*\
  !*** ./backend/controllers/BlogController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/BlogModel */ \"./backend/models/BlogModel.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ \"./backend/helpers/dbErrorHandler.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_6__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst blogCtrl = {\r\n    create: async(req, res)=>{\r\n       \r\n        let form = new (formidable__WEBPACK_IMPORTED_MODULE_4___default().IncomingForm)()\r\n\r\n        form.keepExtensions = true \r\n        \r\n        form.parse(req, (err, fields, files)=>{\r\n            let oldPath = files.image.filepath\r\n            let newPath = path__WEBPACK_IMPORTED_MODULE_5___default().join(__dirname, '../../dist/uploads/' + files.image.name)\r\n            let rawData = fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(oldPath)\r\n           \r\n            let blog = new _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"](fields)\r\n           \r\n            blog.user = req.profile \r\n            fs__WEBPACK_IMPORTED_MODULE_3___default().writeFile(newPath, rawData, ()=>{\r\n                if(err){\r\n                    return res.status(400).json({\r\n                        error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n                    })\r\n                }\r\n            })\r\n            try{\r\n                 blog.save((result)=>{\r\n                    if(err)\r\n                        return res.status(400).json({\r\n                            error:_helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n                    })\r\n                    res.status(200).json(result)\r\n                })\r\n            } catch(err){\r\n                return res.stats(400).json({\r\n                    error:_helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n                })\r\n            }\r\n        })\r\n     \r\n    },\r\n    listBlog: async(req, res)=>{\r\n        try{\r\n            let blogs = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find()\r\n            res.json(blogs)\r\n        } catch(err){\r\n            return res.status(400).json({\r\n                error:_helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n            })\r\n        }\r\n    },\r\n    listLatest: async(req, res)=>{\r\n        try {\r\n            let blogs = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({}).sort('-createdAt')\r\n                .limit(1).exec()\r\n            res.json(blogs)\r\n        } catch (err) {\r\n            error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n        }\r\n    },\r\n    blogByID:async(req, res, next, id)=>{\r\n        try {\r\n            let blog = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(id).populate('blog', 'id title slug body categories tags image createdAt').exec()\r\n            if(!blog)\r\n                return res.status(400).json({\r\n                    error:'Blog not found'\r\n                })\r\n            req.blog = blog\r\n            next()\r\n        } catch (err) {\r\n            return res.status(400).json({\r\n                error:'Could not retrieve blog'\r\n            })\r\n        }\r\n    },\r\n    listRelated: async(req, res)=>{\r\n        try {\r\n            let blogs =await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\"_id\":req.blog }, {\"category\":req.blog.category})\r\n                        .limit(5).populate('blog', '_id title').exec()\r\n            res.json(blogs)\r\n        } catch (err) {\r\n            return res.status(400).json({\r\n                error:_helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n            })\r\n        }\r\n    },\r\n    read:async(req, res)=>{\r\n        let blog = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({})\r\n        blog.image = undefined \r\n        return res.json(req.blog)\r\n    },\r\n    listCategories:async(req, res)=>{\r\n        try {\r\n            let blogs = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].distinct('category', {})\r\n            re.json(blogs)\r\n        } catch (err) {\r\n            return res.status(400).json({\r\n                error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n            })\r\n        }\r\n    },\r\n    list: async(req, res)=>{\r\n        const query = {}\r\n        if(req.query.search)\r\n            query.name = {'$regex':req.query.search, '$options':'i'}\r\n        if(req.query.category = req.query.category != 'All')\r\n            query.category = req.query.category \r\n        try{\r\n            let blogs = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).populate('user', '_id fullname')\r\n                .select('-image').exec()\r\n            res.json(blogs)\r\n        } catch(err){\r\n            return res.status(400).json({\r\n                error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n            })\r\n        }\r\n    },\r\n    update:async(req, res)=>{\r\n        let form = new (formidable__WEBPACK_IMPORTED_MODULE_4___default().IncomingForm)()\r\n        form.keepExtensions = true \r\n        form.parse(req, async(err, fields, files)=>{\r\n          if(err){\r\n            return res.status(400).json({\r\n              error:'Photo could not be uploaded'\r\n            })\r\n          }\r\n          let blog = new _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n          blog = lodash__WEBPACK_IMPORTED_MODULE_1___default()(blog, fields)\r\n          \r\n          if(files.photo){\r\n            blog.photo.data = fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(files.photo.path)\r\n            blog.photo.contentType = files.photo.type\r\n          }\r\n          try {\r\n            await blog.save()\r\n            res.json(blog)\r\n          } catch (err) {\r\n            return res.status(400).json({\r\n              error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n            })\r\n          }\r\n        })\r\n    },\r\n    remove: async(req, res)=>{\r\n        try {\r\n            let blog = new _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\n            let deletedBlog = await blog.remove()\r\n            res.json(deletedBlog)\r\n          } catch (err) {\r\n            return res.status(400).json({\r\n              error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n            })\r\n          }\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (blogCtrl);\n\n//# sourceURL=webpack://kiriikou-blog/./backend/controllers/BlogController.js?");

/***/ }),

/***/ "./backend/controllers/UserController.js":
/*!***********************************************!*\
  !*** ./backend/controllers/UserController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_UserModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/UserModel */ \"./backend/models/UserModel.js\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/extend */ \"lodash/extend\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ \"./backend/helpers/dbErrorHandler.js\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _scopaf_blog_public_logo512_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scopaf-blog/public/logo512.png */ \"./scopaf-blog/public/logo512.png\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst userCtrl = {\r\n      create : async(req, res) => {\r\n          const user = new _models_UserModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"](req.body)\r\n          try {\r\n           await user.save()\r\n            res.status(200).json({\r\n                message:'Signed up successfully'\r\n            })\r\n             \r\n          } catch (err) {\r\n            return res.status(400).json({\r\n              error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n            })\r\n          }\r\n      },\r\n      userByID :async (req, res, next, id) => {\r\n        try {\r\n          let user = await _models_UserModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(id)\r\n          if (!user)\r\n            return res.status(400).json({\r\n              error: \"User not found\"\r\n            })\r\n          req.profile = user\r\n          next()\r\n        } catch (err) {\r\n          return res.status('400').json({\r\n            error: \"Could not retrieve user\"\r\n          })\r\n        }\r\n      },\r\n      read : (req, res) => {\r\n        req.profile.hashed_password = undefined\r\n        req.profile.salt = undefined\r\n        return res.json(req.profile)\r\n      },\r\n      list :async (req, res) => {\r\n        try {\r\n          let users = await _models_UserModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find().select('fullname email updated created')\r\n          res.json(users)\r\n        } catch (err) {\r\n          return res.status(400).json({\r\n            error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n          })\r\n        }\r\n      },\r\n      update : async (req, res) => {\r\n        let form = new (formidable__WEBPACK_IMPORTED_MODULE_3___default().IncomingForm)()\r\n        form.keepExtensions = true \r\n        form.parse(req, async(err, fields, files)=>{\r\n          if(err){\r\n            return res.status(400).json({\r\n              error:'Photo could not be uploaded'\r\n            })\r\n          }\r\n          let user = req.profile\r\n          user = lodash_extend__WEBPACK_IMPORTED_MODULE_1___default()(user, req.body)\r\n          user.updated = Date.now()\r\n          if(files.photo){\r\n            user.photo.data = fs__WEBPACK_IMPORTED_MODULE_4___default().readFileSync(files.photo.path)\r\n            user.photo.contentType = files.photo.type\r\n          }\r\n          try {\r\n            await user.save()\r\n            user.hashed_password = undefined\r\n            user.salt = undefined\r\n            res.json(user)\r\n          } catch (err) {\r\n            return res.status(400).json({\r\n              error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n            })\r\n          }\r\n        })\r\n      \r\n      },\r\n      remove : async (req, res) => {\r\n        try {\r\n          let user = req.profile\r\n          let deletedUser = await user.remove()\r\n          deletedUser.hashed_password = undefined\r\n          deletedUser.salt = undefined\r\n          res.json(deletedUser)\r\n        } catch (err) {\r\n          return res.status(400).json({\r\n            error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\r\n          })\r\n        }\r\n      },\r\n      admin : (req, res, next)=>{\r\n        const isAdmin = req.profile && req.profile.admin\r\n        if(!isAdmin){\r\n          return res.status(403).json({\r\n            error: 'You are not an Admin' \r\n          })\r\n        }\r\n        next()\r\n      },\r\n      photo:(req, res, next)=>{\r\n        if(req.profile.data){\r\n          res.set('Content-Type', req.profile.photo.contentType)\r\n            return res.send(req.profile.photo.data)\r\n        }\r\n        next()\r\n      },\r\n      defaultPhoto:(req, res)=>{\r\n        return res.sendFile(procss.cwd()+_scopaf_blog_public_logo512_png__WEBPACK_IMPORTED_MODULE_5__[\"default\"])\r\n      }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userCtrl);\r\n\n\n//# sourceURL=webpack://kiriikou-blog/./backend/controllers/UserController.js?");

/***/ }),

/***/ "./backend/express.js":
/*!****************************!*\
  !*** ./backend/express.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _routes_user_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/user.routes */ \"./backend/routes/user.routes.js\");\n/* harmony import */ var _routes_auth_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/auth.routes */ \"./backend/routes/auth.routes.js\");\n/* harmony import */ var _routes_blog_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/blog.routes */ \"./backend/routes/blog.routes.js\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_8__);\n\r\n\r\n\r\n// import devBundle from './devBundle'\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst app  = express__WEBPACK_IMPORTED_MODULE_0___default()()\r\n// devBundle.compile(app)\r\n\r\nconst CURRENT_WORKING_DIR = process.cwd()\r\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().json())\r\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().urlencoded({ extended: true }))\r\napp.use(compression__WEBPACK_IMPORTED_MODULE_6___default()())\r\napp.use(helmet__WEBPACK_IMPORTED_MODULE_7___default()({\r\n    contentSecurityPolicy:false,\r\n    crossOriginResourcePolicy:false\r\n}))\r\napp.use(cors__WEBPACK_IMPORTED_MODULE_8___default()({ credentials: true,}))\r\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().urlencoded({ extended: true}))\r\napp.use('/',_routes_user_routes__WEBPACK_IMPORTED_MODULE_3__[\"default\"])\r\napp.use('/', _routes_auth_routes__WEBPACK_IMPORTED_MODULE_4__[\"default\"])\r\napp.use('/', _routes_blog_routes__WEBPACK_IMPORTED_MODULE_5__[\"default\"])\r\n\r\napp.use('/dist', express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](path__WEBPACK_IMPORTED_MODULE_1___default().join(CURRENT_WORKING_DIR,\r\n     'dist')))\r\n\r\n\r\n\r\n\r\napp.use((err, req, res, next)=>{\r\n    if(err.name == 'UnauthorizedError'){\r\n        res.status(401).json({'error':err.name + ': '+err.message})\r\n    } else if(err){\r\n        res.status(400).json({'error':err.name + ': '+err.message})\r\n        console.log(err)\r\n    }\r\n})\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://kiriikou-blog/./backend/express.js?");

/***/ }),

/***/ "./backend/helpers/dbErrorHandler.js":
/*!*******************************************!*\
  !*** ./backend/helpers/dbErrorHandler.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\n\r\n/**\r\n * Get unique error field name\r\n */\r\nconst getUniqueErrorMessage = (err) => {\r\n    let output\r\n    try {\r\n        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))\r\n        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'\r\n    } catch (ex) {\r\n        output = 'Unique field already exists'\r\n    }\r\n\r\n    return output\r\n}\r\n\r\n/**\r\n * Get the error message from error object\r\n */\r\nconst getErrorMessage = (err) => {\r\n    let message = ''\r\n\r\n    if (err.code) {\r\n        switch (err.code) {\r\n            case 11000:\r\n            case 11001:\r\n                message = getUniqueErrorMessage(err)\r\n                break\r\n            default:\r\n                message = 'Something went wrong'\r\n        }\r\n    } else {\r\n        for (let errName in err.errors) {\r\n            if (err.errors[errName].message) message = err.errors[errName].message\r\n        }\r\n    }\r\n\r\n    return message\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({getErrorMessage});\r\n\n\n//# sourceURL=webpack://kiriikou-blog/./backend/helpers/dbErrorHandler.js?");

/***/ }),

/***/ "./backend/models/BlogModel.js":
/*!*************************************!*\
  !*** ./backend/models/BlogModel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst { ObjectId } = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)\r\n\r\nconst blogSchema = new  (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\r\n    title:{\r\n        type:String,\r\n        required: true,\r\n    },\r\n    slug:{\r\n        type:String,\r\n        required: true,\r\n        index: true\r\n    },\r\n    body:{\r\n        type:String,\r\n        required: true,\r\n        min: 20    \r\n    },\r\n    image:{\r\n        data: Buffer,\r\n        contentType: String,\r\n    },\r\n    categories:{type:String},\r\n    tags:{type: String},\r\n    postedBy:{\r\n        type:ObjectId,\r\n        ref:'User'\r\n    },\r\n    createdAt:{\r\n        type:Date,\r\n        default:Date.now\r\n    },\r\n    updatedAt:{\r\n        type:Date,\r\n        default:Date.now\r\n    }\r\n},\r\n    {timestamps: true}\r\n)\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Blog', blogSchema));\n\n//# sourceURL=webpack://kiriikou-blog/./backend/models/BlogModel.js?");

/***/ }),

/***/ "./backend/models/UserModel.js":
/*!*************************************!*\
  !*** ./backend/models/UserModel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nconst userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\r\n    \r\n    fullname:{\r\n        type:String,\r\n        trim:true,\r\n        required:true,\r\n    },\r\n    email:{\r\n        type: String,\r\n        trim: true,\r\n        unique: 'Email already exists',\r\n        match: [/.+\\@.+\\..+/, 'Please fill a valid email address'],\r\n        required: 'Email is required'\r\n    },\r\n    hashed_password:{\r\n        type:String,\r\n        required:true\r\n    },\r\n    salt:String,\r\n    about:{\r\n        type:String\r\n    },\r\n    role:{\r\n        type:Number,\r\n        trim:true,\r\n        default:0\r\n    },\r\n    photo:{\r\n        data:Buffer,\r\n        contentType:String\r\n    },\r\n    resetPasswordLink:{\r\n        data:String,\r\n        default:''\r\n    },\r\n    admin:{\r\n        type:Boolean,\r\n        default:false\r\n    }\r\n},\r\n{timeStamp: true}\r\n)\r\nuserSchema.virtual('password')\r\n    .set(function(password){\r\n        this._password = password \r\n        this.salt = this.makeSalt()\r\n        this.hashed_password = this.encryptPassword(password)\r\n    }).get(function(){\r\n        return this._password\r\n    })\r\nuserSchema.methods = {\r\n    authenticate: function(plainText){\r\n        return this.encryptPassword(plainText) === this.hashed_password\r\n    },\r\n    encryptPassword: function(password){\r\n        if(!password) return ''\r\n        try{\r\n            return crypto__WEBPACK_IMPORTED_MODULE_1___default().createHash('sha1', this.salt)\r\n            .update(password)\r\n            .digest('hex')\r\n        } catch(err){\r\n            return ''\r\n        }\r\n    },\r\n    makeSalt: function(){\r\n        return Math.round((new Date().valueOf() * Math.random())) + ''\r\n    }\r\n}\r\n\r\nuserSchema.path('hashed_password').validate(function(v){\r\n        if(this._password && this._password.length < 6){\r\n            this.invalidate('password', 'Password must be at least 6 characters long.');\r\n        }\r\n        if(this.isNew && !this._password){\r\n            this.invalidate('password', 'Password is required')\r\n        }\r\n    }, null)\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', userSchema));\n\n//# sourceURL=webpack://kiriikou-blog/./backend/models/UserModel.js?");

/***/ }),

/***/ "./backend/routes/auth.routes.js":
/*!***************************************!*\
  !*** ./backend/routes/auth.routes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_AuthController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/AuthController */ \"./backend/controllers/AuthController.js\");\n\r\n\r\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router()\r\n\r\nrouter.route('/auth/signin')\r\n    .post(_controllers_AuthController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signin)\r\nrouter.route('/auth/signout')\r\n    .get(_controllers_AuthController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signout)\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://kiriikou-blog/./backend/routes/auth.routes.js?");

/***/ }),

/***/ "./backend/routes/blog.routes.js":
/*!***************************************!*\
  !*** ./backend/routes/blog.routes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/BlogController */ \"./backend/controllers/BlogController.js\");\n/* harmony import */ var _controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/AuthController */ \"./backend/controllers/AuthController.js\");\n/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/UserController */ \"./backend/controllers/UserController.js\");\n\r\n\r\n\r\n\r\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router()\r\nrouter.route('/api/new/blog')\r\n    .post( _controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create)\r\nrouter.route('/api/blogs/by')\r\n    .get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listBlog)\r\nrouter.route('/api/blogs/latest')\r\n    .get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listLatest)\r\nrouter.route('/api/blogs/related/:id')\r\n    .get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listRelated)\r\nrouter.route('/api/blogs/:id')\r\n    .get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read)\r\nrouter.route('/api/blog/:userId/:blogId')\r\n    .put(_controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update)\r\n    .delete(_controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove)\r\nrouter.route('/api/blogs/categories')\r\n    .get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listCategories)\r\nrouter.route('/api/blogs')\r\n    .get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list)\r\nrouter.param('userId', _controllers_UserController__WEBPACK_IMPORTED_MODULE_3__[\"default\"].userByID)\r\nrouter.param('blogId', _controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].blogByID)\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://kiriikou-blog/./backend/routes/blog.routes.js?");

/***/ }),

/***/ "./backend/routes/user.routes.js":
/*!***************************************!*\
  !*** ./backend/routes/user.routes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/UserController */ \"./backend/controllers/UserController.js\");\n/* harmony import */ var _controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/AuthController */ \"./backend/controllers/AuthController.js\");\n\r\n\r\n\r\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router()\r\n\r\nrouter.route('/api/users')\r\n  .get(_controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list)\r\nrouter.route('/api/users/create')\r\n  .post(_controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create)\r\nrouter.route('/api/users/:userId')\r\n  .get( _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read)\r\n  .put( _controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update)\r\n  .delete( _controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove)\r\nrouter.route('/api/users/photo/:userId')\r\n  .get(_controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].photo, _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].defaultPhoto)\r\nrouter.route('/api/users/defaultPhoto')\r\n  .get(_controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].defaultPhoto)\r\n// router.route('/verify-email').get(userCtrl.verifyEmail)\r\n// router.route('/forgot').post(userCtrl.resetPassword )\r\nrouter.param('userId', _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].userByID)\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\r\n\n\n//# sourceURL=webpack://kiriikou-blog/./backend/routes/user.routes.js?");

/***/ }),

/***/ "./backend/server.js":
/*!***************************!*\
  !*** ./backend/server.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./express */ \"./backend/express.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../config/config */ \"./config/config.js\");\n\r\n\r\n\r\n\r\n\r\n(mongoose__WEBPACK_IMPORTED_MODULE_1___default().Promise) = global.Promise\r\nmongoose__WEBPACK_IMPORTED_MODULE_1___default().set('strictQuery', false)\r\nmongoose__WEBPACK_IMPORTED_MODULE_1___default().connect(_config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mongoUri, { useNewUrlParser: true,  useUnifiedTopology:true })\r\n        .then(()=>console.log(`Database connected successfully`))\r\n        .catch(err => {\r\n            console.log(err)\r\n        })\r\n\r\n\r\n_express__WEBPACK_IMPORTED_MODULE_0__[\"default\"].listen(_config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].port, (err)=>{\r\n    if(err){\r\n        console.log(err)\r\n    }\r\n    console.info(`Server started on port ${_config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].port}`)\r\n})\n\n//# sourceURL=webpack://kiriikou-blog/./backend/server.js?");

/***/ }),

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\r\n    env: \"development\" || 0,\r\n    port: process.env.PORT || 4000,\r\n    jwtSecret: process.env.JWT_SECRET || \"gdjh47rniof87gfjdnHJTUGNDIRNE04UFNew4r7fnmbHI8rj0hygf\",\r\n     mongoUri: 'mongodb://localhost:27017/scopaf_blog-db'\r\n    // mongoUri:\"mongodb+srv://Phinehas:Phinehas86@cluster0.1gctm.mongodb.net/kiriikou-ecommerce?retryWrites=true&w=majority\",\r\n    \r\n    // sendgrid_api_key:'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',\r\n    // email_address:'info@kiriikou.com',\r\n    // SENDGRID_USERNAME:'lampteyphinehas70@gmail.com',\r\n    // SENDGRID_PASSWORD:'phinehaslamptey86'*/\r\n  }\r\n  \r\n  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://kiriikou-blog/./config/config.js?");

/***/ }),

/***/ "./scopaf-blog/public/logo512.png":
/*!****************************************!*\
  !*** ./scopaf-blog/public/logo512.png ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"e28e1a7073c8fa14c1e127b270abbb0a.png\");\n\n//# sourceURL=webpack://kiriikou-blog/./scopaf-blog/public/logo512.png?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("express-jwt");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("formidable");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ "lodash/extend":
/*!********************************!*\
  !*** external "lodash/extend" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/extend");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

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
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/dist/";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./backend/server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
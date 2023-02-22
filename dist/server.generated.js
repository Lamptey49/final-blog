/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./backend/controllers/AuthController.js":
/*!***********************************************!*\
  !*** ./backend/controllers/AuthController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_UserModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/UserModel */ \"./backend/models/UserModel.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ \"./config/config.js\");\n\n\n\n\nconst authCtrl = {\n  signin: async (req, res) => {\n    try {\n      let user = await _models_UserModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n        \"email\": req.body.email\n      });\n      if (!user) return res.status(401).json({\n        error: \"User not found\"\n      });\n      if (!user.authenticate(req.body.password)) {\n        return res.status(401).send({\n          error: \"Email and password don't match.\"\n        });\n      }\n      const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\n        _id: user._id\n      }, _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret);\n      res.cookie(\"t\", token, {\n        expire: new Date() + 9999\n      });\n      return res.json({\n        token,\n        user: {\n          _id: user._id,\n          fullname: user.fullname,\n          email: user.email,\n          role: user.role,\n          admin: user.admin\n        }\n      });\n    } catch (err) {\n      return res.status(401).json({\n        error: \"Could not sign in\"\n      });\n    }\n  },\n  signout: (req, res) => {\n    res.clearCookie(\"t\");\n    return res.status(200).json({\n      message: \"signed out\"\n    });\n  },\n  hasAuthorization: (req, res, next) => {\n    const authorized = req.auth._id && req.user._id;\n    _models_UserModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById({\n      _id: authorized\n    }).exec((err, user) => {\n      if (err || !user) {\n        return res.status(403).json({\n          error: \"User is not authorized\"\n        });\n      }\n      next();\n    });\n  },\n  requireSignin: (0,express_jwt__WEBPACK_IMPORTED_MODULE_2__.expressjwt)({\n    secret: _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret,\n    userProperty: 'auth',\n    algorithms: ['HS256']\n  })\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authCtrl);\n\n//# sourceURL=webpack://kiriikou-blog/./backend/controllers/AuthController.js?");

/***/ }),

/***/ "./backend/controllers/BlogController.js":
/*!***********************************************!*\
  !*** ./backend/controllers/BlogController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/BlogModel */ \"./backend/models/BlogModel.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ \"./backend/helpers/dbErrorHandler.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nconst blogCtrl = {\n  create: async (req, res) => {\n    let form = formidable__WEBPACK_IMPORTED_MODULE_4___default()({\n      multiples: true\n    });\n    form.keepExtensions = true;\n    form.parse(req, (err, fields, files) => {\n      let blog = (0,_models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(fields);\n      blog.user = req.profile;\n      if (files.image) {\n        let oldPath = files.image.filepath;\n        let newPath = path__WEBPACK_IMPORTED_MODULE_5___default().join(__dirname, '../../dist/uploads/' + files.image.name);\n        let rawData = fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(oldPath, 'utf-8');\n\n        // fs.writeFile(newPath, rawData, ()=>{\n        //     if(err){\n        //         return res.status(400).json({\n        //             error: 'Could not add image'\n        //         })\n        //     }\n        // })\n        blog.image.data = fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(oldPath);\n        blog.image.contentType = files.image.type;\n      }\n      blog.save(result => {\n        if (err) return res.status(400).json({\n          error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n        });\n        res.status(200).json(result);\n      });\n    });\n  },\n  listBlog: async (req, res) => {\n    try {\n      let blogs = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find();\n      res.json(blogs);\n    } catch (err) {\n      return res.status(400).json({\n        error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n      });\n    }\n  },\n  listLatest: async (req, res) => {\n    try {\n      let blogs = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({}).sort('-createdAt').limit(1).exec();\n      res.json(blogs);\n    } catch (err) {\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err);\n    }\n  },\n  blogByID: async (req, res, next, id) => {\n    try {\n      let blog = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(id).populate('blog', 'id title slug body categories tags image createdAt').exec();\n      if (!blog) return res.status(400).json({\n        error: 'Blog not found'\n      });\n      req.blog = blog;\n      next();\n    } catch (err) {\n      return res.status(400).json({\n        error: 'Could not retrieve blog'\n      });\n    }\n  },\n  listRelated: async (req, res) => {\n    try {\n      let blogs = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({}).limit(5).populate('blog', '_id title image categories tags createdAt').exec();\n      res.json(blogs);\n    } catch (err) {\n      return res.status(400).json({\n        error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n      });\n    }\n  },\n  read: async (req, res) => {\n    let blog = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({});\n    blog.image = undefined;\n    return res.json(req.blog);\n  },\n  listCategories: async (req, res) => {\n    try {\n      let blogs = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].distinct('category', {});\n      re.json(blogs);\n    } catch (err) {\n      return res.status(400).json({\n        error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n      });\n    }\n  },\n  list: async (req, res) => {\n    const query = {};\n    if (req.query.search) query.name = {\n      '$regex': req.query.search,\n      '$options': 'i'\n    };\n    if (req.query.category = req.query.category != 'All') query.category = req.query.category;\n    try {\n      let blogs = await _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).populate('user', '_id fullname').select('-image').exec();\n      res.json(blogs);\n    } catch (err) {\n      return res.status(400).json({\n        error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n      });\n    }\n  },\n  update: async (req, res) => {\n    let form = new (formidable__WEBPACK_IMPORTED_MODULE_4___default().IncomingForm)();\n    form.keepExtensions = true;\n    form.parse(req, async (err, fields, files) => {\n      if (err) {\n        return res.status(400).json({\n          error: 'Photo could not be uploaded'\n        });\n      }\n      let blog = new _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n      blog = lodash__WEBPACK_IMPORTED_MODULE_1___default()(blog, fields);\n      if (files.photo) {\n        blog.photo.data = fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(files.photo.path);\n        blog.photo.contentType = files.photo.type;\n      }\n      try {\n        await blog.save();\n        res.json(blog);\n      } catch (err) {\n        return res.status(400).json({\n          error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n        });\n      }\n    });\n  },\n  remove: async (req, res) => {\n    try {\n      let blog = new _models_BlogModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n      let deletedBlog = await blog.remove();\n      res.json(deletedBlog);\n    } catch (err) {\n      return res.status(400).json({\n        error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n      });\n    }\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (blogCtrl);\n\n//# sourceURL=webpack://kiriikou-blog/./backend/controllers/BlogController.js?");

/***/ }),

/***/ "./backend/controllers/UserController.js":
/*!***********************************************!*\
  !*** ./backend/controllers/UserController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_UserModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/UserModel */ \"./backend/models/UserModel.js\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/extend */ \"lodash/extend\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ \"./backend/helpers/dbErrorHandler.js\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _dist_uploads_user_logo_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../dist/uploads/user-logo.jpg */ \"./dist/uploads/user-logo.jpg\");\n\n\n\n\n\n\nconst userCtrl = {\n  create: async (req, res) => {\n    const user = new _models_UserModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"](req.body);\n    try {\n      await user.save();\n      res.status(200).json({\n        message: 'Signed up successfully'\n      });\n    } catch (err) {\n      return res.status(400).json({\n        error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n      });\n    }\n  },\n  userByID: async (req, res, next, id) => {\n    try {\n      let user = await _models_UserModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(id);\n      if (!user) return res.status(400).json({\n        error: \"User not found\"\n      });\n      req.profile = user;\n      next();\n    } catch (err) {\n      return res.status('400').json({\n        error: \"Could not retrieve user\"\n      });\n    }\n  },\n  read: (req, res) => {\n    req.profile.hashed_password = undefined;\n    req.profile.salt = undefined;\n    return res.json(req.profile);\n  },\n  list: async (req, res) => {\n    try {\n      let users = await _models_UserModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find().select('fullname email updated created');\n      res.json(users);\n    } catch (err) {\n      return res.status(400).json({\n        error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n      });\n    }\n  },\n  update: async (req, res) => {\n    let form = new (formidable__WEBPACK_IMPORTED_MODULE_3___default().IncomingForm)();\n    form.keepExtensions = true;\n    form.parse(req, async (err, fields, files) => {\n      if (err) {\n        return res.status(400).json({\n          error: 'Photo could not be uploaded'\n        });\n      }\n      let user = req.profile;\n      user = lodash_extend__WEBPACK_IMPORTED_MODULE_1___default()(user, req.body);\n      user.updated = Date.now();\n      if (files.photo) {\n        user.photo.data = fs__WEBPACK_IMPORTED_MODULE_4___default().readFileSync(files.photo.path);\n        user.photo.contentType = files.photo.type;\n      }\n      try {\n        await user.save();\n        user.hashed_password = undefined;\n        user.salt = undefined;\n        res.json(user);\n      } catch (err) {\n        return res.status(400).json({\n          error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n        });\n      }\n    });\n  },\n  remove: async (req, res) => {\n    try {\n      let user = req.profile;\n      let deletedUser = await user.remove();\n      deletedUser.hashed_password = undefined;\n      deletedUser.salt = undefined;\n      res.json(deletedUser);\n    } catch (err) {\n      return res.status(400).json({\n        error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n      });\n    }\n  },\n  admin: (req, res, next) => {\n    const isAdmin = req.profile && req.profile.admin;\n    if (!isAdmin) {\n      return res.status(403).json({\n        error: 'You are not an Admin'\n      });\n    }\n    next();\n  },\n  photo: (req, res, next) => {\n    if (req.profile.data) {\n      res.set('Content-Type', req.profile.photo.contentType);\n      return res.send(req.profile.photo.data);\n    }\n    next();\n  },\n  defaultPhoto: (req, res) => {\n    return res.sendFile(procss.cwd() + _dist_uploads_user_logo_jpg__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userCtrl);\n\n//# sourceURL=webpack://kiriikou-blog/./backend/controllers/UserController.js?");

/***/ }),

/***/ "./backend/devBundle.js":
/*!******************************!*\
  !*** ./backend/devBundle.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config/config */ \"./config/config.js\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _webpack_config_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../webpack.config.client */ \"./webpack.config.client.js\");\n/* harmony import */ var _webpack_config_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_webpack_config_client__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst compile = app => {\n  if (_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env === 'development') {\n    const compiler = webpack__WEBPACK_IMPORTED_MODULE_1___default()((_webpack_config_client__WEBPACK_IMPORTED_MODULE_4___default()));\n    const middleware = webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default()(compiler, {\n      publicPath: (_webpack_config_client__WEBPACK_IMPORTED_MODULE_4___default().output.publicPath)\n    });\n    app.use(middleware);\n    app.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_2___default()(compiler));\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  compile\n});\n\n//# sourceURL=webpack://kiriikou-blog/./backend/devBundle.js?");

/***/ }),

/***/ "./backend/express.js":
/*!****************************!*\
  !*** ./backend/express.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _routes_user_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/user.routes */ \"./backend/routes/user.routes.js\");\n/* harmony import */ var _routes_auth_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/auth.routes */ \"./backend/routes/auth.routes.js\");\n/* harmony import */ var _routes_blog_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/blog.routes */ \"./backend/routes/blog.routes.js\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _client_src_MainRouter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../client/src/MainRouter */ \"./client/src/MainRouter.js\");\n/* harmony import */ var _client_public_template__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../client/public/template */ \"./client/public/template.js\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var react_router_dom_server__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router-dom/server */ \"react-router-dom/server\");\n/* harmony import */ var react_router_dom_server__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_router_dom_server__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _devBundle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./devBundle */ \"./backend/devBundle.js\");\n\n\n\n// import devBundle from './devBundle'\n\n\n\n\n\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n_devBundle__WEBPACK_IMPORTED_MODULE_14__[\"default\"].compile(app);\nconst CURRENT_WORKING_DIR = process.cwd();\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().urlencoded({\n  extended: true\n}));\napp.use(compression__WEBPACK_IMPORTED_MODULE_6___default()());\napp.use(helmet__WEBPACK_IMPORTED_MODULE_7___default()({\n  contentSecurityPolicy: false,\n  crossOriginResourcePolicy: false\n}));\napp.use(cors__WEBPACK_IMPORTED_MODULE_8___default()({\n  credentials: true\n}));\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().urlencoded({\n  extended: true\n}));\napp.use('/', _routes_user_routes__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\napp.use('/', _routes_auth_routes__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\napp.use('/', _routes_blog_routes__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\napp.use('/dist', express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](path__WEBPACK_IMPORTED_MODULE_1___default().join(CURRENT_WORKING_DIR, 'dist')));\napp.use('*', (req, res) => {\n  const context = {};\n  const markup = react_dom_server__WEBPACK_IMPORTED_MODULE_12___default().renderToString( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default().createElement(react_router_dom_server__WEBPACK_IMPORTED_MODULE_13__.StaticRouter, {\n    location: req.url,\n    context: context\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default().createElement(_client_src_MainRouter__WEBPACK_IMPORTED_MODULE_10__[\"default\"], null)));\n  if (context.url) {\n    return res.redirect(303, context.url);\n  }\n  res.status(200).send((0,_client_public_template__WEBPACK_IMPORTED_MODULE_11__[\"default\"])({\n    markup: markup\n  }));\n});\napp.use('/', (req, res) => {\n  res.set({\n    'Content-Type': 'application/json',\n    'Access-Control-Allow-Origin': 'https://scopaf.herokuapp.com',\n    'Access-Control-Request-Headers': ['GET', 'POST', 'PUT', 'DELETE']\n  });\n});\napp.use((err, req, res, next) => {\n  if (err.name == 'UnauthorizedError') {\n    res.status(401).json({\n      'error': err.name + ': ' + err.message\n    });\n  } else if (err) {\n    res.status(400).json({\n      'error': err.name + ': ' + err.message\n    });\n    console.log(err);\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://kiriikou-blog/./backend/express.js?");

/***/ }),

/***/ "./backend/helpers/dbErrorHandler.js":
/*!*******************************************!*\
  !*** ./backend/helpers/dbErrorHandler.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\n/**\r\n * Get unique error field name\r\n */\nconst getUniqueErrorMessage = err => {\n  let output;\n  try {\n    let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));\n    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';\n  } catch (ex) {\n    output = 'Unique field already exists';\n  }\n  return output;\n};\n\n/**\r\n * Get the error message from error object\r\n */\nconst getErrorMessage = err => {\n  let message = '';\n  if (err.code) {\n    switch (err.code) {\n      case 11000:\n      case 11001:\n        message = getUniqueErrorMessage(err);\n        break;\n      default:\n        message = 'Something went wrong';\n    }\n  } else {\n    for (let errName in err.errors) {\n      if (err.errors[errName].message) message = err.errors[errName].message;\n    }\n  }\n  return message;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  getErrorMessage\n});\n\n//# sourceURL=webpack://kiriikou-blog/./backend/helpers/dbErrorHandler.js?");

/***/ }),

/***/ "./backend/models/BlogModel.js":
/*!*************************************!*\
  !*** ./backend/models/BlogModel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst {\n  ObjectId\n} = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema);\nconst blogSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  title: {\n    type: String,\n    required: true\n  },\n  slug: {\n    type: String,\n    required: true,\n    index: true\n  },\n  body: {\n    type: String,\n    required: true,\n    min: 20\n  },\n  image: {\n    data: Buffer,\n    contentType: String\n  },\n  categories: {\n    type: String\n  },\n  tags: {\n    type: String\n  },\n  postedBy: {\n    type: ObjectId,\n    ref: 'User'\n  },\n  createdAt: {\n    type: Date,\n    default: Date.now\n  },\n  updatedAt: {\n    type: Date,\n    default: Date.now\n  }\n}, {\n  timestamps: true\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Blog', blogSchema));\n\n//# sourceURL=webpack://kiriikou-blog/./backend/models/BlogModel.js?");

/***/ }),

/***/ "./backend/models/UserModel.js":
/*!*************************************!*\
  !*** ./backend/models/UserModel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  fullname: {\n    type: String,\n    trim: true,\n    required: true\n  },\n  email: {\n    type: String,\n    trim: true,\n    unique: 'Email already exists',\n    match: [/.+\\@.+\\..+/, 'Please fill a valid email address'],\n    required: 'Email is required'\n  },\n  hashed_password: {\n    type: String,\n    required: true\n  },\n  salt: String,\n  about: {\n    type: String\n  },\n  role: {\n    type: Number,\n    trim: true,\n    default: 0\n  },\n  photo: {\n    data: Buffer,\n    contentType: String\n  },\n  resetPasswordLink: {\n    data: String,\n    default: ''\n  },\n  admin: {\n    type: Boolean,\n    default: false\n  }\n}, {\n  timeStamp: true\n});\nuserSchema.virtual('password').set(function (password) {\n  this._password = password;\n  this.salt = this.makeSalt();\n  this.hashed_password = this.encryptPassword(password);\n}).get(function () {\n  return this._password;\n});\nuserSchema.methods = {\n  authenticate: function (plainText) {\n    return this.encryptPassword(plainText) === this.hashed_password;\n  },\n  encryptPassword: function (password) {\n    if (!password) return '';\n    try {\n      return crypto__WEBPACK_IMPORTED_MODULE_1___default().createHash('sha1', this.salt).update(password).digest('hex');\n    } catch (err) {\n      return '';\n    }\n  },\n  makeSalt: function () {\n    return Math.round(new Date().valueOf() * Math.random()) + '';\n  }\n};\nuserSchema.path('hashed_password').validate(function (v) {\n  if (this._password && this._password.length < 6) {\n    this.invalidate('password', 'Password must be at least 6 characters long.');\n  }\n  if (this.isNew && !this._password) {\n    this.invalidate('password', 'Password is required');\n  }\n}, null);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', userSchema));\n\n//# sourceURL=webpack://kiriikou-blog/./backend/models/UserModel.js?");

/***/ }),

/***/ "./backend/routes/auth.routes.js":
/*!***************************************!*\
  !*** ./backend/routes/auth.routes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_AuthController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/AuthController */ \"./backend/controllers/AuthController.js\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('/auth/signin').post(_controllers_AuthController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signin);\nrouter.route('/auth/signout').get(_controllers_AuthController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signout);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://kiriikou-blog/./backend/routes/auth.routes.js?");

/***/ }),

/***/ "./backend/routes/blog.routes.js":
/*!***************************************!*\
  !*** ./backend/routes/blog.routes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/BlogController */ \"./backend/controllers/BlogController.js\");\n/* harmony import */ var _controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/AuthController */ \"./backend/controllers/AuthController.js\");\n/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/UserController */ \"./backend/controllers/UserController.js\");\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('/api/new/blog').post(_controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create);\nrouter.route('/api/blogs/by').get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listBlog);\nrouter.route('/api/blogs/latest').get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listLatest);\nrouter.route('/api/blogs/related').get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listRelated);\nrouter.route('/api/blogs/:id').get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read);\nrouter.route('/api/blog/:userId/:blogId').put(_controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update).delete(_controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove);\nrouter.route('/api/blogs/categories').get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listCategories);\nrouter.route('/api/blogs').get(_controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list);\nrouter.param('userId', _controllers_UserController__WEBPACK_IMPORTED_MODULE_3__[\"default\"].userByID);\nrouter.param('blogId', _controllers_BlogController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].blogByID);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://kiriikou-blog/./backend/routes/blog.routes.js?");

/***/ }),

/***/ "./backend/routes/user.routes.js":
/*!***************************************!*\
  !*** ./backend/routes/user.routes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/UserController */ \"./backend/controllers/UserController.js\");\n/* harmony import */ var _controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/AuthController */ \"./backend/controllers/AuthController.js\");\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('/api/users').get(_controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list);\nrouter.route('/api/users/create').post(_controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create);\nrouter.route('/api/users/:userId').get(_controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read).put(_controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update).delete(_controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove);\nrouter.route('/api/users/photo/:userId').get(_controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].photo, _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].defaultPhoto);\nrouter.route('/api/users/defaultPhoto').get(_controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].defaultPhoto);\n// router.route('/verify-email').get(userCtrl.verifyEmail)\n// router.route('/forgot').post(userCtrl.resetPassword )\nrouter.param('userId', _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].userByID);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://kiriikou-blog/./backend/routes/user.routes.js?");

/***/ }),

/***/ "./backend/server.js":
/*!***************************!*\
  !*** ./backend/server.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./express */ \"./backend/express.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../config/config */ \"./config/config.js\");\n\n\n\n(mongoose__WEBPACK_IMPORTED_MODULE_1___default().Promise) = global.Promise;\nmongoose__WEBPACK_IMPORTED_MODULE_1___default().set('strictQuery', false);\nmongoose__WEBPACK_IMPORTED_MODULE_1___default().connect(_config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mongoUri, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n}).then(() => console.log(`Database connected successfully`)).catch(err => {\n  console.log(err);\n});\n_express__WEBPACK_IMPORTED_MODULE_0__[\"default\"].listen(_config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].port, err => {\n  if (err) {\n    console.log(err);\n  }\n  console.info(`Server started on port ${_config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].port}`);\n});\n\n//# sourceURL=webpack://kiriikou-blog/./backend/server.js?");

/***/ }),

/***/ "./client/public/template.js":
/*!***********************************!*\
  !*** ./client/public/template.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({\n  markup\n}) => {\n  return `<!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"utf-8\" />\n        <link rel=\"icon\" href=\"public/favicon.ico\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n        <meta name=\"theme-color\" content=\"#000000\" />\n        <meta\n          name=\"description\"\n          content=\"blogging site for scopaf\"\n        />\n        <link rel=\"apple-touch-icon\" href=\"/public/logo192.png\" />\n        \n        <link  href=\"https://fonts.googleapis.com/css?family=Roboto:100,300,400\">\n        <link  href=\"https://fonts.googleapis.com/icon?family=Material+Icons\">\n        <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD\" crossorigin=\"anonymous\">\n      \n        <title>Scope Af</title>\n      </head>\n      <body>\n        <noscript>You need to enable JavaScript to run this app.</noscript>\n        <div id=\"root\">${markup}</div>\n       \n        <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js\" integrity=\"sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN\" crossorigin=\"anonymous\"></script>\n        <script type=\"text/javascript\" src=\"/dist/bundle.js\"></script>\n      </body>\n    </html>`;\n});\n\n//# sourceURL=webpack://kiriikou-blog/./client/public/template.js?");

/***/ }),

/***/ "./client/src/MainRouter.js":
/*!**********************************!*\
  !*** ./client/src/MainRouter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MainRouter)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_admin_blog_CreateBlog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/admin/blog/CreateBlog */ \"./client/src/components/admin/blog/CreateBlog.js\");\n/* harmony import */ var _components_admin_Dashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/admin/Dashboard */ \"./client/src/components/admin/Dashboard.js\");\n/* harmony import */ var _components_core_Home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/core/Home */ \"./client/src/components/core/Home.js\");\n/* harmony import */ var _components_Blogs_SinglePage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Blogs/SinglePage */ \"./client/src/components/Blogs/SinglePage.js\");\n/* harmony import */ var _components_Signin_Signin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Signin/Signin */ \"./client/src/components/Signin/Signin.js\");\n/* harmony import */ var _components_Signup_Signup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Signup/Signup */ \"./client/src/components/Signup/Signup.js\");\n/* harmony import */ var _components_Blogs_Blog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/Blogs/Blog */ \"./client/src/components/Blogs/Blog.js\");\n/* harmony import */ var _components_admin_ProtectedRoute__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/admin/ProtectedRoute */ \"./client/src/components/admin/ProtectedRoute.js\");\n\n\n\n\n// import Footer from './components/core/Footer'\n\n\n\n\n\n\nfunction MainRouter() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    path: \"/\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_core_Home__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null)\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    path: \"/auth/signin\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Signin_Signin__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null)\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    path: \"/user/signup\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Signup_Signup__WEBPACK_IMPORTED_MODULE_7__[\"default\"], null)\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    path: \"/blogs/:createdAt/:id/:slug\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Blogs_SinglePage__WEBPACK_IMPORTED_MODULE_5__.SinglePage, null)\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    path: \"/blog/:id\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Blogs_Blog__WEBPACK_IMPORTED_MODULE_8__[\"default\"], null)\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    path: \"/admin\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_admin_ProtectedRoute__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n      Component: _components_admin_Dashboard__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n    })\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    path: \"/admin/new/blog\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_admin_ProtectedRoute__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n      Component: _components_admin_blog_CreateBlog__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n    })\n  })));\n}\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/MainRouter.js?");

/***/ }),

/***/ "./client/src/auth/api-auth.js":
/*!*************************************!*\
  !*** ./client/src/auth/api-auth.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"signin\": () => (/* binding */ signin),\n/* harmony export */   \"signout\": () => (/* binding */ signout)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\nconst signin = async user => {\n  try {\n    let response = await axios__WEBPACK_IMPORTED_MODULE_0___default().post('/auth/signin', {\n      method: 'POST',\n      mode: 'cors',\n      headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json',\n        'Access-Control-Allow-Origin': '*'\n      },\n      credentials: 'include',\n      body: JSON.stringify(user)\n    });\n    return await response.json();\n  } catch (err) {\n    console.log(err);\n  }\n};\nconst signout = async () => {\n  try {\n    let response = await fetch('http://localhost:8000/auth/signout', {\n      method: 'GET'\n    });\n    return await response.json();\n  } catch (err) {\n    console.log(err);\n  }\n};\n\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/auth/api-auth.js?");

/***/ }),

/***/ "./client/src/auth/api-user.js":
/*!*************************************!*\
  !*** ./client/src/auth/api-user.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"create\": () => (/* binding */ create),\n/* harmony export */   \"list\": () => (/* binding */ list),\n/* harmony export */   \"read\": () => (/* binding */ read),\n/* harmony export */   \"remove\": () => (/* binding */ remove),\n/* harmony export */   \"update\": () => (/* binding */ update)\n/* harmony export */ });\nconst create = async user => {\n  try {\n    let response = await fetch('/api/users/create', {\n      method: 'POST',\n      mode: 'cors',\n      cache: 'no-cache',\n      headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json',\n        'Access-Control-Allow-Origin': '*'\n      },\n      credentials: 'include',\n      body: JSON.stringify(user)\n    });\n    return await response.json();\n  } catch (err) {\n    console.log(err);\n  }\n};\nconst list = async signal => {\n  try {\n    let response = await fetch('/api/users/', {\n      method: 'GET',\n      signal: signal\n    });\n    return await response.json();\n  } catch (err) {\n    console.log(err);\n  }\n};\nconst read = async (params, credentials, signal) => {\n  try {\n    let response = await fetch('/api/users/', +params.userId, {\n      method: 'GET',\n      signal: signal,\n      headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer ' + credentials.t\n      }\n    });\n    return await response.json();\n  } catch (err) {\n    console.log(err);\n  }\n};\nconst update = async (params, credentials, user) => {\n  try {\n    let response = await fetch('/api/users/' + params.userId, {\n      method: 'PUT',\n      headers: {\n        'Accept': 'application/json',\n        'Authorization': 'Bearer ' + credentials.t\n      },\n      body: user\n    });\n    return await response.json();\n  } catch (err) {\n    console.log(err);\n  }\n};\nconst remove = async (params, credentials) => {\n  try {\n    let response = await fetch('/api/users/' + params.usrId, {\n      method: 'DELETE',\n      headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer ' + credentials.t\n      }\n    });\n    return await response.json();\n  } catch (err) {\n    console.log(err);\n  }\n};\n\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/auth/api-user.js?");

/***/ }),

/***/ "./client/src/auth/auth-helper.js":
/*!****************************************!*\
  !*** ./client/src/auth/auth-helper.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-auth */ \"./client/src/auth/api-auth.js\");\n\nconst auth = {\n  authenticate(jwt, cb) {\n    if (typeof window !== \"undefined\") sessionStorage.setItem('jwt', JSON.stringify(jwt));\n    cb();\n  },\n  isAuthenticated() {\n    if (typeof window !== 'undefined') return false;\n    const getJwt = sessionStorage.getItem('jwt');\n    if (getJwt) return JSON.parse(getJwt);else return false;\n  },\n  clearJWT(cb) {\n    if (typeof window !== 'undefined') sessionStorage.removeItem('jwt');\n    cb();\n    (0,_api_auth__WEBPACK_IMPORTED_MODULE_0__.signout)().then(data => {\n      document.cookie = \"t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;\";\n    });\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (auth);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/auth/auth-helper.js?");

/***/ }),

/***/ "./client/src/components/Blogs/Blog.js":
/*!*********************************************!*\
  !*** ./client/src/components/Blogs/Blog.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// import { read } from '../admin/blog/api-blog';\n// import { useParams } from 'react-router-dom';\n// import { Suggestions } from './Suggestions';\n// import { listBlogs } from '../admin/blog/api-blog';\nconst Blog = () => {\n  const [blogs, setBlogs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();\n  // const [suggestions, setSuggestions] =useState([])\n  // const {_id} = useParams()\n\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const abortController = new AbortController();\n    const signal = abortController.signal;\n    fetch('/api/blogs/by', signal, {\n      method: 'GET',\n      headers: {\n        'Accept': 'Content-Type'\n      }\n    }).then(response => {\n      return response.json();\n    }).then(data => {\n      setBlogs(data);\n    });\n    return function cleanup() {\n      abortController.abort();\n    };\n  });\n\n  // useEffect(()=>{\n  //   const abortController = new AbortController()\n  //   const signal = abortController.signal\n\n  //   fetch(`/api/blogs/related/${_id}`, signal,\n  //   {\n\n  //     headers:'GET',\n  //     'Accept':'Content-Type'\n  //   }).then((data)=>{\n  //     if(data && data.error){\n  //       console.log(data.error)\n  //     } else {\n  //       setSuggestions(data)\n  //     }\n  //   })\n  //   return function cleanup(){\n  //     abortController.abort()\n  //   }\n  // }, [_id])\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, blogs && blogs.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, blogs.map(blog => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    key: (0,uuid__WEBPACK_IMPORTED_MODULE_1__.v4)()\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: `/blogs/${blog.createdAt}/${blog._id}/${blog.slug}`\n  }, blog.title))))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Blog);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/Blogs/Blog.js?");

/***/ }),

/***/ "./client/src/components/Blogs/RelatedBlog.js":
/*!****************************************************!*\
  !*** ./client/src/components/Blogs/RelatedBlog.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _admin_blog_api_blog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../admin/blog/api-blog */ \"./client/src/components/admin/blog/api-blog.js\");\n\n\n\nconst RelatedBlog = props => {\n  const [blogs, setBlogs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.categories[0]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const abortController = new AbortController();\n    const signal = abortController.signal;\n    fetch('/api/blogs/categories', signal, {\n      method: 'GET',\n      headers: {\n        'Accept': 'application/json'\n      }\n    }).then(data => {\n      setBlogs(data);\n      console.log(data);\n    });\n    return function cleanup() {\n      abortController.abort();\n    };\n  }, []);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const abortController = new AbortController();\n    const signal = abortController.signal;\n    (0,_admin_blog_api_blog__WEBPACK_IMPORTED_MODULE_2__.list)({\n      category: props.categories[0]\n    }, signal).then(data => {\n      if (data && data.error) {\n        console.log(data.error);\n      } else {\n        setBlogs(data);\n      }\n    });\n    return function cleanup() {\n      abortController.abort();\n    };\n  });\n  const listByCategories = category => event => {\n    setSelected(category);\n    (0,_admin_blog_api_blog__WEBPACK_IMPORTED_MODULE_2__.list)({\n      category: category\n    }).then(data => {\n      if (data.error) {\n        console.log(data.error);\n      } else {\n        setBlogs(data);\n      }\n    });\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"card\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", null, \"Featured\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"grid\"\n  }, props.categories.map(tile => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"grid\",\n    key: (0,uuid__WEBPACK_IMPORTED_MODULE_1__.v4)()\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    onClick: listByCategories(tile)\n  }, selected === tile)))))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RelatedBlog);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/Blogs/RelatedBlog.js?");

/***/ }),

/***/ "./client/src/components/Blogs/SingleBlog.js":
/*!***************************************************!*\
  !*** ./client/src/components/Blogs/SingleBlog.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst SingleBlog = props => {\n  const [blog, setBlog] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  // const navigate = useNavigate()\n\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const abortController = new AbortController();\n    const signal = abortController.signal;\n    fetch('/api/blogs/latest', signal, {\n      method: 'GET',\n      headers: {\n        'Accept': 'Content-Type'\n      }\n    }).then(response => {\n      return response.json();\n    }).then(data => {\n      setBlog(data);\n    });\n    return function cleanup() {\n      abortController.abort();\n    };\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, blog.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, blog.map(b => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    key: (0,uuid__WEBPACK_IMPORTED_MODULE_2__.v4)()\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", {\n    className: \"text-dark lead\"\n  }, b.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    src: b.image,\n    alt: b.title\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, b.body.substring(0, 200), \"...\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {\n    to: `/blogs/${b._id}/${b.createdAt}/${b.slug}`,\n    state: {\n      id: b._id,\n      createdAt: b.createdAt,\n      slug: b.slug,\n      title: b.title,\n      body: b.categories\n    },\n    className: \"btn\"\n  }, \"Read More\")))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SingleBlog);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/Blogs/SingleBlog.js?");

/***/ }),

/***/ "./client/src/components/Blogs/SinglePage.js":
/*!***************************************************!*\
  !*** ./client/src/components/Blogs/SinglePage.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SinglePage\": () => (/* binding */ SinglePage)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _core_Footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Footer */ \"./client/src/components/core/Footer.js\");\n/* harmony import */ var _core_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Header */ \"./client/src/components/core/Header.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);\n\n// import { read } from '../admin/blog/api-blog'\n\n\n\n// import { useParams } from 'react-router-dom'\nconst SinglePage = props => {\n  // const [blogs, setBlogs] = useState([])\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_core_Header__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"main\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"section\", null, props.blogs && props.blogs.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"blog\"\n  }, props.blogs.map(b => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"site-content\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"posts\",\n    key: (0,uuid__WEBPACK_IMPORTED_MODULE_3__.v4)()\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"post-content\",\n    \"data-aos\": \"zoom-in\",\n    \"data-aos-delay\": \"200\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"post-image\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    src: \"/g\",\n    className: \"img\",\n    alt: \"blog1\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"post-info flex-row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"i\", {\n    className: \"fas fa-user text-gray\"\n  }), \"\\xA0\\xA0\", b.createdAt), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"i\", {\n    className: \"fas fa-calendar-alt text-gray\"\n  }), \"\\xA0\\xA0January 14, 2019\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"post-title\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"/\"\n  }, b.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, b.body))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"aside\", {\n    className: \"sidebar\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"category\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", null, \"Category\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"ul\", {\n    className: \"category-list\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", {\n    className: \"list-items\",\n    \"data-aos\": \"fade-left\",\n    \"data-aos-delay\": \"100\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"/\"\n  }, \"Software\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, \"(05)\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", {\n    className: \"list-items\",\n    \"data-aos\": \"fade-left\",\n    \"data-aos-delay\": \"200\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"/\"\n  }, \"Techonlogy\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, \"(02)\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", {\n    className: \"list-items\",\n    \"data-aos\": \"fade-left\",\n    \"data-aos-delay\": \"300\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"/\"\n  }, \"Lifestyle\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, \"(07)\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", {\n    className: \"list-items\",\n    \"data-aos\": \"fade-left\",\n    \"data-aos-delay\": \"400\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"/\"\n  }, \"Shopping\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, \"(01)\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", {\n    className: \"list-items\",\n    \"data-aos\": \"fade-left\",\n    \"data-aos-delay\": \"500\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"/\"\n  }, \"Food\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, \"(08)\")))))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_core_Footer__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null));\n};\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/Blogs/SinglePage.js?");

/***/ }),

/***/ "./client/src/components/Signin/Signin.js":
/*!************************************************!*\
  !*** ./client/src/components/Signin/Signin.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Signin)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _auth_auth_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auth/auth-helper */ \"./client/src/auth/auth-helper.js\");\n/* harmony import */ var _core_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Header */ \"./client/src/components/core/Header.js\");\n/* harmony import */ var _core_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/Footer */ \"./client/src/components/core/Footer.js\");\n/* harmony import */ var _auth_api_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../auth/api-auth */ \"./client/src/auth/api-auth.js\");\n/* eslint-disable no-global-assign */\n/* eslint-disable no-restricted-globals */\n\n\n// import { signin} from '../../auth/api-auth'\n\n// import axios from 'axios'\n\n\n\nfunction Signin(props) {\n  const [values, setValues] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n    email: '',\n    password: '',\n    error: '',\n    redirectToReferer: false\n  });\n  const handleChange = event => {\n    const value = event.target.value;\n    setValues({\n      value: value\n    });\n  };\n  // const { setAuth } = useContext(AuthContext)\n  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate)();\n  const clickSubmit = async e => {\n    e.preventDefault();\n    const user = {\n      email: values.email || undefined,\n      password: values.password || undefined\n    };\n    (0,_auth_api_auth__WEBPACK_IMPORTED_MODULE_5__.signin)(user).then(data => {\n      if (data && data.error) {\n        setValues({\n          ...values,\n          error: data.error\n        });\n      } else {\n        _auth_auth_helper__WEBPACK_IMPORTED_MODULE_2__[\"default\"].authenticate(data, () => {\n          setValues({\n            ...values,\n            error: '',\n            redirectToReferer: true\n          });\n        });\n      }\n    });\n  };\n  const {\n    from\n  } = props.location || {\n    from: {\n      pathname: '/admin'\n    }\n  };\n  const {\n    redirectToReferer\n  } = values;\n  if (redirectToReferer) {\n    navigate(from);\n  }\n  const gotoRegister = () => navigate('/user/signup');\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_core_Header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"section\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"container flex\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"login__container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", {\n    className: \"text-center\"\n  }, \"Sign In \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"form\", {\n    className: \"login__form\",\n    onSubmit: clickSubmit\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    value: values.email,\n    onChange: handleChange,\n    type: \"email\",\n    className: \"form-control\",\n    placeholder: \"Type your email\",\n    style: {\n      width: '250px'\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    value: values.password,\n    onChange: handleChange,\n    type: \"password\",\n    className: \"form-control\",\n    placeholder: \"Type your password\",\n    style: {\n      width: '250px'\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    type: \"submit\",\n    className: \"btn btn-primary\"\n  }, \"Login\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", {\n    style: {\n      color: 'green'\n    }\n  }, \"Don't have an account?\", \" \", \" \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    className: \"link\",\n    style: {\n      color: 'red',\n      cursor: 'pointer'\n    },\n    onClick: gotoRegister\n  }, \"Sign Up\"))), \"\\xA0\\xA0\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_core_Footer__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null));\n}\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/Signin/Signin.js?");

/***/ }),

/***/ "./client/src/components/Signup/Signup.js":
/*!************************************************!*\
  !*** ./client/src/components/Signup/Signup.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Signup)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _auth_api_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auth/api-user */ \"./client/src/auth/api-user.js\");\n/* harmony import */ var _core_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Footer */ \"./client/src/components/core/Footer.js\");\n/* harmony import */ var _core_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/Header */ \"./client/src/components/core/Header.js\");\n\n\n\n\n\nfunction Signup(props) {\n  const [values, setValues] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n    fullname: '',\n    email: '',\n    password: '',\n    error: '',\n    redirectToRefer: false\n  });\n  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate)();\n  const handleChange = event => {\n    const value = event.target.value;\n    setValues({\n      value: value\n    });\n  };\n  const handleSubmit = e => {\n    e.preventDefault();\n    const user = {\n      fullname: values.fullname || undefined,\n      email: values.email || undefined,\n      password: values.password || undefined\n    };\n    (0,_auth_api_user__WEBPACK_IMPORTED_MODULE_2__.create)(user).then(data => {\n      if (data && data.error) {\n        setValues({\n          ...values,\n          error: data.error,\n          redirectToRefer: false\n        });\n      } else {\n        setValues({\n          ...values,\n          redirectToRefer: true\n        });\n      }\n    });\n  };\n  const {\n    from\n  } = props.location || {\n    from: {\n      pathname: '/auth/signin'\n    }\n  };\n  const {\n    redirectToRefer\n  } = values;\n  if (redirectToRefer) {\n    navigate(from);\n  }\n  const gotoLoginPage = () => navigate(\"/auth/signin\");\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_core_Header__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"section\", {\n    className: \"container flex\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"signup__container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", {\n    className: \"text-center\"\n  }, \"Sign up \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"form\", {\n    className: \"signup__form\",\n    onSubmit: handleSubmit\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    htmlFor: \"email\"\n  }, \"Email Address\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    className: \"form-control\",\n    type: \"email\",\n    name: \"email\",\n    id: \"email\",\n    value: values.email,\n    required: true,\n    onChange: handleChange,\n    style: {\n      width: '250px'\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    htmlFor: \"fullname\"\n  }, \"Name\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    className: \"form-control\",\n    type: \"text\",\n    id: \"fullname\",\n    name: \"fullname\",\n    value: values.fullname,\n    required: true,\n    onChange: handleChange,\n    style: {\n      width: '250px'\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    htmlFor: \"password\"\n  }, \"Password\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    className: \"form-control\",\n    type: \"password\",\n    name: \"password\",\n    id: \"password\",\n    minLength: 6,\n    required: true,\n    value: values.password,\n    onChange: handleChange,\n    style: {\n      width: '250px'\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    type: \"submit\",\n    className: \"btn btn-primary\"\n  }, \"Sign Up\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", {\n    style: {\n      color: 'green'\n    }\n  }, \"Already have an account?\", \" \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    className: \"link\",\n    style: {\n      color: 'red',\n      cursor: 'pointer'\n    },\n    onClick: gotoLoginPage\n  }, \"Login\")), \"\\xA0\\xA0\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_core_Footer__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null));\n}\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/Signup/Signup.js?");

/***/ }),

/***/ "./client/src/components/admin/Dashboard.js":
/*!**************************************************!*\
  !*** ./client/src/components/admin/Dashboard.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Dashboard)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Header_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header/Header */ \"./client/src/components/admin/Header/Header.js\");\n/* harmony import */ var _Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sidebar/Sidebar */ \"./client/src/components/admin/Sidebar/Sidebar.js\");\n/* harmony import */ var _constants_sidebar_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants/sidebar-menu */ \"./client/src/components/admin/constants/sidebar-menu.js\");\n\n// import auth from '../../auth/auth-helper'\n\n\n// import CreateBlog from './blog/CreateBlog'\n\n// import Admin from './Admin'\n\nfunction Dashboard() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"dashboard-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    menu: _constants_sidebar_menu__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"dashboard-body\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Header_Header__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    btnText: \"Dashboard\"\n  }))));\n}\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/admin/Dashboard.js?");

/***/ }),

/***/ "./client/src/components/admin/Editor/CustomToolbbar.jsx":
/*!***************************************************************!*\
  !*** ./client/src/components/admin/Editor/CustomToolbbar.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ToolbarOptions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolbarOptions.js */ \"./client/src/components/admin/Editor/ToolbarOptions.js\");\n\n\nconst renderOptions = formatData => {\n  const {\n    className,\n    options\n  } = formatData;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"select\", {\n    className: className\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"option\", {\n    selected: \"selected\"\n  }), options.map(value => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"option\", {\n      value: value\n    });\n  }));\n};\nconst renderSingle = formatData => {\n  const {\n    className,\n    value\n  } = formatData;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: className,\n    value: value\n  });\n};\nconst CustomToolbar = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n  id: \"toolbar\"\n}, _ToolbarOptions_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].map(classes => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    className: \"ql-formats\"\n  }, classes.map(formatData => {\n    return formatData.options ? renderOptions(formatData) : renderSingle(formatData);\n  }));\n}));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomToolbar);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/admin/Editor/CustomToolbbar.jsx?");

/***/ }),

/***/ "./client/src/components/admin/Editor/ToolbarOptions.js":
/*!**************************************************************!*\
  !*** ./client/src/components/admin/Editor/ToolbarOptions.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst colors = [\"red\", \"green\", \"blue\", \"orange\", \"violet\"];\nconst formats = [[{\n  className: \"ql-font\",\n  options: ['serif', 'monospace', 'arial']\n}, {\n  className: \"ql-size\",\n  options: [\"small\", \"large\", \"huge\"]\n}], [{\n  className: \"ql-bold\"\n}, {\n  className: \"ql-italic\"\n}, {\n  className: \"ql-underline\"\n}, {\n  className: \"ql-strike\"\n}], [{\n  className: \"ql-color\",\n  options: colors\n}, {\n  className: \"ql-background\",\n  options: colors\n}], [{\n  className: \"ql-script\",\n  value: \"sub\"\n}, {\n  className: \"ql-script\",\n  value: \"super\"\n}], [{\n  className: \"ql-header\",\n  value: \"1\"\n}, {\n  className: \"ql-header\",\n  value: \"2\"\n}, {\n  className: \"ql-blockquote\"\n}, {\n  className: \"ql-code-block\"\n}], [{\n  className: \"ql-list\",\n  value: \"ordered\"\n}, {\n  className: \"ql-list\",\n  value: \"bullet\"\n}, {\n  className: \"ql-indent\",\n  value: \"-1\"\n}, {\n  className: \"ql-indent\",\n  value: \"+1\"\n}], [{\n  className: 'ql-direction',\n  value: 'rtl'\n}, {\n  className: 'ql-align',\n  options: ['right', 'center', 'justify']\n}], [{\n  className: 'ql-link'\n}, {\n  className: 'ql-image'\n}, {\n  className: 'ql-video'\n}, {\n  className: 'ql-formula'\n}]];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formats);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/admin/Editor/ToolbarOptions.js?");

/***/ }),

/***/ "./client/src/components/admin/Header/Header.js":
/*!******************************************************!*\
  !*** ./client/src/components/admin/Header/Header.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_icons_notification_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../assets/icons/notification.svg */ \"./client/src/assets/icons/notification.svg\");\n/* harmony import */ var _assets_icons_settings_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/icons/settings.svg */ \"./client/src/assets/icons/settings.svg\");\n\n\n\nfunction Header() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"dashbord-header-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"dashbord-header-right\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    src: _assets_icons_notification_svg__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    alt: \"notification-icon\",\n    className: \"dashbord-header-icon\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    src: _assets_icons_settings_svg__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    alt: \"settings-icon\",\n    className: \"dashbord-header-icon\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    className: \"dashbord-header-avatar\",\n    alt: \"\",\n    src: \"https://reqres.in/img/faces/9-image.jpg\"\n  })));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/admin/Header/Header.js?");

/***/ }),

/***/ "./client/src/components/admin/ProtectedRoute.js":
/*!*******************************************************!*\
  !*** ./client/src/components/admin/ProtectedRoute.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _auth_auth_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auth/auth-helper */ \"./client/src/auth/auth-helper.js\");\n\n\n\nfunction ProtectedRoute(Component) {\n  return _auth_auth_helper__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isAuthenticated() ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Navigate, {\n    to: \"/auth/signin\"\n  });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProtectedRoute);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/admin/ProtectedRoute.js?");

/***/ }),

/***/ "./client/src/components/admin/Sidebar/Sidebar.js":
/*!********************************************************!*\
  !*** ./client/src/components/admin/Sidebar/Sidebar.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _sidebar_item_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar-item.jsx */ \"./client/src/components/admin/Sidebar/sidebar-item.jsx\");\n/* harmony import */ var _assets_images_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/images/logo.png */ \"./client/src/assets/images/logo.png\");\n/* harmony import */ var _assets_icons_logout_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/icons/logout.svg */ \"./client/src/assets/icons/logout.svg\");\n\n\n\n\n\nfunction SideBar({\n  menu\n}) {\n  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useLocation)();\n  const [active, setActive] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    menu && menu.forEach(element => {\n      if (location.pathname === element.path) {\n        setActive(element.id);\n      }\n    });\n  });\n  const __navigate = id => {\n    setActive(id);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"nav\", {\n    className: \"sidebar\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"sidebar-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"sidebar-logo-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    src: _assets_images_logo_png__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    alt: \"logo\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"sidebar-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"sidebar-items\"\n  }, menu && menu.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    key: index,\n    onClick: () => __navigate(item.id)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_sidebar_item_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    active: item.id === active,\n    item: item\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"sidebar-footer\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    className: \"sidebar-item-label\"\n  }, \"Logout\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    src: _assets_icons_logout_svg__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n    alt: \"icon-logout\",\n    className: \"sidebar-item-icon\"\n  })))));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SideBar);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/admin/Sidebar/Sidebar.js?");

/***/ }),

/***/ "./client/src/components/admin/Sidebar/sidebar-item.jsx":
/*!**************************************************************!*\
  !*** ./client/src/components/admin/Sidebar/sidebar-item.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst SideBarItem = ({\n  item,\n  active\n}) => {\n  // const [hover, setHover] = useState(false);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {\n    to: item.path,\n    className: active ? 'sidebar-item-active' : 'sidebar-item'\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    src: item.icon,\n    alt: `icon-${item.icon}`,\n    className: \"sidebar-item-icon\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    className: \"sidebar-item-label\"\n  }, item.title));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SideBarItem);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/admin/Sidebar/sidebar-item.jsx?");

/***/ }),

/***/ "./client/src/components/admin/blog/CreateBlog.js":
/*!********************************************************!*\
  !*** ./client/src/components/admin/blog/CreateBlog.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CreateBlog)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _auth_auth_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../auth/auth-helper */ \"./client/src/auth/auth-helper.js\");\n/* harmony import */ var _api_blog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api-blog */ \"./client/src/components/admin/blog/api-blog.js\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Header_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Header/Header */ \"./client/src/components/admin/Header/Header.js\");\n/* harmony import */ var _Editor_CustomToolbbar_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Editor/CustomToolbbar.jsx */ \"./client/src/components/admin/Editor/CustomToolbbar.jsx\");\n\n\n\n\n\n\n// import 'react-quill/dist/quill.snow.css'\n// import SideBar from '../Sidebar/Sidebar'\n// import sidebar_menu from '../constants/sidebar-menu'\n// import {ImageResize} from 'quill-image-resize-module-react'\n// Quill.register('modules/imageResize', ImageResize)\n// const ReactQuill = require('react-quill').default\nfunction CreateBlog() {\n  const [values, setValues] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n    error: '',\n    sizeError: '',\n    success: '',\n    title: '',\n    slug: '',\n    image: '',\n    categories: '',\n    tags: '',\n    redirect: false\n  });\n  const [body, setBody] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');\n  const modules = {\n    toolbar: {\n      container: '#toolbar'\n    }\n  };\n  const formats = ['font', 'size', 'bold', 'italic', 'underline', 'strike', 'color', 'background', 'script', 'header', 'blockquote', 'code-block', 'indent', 'list', 'direction', 'align', 'link', 'image', 'video', 'formula'];\n  const clickSubmit = () => {\n    const jwt = _auth_auth_helper__WEBPACK_IMPORTED_MODULE_1__[\"default\"].isAuthenticated();\n    let blogData = new FormData();\n    values.title = blogData.append('title', values.title);\n    values.categories = blogData.append('categories', values.categories);\n    values.body = blogData.append('body', values.body);\n    values.tags = blogData.append('tags', values.tags);\n    values.image = blogData.append('image', values.image);\n    values.slug = blogData.append('slug', values.slug);\n    (0,_api_blog__WEBPACK_IMPORTED_MODULE_2__.create)(jwt.user._id, blogData).then(data => {\n      if (data && data.error) {\n        setValues({\n          ...values,\n          error: data.error\n        });\n      } else {\n        setValues({\n          ...values,\n          error: '',\n          redirect: true\n        });\n      }\n    });\n  };\n  if (values.redirect) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Navigate, {\n      to: '/admin'\n    });\n  }\n  const handleChange = name => event => {\n    const value = name === 'image' ? event.target.files[0] : event.target.value;\n    setValues({\n      ...values,\n      [name]: value\n    });\n  };\n  const bodyChange = body => {\n    setBody(body);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"dashboard-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"dashboard-content\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Header_Header__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    btnText: \"Create New Blog\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"dashboard-content-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"form\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", {\n    className: \"text-center\"\n  }, \"Create New Blog\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"form-group\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    id: \"title\",\n    className: \"form-control me-2\",\n    placeholder: \"Title\",\n    onChange: handleChange('title'),\n    value: values.title\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"form-group\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    id: \"slug\",\n    className: \"form-control\",\n    placeholder: \"Slug\",\n    onChange: handleChange('slug'),\n    value: values.slug\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    id: \"category\",\n    className: \"form-control\",\n    placeholder: \"Category\",\n    onChange: handleChange('categories'),\n    value: values.categories\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    id: \"tag\",\n    className: \"form-control\",\n    placeholder: \"Tag\",\n    onChange: handleChange('tags')\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    htmlFor: \"icon-button-file\",\n    style: {\n      color: 'red'\n    }\n  }, \"Add Featured Image\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    accept: \"image/*\",\n    className: \"form-control\",\n    onChange: handleChange('image'),\n    id: \"icon-button-file\",\n    type: \"file\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"form-group\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    color: \"primary\",\n    className: \"btn btn-primary\",\n    type: \"submit\",\n    onClick: clickSubmit\n  }, \"Publish\")), \"\\xA0\\xA0\")))));\n}\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/admin/blog/CreateBlog.js?");

/***/ }),

/***/ "./client/src/components/admin/blog/api-blog.js":
/*!******************************************************!*\
  !*** ./client/src/components/admin/blog/api-blog.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"create\": () => (/* binding */ create),\n/* harmony export */   \"list\": () => (/* binding */ list),\n/* harmony export */   \"listBlogs\": () => (/* binding */ listBlogs),\n/* harmony export */   \"read\": () => (/* binding */ read)\n/* harmony export */ });\n// const queryString = await import('query-string')\n// const queryString = require('query-string')\nconst create = async (credentials, blog) => {\n  try {\n    const response = await fetch('/api/new/blog', {\n      method: 'POST',\n      headers: {\n        'Accept': 'application/json',\n        'Authorization': 'Bearer ' + credentials.t,\n        'Access-Control-Allow-Origin': '*',\n        'Access-Control-Allow-Credentials': true\n      },\n      body: blog\n    });\n    return await response.json();\n  } catch (err) {\n    return console.log(err);\n  }\n};\nconst list = async (params, signal) => {\n  // const query = queryString.stringify(params)\n\n  try {\n    const response = await fetch('/api/blogs?' + query, {\n      method: 'GET'\n    });\n    return await response.json();\n  } catch (err) {\n    return console.log(err);\n  }\n};\nconst read = async (params, signal) => {\n  try {\n    let response = await fetch(`/api/blogs/:${params.blogId}`, {\n      method: 'GET',\n      headers: {\n        'Accept': 'Content-Type',\n        signal: signal\n      }\n    });\n    return response.json();\n  } catch (err) {\n    console.log(err);\n  }\n};\nconst listBlogs = async signal => {\n  await fetch('/api/blogs/by', {\n    method: 'GET',\n    headers: {\n      'Accept': 'Content-Type'\n    }\n  }).then(response => {\n    return response.json();\n  });\n};\n\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/admin/blog/api-blog.js?");

/***/ }),

/***/ "./client/src/components/admin/constants/sidebar-menu.js":
/*!***************************************************************!*\
  !*** ./client/src/components/admin/constants/sidebar-menu.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _assets_icons_dashboard_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../assets/icons/dashboard.svg */ \"./client/src/assets/icons/dashboard.svg\");\n/* harmony import */ var _assets_icons_shipping_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../assets/icons/shipping.svg */ \"./client/src/assets/icons/shipping.svg\");\n/* harmony import */ var _assets_icons_product_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../assets/icons/product.svg */ \"./client/src/assets/icons/product.svg\");\n/* harmony import */ var _assets_icons_user_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../assets/icons/user.svg */ \"./client/src/assets/icons/user.svg\");\n\n\n\n\nconst sidebar_menu = [{\n  id: 1,\n  icon: _assets_icons_dashboard_svg__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  path: '/admin',\n  title: 'Dashboard'\n}, {\n  id: 2,\n  icon: _assets_icons_product_svg__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  path: '/admin/new/blog',\n  title: 'New Blog'\n}, {\n  id: 3,\n  icon: _assets_icons_shipping_svg__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  path: '/admin/orders',\n  title: 'Products'\n}, {\n  id: 4,\n  icon: _assets_icons_user_svg__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  path: '/admin/profile',\n  title: 'My account'\n}];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sidebar_menu);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/admin/constants/sidebar-menu.js?");

/***/ }),

/***/ "./client/src/components/core/Footer.js":
/*!**********************************************!*\
  !*** ./client/src/components/core/Footer.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Footer)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Footer() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"footer bg-dark py-5\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"container grid grid-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", null, \"ScopAf\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, \"Copyright \\xA9 \", new Date().getFullYear())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"nav\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"ul\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"index.html\"\n  }, \"Home\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"features.html\"\n  }, \"Contact\")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"social\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"i\", {\n    className: \"fab fa-github fa-2x\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"i\", {\n    className: \"fab fa-facebook fa-2x\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"i\", {\n    className: \"fab fa-instagram fa-2x\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"i\", {\n    className: \"fab fa-twitter fa-2x\"\n  })))));\n}\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/core/Footer.js?");

/***/ }),

/***/ "./client/src/components/core/Header.js":
/*!**********************************************!*\
  !*** ./client/src/components/core/Header.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_images_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/images/logo.png */ \"./client/src/assets/images/logo.png\");\n\n\nfunction Header() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"navbar\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"container flex\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", {\n    className: \"logo\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    src: _assets_images_logo_png__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    alt: \"scopaf\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"nav\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"ul\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", {\n    href: \"/\"\n  }, \"Contact\"))))));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/core/Header.js?");

/***/ }),

/***/ "./client/src/components/core/Home.js":
/*!********************************************!*\
  !*** ./client/src/components/core/Home.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Footer */ \"./client/src/components/core/Footer.js\");\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Header */ \"./client/src/components/core/Header.js\");\n/* harmony import */ var _Blogs_SingleBlog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../Blogs/SingleBlog */ \"./client/src/components/Blogs/SingleBlog.js\");\n/* harmony import */ var _Blogs_Blog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Blogs/Blog */ \"./client/src/components/Blogs/Blog.js\");\n/* harmony import */ var _admin_blog_api_blog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../admin/blog/api-blog */ \"./client/src/components/admin/blog/api-blog.js\");\n/* harmony import */ var _Blogs_RelatedBlog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Blogs/RelatedBlog */ \"./client/src/components/Blogs/RelatedBlog.js\");\n\n\n\n\n\n\n\nfunction Home() {\n  const [blogs, setBlogs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  // const [suggestionTitle, setSuggestionTitle] = useState('Related Post')\n\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const abortController = new AbortController();\n    const signal = abortController.signal;\n    (0,_admin_blog_api_blog__WEBPACK_IMPORTED_MODULE_5__.listBlogs)(signal).then(data => {\n      if (data && data.error) {\n        console.log(data.error);\n      } else {\n        setBlogs(data);\n      }\n    });\n    return function cleanup() {\n      abortController.abort();\n    };\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Header__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"section\", {\n    className: \"showcase\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"container grid\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"showcase-text\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", null, \"We Build what you ask for\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, \"At PhineSoft Tech, We make our customers our number one priority, We deliver what they ask for. Try us now!\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"showcase-form card\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", null, \"Latest Post\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Blogs_SingleBlog__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"section\", {\n    className: \"stats\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h3\", {\n    className: \"stats-heading text-center my-1\"\n  }, \"Welcome to the best platform for building applications of all types with modern architecture and scaling\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"grid grid-3 text-center my-4\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Blogs_Blog__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Footer__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null));\n}\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/components/core/Home.js?");

/***/ }),

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\n  env: process.env.PORT || 'development',\n  port: process.env.PORT || 4000,\n  jwtSecret: process.env.JWT_SECRET || \"gdjh47rniof87gfjdnHJTUGNDIRNE04UFNew4r7fnmbHI8rj0hygf\",\n  mongoUri: 'mongodb://localhost:27017/scopaf_blog-db'\n  // mongoUri:'mongodb+srv://lampteyphinehas70:qUEVNGhrRnbohHLm@scopaf.a51cy7v.mongodb.net/?retryWrites=true&w=majority'\n\n  // sendgrid_api_key:'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',\n  // email_address:'info@kiriikou.com',\n  // SENDGRID_USERNAME:'lampteyphinehas70@gmail.com',\n  // SENDGRID_PASSWORD:'phinehaslamptey86'*/\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://kiriikou-blog/./config/config.js?");

/***/ }),

/***/ "./webpack.config.client.js":
/*!**********************************!*\
  !*** ./webpack.config.client.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const path = __webpack_require__(/*! path */ \"path\");\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\nconst CURRENT_WORKING_DIR = process.cwd();\nconst config = {\n  name: \"browser\",\n  mode: \"development\",\n  devtool: 'eval-source-map',\n  devServer: {\n    hot: true\n  },\n  entry: ['webpack-hot-middleware/client?reload=true', path.join(CURRENT_WORKING_DIR, 'client/src/index.js')\n  // 'react-hot-loader/patch', path.join(CURRENT_WORKING_DIR, 'client/App.js')\n  ],\n\n  output: {\n    path: path.join(CURRENT_WORKING_DIR, '/dist'),\n    filename: 'bundle.js',\n    publicPath: '/dist/'\n  },\n  module: {\n    noParse: /node_modules\\/react-quill\\/dist/,\n    rules: [{\n      test: /\\.jsx?$|.js?$|.ts?$|.tsx?$/,\n      exclude: /node_modules/,\n      use: ['babel-loader']\n    }, {\n      test: /\\.(ttf|eot|svg|gif|jpg|png|woff2|woff)(\\?[\\s\\S]+)?$/,\n      use: 'file-loader'\n    }, {\n      test: /\\.css$/i,\n      use: [{\n        loader: 'style-loader'\n      }, {\n        loader: 'css-loader'\n      }]\n    }, {\n      test: /\\.scss$/i,\n      use: [\n      // Creates `style` nodes from JS strings\n      \"style-loader\",\n      // Translates CSS into CommonJS\n      \"css-loader\",\n      // Compiles Sass to CSS\n      \"sass-loader\"]\n    }]\n  },\n  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()].filter(Boolean),\n  resolve: {\n    extensions: [\".tsx\", \".ts\", \".js\", \".jsx\", \".scss\", '.css']\n  }\n};\nmodule.exports = config;\n\n//# sourceURL=webpack://kiriikou-blog/./webpack.config.client.js?");

/***/ }),

/***/ "./client/src/assets/icons/dashboard.svg":
/*!***********************************************!*\
  !*** ./client/src/assets/icons/dashboard.svg ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"5f874f71463e66998e016f71a14b8dbc.svg\");\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/assets/icons/dashboard.svg?");

/***/ }),

/***/ "./client/src/assets/icons/logout.svg":
/*!********************************************!*\
  !*** ./client/src/assets/icons/logout.svg ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"bc6bc316adefecff4e581e725d3972b2.svg\");\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/assets/icons/logout.svg?");

/***/ }),

/***/ "./client/src/assets/icons/notification.svg":
/*!**************************************************!*\
  !*** ./client/src/assets/icons/notification.svg ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"9736b29d361e50fe895dd9034bfb1ac1.svg\");\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/assets/icons/notification.svg?");

/***/ }),

/***/ "./client/src/assets/icons/product.svg":
/*!*********************************************!*\
  !*** ./client/src/assets/icons/product.svg ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"626d898b33019cfababf30346fad7e19.svg\");\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/assets/icons/product.svg?");

/***/ }),

/***/ "./client/src/assets/icons/settings.svg":
/*!**********************************************!*\
  !*** ./client/src/assets/icons/settings.svg ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"9397f24aeef3aee302d5f608adb1dd9b.svg\");\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/assets/icons/settings.svg?");

/***/ }),

/***/ "./client/src/assets/icons/shipping.svg":
/*!**********************************************!*\
  !*** ./client/src/assets/icons/shipping.svg ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"a9e6b8f89589387690bf35f9c4a690ea.svg\");\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/assets/icons/shipping.svg?");

/***/ }),

/***/ "./client/src/assets/icons/user.svg":
/*!******************************************!*\
  !*** ./client/src/assets/icons/user.svg ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"d8bc220e4938b5e080429f7cc252dc46.svg\");\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/assets/icons/user.svg?");

/***/ }),

/***/ "./client/src/assets/images/logo.png":
/*!*******************************************!*\
  !*** ./client/src/assets/images/logo.png ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"61ec40aec5c5cd63a15f4e665a2d63c3.png\");\n\n//# sourceURL=webpack://kiriikou-blog/./client/src/assets/images/logo.png?");

/***/ }),

/***/ "./dist/uploads/user-logo.jpg":
/*!************************************!*\
  !*** ./dist/uploads/user-logo.jpg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"19fd5830ad5ffd59db2417ce96a64d58.jpg\");\n\n//# sourceURL=webpack://kiriikou-blog/./dist/uploads/user-logo.jpg?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("compression");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-jwt");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("formidable");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash");

/***/ }),

/***/ "lodash/extend":
/*!********************************!*\
  !*** external "lodash/extend" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/extend");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom/server");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-router");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-router-dom");

/***/ }),

/***/ "react-router-dom/server":
/*!******************************************!*\
  !*** external "react-router-dom/server" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-router-dom/server");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("uuid");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
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
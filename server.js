'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
const _app = _interopRequireDefault(require('./dist/app'));
const _authRoute = _interopRequireDefault(require('./dist/routes/auth.route'));
const _indexRoute = _interopRequireDefault(require('./dist/routes/index.route'));
const _usersRoute = _interopRequireDefault(require('./dist/routes/users.route'));
const _meridianlogyRoute = _interopRequireDefault(require('./dist/routes/meridianlogy.route'));
const _reflexologyRoute = _interopRequireDefault(require('./dist/routes/reflexology.route'));
const _subscriptionRoute = _interopRequireDefault(require('./dist/routes/subscription.route'));
const _validateEnv = _interopRequireDefault(require('./dist/utils/validateEnv'));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      };
}
(0, _validateEnv.default)();
const app = new _app.default([
  new _indexRoute.default(),
  new _usersRoute.default(),
  new _authRoute.default(),
  new _meridianlogyRoute.default(),
  new _reflexologyRoute.default(),
  new _subscriptionRoute.default(),
]);
app.listen();

//# sourceMappingURL=server.js.map

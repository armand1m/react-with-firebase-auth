import React from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var providerToTypeMapper = {
    googleProvider: 'firebase.auth.GoogleAuthProvider',
    facebookProvider: 'firebase.auth.FacebookAuthProvider',
    twitterProvider: 'firebase.auth.TwitterAuthProvider',
    githubProvider: 'firebase.auth.GithubAuthProvider',
};
var providerToFirebaseDocs = {
    googleProvider: 'https://firebase.google.com/docs/auth/web/google-signin',
    facebookProvider: 'https://firebase.google.com/docs/auth/web/facebook-signin',
    twitterProvider: 'https://firebase.google.com/docs/auth/web/twitter-signin',
    githubProvider: 'https://firebase.google.com/docs/auth/web/github-auth',
};
var getErrorMessageForProvider = function (provider) {
    return "Please provide an instance of " + providerToTypeMapper[provider] + " in the withFirebaseAuth HOC providers parameter under the " + provider + " key. Check " + providerToFirebaseDocs[provider] + " to learn more.";
};

var withFirebaseAuth = function (_a) {
    var firebaseAppAuth = _a.firebaseAppAuth, _b = _a.providers, providers = _b === void 0 ? {} : _b;
    return function createComponentWithAuth(WrappedComponent) {
        var _a;
        return _a = (function (_super) {
                __extends(FirebaseAuthProvider, _super);
                function FirebaseAuthProvider() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.state = {
                        loading: false,
                        user: undefined,
                        error: undefined,
                    };
                    _this.setError = function (error) { return _this.setState({ error: error }); };
                    _this.toggleLoading = function () {
                        _this.setState(function (currState) { return ({ loading: !currState.loading }); });
                    };
                    _this.tryToSignInWithProvider = function (provider) {
                        return _this.tryTo(function () {
                            var providerInstance = providers[provider];
                            if (!providerInstance) {
                                throw new Error(getErrorMessageForProvider(provider));
                            }
                            return firebaseAppAuth.signInWithPopup(providerInstance);
                        });
                    };
                    _this.signOut = function () {
                        return _this.tryTo(function () { return firebaseAppAuth.signOut(); });
                    };
                    _this.signInAnonymously = function () {
                        return _this.tryTo(function () {
                            return firebaseAppAuth.signInAnonymously();
                        });
                    };
                    _this.signInWithGithub = function () { return _this.tryToSignInWithProvider('githubProvider'); };
                    _this.signInWithTwitter = function () { return _this.tryToSignInWithProvider('twitterProvider'); };
                    _this.signInWithGoogle = function () { return _this.tryToSignInWithProvider('googleProvider'); };
                    _this.signInWithFacebook = function () {
                        return _this.tryToSignInWithProvider('facebookProvider');
                    };
                    _this.signInWithEmailAndPassword = function (email, password) {
                        return _this.tryTo(function () {
                            return firebaseAppAuth.signInWithEmailAndPassword(email, password);
                        });
                    };
                    _this.signInWithPhoneNumber = function (phoneNumber, applicationVerifier) {
                        return _this.tryTo(function () {
                            return firebaseAppAuth.signInWithPhoneNumber(phoneNumber, applicationVerifier);
                        });
                    };
                    _this.createUserWithEmailAndPassword = function (email, password) {
                        return _this.tryTo(function () {
                            return firebaseAppAuth.createUserWithEmailAndPassword(email, password);
                        });
                    };
                    _this.sharedHandlers = {
                        createUserWithEmailAndPassword: _this.createUserWithEmailAndPassword,
                        signInWithEmailAndPassword: _this.signInWithEmailAndPassword,
                        signInWithGithub: _this.signInWithGithub,
                        signInWithTwitter: _this.signInWithTwitter,
                        signInWithGoogle: _this.signInWithGoogle,
                        signInWithFacebook: _this.signInWithFacebook,
                        signInWithPhoneNumber: _this.signInWithPhoneNumber,
                        signInAnonymously: _this.signInAnonymously,
                        setError: _this.setError,
                        signOut: _this.signOut,
                    };
                    return _this;
                }
                FirebaseAuthProvider.prototype.componentDidMount = function () {
                    var _this = this;
                    this.unsubscribeAuthStateListener = firebaseAppAuth.onAuthStateChanged(function (user) { return _this.setState({ user: user }); });
                };
                FirebaseAuthProvider.prototype.componentWillUnmount = function () {
                    if (this.unsubscribeAuthStateListener) {
                        this.unsubscribeAuthStateListener();
                    }
                };
                FirebaseAuthProvider.prototype.tryTo = function (operation) {
                    return __awaiter(this, void 0, void 0, function () {
                        var result, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, 3, 4]);
                                    this.toggleLoading();
                                    return [4, operation()];
                                case 1:
                                    result = _a.sent();
                                    return [2, result];
                                case 2:
                                    error_1 = _a.sent();
                                    this.setError(error_1.message);
                                    return [2, error_1];
                                case 3:
                                    this.toggleLoading();
                                    return [7];
                                case 4: return [2];
                            }
                        });
                    });
                };
                FirebaseAuthProvider.prototype.render = function () {
                    var props = __assign(__assign(__assign({}, this.props), this.sharedHandlers), { loading: this.state.loading, user: this.state.user, error: this.state.error });
                    return React.createElement(WrappedComponent, __assign({}, props));
                };
                return FirebaseAuthProvider;
            }(React.PureComponent)),
            _a.displayName = "withFirebaseAuth(" + (WrappedComponent.displayName || WrappedComponent.name) + ")",
            _a;
    };
};

export default withFirebaseAuth;
//# sourceMappingURL=index.es.js.map

// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";
import * as utils from "./utils";
import * as crypto from 'crypto-js';

export class Auth {
    private _username: string;
    private _api_key: string;

    constructor(username: string, api_key: string){
        this._username = username;
        this._api_key = api_key;
    }

    public get username(): string {
        return this._username;
    }

    public get api_key(): string {
        return this._api_key;
    }
}

export class UserApp {
    private _app_name: string;
    private _app_token: string;
    private _app_profile_id: string;
    private _admin: boolean;

    constructor(app_name: string, app_token: string, app_profile_id: string, admin: boolean){
        this._app_name = app_name;
        this._app_token = app_token;
        this._app_profile_id = app_profile_id;
        this._admin = admin;
    }

    public get app_name(): string {
        return this._app_name;
    }

    public get app_token(): string {
        return this._app_token;
    }

    public get app_profile_id(): string {
        return this._app_profile_id;
    }

    public get admin(): boolean {
        return this._admin;
    }
}

export class User {
    private _name: string;
    private _email: string;
    private _auth: Auth;
    private _apps: Array<UserApp>;
    private _is_authenticated: boolean;
    private _encrypt_key: string = 's7hsj2d12easd63ksye598sdhw312ed8';

    private _we_auth_user_create_account_resource = new api.Tastypie.Resource('we-auth/user/create_account')
    private _we_auth_user_login_resource = new api.Tastypie.Resource('we-auth/user/login')
    private _we_auth_user_logout_resource = new api.Tastypie.Resource('we-auth/user/logout')
    private _we_auth_user_profile_resource = new api.Tastypie.Resource('we-auth/user/profile')

    constructor(){
        this._name = ''
        this._email = ''
        this._is_authenticated = false;
        this._auth = new Auth('','');
        this._apps = [];
    }

    public get is_authenticated(): any {
        return this._is_authenticated;
    }

    public get auth(): Auth {
        return this._auth;
    }

    public get apps(): Array<UserApp> {
        return this._apps;
    }

    private setProfile(data: any): void{
      let _self = this;
      if(data &&
         data.hasOwnProperty('name') &&
         data.hasOwnProperty('email') &&
         data.hasOwnProperty('auth') &&
         data.hasOwnProperty('apps')){
           api.Tastypie.Provider.setAuth('welight', data.auth.username, data.auth.api_key);

           _self._name = data.name;
           _self._email = data.email;
           _self._auth = new Auth(data.auth.username, data.auth.api_key)

           for(let userapp of data.apps){
              _self._apps.push(new UserApp(userapp.app_name, userapp.app_token, userapp.app_profile_id, userapp.admin));
           }

           _self._is_authenticated = true;
           if(utils.Tools.localStorageSuported){
               let encrypted_user = crypto.AES.encrypt(JSON.stringify({
                  username: data.auth.username,
                  apikey: data.auth.api_key
              }), _self._encrypt_key).toString();
              localStorage.setItem('weUser', encrypted_user);
            }
       }else{
           _self._name = ''
           _self._email = ''
           _self._is_authenticated = false;
           _self._auth = new Auth('','');
           _self._apps = [];
          if(utils.Tools.localStorageSuported) localStorage.removeItem('weUser');
       }
    }

    public create_account(name: string, email: string, password: string, kwargs?:any): Promise<User> {
      let _self = this;
      return _self._we_auth_user_create_account_resource.objects.create({
          name: name,
          email: email,
          password: password,
          kwargs: kwargs
      }).then(
          function(data: any){
              _self.setProfile(data);
              if(_self._is_authenticated){
                  return _self;
              }else{
                  return api.Tastypie.Tools.generate_exception("[WeAuth][create_account] Usuario não identificado");
              }
          }
      )
    }

    public login(username: string, password: string, kwargs?:any): Promise<User> {
        let _self = this;
        return _self._we_auth_user_login_resource.objects.create({
            username: username,
            password: password,
            kwargs: kwargs
        }).then(
            function(data: any){
                _self.setProfile(data);
                if(_self._is_authenticated){
                    return _self;
                }else{
                    return api.Tastypie.Tools.generate_exception("[WeAuth][login] Usuario não identificado");
                }
            }
        )
    }

    public login_facebook(username: string, facebook_uid: string, facebook_access_token: string, kwargs?:any): Promise<User> {
        let _self = this;
        return _self._we_auth_user_login_resource.objects.create({
            username: username,
            facebook_uid: facebook_uid,
            facebook_access_token:  facebook_access_token,
            kwargs: kwargs
        }).then(
            function(data: any){
                _self.setProfile(data);
                if(_self._is_authenticated){
                    return _self;
                }else{
                    return api.Tastypie.Tools.generate_exception("[WeAuth][login] Usuario não identificado");
                }
            }
        )
    }

    private _quickLogin(username: string, apikey: string, kwargs?:any): Promise<User> {
      let _self = this;
      api.Tastypie.Provider.setAuth('welight', username, apikey);
      return _self._we_auth_user_profile_resource.objects.findOne().then(
        function(data: any){
            _self.setProfile(data);
            if(_self._is_authenticated){
                return _self;
            }else{
                return api.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
            }
        }
      );
    }

    public quickLogin(auth?:{username: string, apikey: string}, kwargs?:any): Promise<User> {
        let _self = this;
        if(auth){
            return _self._quickLogin(auth.username, auth.apikey, kwargs);
        }else{
            if(utils.Tools.localStorageSuported){
                let weUser: string = localStorage.getItem('weUser')
                let auth_user = JSON.parse(crypto.AES.decrypt(weUser, _self._encrypt_key).toString(crypto.enc.Utf8));
                return _self._quickLogin(auth_user.username, auth_user.apikey, kwargs);
            }else{
                return api.Tastypie.Tools.generate_exception("[WeAuth][quickLogin] Usuario não identificado");
            }
        }
    }

    public logout(): Promise<any> {
        let _self = this;
        if(utils.Tools.localStorageSuported) localStorage.removeItem('weUser');
        return _self._we_auth_user_logout_resource.objects.findOne().then(
            function(data: any){
              _self._name = ''
              _self._email = ''
              _self._is_authenticated = false;
              _self._auth = new Auth('','');
              _self._apps = [];
              if(utils.Tools.localStorageSuported) localStorage.removeItem('weUser');
              return data;
            }
        )
    }
}
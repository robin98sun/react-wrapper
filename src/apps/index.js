'use strict';

import React  from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Env Settings
const envSettings = {
    baseUrl: "",
    // server 这几行不要动位置，保持行号15~19行不变，否则影响打包
    server:{
        host: "localhost",
        port: 2999,
        protocal: "http"
    },
    platform: {
        isWechat: false,
        isIOS: false,
        isAndroid: false,
        isMobile: false,
        RootAPI: "https://mapi.baocai.com/v2",
        canInvokeNativeMethod: function(){ 
            return (
                App && App.platform && typeof App.platform.exec === 'function' 
                && (this.isIOS || this.isAndroid )
            )
        },
        exec: function(cmd, param){
            let that = this;
            return new Promise(function(resolve, reject){
                if(that.canInvokeNativeMethod()){
                    App.platform.exec(cmd, param, function(res){
                        resolve(res);
                    });
                }else{
                    reject('ERROR: Can not invoke native method');
                }
            });
        },
        requestAPI: function(route, param){
            if(!route || route === "") return Promise.reject("ERROR when requesting API via native request: API route is empty");
            let _param_ = {_api_: this.RootAPI + (route.substr(0,1) === '/' ? route : '/' + route), ...param};
            return this.exec('requestAPI', _param_)
                    .then(function(res){
                        return new Promise(function(resolve, reject){
                            if(typeof res === 'object'){
                                if(res.error){
                                    let err = (typeof res.error === 'object')? res.error : {error: res.error};
                                    err._description = {desc: `ERROR when invoking native method [${cmd}]`, cmd, param}
                                    reject(err);
                                }else{
                                    resolve(res.data);
                                }
                            }else{
                                let err = {error: 'Response type error, expected object, got '+ typeof res};
                                err._description = {desc: `ERROR when invoking native method [${cmd}]`, cmd, param, res}
                                reject(err)
                            }
                        });
                    });
        }
    },
    sessionStorage: window.sessionStorage || {},
    setSessionStorage: function(key, value){
        if(key === undefined || key === null) return;
        try{
            if(value === undefined || value === null) {
                sessionStorage.removeItem(key);
            }else{
                value = (typeof value === 'string' || typeof value === 'number') ? value : JSON.stringify(value);
                sessionStorage.setItem(key, value);
            }
        } catch (oException) {
            if (oException.name == 'QuotaExceededError') {
                alert('本网站不支持无痕浏览，访问时请关闭无痕浏览。');
                sessionStorage.clear();
                sessionStorage.setItem(key, value);
            }
        }
    },
    keys:{
        TOKEN: 'X-Authorization',
        USER: 'm.baoca.user',
        ACCOUNT: 'm.baocai.user.mybaocai',
        BORROW_ID: 'm.baocai.invest.id',
        NO_AGREE: 'm.baocai.payment.noAgree'
    },
    retrieveKey: function(key) {
        let value = null; 
        try {
            value = JSON.parse(this.sessionStorage[key]);
        } catch (e) {
            console.log(`ERROR when parsing sessionStorage for key[${key}]:`,e);
        }
        return value;
    },
    settings: function(key){
        if(!this._baseUrl){
            this._baseUrl = this ? this.baseUrl : "";
            if(this._baseUrl.length > 2 && this._baseUrl.substr(this._baseUrl.length - 1) === "/"){
                this._baseUrl = this._baseUrl.substr(0, this._baseUrl.length -1);
            }
            if(this._baseUrl.length > 1 && this._baseUrl.substr(this._baseUrl.length - 1) !== "/"){
                this._baseUrl += "/";
            }
        }
        if(!this._headers){
            this._headers = {};
            if(this.server && this.server.host && this.server.port){
                this._headers.host = this.server.host;
                this._headers.port = this.server.port;
                if(this.server.protocal){
                    this._baseUrl = this.server.protocal + "://" + this.server.host 
                        + ( (this.server.protocal.toLowerCase() === "http" && this.server.port === 80) || (this.server.protocal.toLowerCase() === "https" && this.server.port === 443) ? "" : ":" + this.server.port) 
                        + this._baseUrl; 
                }
            }    
        }
        const token = this.retrieveKey(this.keys.TOKEN);
        if(token) {
            this._headers['X-Authorization'] = token;
        }else{
            delete this._headers['X-Authorization'];
        }
        
        let settings = { 
            baseUrl: this._baseUrl, 
            headers: this._headers,
            setSessionStorage: this.setSessionStorage,
        };
        let value = null;
        if(key){
            value = settings[key];
        }else value = settings;
        console.log(`Getting settings[${key}]:`, value);
        return value;
    }
};

// Components
import HomeGenerator, {getStore as homeStore} from '../../../pages/home';
import { Provider } from 'react-redux'

const Home = HomeGenerator(envSettings);

ReactDOM.render(
    <Provider store={homeStore()} >
        <div>
            <Home env={envSettings}/>
        </div>
    </Provider>
    ,
    document.getElementById('app-body')
);
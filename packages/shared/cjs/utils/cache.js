"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const is = require("./is.js");
class WebCache {
  constructor({ projectName, time, projectVersion }) {
    __publicField(this, "projectName");
    __publicField(this, "projectVersion");
    __publicField(this, "defaultExpires", 864e5 * 7);
    this.projectName = projectName;
    this.projectVersion = projectVersion;
    if (!time)
      return;
    const t = is.isObject(time) ? this.formatTime(time) : time;
    this.defaultExpires = t;
  }
  get VALUE_PREFIX() {
    return `${this.projectName}_${this.projectVersion}_`;
  }
  assembleKey(key) {
    return `${this.VALUE_PREFIX}${key}`;
  }
  formatKey(key) {
    if (key.indexOf(this.VALUE_PREFIX) == 0)
      return key.replace(this.VALUE_PREFIX, "");
    return key;
  }
  formatTime(data) {
    if (is.isNumber(data))
      return data;
    const { day, hour, minutes, second } = data;
    const dataDay = (day ? day * 24 : 0) * 86400;
    const dataHours = (hour || 0) * 60 * 60;
    const dataMinutes = (minutes || 0) * 60;
    const dataSeconds = (second || 0) * 60;
    return (dataDay + dataHours + dataMinutes + dataSeconds) * 1e3;
  }
  getExpires(time) {
    let expires = this.defaultExpires;
    if (time == -1)
      expires = Number.MAX_SAFE_INTEGER;
    else if (time || is.isObject(time))
      expires = this.formatTime(time);
    return new Date().getTime() + expires;
  }
  stringifyJson(data) {
    try {
      return JSON.stringify(data);
    } catch (error) {
      throw new Error(error);
    }
  }
  parseJson(data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      throw new Error(error);
    }
  }
  set(key, value, options) {
    const _key = this.assembleKey(key);
    const data = this.stringifyJson({
      value,
      expires: this.getExpires(options)
    });
    localStorage.setItem(_key, data);
  }
  get(key) {
    const _key = this.assembleKey(key);
    const res = localStorage.getItem(_key);
    if (!res)
      return null;
    const { expires, value } = this.parseJson(res);
    const now = Date.now();
    if (expires < now) {
      this.remove(key);
      return null;
    }
    return value;
  }
  remove(key) {
    const _key = this.assembleKey(key);
    localStorage.removeItem(_key);
  }
  clear() {
    localStorage.clear();
  }
}
exports.WebCache = WebCache;

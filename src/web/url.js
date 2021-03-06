/** URL工具 **/
import { IsEmptyArray, IsEmptyObject } from "../common/type";

/**
 * @name URL参数反序列化
 */
function ParseUrlSearch() {
	return location.search.replace(/(^\?)|(&$)/g, "").split("&").reduce((t, v) => {
		const [key, val] = v.split("=");
		t[key] = decodeURIComponent(val);
		return t;
	}, {});
}

/**
 * @name 删除URL参数
 * @param {array} search 参数集合
 */
function RemoveUrlSearch(...search) {
	if (IsEmptyArray(search)) return;
	const url = location.origin + location.pathname;
	const hash = location.hash;
	const oldSearch = ParseUrlSearch();
	search.forEach(v => Reflect.deleteProperty(oldSearch, v));
	const newSearchStr = StringifyUrlSearch(oldSearch);
	history.pushState({}, null, url + newSearchStr + hash);
}

/**
 * @name 设置URL参数
 * @param {object} [search={}] 参数集合
 */
function SetUrlSearch(search = {}) {
	if (IsEmptyObject(search)) return;
	const url = location.origin + location.pathname;
	const hash = location.hash;
	const oldSearch = ParseUrlSearch();
	const newSearch = Object.assign({}, oldSearch, search);
	const newSearchStr = StringifyUrlSearch(newSearch);
	history.pushState({}, null, url + newSearchStr + hash);
}

/**
 * @name URL参数序列化
 * @param {object} [search={}] 参数集合
 */
function StringifyUrlSearch(search = {}) {
	return Object.entries(search).reduce(
		(t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
		IsEmptyObject(search) ? "" : "?"
	).replace(/&$/, "");
}

export {
	ParseUrlSearch,
	RemoveUrlSearch,
	SetUrlSearch,
	StringifyUrlSearch
};

export default {
	ParseUrlSearch,
	RemoveUrlSearch,
	SetUrlSearch,
	StringifyUrlSearch
};
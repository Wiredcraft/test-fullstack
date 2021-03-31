/**
 * @example
 * var p = new PageManager(1,5,3,[]); 
 * var p = PageManager.create(1,5,3,[])
 * p.redirectIndex(1,ture,[]);
 */
'use strict';

/**
 * 存储变量信息
 * @param {number} indexPage 
 * @param {number} pageSize 
 * @param {number} displayPageNum 
 * @param {any[]} items 
 */
var PageManagerInfo = function (indexPage = 1, pageSize = 0, displayPageNum = 1, items = []) {
    this.items = items;
    this.indexPage = indexPage;
    this.pageSize = pageSize;
    this.displayPageNum = displayPageNum;
    this.hasNext = false;
    this.pagingInfos = {};
    this.allCount = 0;
}

/**
 * 根据当前页数重新设置index，返回Index值
 * @param {number} currentPage 当前页数
 */
PageManagerInfo.prototype.resetIndexPage = function (currentPage) {
    this.indexPage = PageManagerInfo.calcIndex(currentPage, this.displayPageNum);
    return this.indexPage;
}

PageManagerInfo.calcIndex = function (currentPage, displayPageNum) {
    let index = 1;
    if (currentPage > 0) {
        let firstIndex = 1;
        let k = Math.floor((currentPage - 1) / displayPageNum);
        index = firstIndex + displayPageNum * k;
    }
    return index;
}


/**
 * 设置当前初始页页
 * @param {number} page 起始页数 
 *  */
PageManagerInfo.prototype.setIndexPage = function (page) {
    this.indexPage = page;
}

/**
 * 初始化PageManager
 * @param {number} indexPage 设置当前初始页
 * @param {number} pageSize 设置每页的数量
 * @param {number} displayPageNum 最多有多少页
 */
var PageManager = function (indexPage = 1, pageSize = 0, displayPageNum = 1, items = []) {
    this.ManagerInfo = new PageManagerInfo(indexPage, pageSize, displayPageNum, items);
};


/**
 * 初始化PageManager
 * @param {number} indexPage 设置当前初始页
 * @param {number} pageSize 设置每页的数量
 * @param {number} displayPageNum 最多有多少页
 */
PageManager.create = function (indexPage = 1, pageSize = 0, displayPageNum = 1, items = []) {
    return new PageManager(indexPage, pageSize, displayPageNum, items);
}

/**
 * 设置每页的数据量
 * @param {number} pageSize 每页的数据量
 *  */
PageManager.prototype.setPageSize = function (pageSize) {
    this.ManagerInfo.pageSize = pageSize;
}

/**
 * 设置最多会存多少页数据
 * @param {number} page 总的数据页数
 *  
 */
PageManager.prototype.setdisplayPageNum = function (page) {
    this.ManagerInfo.displayPageNum = page;
}

PageManager.prototype.getdisplayPageNum = function () {
    return this.ManagerInfo.displayPageNum;
}

/**
 * 设置数据
 * @param {any[]} items     数据
 * @param {number} indexPage 设置当前初始页页数(可选)
 * @param {number} pageSize 设置每页的数量(可选)
 *  */
PageManager.prototype.setDatas = function (items, indexPage = 0, pageSize = 0) {
    if (Array.isArray(this.ManagerInfo.items)) {
        this.ManagerInfo.items = items;
        this.ManagerInfo.indexPage = indexPage ? indexPage : this.ManagerInfo.indexPage;
        this.ManagerInfo.pageSize = pageSize ? pageSize : this.ManagerInfo.pageSize;
    } else {
        throw new Error(items + " is not a array");
    }
}

/**
 * 读取全部数据 
 * */
PageManager.prototype.getDatas = function () {
    return this.ManagerInfo.items;
}

/**
 * 返回数据总数 
 * */
PageManager.prototype.getTotal = function () {
    return this.ManagerInfo.items.length;
}

/**
 * 读取某一页的数据
 * @param {number} currentPage 当前页数
 */
PageManager.prototype.getPageDatas = function (currentPage) {
    var items = new Array();
    if (this.ManagerInfo.indexPage > 1) {
        currentPage -= (this.ManagerInfo.indexPage - 1);
    }
    if (currentPage > 0) {
        var start = (currentPage - 1) * this.ManagerInfo.pageSize;
        var end = currentPage * this.ManagerInfo.pageSize;

        if (start < this.ManagerInfo.items.length) {
            items = this.ManagerInfo.items.slice(start, end);
        }
    }
    return items;
}

/**
 * 读取某一页的数据
 */
PageManager.prototype.getPageDatasDB = function () {
    return this.ManagerInfo.items;
}

/**
 * 读取某一条数据
 * @param {number} index 对应数据的索引,参数从1算起
 */
PageManager.prototype.getData = function (index) {
    index = index - ((this.ManagerInfo.indexPage - 1) * this.ManagerInfo.pageSize) - 1;
    return this.ManagerInfo.items[index];
}

/**
 * 清空数据 
 * */
PageManager.prototype.clear = function () {
    this.ManagerInfo = new PageManagerInfo();
}

/**
 * 获取最后一条数据
 * */
PageManager.prototype.getLastItem = function () {
    var item = undefined;
    if (this.ManagerInfo.items && this.ManagerInfo.items.length > 0) {
        item = this.ManagerInfo.items[this.ManagerInfo.items.length - 1];
    }
    return item;
}

/**
 * 获取第一条数据 
 * */
PageManager.prototype.getFirstItem = function () {
    var item = undefined;
    if (this.ManagerInfo.items && this.ManagerInfo.items.length > 0) {
        item = this.ManagerInfo.items[0];
    }
    return item;
}

/**
 * 获取翻页所需的pageInfo  
 * @param {boolean} direction  向上还是向下 false: "prev" or true: other
 * @param {{ field: string, value: any, type: string }[]} sortFields  分页字段信息，ID是必须的
 */
PageManager.prototype.getPageInfo = function (direction, sortFields = null) {
    // 两个字段排序：“Paged=TRUE-p_ToTop=0-p_ID=11
    // "Paged=TRUE&p_ID=218"
    // "PagedPrev=TRUE&Paged=TRUE&p_ID=208"
    // 如果是需要进行排序
    //   "Paged=TRUE&p_ID=218" 中间追加字段和字段值 &p_NewsNo=ITxxxx
    // prev后追加 &p_ + 排序的字段 + =对应项对应字段的值
    let pageInfo = "";
    let sortStr = "";
    let idStr = "";

    sortFields.forEach((item) => {
        if (item.field === "ID") {
            idStr = `&p_ID=${item.value}`;
        } else {
            let value = item.value;
            switch (item.type) {
                case "DateTime":
                    {
                        if (value.toISOString) {
                            value = value.toISOString();
                        }
                        break;
                    }
                case "Lookup":
                    {
                        if (value.get_lookupId) {
                            value = value.get_lookupId();
                        }
                        break;
                    }
            }
            sortStr += `&p_${item.field}=${value}`
        }
    });
    if (!direction) {
        pageInfo = `PagedPrev=TRUE&Paged=TRUE${idStr}${sortStr}`;
    } else {
        pageInfo = `Paged=TRUE${sortStr}${idStr}`;
    }
    return pageInfo;
}

/**
 * 返回总的页数(算上起点页),默认算上hasNext
 * @param {boolean} calcNext 是否计算hasNext，默认为true
 */
PageManager.prototype.getPageTotalCount = function (calcNext = true) {
    let num = 0;
    if (calcNext) {
        num = this.ManagerInfo.indexPage - 1 + this.getPageCount() + (this.ManagerInfo.hasNext ? 1 : 0);
    } else {
        num = this.ManagerInfo.indexPage - 1 + this.getPageCount();
    }
    return num;
}

/**
 * 返回总的页数(当前数据)
 */
PageManager.prototype.getPageCount = function () {
    return Math.ceil(this.getTotal() / this.ManagerInfo.pageSize);
}

/**
 * 设置是否有下一页
 */
PageManager.prototype.setNext = function (next) {
    this.ManagerInfo.hasNext = next;
}


/**
 * 重定位Index
 * @param {number} pageNum 当前页数
 * @param {boolean} hasNext 是否有下一页
 * @param {any[]} items 缓存的新数据
 * @param {string} pagingInfo 存放下一次翻页的定位信息
 */
PageManager.prototype.redirectIndex = function (pageNum, hasNext, items, pagingInfo = "") {
    let index = this.ManagerInfo.resetIndexPage(pageNum);
    this.setDatas(items);
    this.setNext(hasNext);
    if (pagingInfo) {
        this.ManagerInfo.pagingInfos[index + this.ManagerInfo.displayPageNum] = pagingInfo;
    }
}


/**
 * 重定位Index
 * @param {number} pageNum 当前页数
 * @param {any[]} items 缓存的新数据
 * @param {number} count 总数
 * @param {string} pagingInfo 存放下一次翻页的定位信息
 */
PageManager.prototype.redirectIndexDB = function (pageNum, items, count, pagingInfo = "") {
    let index = this.ManagerInfo.resetIndexPage(pageNum);
    this.setDatas(items);
    this.setNext(false);
    if (pagingInfo) {
        this.ManagerInfo.pagingInfos[index + this.ManagerInfo.displayPageNum] = pagingInfo;
    }
    this.setAllCount(count);
}

PageManager.prototype.getPagingInfo = function (pageNum) {
    let index = PageManagerInfo.calcIndex(pageNum, this.ManagerInfo.displayPageNum);
    return this.ManagerInfo.pagingInfos[index] ? this.ManagerInfo.pagingInfos[index] : "";
}

PageManager.prototype.setAllCount = function (count) {
    this.ManagerInfo.allCount = count;
}
PageManager.prototype.getAllCount = function () {
    return Math.ceil(this.ManagerInfo.allCount / this.ManagerInfo.pageSize);
}

export default PageManager;
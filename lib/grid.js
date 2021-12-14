'use strict';

class GridColumn {
  /**
   * @param {Grid} grid
   * @param {string} prop
   */
  constructor(grid, prop) {
    this._grid = grid;
    this._prop = prop;
    this._label = undefined;
    this._sortable = false;
    this._filter = null;
  }

  get exports() {
    const attrs = { prop: this._prop };
    if (this._label) attrs.label = this._label;
    if (this._sortable) attrs.sortable = this._sortable;
    return attrs;
  }

  label(label) {
    this._label = label;
    return this;
  }

  /**
   * 设置为可排序列
   * @param {boolean} [order]
   * @returns 
   */
  sortable(order = true) {
    this._sortable = order;
    return this;
  }

  /**
   * 数据过滤
   * @param {{filters: { text: string, value: string }[], multiple: boolean, filter(filder, value): void }} opt
   */
  filterable(opt) {
    this._filter = opt;
    return this;
  }
}

class Grid {
  /**
   * @param {import('zenorm').Finder} finder
   */
  constructor() {
    this._columns = [];
    this._limit = 10;
    this._maxLimit = 100;
    this._order = null;
    this._filters = [];
  }

  column(prop) {
    const column = new GridColumn(this, prop);
    this._columns.push(column);
    return column;
  }

  /**
   * 默认条数限制
   * @param {number} defaultLimit 默认条数
   * @param {number} [maxLimit] 最大条数
   */
  setLimit(limit, maxLimit) {
    this._limit = limit;
    this._maxLimit = maxLimit;
    return this;
  }

  /**
   * 设置默认排序
   * @param {string} column 
   */
  setOrder(column) {
    this._order = column;
    return this;
  }

  /**
   * @param {import('koa').BaseContext} ctx
   */
  query(ctx) {
    const { limit, offset, order } = ctx.helper.query({
      limit: {
        type: 'int',
        validate: {
          gte: 1,
          lte: this._maxLimit,
        }
      },
      offset: {
        type: 'int',
        validate: {
          gte: 0,
          lte: Number.MAX_VALUE,
        }
      },
      order: 'trim',
    });
    if (limit) {
      this._limit = limit;
    }
    if (offset) {
      this._offset = offset;
    }
    if (order) {
      const allowOrders = this._columns.filter(i => i._sortable).map(i => i._prop);
      if (allowOrders.includes(order.startsWith('-') ? order.slice(1) : order)) {
        this._order = order;
      }
    }
    return this;
  }

  async fetch(finder) {
    const columns = this._columns.map(i => i._prop);
    // 排序
    if (this._order) {
      finder.order(this._order);
    }
    // 分页并取得指定列
    const limit = this._limit;
    const offset = this._offset || 0;
    const result = await finder.page({
      limit,
      offset,
    }, ...columns);
    return {
      filters: this._filters,
      columns: this._columns.map(i => i.exports),
      data: result.list,
      total: result.total,
      limit,
      maxLimit: this._maxLimit,
      offset,
      order: this._order,
    };
  }
}

module.exports = Grid;

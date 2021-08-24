/* tslint:disable */
/* eslint-disable */
(function ($) {
	if (!Array.prototype.find) {
	  Object.defineProperty(Array.prototype, 'find', {
		value: function(predicate) {
		 // 1. Let O be ? ToObject(this value).
		  if (this == null) {
			throw new TypeError('"this" is null or not defined');
		  }

		  var o = Object(this);

		  // 2. Let len be ? ToLength(? Get(O, "length")).
		  var len = o.length >>> 0;

		  // 3. If IsCallable(predicate) is false, throw a TypeError exception.
		  if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		  }

		  // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
		  var thisArg = arguments[1];

		  // 5. Let k be 0.
		  var k = 0;

		  // 6. Repeat, while k < len
		  while (k < len) {
			// a. Let Pk be ! ToString(k).
			// b. Let kValue be ? Get(O, Pk).
			// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
			// d. If testResult is true, return kValue.
			var kValue = o[k];
			if (predicate.call(thisArg, kValue, k, o)) {
			  return kValue;
			}
			// e. Increase k by 1.
			k++;
		  }

		  // 7. Return undefined.
		  return undefined;
		}
	  });
	}
	if (!Array.prototype.findIndex) {
	  Object.defineProperty(Array.prototype, 'findIndex', {
		value: function(predicate) {
		 // 1. Let O be ? ToObject(this value).
		  if (this == null) {
			throw new TypeError('"this" is null or not defined');
		  }

		  var o = Object(this);

		  // 2. Let len be ? ToLength(? Get(O, "length")).
		  var len = o.length >>> 0;

		  // 3. If IsCallable(predicate) is false, throw a TypeError exception.
		  if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		  }

		  // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
		  var thisArg = arguments[1];

		  // 5. Let k be 0.
		  var k = 0;

		  // 6. Repeat, while k < len
		  while (k < len) {
			// a. Let Pk be ! ToString(k).
			// b. Let kValue be ? Get(O, Pk).
			// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
			// d. If testResult is true, return k.
			var kValue = o[k];
			if (predicate.call(thisArg, kValue, k, o)) {
			  return k;
			}
			// e. Increase k by 1.
			k++;
		  }

		  // 7. Return -1.
		  return -1;
		},
		configurable: true,
		writable: true
	  });
	}
	
	$.extend($.jqx._jqxGrid.prototype, {
		_getChartDataFields: function (data) {
			var that = this;
			var record = data[0];
			var stringOnly = true,
				xAxisDataField,
				series = [];

			for (var dataField in record) {
				if (dataField === '$' || dataField === 'uid' || dataField === 'boundindex' || dataField === 'uniqueid' || dataField === 'visibleindex') {
					continue;
				}

				var dataType = that.source._source.dataFields.find(function (gridField) { return gridField.name === dataField }).type;

				if (dataType === 'string') {
					var index = that.columns.records.findIndex(function (col) { return col.datafield === dataField });

					if (index === 0) {
						xAxisDataField = dataField;
					}
				}
				else {
					stringOnly = false;
					series.push({ dataField: dataField, displayText: dataField });
				}
			}

			return { xAxisDataField: xAxisDataField, series: series, stringOnly: stringOnly };
		},

		createChart: function (type, dataSource) {
			var that = this;
			var gridSelection = that.getselection(),
				selectedRows = gridSelection.rows,
				selectedCells = gridSelection.cells,
				chartElement = document.createElement('div'),
				chartData = [],
				seriesGroup = {};
			var rowsToPlot = [],
				columnsToPlot = [],
				series;

			if (selectedCells && selectedCells.length > 1) {
				selectedCells.forEach(function (cell) {
					if (rowsToPlot.indexOf(cell.rowindex) === -1) {
						row
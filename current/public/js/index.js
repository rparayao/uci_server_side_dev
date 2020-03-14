"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var bills = [];
//  [{id: 0, label: "American Express", amount: 250.0, category: "Credit Card",}, 
//     {id: 1, label: "Car Payment", amount:200.00, category: "Transportation",}, 
//     {id: 2, label: "Rail pass", amount:200.00, category: "Transportation",}, 
//     {id: 3, label: "Phone", amount: 125.00, category: "Utilities",}, 
//     {id: 4, label: "Electric", amount: 80.0, category: "Utilities",},
//     {id: 5, label: "Water", amount: 30.0, category: "Utilities",},
//     {id: 6, label: "Gas", amount: 30.0, category: "Utilities",},
//     {id: 7, label: "Visa Card", amount: 180.0, category: "Credit Card",},];


var monthlyBudget = 2000.0;

var getMaxIndex = function getMaxIndex() {
    return bills.reduce(function (max, b) {
        return Math.max(max, b.id);
    }, bills[0].id);
};

var updateBalance = function updateBalance(bills, monthly) {
    var left = monthly;
    bills.map(function (bill) {
        left = left - bill.amount;
    });
    return left;
};

function refreshDisplay(id, showItem, newBills) {
    this.setState({ billId: id, showItem: showItem, refresh: true, statebills: newBills });
}

function updateRemainingAmount(event) {
    if (event !== null) {
        var amount = Number(event.value);
        var billId = event.id;

        var index = bills.findIndex(function (bill) {
            return "amount" + bill.id === billId;
        });
        bills[id].amount = amount;
    }
    var left = updateBalance(bills, monthlyBudget);
    this.setState({ remainingAmt: left });
}

var deleteBill = function deleteBill(event) {
    var choice = confirm("Are you sure you want to delete?");
    if (choice) {
        var billId = parseInt(event.id);
        refreshDisplay(billId, false, bills);
    }
};

var handleCreateBill = function handleCreateBill(e) {
    var label = e.parentNode.childNodes[1].value;
    var category = e.parentNode.childNodes[3].value;
    var amount = 0.0;
    var index = getMaxIndex() + 1;

    var newBill = { index: index, label: label, category: category, amount: amount };

    var newBills = [].concat(_toConsumableArray(bills), [newBill]);
    bills = newBills;
    refreshDisplay(-1, true, bills);
};

var BillSummary = function (_React$Component) {
    _inherits(BillSummary, _React$Component);

    function BillSummary(props) {
        _classCallCheck(this, BillSummary);

        var _this = _possibleConstructorReturn(this, (BillSummary.__proto__ || Object.getPrototypeOf(BillSummary)).call(this, props));

        var left = updateBalance(props.bills, props.monthly);
        _this.state = { startingAmount: props.monthly, remainingAmt: left };
        _this.startAmtHandler = _this.startAmtHandler.bind(_this);
        updateRemainingAmount = updateRemainingAmount.bind(_this);
        return _this;
    }

    _createClass(BillSummary, [{
        key: "startAmtHandler",
        value: function startAmtHandler(event) {
            monthlyBudget = Number(event.target.value);
            var left = updateBalance(bills, event.target.value);
            this.setState({ startingAmount: event.target.value, remainingAmt: left });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "monthly" },
                React.createElement(
                    "div",
                    { className: "monthly-total" },
                    React.createElement(
                        "div",
                        { id: "monthly-amount" },
                        "$",
                        React.createElement("input", { id: "input-start-amt", value: this.state.startingAmount, onChange: this.startAmtHandler })
                    ),
                    React.createElement(
                        "div",
                        null,
                        "Monthly Total"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "monthly-left" },
                    React.createElement(
                        "div",
                        { id: "left-amount" },
                        "$",
                        React.createElement("input", { id: "input-amt-left", value: this.state.remainingAmt, readonly: true })
                    ),
                    React.createElement(
                        "div",
                        null,
                        "Left"
                    )
                )
            );
        }
    }]);

    return BillSummary;
}(React.Component);

var options = [{ value: 'Credit Card', label: 'Credit Card' }, { value: 'Transportation', label: 'Transportation' }, { value: 'Utilities', label: 'Utilities' }];

var CreateNewBill = function (_React$Component2) {
    _inherits(CreateNewBill, _React$Component2);

    function CreateNewBill(props) {
        _classCallCheck(this, CreateNewBill);

        var _this2 = _possibleConstructorReturn(this, (CreateNewBill.__proto__ || Object.getPrototypeOf(CreateNewBill)).call(this, props));

        _this2.state = {
            label: props.label,
            cat: props.cat
        };
        _this2.updateLabelHandler = _this2.updateLabelHandler.bind(_this2);
        _this2.updateCatHandler = _this2.updateCatHandler.bind(_this2);
        return _this2;
    }

    _createClass(CreateNewBill, [{
        key: "updateLabelHandler",
        value: function updateLabelHandler(event) {
            this.setState({ label: event.target.value });
        }
    }, {
        key: "updateCatHandler",
        value: function updateCatHandler(event) {
            this.setState({ cat: event.target.value });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "add-bill" },
                React.createElement(
                    "div",
                    { className: "bill-amount" },
                    React.createElement(
                        "label",
                        null,
                        "Label:"
                    ),
                    React.createElement("input", { id: "input-label", value: this.state.label, onChange: this.updateLabelHandler }),
                    React.createElement(
                        "label",
                        null,
                        "Category: "
                    ),
                    React.createElement("input", { id: "input-cat", value: this.state.cat, onChange: this.updateCatHandler }),
                    React.createElement(
                        "label",
                        null,
                        "Amount: $ "
                    ),
                    React.createElement("input", { id: "input-amount", value: 0, onChange: this.updateCatHandler }),
                    React.createElement("input", { id: "createButton", type: "submit", alt: "Create a new bill item.", value: "Create Bill", onClick: function onClick(e) {
                            return handleCreateBill(e.target);
                        } })
                )
            );
        }
    }]);

    return CreateNewBill;
}(React.Component);

var BillAmount = function (_React$Component3) {
    _inherits(BillAmount, _React$Component3);

    function BillAmount(props) {
        _classCallCheck(this, BillAmount);

        var _this3 = _possibleConstructorReturn(this, (BillAmount.__proto__ || Object.getPrototypeOf(BillAmount)).call(this, props));

        _this3.state = {
            amount: props.amount,
            id: "amount" + props.id
        };
        _this3.updateHandler = _this3.updateHandler.bind(_this3);
        return _this3;
    }

    _createClass(BillAmount, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps) {
            this.state = {
                amount: newProps.amount,
                id: "amount" + newProps.id
            };
        }
    }, {
        key: "updateHandler",
        value: function updateHandler(event) {
            console.log("About to delete Amount: " + event.target.value);
            console.log("About to delete ID: " + this.state.id);
            this.setState({ amount: event.target.value });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "bill-amount" },
                React.createElement("input", { type: "text", id: this.state.id, pattern: "[0-9]*", value: this.state.amount, size: "6", onChange: this.updateHandler, onBlur: function onBlur(e) {
                        return updateRemainingAmount(e.target);
                    } }),
                React.createElement(DeleteBill, { id: this.props.id })
            );
        }
    }]);

    return BillAmount;
}(React.Component);

var ListItems = function (_React$Component4) {
    _inherits(ListItems, _React$Component4);

    function ListItems(props) {
        _classCallCheck(this, ListItems);

        var _this4 = _possibleConstructorReturn(this, (ListItems.__proto__ || Object.getPrototypeOf(ListItems)).call(this, props));

        _this4.state = {
            billId: -1,
            showItem: props.showItem,
            refresh: props.refresh
        };
        refreshDisplay = refreshDisplay.bind(_this4);
        return _this4;
    }

    _createClass(ListItems, [{
        key: "componentDidMount",
        value: async function componentDidMount() {
            var queryParams = "{\n            id\n            label\n            category\n            amount\n        }";

            var query = "{ getBills " + queryParams + " }";
            var variables = {};
            var response = await fetch('/api/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: query, variables: variables })
            });

            var _ref = await response.json(),
                getBills = _ref.data.getBills;

            this.setState({ data: getBills });
        }
    }, {
        key: "componentDidUpdate",
        value: async function componentDidUpdate(prevProps, prevState, snapshot) {
            var _this5 = this;

            if (!this.state.showItem && this.state.billId !== -1) {
                var query = "mutation{ deleteBill(id: " + this.state.billId + "){successful}} ";
                var variables = {};
                var response = await fetch('/api/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: query, variables: variables })
                });

                var _ref2 = await response.json(),
                    _deleteBill = _ref2.data.deleteBill;

                if (_deleteBill !== undefined) {
                    var index = this.state.data.findIndex(function (bill) {
                        return parseInt(bill.id) === parseInt(_this5.state.billId);
                    });
                    this.state.data.splice(index - 1, 1);

                    var billId = "bill-item" + this.state.billId;
                    var element = document.getElementById(billId);
                    if (element) {
                        element.remove();
                    }
                }
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps) {
            this.state = {
                billId: newProps.billId,
                refresh: newProps.refresh
            };
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.refresh && this.state.data !== undefined) {
                return this.state.data.map(function (bill) {
                    var id = "bill-item" + bill.id;
                    return React.createElement(
                        "div",
                        { className: "bill-item", id: id },
                        React.createElement(BillIcon, { cat: bill.category }),
                        React.createElement(BillLabel, { label: bill.label, cat: bill.category }),
                        React.createElement(BillAmount, { id: bill.id, amount: bill.amount })
                    );
                });
            }
            return React.createElement("div", null);
        }
    }]);

    return ListItems;
}(React.Component);

var DeleteBill = function DeleteBill(props) {
    console.log("DELETE: " + JSON.stringify(props));
    return React.createElement(
        "button",
        { className: "delete-icon", id: props.id, type: "submit", height: "16", onClick: function onClick(e) {
                return deleteBill(e.target);
            } },
        React.createElement("img", { className: "delete-icon-img", id: props.id, src: "../images/trash.svg", height: "16" })
    );
};

var BillLabel = function BillLabel(props) {
    var _React$useState = React.useState(props.cat),
        _React$useState2 = _slicedToArray(_React$useState, 1),
        category = _React$useState2[0];

    var date = new Date();
    date.setDate(date.getDate() + 30);
    var dateStr = date.toLocaleDateString("en-US");
    return React.createElement(
        "div",
        { className: "bill-label" },
        React.createElement(
            "div",
            null,
            props.label
        ),
        React.createElement(
            "div",
            { className: "bill-category" },
            category
        ),
        React.createElement(
            "div",
            { id: "due-date" },
            "Due Date:",
            React.createElement("input", { id: "dueDate1", type: "text", size: "16", defaultValue: dateStr })
        )
    );
};

var BillIcon = function BillIcon(props) {
    var _React$useState3 = React.useState(props.cat),
        _React$useState4 = _slicedToArray(_React$useState3, 1),
        category = _React$useState4[0];

    var iconSource = "../images/creditCard.svg";
    if (category === "Credit Card") {
        iconSource = "images/creditCard.svg";
    } else if (category === "Transportation") {
        iconSource = "images/transportation.svg";
    } else if (category === "Utilities") {
        iconSource = "images/utilities.svg";
    }

    return React.createElement(
        "div",
        { "class": "categoryIcon" },
        React.createElement("img", { src: iconSource })
    );
};

var BudgetApp = function BudgetApp(props) {
    var _React$useState5 = React.useState(props.monthly),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        monthly = _React$useState6[0],
        setMonthly = _React$useState6[1];

    React.useEffect(function () {
        // Update the document title using the browser API
        document.title = "Monthly Budget of " + props.monthly;
    });
    return React.createElement(
        "div",
        null,
        React.createElement(BillSummary, { monthly: monthly, bills: bills }),
        React.createElement(CreateNewBill, { label: "New Bill", cat: "Credit Card" }),
        React.createElement(
            "div",
            { id: "div-bill-item" },
            React.createElement(ListItems, { showItem: true, refresh: true })
        )
    );
};

var mainElement = document.getElementById("budget-tracking");
ReactDOM.render(React.createElement(BudgetApp, { monthly: monthlyBudget }), mainElement);

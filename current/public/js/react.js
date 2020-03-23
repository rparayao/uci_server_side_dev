let bills =[];
let monthlyBudget = 2000.0;


const getMaxIndex=()=>{
    return bills.reduce((max, b) => Math.max(max, b.id), bills[0].id);
};


const updateBalance=(bills, monthly)=>{ 
    let left = monthly;
    bills.map(bill =>{
        left = left - bill.amount;    
    });
    return left;
};



function refreshDisplay(id, showItem, bill, updateBalance, left){
    this.setState({billId: id, showItem, refresh: true, bill, updateBalance, remainingAmt: left});
}


function updateRemainingAmount(event){
    if ( event !== null){
        let amount = Number(event.value);
        let billId = event.id;
    
        const index = bills.findIndex(bill => `amount${bill.id}`=== billId);
        bills[id].amount = amount;
    }
    let left = updateBalance(bills, monthlyBudget);     
    this.setState({remainingAmt: left});
}



const deleteBill = async (event)=>{
    let choice = confirm ("Are you sure you want to delete?");
    if ( choice ){
        let billId = parseInt(event.id);
        //REMI
        let queryParams = `{
            id
            amount
        }`;
        
        let query = `{ getBills ${queryParams} }`;
        const variables = {};
        let response = await fetch('/api/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });
        const {data: {getBills}} = await response.json();
        let left = updateBalance(getBills, monthlyBudget);
        refreshDisplay(billId, false, bills, true, left);    
    }        
};


const handleCreateBill = async (e) =>{
    const label = e.parentNode.childNodes[1].value;
    const category = e.parentNode.childNodes[3].innerText; 
    const amount = e.parentNode.childNodes[5].value;
    let newBill = {label, category, amount};

    let queryParams = `{
        id
        amount
    }`;
    
    let query = `{ getBills ${queryParams} }`;
    const variables = {};
    let response = await fetch('/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    const {data: {getBills}} = await response.json();
    let left = updateBalance(getBills, monthlyBudget);
    refreshDisplay(-1, false, newBill, true, left);

};


class BillSummary extends React.Component {
    constructor(props) {
        super(props);
        let left = updateBalance(props.bills, props.monthly);
        this.state = {startingAmount: props.monthly, remainingAmt: left};
        this.startAmtHandler = this.startAmtHandler.bind(this);
        updateRemainingAmount = updateRemainingAmount.bind(this);
    }

  
    startAmtHandler(event) {
        monthlyBudget = Number(event.target.value);
        let left = updateBalance(bills, event.target.value);
        this.setState({startingAmount: event.target.value,remainingAmt: left});
    }

    async componentDidMount() {
        let queryParams = `{
            id
            amount
        }`;
        
        let query = `{ getBills ${queryParams} }`;
        const variables = {};
        let response = await fetch('/api/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });
        const {data: {getBills}} = await response.json();
        this.setState({ data: getBills });
        let left = updateBalance(getBills, this.props.monthly);
        this.setState({startingAmount: this.props.monthly, remainingAmt: left});
    }
//REMi
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.updateBalance){
            let queryParams = `{
                id
                amount
            }`;
        
            let query = `{ getBills ${queryParams} }`;
            const variables = {};
            let response = await fetch('/api/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables }),
            });
            const {data: {getBills}} = await response.json();
            let left = updateBalance(getBills, this.props.monthly);
            this.setState({startingAmount: this.props.monthly, remainingAmt: left, updateBalance: false});
        }
    }


    render() {
        return (
            <div className="monthly">
                <div className="monthly-total">
                    <div id="monthly-amount">$
                        <input id="input-start-amt" value={this.state.startingAmount} onChange={this.startAmtHandler} /> 
                    </div>
                    <div>Monthly Total</div>
                </div>
                <div className="monthly-left">
                    <div id="left-amount">$
                        <input id="input-amt-left" value={this.state.remainingAmt} readonly/>
                    </div>
                    <div>Left</div>
                </div>
            </div>
        );
    }
}



const options = [
    { value: 'Credit Card', label: 'Credit Card' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Utilities', label: 'Utilities' }
]
  
class CreateNewBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: props.label, 
            cat: props.cat,
            selectedOption: null,
            amount: props.amount
        };
        this.updateLabelHandler = this.updateLabelHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

 
    updateLabelHandler(event) {
        this.setState({label: event.target.value,});
    }

    updateAmountHandler(event) {
        //this.setState({amount: event.target.value,});
    }


    handleChange (cat) {
        this.setState(
          { cat },
          () => console.log(`Option selected:`, this.state.selectedOption)
        );
    }

    render() {
        const { cat } = this.state;
        return ( 
            <div className="add-bill">
                <div className="bill-amount">
                    <label>Label:</label>
                    <input id="input-label" value={this.state.label} onChange={this.updateLabelHandler}/>
                    <label>Category: </label>
                    <div style={{width: '120px'}}>
                    <Select id="select"
                    style={{width: '120px'}}
                    value={cat}
                    onChange={this.handleChange}
                    options={options}
                    />
                    </div>
                    <label id="amount-label">Amount:</label>
                    <input id="input-amount" value={this.state.amount} onChange={this.updateAmountHandler}/>
                    <input id="createButton" type="submit" alt="Create a new bill item." value="Create Bill" onClick={(e) =>handleCreateBill(e.target)}/>
                </div>
            </div>
        );
    }
}




class BillAmount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: props.amount, 
            id: "amount" + props.id,
        };
        this.updateHandler = this.updateHandler.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.state = {
            amount: newProps.amount, 
            id: "amount" + newProps.id,
        };
    }
 
    updateHandler(event) {
        console.log("About to delete Amount: " + event.target.value)
        console.log("About to delete ID: " + this.state.id)
        this.setState({amount: event.target.value});
    }

    
    render() {
        return (
            <div className="bill-amount">
                <input type="text" id={this.state.id} pattern="[0-9]*"  value={this.state.amount} size="6" onChange={this.updateHandler} onBlur={(e) => updateRemainingAmount(e.target)} />
                <DeleteBill id={this.props.id}/>
            </div>
        );
    }
}

let pastDue = [];

class ListItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            billId: -1, 
            showItem: props.showItem, 
            bill: props.bill, 
            refresh: props.refresh, 
            newItem: false
        };
        refreshDisplay = refreshDisplay.bind(this);
    }
    
    async componentDidMount() {
        let queryParams = `{
            id
            label
            category
            amount
            past_due
        }`;
        
        let query = `{ getBills ${queryParams} }`;
        const variables = {};
        let response = await fetch('/api/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });
        const {data: {getBills}} = await response.json();
        this.setState({ data: getBills });

        queryParams = `{
            id
            bill_id
            amount
        }`;
        
        query = `{ getPastDue ${queryParams} }`;
        response = await fetch('/api/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });
        const {data: {getPastDue}} = await response.json();
        this.setState({ pastDue: getPastDue });
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.showItem){
            if ( this.state.billId !== -1) {
                const query = `mutation{ deleteBill(id: ${this.state.billId}){successful}} `;
                const variables = {};
                const response = await fetch('/api/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query, variables }),
                });
                const {data: {deleteBill}} = await response.json();
                if (deleteBill !== undefined){
                    const index = this.state.data.findIndex(bill => parseInt(bill.id) === parseInt(this.state.billId));
                    this.state.data.splice(index-1,1);

                    let billId = "bill-item" + this.state.billId;
                    let element = document.getElementById(billId);
                    if (element){
                        element.remove();
                    }
                }
            } else {
                const query = `mutation{ createBill(input: {label: "${this.state.bill.label}", category: "${this.state.bill.category}", amount: ${this.state.bill.amount} }){id label, category, amount}} `;
                const variables = {};
                const response = await fetch('/api/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query, variables }),
                });
                const {data:{createBill}} = await response.json();
                 const newBill = [...this.state.data, createBill]
                 this.setState({showItem: true, data: newBill});
            }

        }
    }

    componentWillReceiveProps(newProps){
        this.state = {
            billId: newProps.billId, 
            refresh: newProps.refresh, 
            bill: newProps.bill
        };
    }

    
    render() {
        if ( this.state.refresh && this.state.data !== undefined){
            return (
                this.state.data.map((bill) => {
                    let style = "bill-item";
                    if ( bill.past_due !== undefined && bill.past_due !== null){
                        style = "bill-item-due";
                    }
                    let id = "bill-item" + bill.id;
                    return (
                    <div className={style} id={id}>
                        <BillIcon cat={bill.category}/>
                        <BillLabel label={bill.label} cat={bill.category} due={bill.past_due}/>
                        <BillAmount id={bill.id} amount={bill.amount}/>
                    </div>
                    )
                }
                )
            );
        } 
        return <div></div>;
    }
}




const DeleteBill=(props)=>{
    return  <button className="delete-icon" id={props.id} type="submit"  height="16" onClick={(e) =>deleteBill(e.target)}> 
        <img className="delete-icon-img" id={props.id} src="../images/trash.svg" height="16"/>
    </button>;  
};



const BillLabel=(props)=>{
    const [category] = React.useState(props.cat);
    let date = new Date(); 
    date.setDate(date.getDate()+30);
    let dateStr = date.toLocaleDateString("en-US");
    return <div className="bill-label">
        <div>{props.label}</div>
        <div className="bill-category">{category}</div>
        <div id="due-date">
            Due Date:
           {props.due ?<div> PAST DUE </div>:
            <input id="dueDate1" type="text" size="16" defaultValue={dateStr}/>}
        </div>
    </div>;
};

const BillIcon=(props)=>{
    const [category] = React.useState(props.cat);
    let iconSource = "../images/creditCard.svg";
	if (category === "Credit Card"){
		iconSource = "images/creditCard.svg";
	} else if (category === "Transportation"){
		iconSource = "images/transportation.svg";
	} else if (category === "Utilities"){
		iconSource = "images/utilities.svg";
	}

    return (
    <div class="categoryIcon">
        <img src={iconSource}/>
    </div>);
};



const BudgetApp=(props)=>{ 
    const [monthly] = React.useState(props.monthly);
    React.useEffect(() => {
    // Update the document title using the browser API
        document.title = `Monthly Budget of ${props.monthly}`;
    });
    return (<div>
        <BillSummary monthly={monthly} bills={bills}/>
        <CreateNewBill label="New Bill" cat="Credit Card"/>
        <div id="div-bill-item"><ListItems showItem={true} refresh={true}/></div>
    </div>);
};
 

$(document).ready(function(){
	$('#login-formxx').on('submit', login);
	$('#logout').on('click', logout);
	$('#signup-form').on('submit', signup);  
});


const mainElement = document.getElementById("budget-tracking");
ReactDOM.render(<BudgetApp monthly={monthlyBudget}/>, mainElement);


let editingid=null;
 let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
 const expenses=document.querySelector(".mainexpense");
const income=document.querySelector(".mainincome"); 
const totalbalance=document.getElementById("totalbalance");
const inserter=document.querySelector(".transactions");

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// render function
function render(){

    // data update
   const totalexpenses= transactions.filter(data=>data.type=="Expense").reduce((acc,val)=> acc+val.amount,0);  {
expenses.textContent="-₹"+ totalexpenses;
    }
    const totalincome= transactions.filter(data=>data.type=="Income").reduce((acc,val)=> acc+val.amount,0);  {
income.textContent="₹"+ totalincome;
    }
    totalbalance.textContent=totalincome-totalexpenses;
   

    // new elements
inserter.innerHTML="";
    transactions.forEach(element => {
        inserter.insertAdjacentHTML("beforeend",`
          <div class="transaction">

      <div>
        <h4>${element.title}</h4>
        <small>${element.category}• ${element.date}</small>
      </div>

      <div class="right">

        <span class="minus">${element.amount}</span>

        <button class="edit-btn" data-id="${element.id}">Edit</button>
   <button class="delete-btn" data-id="${element.id}">Delete</button>

      </div>

    </div>   
            `)
    });

}
inserter.addEventListener("click", (e) => {
 
    if(e.target.classList.contains("delete-btn")){
const deleteid=Number(e.target.dataset.id);
transactions=transactions.filter(data=>data.id !== deleteid);

    }
    if(e.target.classList.contains("edit-btn")){
        submitbtn.textContent="Update";
const editid=Number(e.target.dataset.id);
const edited=transactions.find(data=>data.id == editid);
editingid=editid;

inputbox.value=edited.title;
amount.value=edited.amount;
incometype.value=edited.type;
category.value=edited.category;    }
saveTransactions();
render();

});
render();
const submitbtn=document.querySelector(".addbtn");
const inputbox=document.querySelector(".inputbox");
const amount=document.querySelector(".amountbox");
const incometype=document.querySelector("#type");
const category=document.querySelector("#category");
const date=document.querySelector("#datebox");
submitbtn.addEventListener("click",addTransaction);

function addTransaction(e) {
    e.preventDefault();

    const title = inputbox.value;
    const amountvalue = Number(amount.value);
    const typevalue = incometype.value;
    const categoryvalue = category.value;
    const datevalue = date.value;

    if (title.trim() === "") {
        alert("Please enter a title");
        return;
    }

    if (amountvalue <= 0) {
        alert("Enter a valid amount");
        return;
    }

    if (datevalue === "") {
        alert("Please select a date");
        return;
    }

   if (editingid === null) {

    const newTransaction = {
        id: Date.now(),
        title: title,
        amount: amountvalue,
        type: typevalue,
        category: categoryvalue,
        date: datevalue
    };

    transactions.push(newTransaction);

} else {

    const edited = transactions.find(data => data.id === editingid);

    edited.title = title;
    edited.amount = amountvalue;
    edited.type = typevalue;
    edited.category = categoryvalue;
    edited.date = datevalue;

   
    submitbtn.textContent = "Add Transaction";
}

    saveTransactions();

    render();

    inputbox.value = "";
    amount.value = "";
    date.value = "";
}
    render();


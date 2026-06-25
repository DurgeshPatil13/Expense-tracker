let transactions=[
    {
          id:1 ,
  title:"Food" ,
  amount: 200,
  type: "income",
  category:"food",
  date: "25-06-26"
    },
        {
          id:2 ,
  title:"travel" ,
  amount: 20,
  type: "expense",
  category:"travel",
  date: "25-06-26"
    },
        {
          id:3 ,
  title:"movie" ,
  amount: 250,
  type: "expense",
  category:"entertainment",
  date: "25-06-26"
    }
]

 const expenses=document.querySelector(".mainexpense");
const income=document.querySelector(".mainincome"); 
const totalbalance=document.getElementById("totalbalance");
const inserter=document.querySelector(".transactions");



// render function
function render(){

    // data update
   const totalexpenses= transactions.filter(data=>data.type=="expense").reduce((acc,val)=> acc+val.amount,0);  {
expenses.textContent="$"+ totalexpenses;
    }
    const totalincome= transactions.filter(data=>data.type=="income").reduce((acc,val)=> acc+val.amount,0);  {
income.textContent="$"+ totalincome;
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

        <button >Edit</button>
   <button class="delete-btn" data-id="${element.id}">Delete</button>

      </div>

    </div>   
            `)
    });

}
inserter.addEventListener("click", (e) => {
      if (!e.target.classList.contains("delete-btn")) {
        return;
    }
const deleteid=Number(e.target.dataset.id);

console.log(deleteid);
transactions=transactions.filter(data=>data.id !== deleteid);
render();
});
render();


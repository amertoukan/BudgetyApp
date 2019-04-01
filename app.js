
//BUDGET CONTROLLER
let budgetController = (
    () => {
        
     let Expense = function(id, description, value) {
        this.id = id; 
        this.description = description;
        this.value = value;   
        this.percentage = -1
    };   

    Expense.prototype.calcPercentage = (totalIncome) => {
        if (totalIncome > 0){
            this.percentage = Math.round ((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1
        } 
    };

    Expense.prototype.getPercentage = () => { 
        return this.percentage;
    };

    let Income = function(id, description, value) {
        this.id = id; 
        this.description = description;
        this.value = value;   
    };   
    
    calculateTotal = (type) => { 
        let sum = 0; 

        data.allItems[type].forEach((current)=>{
            sum += current.value;
        });
        data.totals[type] = sum;
    }

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals:{
            exp: [],
            inc: []
        },
        budget : 0,
        percentage : -1
    }

    return {
        addItem: (type, des, val) => {
            let newItem, ID;
        data.allItems[type].length > 0 ? ID = data.allItems[type][data.allItems[type].length - 1].id + 1 : ID = 0
            if (type === `exp`){
            newItem = new Expense(ID, des, val)
            } else if (type === 'inc'){
            newItem = new Income(ID, des, val)
            }
            //push element in array
            data.allItems[type].push(newItem);
            //return new element
            return newItem;
        },

        deleteItem : (type, id) => {
            //Get IDs
            //MAP is used because IDS arent in chronological order
            let ids = data.allItems[type].map((curr) => {
                return curr.id;
            })
            let index = ids.indexOf(id);
           
            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
            //Delete Item 
        },

        calculateBudget : () => {

            //calculate total income & expenses 
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate budget 
            data.budget = data.totals.inc - data.totals.exp
            //: income - expenses

            //calculate the percentage of income that we spent
            data.totals.inc > 0 ? data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
            :
            data.pecentage = -1
        },

        calculatePercentage: () => {
            //Calculate every expense percentage in the expense array

            /*
                a = 20
                b = 10
                c = 40
                inc = 100

                percentages: 
                a = 20/100
                b= 10/100
                c = 40/100
            */
            data.allItems.exp.forEach((cur) => {
                cur.calcPercentage(data.totals.inc);
            })
        },

        getPercentages : () => {
            let allPerc = data.allItems.exp.map((cur) => {
                return cur.getPercentage();
            })    
            return allPerc;
        },


        getBudget : () => {
            return {
                budget: data.budget,
                incTotal: data.totals.inc,
                expTotal: data.totals.exp,
                percentage: data.percentage
            };
        },

        test : () => {
            console.log(data);
        }
    };
})();



//UI CONTROLLER
let UIController = (
() => {
    const DOMstrings = {
        inputType: `.add__type`,
        inputDescription: `.add__description`,
        inputValue: `.add__value`,
        inputBtn : `.add__btn`,
        incomeContainer : `.income__list`,
        expenseContainer : `.expenses__list`,
        bValue : `.budget__value`,
        binc : `.budget__income--value`,
        bexp: `.budget__expenses--value`,
        bpercentage: `.budget__expenses--percentage`,
        container : `.container`,
        percentage : ``,
        month : `.budget__title--month`
    }

return {
displayDate : (month) => {
        const Months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
        let year = new Date().getFullYear();

        document.querySelector(DOMstrings.month).textContent = `${Months[month]} ${year}`;
    
},
addListItem : (obj, type) => {
var html, newHtml, e;

//Create html string with placeholder text
if(type === 'inc'){
e = DOMstrings.incomeContainer
    
html = '<div class="item clearfix" id="inc-%id%"><div class="item__description"> %description% </div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
} 
else if( type === 'exp'){
e = DOMstrings.expenseContainer
    
//Expense
html = '<div class="item clearfix" id="exp-%id%"><div class="item__description"> %description% </div><div class="right clearfix"><div class="item__value">- %value% </div><div class="item__percentage">%percentage%%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"/></button></div></div></div>'
}

//replace the placeholder text with some actual data
    newHtml = html.replace('%id%', obj.id)
    newHtml = newHtml.replace('%description%', obj.description)
    newHtml = newHtml.replace ('%value%', obj.value)

//insert html into the dom
    document.querySelector(e).insertAdjacentHTML('beforeend', newHtml);
},

deleteListItem: (selectorID) => {
    let el = document.getElementById(selectorID)
    el.parentNode.removeChild(el)
},

clearFields : () => {
    let Fields;

    //select fields 
    Fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);


    fieldArr = Array.prototype.slice.call(Fields);

    fieldArr.forEach((current, index, arr) => {
        current.value = "";
        current.description = "";
    });
    fieldArr[0].focus();
},

getInput : () => { 

    return {
            type: document.querySelector(DOMstrings.inputType).value, //Will be inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            };
           
        },
displayBudget : (obj) => {
    //budget
    document.querySelector(DOMstrings.bValue).textContent = obj.budget;
    //total inc
    document.querySelector(DOMstrings.binc).textContent = obj.incTotal;
    //total exp
    document.querySelector(DOMstrings.bexp).textContent = obj.expTotal;

    obj.percentage > 0 ?
    //percentage
    document.querySelector(DOMstrings.bpercentage).textContent = obj.percentage + '%'
    :
    document.querySelector(DOMstrings.bpercentage).textContent = '---'    
   
},

displayPercentage : (perc) => {
    document.querySelector(DOMstrings.)
},

getDOMStrings : () => { 
            return DOMstrings;
        },


    };    
})();



//GLOBAL APP CONTROLLER
let controller = (
(budgetCtrl, UICtrl) => {

const setupEventListeners = () => {
const DOM = UICtrl.getDOMStrings();

//When check mark is clicked add input
document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

//When enter is pressed add input
document.addEventListener('keypress', (e) => {
    if(e.keyCode === 13 || e.which === 13){
        ctrlAddItem();
    }
});

document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

}

const updateBudget = () => {
    //1. Calculate the budget
    budgetCtrl.calculateBudget();

    //2. return budget
    let budget = budgetCtrl.getBudget();

    //3. Display the budget on UI
    UICtrl.displayBudget(budget)

}

const updatePercentage = () => {
    //1. Calculatte Percentages
    
    // 2. read them from budget controller

    // 3. Update the UI with new percentages

    // 4. 
}

const ctrlAddItem = () => {
   //1. Get input data
    let input = UICtrl.getInput();

    if(input.description !== "" && !isNaN(input.value) && input.value > 0){
    
    //2. add item to budget control 
    let newItem = budgetCtrl.addItem(input.type, input.description, input.value);
 
    //3. Add new item to UI     
    UICtrl.addListItem(newItem, input.type)

    //4. ClearFields 
    UICtrl.clearFields();

    //5. Calculate and update budget
    updateBudget();
    }
    
};

const ctrlDeleteItem = (e) => {
   let itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;

   if (itemID) {
    
    //inc-num
    let splitID = itemID.split('-');
    let type = splitID[0];
    let ID = parseInt(splitID[1]);

    //1. Delete Item from item structure 
    budgetCtrl.deleteItem(type, ID);

    //2. Delete from UI
    UICtrl.deleteListItem(itemID)

    //3. Update and show new budget
    updateBudget();
    updatePercentage()
   }


};

const updateBudget = () => { 
    //1. Calculate percentage 
    budgetCtrl.calculatePercentage();

    //2. Read percentages from the budget controller 
     let percentages = budgetCtrl.getPercentages();
    
    //3. Update the UI with the new percentages
}

const showDate = () => { 
    //get date [0-6]
    let month = new Date().getMonth() ;

    //if a new month starts, reset the board and change month number

    // display date
    UICtrl.displayDate(month)
}

return {
    init :  () => {
        console.log('Application has started');
            showDate();
            UICtrl.displayBudget({
            budget: 0,
            incTotal: 0,
            expTotal: 0,
            percentage: -1
        })
        setupEventListeners();
    },
};
})(budgetController, UIController);


controller.init();

// Function to Get the value of Expense Details Entry and Store in Local Storage
function GetData() {
    event.preventDefault();
// <<<<<< Get form Values and store in obj >>>>>>>>>
   
let array= 
    {

    Dates:document.getElementById('Date').value,
    Account:document.getElementById('Account').value,
    Comments: document.getElementById('Comments').value,
    Amount:parseInt( document.getElementById('Amount').value),
    Type: document.getElementById('Type').value,
    // Total:parseInt(total),
}


console.log(array);

// <<<<<< Store form Values in LocalStorage >>>>>>>>>
if (localStorage.getItem('data')=== null) {
    localStorage.setItem('data', '[]');
}

let old_data = JSON.parse(localStorage.getItem('data'));
console.log(old_data);

old_data.push(array);


localStorage.setItem('data', JSON.stringify(old_data));
launch_toast(
    document.getElementById("desc").innerText = "Successfully Entered"
)
onload()


}
//================================================================================================================================
// <<<<<<<  Function to Get Value from Local Storage And Show in Expense Form >>>>>>>>>

function ShowData() {
   
    document.getElementById('Table').innerHTML = '';
    let Data  = JSON.parse(localStorage.getItem('data')); 
   
    if (Data === null || Data.length === 0) {
        document.getElementById('emptyMessage').style.display = 'grid';
        document.getElementById('alert').innerText='There is nothing to Show'
        document.getElementById('alertPic').style.display='block';
        document.getElementById('result').style.display = 'none';
    }else{
        let i = 0;
        Data.map(n => {
          n['ID'] = i;
          i++;
        })
    
        console.log(Data);
        let TableData = '';
       Data.forEach((item) => {
       TableData+=`
        <tr>
            <td>${item.Dates}</td>
            <td>${item.Account}</td>
            <td>${item.Comments}</td>
            <td>${item.Amount}</td>
            <td>${item.Type}</td>
        
            <td>
                <button class="icon-btn1" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter1" onClick= "UpdatedValue(${item.ID})"><i class="fa fa-pencil"></i></button>
                <button class="icon-btn" onclick="openModalDel(${item.ID})" ><i class="fa fa-trash"></i></button>
            </td>
        </tr>
        
            `
            // class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick= "POPup(${item.ID})"
        });
    
        let result = Data.map(a => a.Amount);
        // console.log(result);
        // document.getElementsByClassName('modal-footer').innerHTML = ` <button type="button" class="btn btn-primary" onclick="Delete(${item.ID})">Save changes</button>`
        document.getElementById('Total').innerText = 'Total Amount = '+ result.reduce((a,b)=>a+b)
        document.getElementById('Table').innerHTML = TableData
       localStorage.setItem('data',JSON.stringify(Data)) 
    }
        // console.log(Data);
   


}

//================================================================================================================================
// function to open & close Delete Modal start from here!

function openModalDel(ID) {
    console.log(ID);
    localStorage.setItem('id',JSON.stringify(ID));
    // document.getElementById("backdrop").style.display = "block"
    document.getElementById("exampleModalCenter").style.display = "block"
    document.getElementById("exampleModalCenter").classList.add("show")
  }
function closeModalDel() {
    var modal = document.getElementById('exampleModalCenter');
    modal.classList.remove('show');
    modal.style.display = 'none';
    var modalBackdrop = document.querySelector('.modal-backdrop');
    modalBackdrop.parentNode.removeChild(modalBackdrop);
    console.log('Working on modal');
  }
// function to open & close Delete Modal end from here!
//================================================================================================================================
// Function to Delete Entry
function Delete() {
  let ID =  JSON.parse(localStorage.getItem('id'))
  console.log(ID);
    let arr = JSON.parse(localStorage.getItem('data')); 
    console.log(arr);
    const objWithIdIndex = arr.findIndex((obj) => obj.ID === ID)
    console.log(objWithIdIndex);
   if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex,1);
      }
console.log(arr);
localStorage.setItem('data', JSON.stringify(arr));
localStorage.removeItem('id');
launch_toast(
    document.getElementById("desc").innerText = "Entry Deleted Successfully"
)
onload()
closeModalDel()
}
//================================================================================================================================
// <<<<<<< Function to get the values and ID of {Edit Entry} from Expense Form Start here! >>>>>>>>>>>>>
function UpdatedValue(ID) {
    document.getElementById("exampleModalCenter1").style.display = "block"
    document.getElementById("exampleModalCenter1").classList.add("show")
    localStorage.setItem('id', JSON.stringify(ID));
    // let ID =  JSON.parse(localStorage.getItem('id'))
    console.log(ID);
    let arr = JSON.parse(localStorage.getItem('data')); 
    console.log(arr);
   const objWithIdIndex = arr.find(obj => obj.ID === ID)
   console.log(objWithIdIndex.Amount);
   document.getElementById('UpdatedDates').value = objWithIdIndex.Dates
   document.getElementById('Accounts').value = objWithIdIndex.Account
   document.getElementById('Description').value = objWithIdIndex.Comments
   document.getElementById('TotalAmount').value = objWithIdIndex.Amount
   document.getElementById('Types').value = objWithIdIndex.Type
    console.log( document.getElementById('TotalAmount').value);
}
// <<<<<<< Function to get the values and ID of {Edit Entry} from Expense Form End here! >>>>>>>>>>>>>
//================================================================================================================================
// <<<<<<< Function to Update the Edit Entry in localStorage Start here! >>>>>>>>>>>>>

function Updated(){
    let ID =JSON.parse(localStorage.getItem('id'));
    let arr = JSON.parse(localStorage.getItem('data'));
    console.log(arr);
    let updObj = {
        Dates:document.getElementById('UpdatedDates').value ,
        Account:document.getElementById('Accounts').value,
        Comments:document.getElementById('Description').value,
        Amount:parseInt(document.getElementById('TotalAmount').value),
        Type:document.getElementById('Types').value
    }
    console.log(updObj);
  let UpdatedArray =  arr.map((item) => (item.ID === ID ? { ...item, ...updObj } : item))

    console.log(UpdatedArray);
    localStorage.setItem('data', JSON.stringify(UpdatedArray));
    launch_toast(
        document.getElementById("desc").innerText = "Entry Updated Successfully"
    )
   onload();

}
// <<<<<<< Function to Update the Edit Entry in localStorage End here! >>>>>>>>>>>>>

//================================================================================================================================
// <<<<<<<< Below Functions are to open and close different Modal boxes  Start Point >>>>>>>>>>>>>
function openModal() {
    
    document.getElementById("exampleModalCenter2").style.display = "block"
    document.getElementById("exampleModalCenter2").classList.add("show")
   
    document.getElementById('Date').valueAsDate = new Date(); 

}
function closeModal() {
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("exampleModalCenter2").style.display = "none"
    document.getElementById("exampleModalCenter2").classList.remove("show")
    ShowData()
}
function closeNSaveModal() {
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("exampleModalCenter2").style.display = "none"
    document.getElementById("exampleModalCenter2").classList.remove("show")
    launch_toast(
        document.getElementById("desc").innerText = "Successfully Entered"
    )
    GetData()
}
function closeNSaveModalUpdate() {
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("exampleModalCenter1").style.display = "none"
    document.getElementById("exampleModalCenter1").classList.remove("show")
    Updated()
    launch_toast(
        document.getElementById("desc").innerText = "Entry Updated Successfully"
    )

}
// <<<<<<<< Above Functions are to open and close different Modal boxes  Ends here >>>>>>>>>>>>>

//================================================================================================================================
// <<<<<<< function to load data from localStorage when ever page is call >>>>>>>>>
function onload() {
    let Data = JSON.parse(localStorage.getItem('data'))
    ShowData();
    if (Data === null || Data.length === 0) {
        document.getElementById('result').style.display = 'none';
        document.getElementById('emptyMessage').style.display = 'grid';
        document.getElementById('alert').innerText='There is nothing to Show'
        document.getElementById('alertPic').style.display='block';
        
    }else{
        document.getElementById('emptyMessage').style.display = 'none';
        document.getElementById('alert').innerText='There is nothing to Show'
        document.getElementById('alertPic').style.display='none';
        document.getElementById('result').style.display = 'block';
    }
}

 // Function for pop message on Successful post Request
 function launch_toast() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      
    }, 2000);
  }


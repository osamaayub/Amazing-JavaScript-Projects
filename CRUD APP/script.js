var selectRow = null;

function FormSubmit(e) {
    event.preventDefault();
    var FormData = ReadDataForm();
    if (selectRow === null) {
        insertNewRecord(FormData);
    }
    else {
        UpdateRecord(FormData);
    }
    resetForm();

}

function ReadDataForm() {
    var FormData = {};
    FormData["ProductCode"] = document.getElementById('productCode').value;
    FormData["ProductName"] = document.getElementById('productName').value;
    FormData["ProductQuantity"] = document.getElementById('ProductQuantity').value;
    FormData["ProductPrice"] = document.getElementById('productprice').value;
    return FormData;


}
//Inserting Records into table

function insertNewRecord(data) {
    var table = document.getElementById('table-list').getElementsByTagName('tbody')[0];
    var row = table.insertRow(table.length);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = data.ProductCode;
    var cell2 = row.insertCell(1);
    cell2.innerHTML = data.ProductName;
    var cell3 = row.insertCell(2);
    cell3.innerHTML = data.ProductQuantity;
    var cell4 = row.insertCell(3);
    cell4.innerHTML = data.ProductPrice;
    var cell5 = row.insertCell(4);
    cell5.innerHTML = `<button onclick="EDIT(this)">EDIT</button>  <button onclick="Delete(this)">DELETE</button>`
}
//updating the records in the table
function EDIT(td) {
    selectRow = td.parentElement.parentElement;
    document.getElementById('productCode').value = selectRow.cells[0].innerHTML;
    document.getElementById('productName').value = selectRow.cells[1].innerHTML;
    document.getElementById('ProductQuantity').value = selectRow.cells[2].innerHTML;
    document.getElementById('productprice').value = selectRow.cells[3].innerHTML;
}
function UpdateRecord(form) {
    selectRow.cells[0].innerHTML = form.ProductCode;
    selectRow.cells[1].innerHTML = form.ProductName;
    selectRow.cells[2].innerHTML = form.ProductQuantity;
    selectRow.cells[3].innerHTML = form.ProductPrice;
}
//Delete the records in the table

function Delete(td) {

    if (confirm('Do you want to delete this record')) {
        row = td.parentElement.parentElement;
        document.getElementById('table-list').deleteRow(row.rowIndex);

    }
    resetForm();
}
//Reseting the data of the table
function resetForm() {

    document.getElementById('ProductCode').value = '';
    document.getElementById('ProductName').value = '';
    document.getElementById('ProductQuantity').value = '';
    document.getElementById('ProductPrice').value = '';
	selectRow=null;


}

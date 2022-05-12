 document.getElementById('loan-form').addEventListener('submit', function(e) {
     //Hide Results
     document.getElementById('results').style.display = 'none';
     //Show Loader
     document.getElementById('loading').style.display = 'block';

     setTimeout(caculateResult, 2000);


     e.preventDefault();
 });

 //Caculate Result
 function caculateResult() {
     console.log('caculating....');
     //UI VARIABLES
     const loanAmount = document.getElementById('amount');
     const interest = document.getElementById('interest');
     const years = document.getElementById('years');
     const monthlyPayment = document.getElementById('monthly-payment');
     const totalPayment = document.getElementById('total-payment');
     const totalIntrest = document.getElementById('total-intrest');

     //declare a float value of the principal and pass in amount.value 
     const principal = parseFloat(loanAmount.value);
     //declare a float value of the intrest and pass in intrest.value
     const caculatedInterest = parseFloat(interest.value) / 100 / 12;
     const caculatedPayments = parseFloat(years.value) * 12;

     //Compute monthly payment
     const x = Math.pow(1 + caculatedInterest, caculatedPayments);
     const monthly = (principal * x * caculatedInterest) / (x - 1);

     //to check wheter the results are finite or infinite
     if (isFinite(monthly)) {

         monthlyPayment.value = monthly.toFixed(2);
         totalPayment.value = (monthly * caculatedPayments).toFixed(2);
         totalIntrest.value = ((monthly * caculatedPayments) - principal).toFixed(2);
         //Show Results
         document.getElementById('results').style.display = 'block';
         //Hide Loader
         document.getElementById('loading').style.display = 'none';

     } else {
         showError('Please check your numbers');
     }


 }

 function showError(error) {
     //Hide Results
     document.getElementById('results').style.display = 'none';
     //Hide Loader
     document.getElementById('loading').style.display = 'none';

     //create div element
     const errorDiv = document.createElement('div');
     //Get Elememnts
     const card = document.querySelector('.card');
     const heading = document.querySelector('.heading');
     //Add class
     errorDiv.className = 'alert alert-danger';
     //Create Text node and append to div
     errorDiv.appendChild(document.createTextNode(error));
     //Inserting the error before the heading class 
     card.insertBefore(errorDiv, heading);
     //clear error after 3 seconds
     setTimeout(clearError, 3000);

 } //Clear Error
 function clearError() {
     document.querySelector('.alert').remove();
 }
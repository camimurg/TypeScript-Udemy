// Code goes here!
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

function searchAddressHandler(evt: Event) {
  evt.preventDefault();
  const enteredAddress = addressInput.value;

  //send this to Google's API!

}

form.addEventListener('submit', searchAddressHandler);

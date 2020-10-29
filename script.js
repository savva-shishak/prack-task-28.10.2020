const form = document.forms.namedItem('registration');

const btn = form.getElementsByClassName('form__btn')[0];
const ind = form.getElementsByClassName('form__indicator')[0];
const msg = form.getElementsByClassName('form__msg')[0];

form.addEventListener('submit', e => {
  e.preventDefault();

  const values = getValuesAtForm()

  hideBtnAndShowIndicator();

  console.log( form.action);
  sendRequest(form.action, values);
});

function getValuesAtForm() {
  const {value: surname}    = form.elements['surname'];
  const {value: name}       = form.elements['name'];
  const {value: patronymic} = form.elements['patronymic'];
  const {value: phone}      = form.elements['phone'];
  const {value: region}     = form.elements['region'];

  return {surname, name, patronymic, phone, region};
}

function hideBtnAndShowIndicator() {
  btn.style.display = 'none';
  ind.classList.add('indicator_open');
}

function sendRequest(url, data) {
  fetch(url, {body: JSON.stringify(data), method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'}})
    .then(at3000ms(showSucces))
    .catch(at3000ms(showError));
}

function showSucces() {
  ind.classList.remove('indicator_open');
  msg.innerHTML = '<div class="msg msg_success">Форма успешно отправлена!</div>'
}

function showError() {
  ind.classList.remove('indicator_open');
  msg.innerHTML = '<div class="msg msg_danger">Ошибка!</div>';
}

function at3000ms(func) {
  return () => setTimeout(func, 3000);
}
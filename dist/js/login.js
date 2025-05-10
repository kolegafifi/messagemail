const loginMail = document.querySelector('#login-mail')
const loginPass = document.querySelector('#login-pass')
const loginButton = document.querySelector('.login-button')

handleLogin = () => {
	;/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
		loginMail.value
	)
		? loginMail.classList.remove('error')
		: loginMail.classList.add('error'),
		loginPass.value != '' ? loginPass.classList.remove('error') : loginPass.classList.add('error')
}

loginButton.addEventListener('click', e => {
	e.preventDefault()
	handleLogin()
})

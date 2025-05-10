const signMail = document.querySelector('#sign-mail')
const signPass = document.querySelector('#sign-pass')
const signRePass = document.querySelector('#sign-repass')
const signCheckbox = document.querySelector('#sign-checkbox')
const signButton = document.querySelector('.sign-button')

handleSign = () => {
	errors = 0
	;/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
		signMail.value
	)
		? signMail.classList.remove('error')
		: (signMail.classList.add('error'), errors++),
		signPass.value.length < 5 || '' == signPass
			? (signPass.classList.add('error'), errors++)
			: signPass.classList.remove('error'),
		signPass.value != signRePass.value || '' == signRePass.value
			? (errors++, signRePass.classList.add('error'))
			: signRePass.classList.remove('error'),
		signCheckbox.checked
			? signCheckbox.classList.remove('checkbox-error')
			: (errors++, signCheckbox.classList.add('checkbox-error'))
}

signButton.addEventListener('click', e => {
	e.preventDefault()
	handleSign()
})

// DATA MODULE
var dataModule = (function () {
	var Male = function (id, firstName, lastName, email, address, mobile, birthday) {
		this.id = id;

		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.address = address;
		this.mobile = mobile;
		this.birthday = birthday;
	};

	var Female = function (id, firstName, lastName, email, address, mobile, birthday) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.address = address;
		this.mobile = mobile;
		this.birthday = birthday;
	};

	// store the inputs

	var data = {
		male: [],
		female: [],
	};

	return {
		addMember: function (g, fn, ln, e, a, p, b) {
			var newMember, ID;

			if (data[g].length > 0) {
				ID = data[g][data[g].length - 1].id + 1;
			} else {
				ID = 0;
			}

			if (g === 'male') {
				newMember = new Male(ID, fn, ln, e, a, p, b);
			} else if (g === 'female') {
				newMember = new Female(ID, fn, ln, e, a, p, b);
			}

			if (g == null || fn == '' || ln == '' || e == '' || a == '' || p == '' || b == '') {
				alert('Provide all the details!');
			} else {
				data[g].push(newMember);
			}

			return newMember;
		},
		testing: function () {
			console.log(data);
		},
	};
})();

// UI MODULE
var UIModule = (function () {
	var DOMstrings = {
		inputFirstName: '.add__firstName',
		inputLastName: '.add__lastName',
		inputEmail: '.add__email',
		inputAddress: '.add__address',
		inputPhoneNumber: '.add__phoneNumber',
		inputBirthday: '.add__birthday',
		inputButton: '.add__button',
		memberContainer: '.member-container',
	};

	function displayRadioValue() {
		var sex, ele;
		ele = document.getElementsByName('gender');

		for (i = 0; i < ele.length; i++) {
			if (ele[i].checked) {
				sex = ele[i].value;
			}
		}
		return sex;
	}

	return {
		getInput: function () {
			return {
				gender: displayRadioValue(),
				firstName: document.querySelector(DOMstrings.inputFirstName).value,
				lastName: document.querySelector(DOMstrings.inputLastName).value,
				email: document.querySelector(DOMstrings.inputEmail).value,
				address: document.querySelector(DOMstrings.inputAddress).value,
				phoneNumber: document.querySelector(DOMstrings.inputPhoneNumber).value,
				birthday: document.querySelector(DOMstrings.inputBirthday).value,
			};
		},

		getDOMString: function () {
			return DOMstrings;
		},

		addMember: function (obj, gender) {
			var html, newHTML, element;
			element = DOMstrings.memberContainer;

			if (gender === 'male') {
				html =
					'<div class="container male-container"><div class="hdr"><img src="/svg/icon-male.svg" alt="male-profile-icon" /><div class="description-container margin-right"><h3 class="heading-3">%firstName%<span class="span">%lastName%</span></h3></div></div><div class="first-container padding-for-container"><div class="age"><h5 class="heading-5">age</h5><h4 class="heading-4">17 years old</h4></div><div class="birthday"><h5 class="heading-5">birthday</h5><h4 class="heading-4">%birthday%</h4></div><div class="phone"><h5 class="heading-5">phone</h5><h4 class="heading-4">%phoneNumber%</h4></div></div><div class="second-container padding-for-container"><h5 class="heading-5">email</h5><h4 class="heading-4">%email%</h4></div><div class="third-container padding-for-container"><h5 class="heading-5">adress</h5><h4 class="heading-4">%address%</h4></div></div>';
			} else if (gender === 'female') {
				html =
					'<div class="container female-container"><div class="hdr"><img src="/svg/icon-female.svg" alt="female-profile-icon" /><div class="description-container margin-right"><h3 class="heading-3">%firstName%<span class="span">%lastName%</span></h3></div></div><div class="first-container padding-for-container"><div class="age"><h5 class="heading-5">age</h5><h4 class="heading-4">17 years old</h4></div><div class="birthday"><h5 class="heading-5">birthday</h5><h4 class="heading-4">%birthday%</h4></div><div class="phone"><h5 class="heading-5">phone</h5><h4 class="heading-4">%phoneNumber%</h4></div></div><div class="second-container padding-for-container"><h5 class="heading-5">email</h5><h4 class="heading-4">%email%</h4></div><div class="third-container padding-for-container"><h5 class="heading-5">adress</h5><h4 class="heading-4">%address%</h4></div></div>';
			}

			//Replace the text
			newHTML = html.replace('%firstName%', obj.firstName);
			newHTML = newHTML.replace('%lastName%', obj.lastName);
			newHTML = newHTML.replace('%birthday%', obj.birthday);
			newHTML = newHTML.replace('%phoneNumber%', obj.mobile);
			newHTML = newHTML.replace('%email%', obj.email);
			newHTML = newHTML.replace('%address%', obj.address);

			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
		},
	};
})();

// CONTROLLER MODULE
var controllerModule = (function (dataJS, uiJS) {
	var setupEventListeners = function () {
		var DOM = uiJS.getDOMString();

		document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
		document.addEventListener('keypress', function (e) {
			if (e.keyCode === 13 || e.which === 13) {
				ctrlAddItem();
			}
		});
	};

	// Main Function
	var ctrlAddItem = function () {
		var input, newMember;
		// get the inputs
		input = uiJS.getInput();
		// add the input to the add member
		newMember = dataModule.addMember(
			input.gender,
			input.firstName,
			input.lastName,
			input.email,
			input.address,
			input.phoneNumber,
			input.birthday
		);
		// Add the memeber to the UI
		uiJS.addMember(newMember, input.gender);
		// testing
		dataModule.testing();
	};

	return {
		init: function () {
			setupEventListeners();
		},
	};
})(dataModule, UIModule);

controllerModule.init();

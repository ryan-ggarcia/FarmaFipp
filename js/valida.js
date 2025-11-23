const vEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const vSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,12}$/
const vNome = /^[A-Za-záéíóúãâêôàçÁÉÍÓÚÃÂÊÔÀÇ\s]+$/;
const vCll = /^\([1-9][0-9]\)\s?9[0-9]{4}-[0-9]{4}$/;
const vCep = /^\d{5}-\d{3}$/;
const vRg = /^\d{2}(\.\d{3}){2}-?\d{1}$/

const form = document.getElementById("form")
var corCompleta = "#78cf70"
var corIncompleta = "#eff70b"
var formularioValidado = true
function validarCPF(cpf) {
	cpf = cpf.replace(/\D/g, '');
	if (cpf.length !== 11) return false;
	if (/^(\d)\1+$/.test(cpf)) return false;
	let soma = 0;
	let resto;
	for (let i = 1; i <= 9; i++) {
		soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
	}
	resto = (soma * 10) % 11;

	if (resto === 10 || resto === 11) resto = 0;
	if (resto !== parseInt(cpf.charAt(9))) return false;

	soma = 0;
	for (let i = 1; i <= 10; i++) {
		soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
	}
	resto = (soma * 10) % 11;

	if (resto === 10 || resto === 11) resto = 0;
	if (resto !== parseInt(cpf.charAt(10))) return false;

	return true;
}

form.addEventListener("submit", (e) => {
	e.preventDefault()

	validarInput()
	enviarFormulario()
})
function validarInput() {

	const email = document.getElementById("email");
	if (!vEmail.test(email.value.trim())) exibiErro(email, "Email inválido...");
	else exibiSucess(email);

	const nome = document.getElementById("nome");
	if (!vNome.test(nome.value.trim())) exibiErro(nome, "Nome inválido...");
	else exibiSucess(nome);

	const sob = document.getElementById("sobrenome");
	if (!vNome.test(sob.value.trim())) exibiErro(sob, "Sobrenome inválido...");
	else exibiSucess(sob);

	const rg = document.getElementById("rg");
	if (!vRg.test(rg.value.trim())) exibiErro(rg, "RG inválido...");
	else exibiSucess(rg);

	const cpf = document.getElementById("cpf");
	const cpfLimpo = cpf.value.replace(/\D/g, "");
	if (!validarCPF(cpfLimpo)) exibiErro(cpf, "CPF inválido...");
	else exibiSucess(cpf);

	const phone = document.getElementById("phone");
	if (!vCll.test(phone.value.trim())) exibiErro(phone, "Telefone inválido...");
	else exibiSucess(phone);

	const cep = document.getElementById("cep");
	if (!vCep.test(cep.value.trim())) exibiErro(cep, "CEP inválido...");
	else exibiSucess(cep);

	const address = document.getElementById("address");
	if (address.value.trim() === "") exibiErro(address, "Campo obrigatório!");
	else exibiSucess(address);

	const number = document.getElementById("number");
	if (number.value.trim() === "") exibiErro(number, "Campo obrigatório!");
	else exibiSucess(number);

	const city = document.getElementById("city");
	if (city.value.trim() === "") exibiErro(city, "Campo obrigatório!");
	else exibiSucess(city);

	const gender = document.getElementById("gender");
	if (gender.value === "") exibiErro(gender, "Selecione uma opção!");
	else exibiSucess(gender);

	const senha = document.getElementById("password");
	if (!vSenha.test(senha.value.trim())) exibiErro(senha, "A senha deve conter 1 letra maiuscula ou minuscula, 1 numero, e conter de 6 a 12 caracteres");
	else exibiSucess(senha);

	const cSenha = document.getElementById("cPassword");
	if (cSenha.value.trim() === "" || cSenha.value !== senha.value)
		exibiErro(cSenha, "As senhas devem ser iguais!");
	else exibiSucess(cSenha);
}
function enviarFormulario() {
	if (formularioValidado === true) {
		Swal.fire({
			title: "Cadastro efetuado com sucesso!",
			icon: "success",
			draggable: true
		}).then(() => {
        window.location.href = "login.html"; // redireciona depois do alerta
    });
	}
	else{
		Swal.fire({
			icon: "error",
			title: "Erro de preenchimento",
			text: "Todos os campos devem ser preenchidos!",
		});
	}
}
function exibiErro(obj, mensagem) {
	let parent = obj.parentElement.parentElement
	let mensagemErro = parent.querySelector('.error')
	let textErro = parent.querySelector('.message-error')
	obj.className = "input-style msg-false"
	mensagemErro.style.display = "flex"
	textErro.innerHTML = mensagem
	formularioValidado = false
}


function exibiSucess(obj) {
	let parent = obj.parentElement.parentElement
	let mensagemErro = parent.querySelector('.error')
	let mensagemTrue = parent.querySelector('.sucess')
	let textSucces = parent.querySelector('.message-true')
	textSucces.innerHTML = "Campo preenchido corretamente!"
	obj.className = "input-style msg-true"
	mensagemTrue.style.display = "flex"
	mensagemErro.style.display = "none"
	formularioValidado = true
}

function ResetCampos() {
	var textFields = document.getElementsByTagName("input");
	for (var i = 0; i < textFields.length; i++) {
		if (textFields[i].type == "text") {
			textFields[i].style.backgroundColor = "";
			textFields[i].style.borderColor = "";
		}
	}
}

function coresMask(t) {
	var l = t.value;
	var m = l.length;
	var x = t.maxLength;
	if (m == 0) {
		t.style.borderColor = "red";
		//t.style.backgroundColor = "red";
	}
	else if (m < x) {
		t.style.borderColor = corIncompleta;
		//t.style.backgroundColor = corIncompleta;
	} else {
		t.style.borderColor = corCompleta;
		//t.style.backgroundColor = corCompleta;
	}
}

function mascara(m, t, e, c) {
	var cursor = t.selectionStart;
	var texto = t.value;
	texto = texto.replace(/\D/g, '');
	var l = texto.length;
	var lm = m.length;
	if (window.event) {
		id = e.keyCode;
	} else if (e.which) {
		id = e.which;
	}
	cursorfixo = false;
	if (cursor < l) cursorfixo = true;
	var livre = false;
	if (id == 16 || id == 19 || (id >= 33 && id <= 40)) livre = true;
	ii = 0;
	mm = 0;
	if (!livre) {
		if (id != 8) {
			t.value = "";
			j = 0;
			for (i = 0; i < lm; i++) {
				if (m.substr(i, 1) == "#") {
					t.value += texto.substr(j, 1);
					j++;
				} else if (m.substr(i, 1) != "#") {
					t.value += m.substr(i, 1);
				}
				if (id != 8 && !cursorfixo) cursor++;
				if ((j) == l + 1) break;

			}
		}
		if (c) coresMask(t);
	}
	if (cursorfixo && !livre) cursor--;
	t.setSelectionRange(cursor, cursor);
}
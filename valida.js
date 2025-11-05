const vEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const vSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,12}$/
const vNome = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
const vCpf = /^(?!00000000000|11111111111|22222222222|33333333333|44444444444|55555555555|66666666666|77777777777|88888888888|99999999999)\d{11}$/;
const vCll = /^\([1-9][0-9]\)\s?9[0-9]{4}-[0-9]{4}$/;
const vDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/;
const vCep = /^\d{5}-\d{3}$/;
const vRg = /^\d{2}(\.\d{3}){2}-?\d{1}$/

var validacao = true;
var corCompleta = "#99ff8f"
var corIncompleta = "#eff70b"
function validaNome(nome) {
	if (nome.value == "" || !vNome.test(nome.value)) {
		Swal.fire({
			icon: "error",
			title: "ERRO",
			text: "Nome inválido!",
			footer: 'O nome deve conter apenas letras e espaços.'
		});
		validacao = false;
		nome.style.backgroundColor = "red";
	}else {
		nome.style.backgroundColor = corCompleta;
	}
}
function validaEmail(email) {
	if (email.value == "" || !vEmail.test(email.value)) {
		Swal.fire({
			icon: "error",
			title: "ERRO",
			text: "E-mail inválido!",
			footer: 'O e-mail deve estar no formato correto.'
		});
		validacao = false;
		email.style.backgroundColor = "red";
	}else {
		email.style.backgroundColor = corCompleta;
	}
}
function validaNascimento(d) {
	if (d.value == "" || !vDate.test(d.value)) {
		Swal.fire({
			icon: "error",
			title: "ERRO",
			text: "A data de nascimento esta invalido!",
			footer: 'Verifique se todos os números estão corretos.'
		});
		validacao = false;
		d.style.backgroundColor = "red";
	}else {
		d.style.backgroundColor = corCompleta;
	}
}
function validaCep(cep) {
	if (cep.value == "" || !vCep.test(cep.value)) {
		Swal.fire({
			icon: "error",
			title: "ERRO",
			text: "O cep digitado esta invalido!",
			footer: 'Verifique se todos os números estão corretos.'
		});
		validacao = false;
		cep.style.backgroundColor = "red";
	}else {
		cep.style.backgroundColor = corCompleta;
	}
}
function validaCelular(cll) {
	if (cll.value == "" || !vCll.test(cll.value)) {
		Swal.fire({
			icon: "error",
			title: "ERRO",
			text: "Número de Telefone invalido!",
			footer: 'Verifique se todos os números estão corretos.'
		});
		validacao = false;
		cll.style.backgroundColor = "red";
	}else {
		cll.style.backgroundColor = corCompleta;
	}
}
function validaRg(rg) {
	if (rg.value == "" || !vRg.test(rg.value)) {
		Swal.fire({
			icon: "error",
			title: "ERRO",
			text: "O rg digitado esta incorreto!",
			footer: 'Verifique se todos os números estão corretos.'
		});
		validacao = false;
		rg.style.backgroundColor = "red";
	}else {
		rg.style.backgroundColor = corCompleta;
	}
}
function validaCpf(cpf) {
	if (cpf.value == "" || !vCpf.test(cpf.value)) {
		Swal.fire({
			icon: "error",
			title: "ERRO",
			text: "CPF inválido!",
			footer: 'O CPF deve estar no formato correto.'
		});
		validacao = false;
		cpf.style.backgroundColor = "red";
	}else {
		cpf.style.backgroundColor = corCompleta;
	}
}
function validaSenha(senha, confirmar) {
	if (senha.value != confirmar.value) {
		Swal.fire({
			icon: "error",
			title: "ERRO",
			text: "As senhas devem ser iguais!",
			footer: 'Por favor, verifique as senhas digitadas.'
		});
		validacao = false;
		senha.style.backgroundColor = "red";
		confirmar.style.backgroundColor = "red";
	}
	if (senha.value == "" || !vSenha.test(senha.value)) {
		Swal.fire({
			icon: "error",
			title: "ERRO",
			text: "Senha inválida!",
			footer: 'A senha deve conter entre 6 e 12 caracteres, incluindo letras e números.'
		});
		validacao = false;
		senha.style.backgroundColor = "red";
	}
	if(senha.value == confirmar.value){
		senha.style.backgroundColor = corCompleta;
		confirmar.style.backgroundColor = corCompleta;
	}
}

function enviarForm(s,sc){
	
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
		t.style.backgroundColor = "red";
	}
	else if (m < x) {
		t.style.borderColor = corIncompleta;
		t.style.backgroundColor = corIncompleta;
	} else {
		t.style.borderColor = corCompleta;
		t.style.backgroundColor = corCompleta;
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
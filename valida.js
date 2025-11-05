const vEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// senha ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,12}$
// nome /^\p{L}+(?:[ '-]\p{L}+)+$/u ou ^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)+$
//cpf ^(?!00000000000|11111111111|22222222222|33333333333|44444444444|55555555555|66666666666|77777777777|88888888888|99999999999)\d{11}$

//^[0-9]{5,9}$|^[0-9]{1,3}(\.[0-9]{3})*\-[0-9Xx]$

// Exemplo de uso:
// if (vEmail.test(document.getElementById('email').value)) { ... }

var corCompleta = "#99ff8f"
var corIncompleta = "#eff70b"

function ResetCampos(){
    var textFields = document.getElementsByTagName("input");
        for(var i=0; i < textFields.length; i++){
        if(textFields[i].type == "text"){
            textFields[i].style.backgroundColor = "";
            textFields[i].style.borderColor = "";
        }
    }   
}

function coresMask(t){
	var l = t.value;
	var m = l.length;
	var x = t.maxLength;
	if(m==0){
		t.style.borderColor="red";
		t.style.backgroundColor="red";
	}
	else if(m<x){
		t.style.borderColor=corIncompleta;
		t.style.backgroundColor=corIncompleta;
	}else{
		t.style.borderColor=corCompleta;
		t.style.backgroundColor=corCompleta;
	}
}

function mascara(m,t,e,c){
	var cursor = t.selectionStart;
	var texto = t.value;
	texto = texto.replace(/\D/g,'');
	var l = texto.length;
	var lm = m.length;
	if(window.event) {                  
	    id = e.keyCode;
	} else if(e.which){                 
	    id = e.which;
	}
	cursorfixo=false;
	if(cursor < l)cursorfixo=true;
	var livre = false;
	if(id == 16 || id == 19 || (id >= 33 && id <= 40))livre = true;
 	ii=0;
 	mm=0;
 	if(!livre){
	 	if(id!=8){
		 	t.value="";
		 	j=0;
		 	for(i=0;i<lm;i++){
		 		if(m.substr(i,1)=="#"){
		 			t.value+=texto.substr(j,1);
		 			j++;
		 		}else if(m.substr(i,1)!="#"){
		 			t.value+=m.substr(i,1);
		 		}
		 		if(id!=8 && !cursorfixo)cursor++;
		 		if((j)==l+1)break;
		 		
		 	} 	
	 	}
	 	if(c)coresMask(t);
 	}
 	if(cursorfixo && !livre)cursor--;
 	t.setSelectionRange(cursor, cursor);
}
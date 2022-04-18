var dados = []

function ApagaRegistro(id){
    let _confirm = confirm("Deseja realmente excluir este registro?")

    if(_confirm){
        for(let i = 0; i < dados.length; i++){
            if(dados[i].ID == id){
                dados.splice(i, 1)
            }
        }
        PopulaTabela()
    }
}

function EditaRegistro(id){
    $("#modalRegistro").modal("show")

    dados.forEach(function(item) {
        if(item.ID == id){
            $("#txtNome").val(item.Nome)
            $("#txtSobrenome").val(item.Sobrenome)
            $("#txtDtNascimento").val(item.DtNascimento.substr(6, 4) + "-" + item.DtNascimento.substr(3, 2) + "-" + item.DtNascimento.substr(0, 2))
            $("#txtFormacao").val(item.Formacao)
        }
    })
}

function PopulaTabela(){
    if(Array.isArray(dados)){

        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#tblDados tbody").html("")
        
        dados.forEach(function (item) {
            // Template String
            $("#tblDados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.Nome}</td>
                <td>${item.Sobrenome}</td>
                <td>${item.DtNascimento}</td>
                <td>${item.Formacao}</td>
                <td><button type"button" class="btn btn-primary" onclick="javascript:EditaRegistro(${item.ID});"><i class="bi bi-pencil-square"></i></button></td>
                <td><button type"button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});"><i class="bi bi-trash3"></i></button></td>
            </tr>`)
        })
    }
}

$(function() {
    // Executa ao carregar da tela
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados){
        PopulaTabela()
    }
    $("#btnSalvar").click(function(){
        // evento click botão salvar
        let Nome           = $("#txtNome").val()
        let Sobrenome      = $("#txtSobrenome").val()     
        let DtNascimento   = $("#txtDtNascimento").val()
        let Formacao       = $("#txtFormacao").val()
        
        let registro = {}

        registro.Nome         = Nome
        registro.Sobrenome    = Sobrenome
        registro.DtNascimento = DtNascimento
        registro.Formacao     = Formacao

        registro.ID = dados.length + 1
        dados.push(registro)
        alert("Registro salvo com sucesso")
        $("#modalRegistro").modal("hide")

        // limpar dados
        $("#txtNome").val("")
        $("#txtSobrenome").val("")
        $("#txtDtNascimento").val("")
        $("#txtFormacao").val("")

        PopulaTabela()

    })
})
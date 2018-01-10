const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    salvaDados(curso, tempoEstudado){
        let arquivoDoCurso = `${__dirname}/data/${curso}.json`; 
        if(fs.existsSync()){
            this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
        } else {
            this.criaArquivoDeCurso(arquivoDoCurso,{})
                .then(()=>{
                    this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    },
    adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado){
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado
        }
        jsonfile.writeFile(arquivoDoCurso, dados, {spaces: 2})
            .then(()=>{
                console.log('tempo salvo com sucesso');
            })
            .catch(()=>{
                console.log('Deu erro');
            })
    },
    criaArquivoDeCurso(nomeArquivo, conteudoArquivo){
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
            .then(()=>{
                console.log('Arquivo Criado');
            })
            .catch((err)=>{
                console.log(err);
            });
    },
    getData(nomeCurso){
        let arquivoDoCurso = `${__dirname}/data/${nomeCurso}.json`;
        return jsonfile.readFile(arquivoDoCurso);
            
    }
}
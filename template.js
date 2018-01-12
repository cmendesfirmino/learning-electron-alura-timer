const data = require('./data');


module.exports = {
  templeteInicial: null,

  geraTrayTemplate(win){


    let template = [
      {'label':'Cursos'},
      {type:'separator'}
    ];
    let cursos = data.pegaNomeDosCursos(win);
    cursos.forEach((curso)=>{
      let menuItem = {
        label: curso,
        type: 'radio',
        click: ()=>{
          win.send('curso-trocado', curso);
        }
      }
      template.push(menuItem);
    });
    this.templeteInicial = template;
    return template;
  },
  adicionaCursoNoTray(curso){
    console.log(this.templateInicial);
    this.templateInicial.push({
        label: curso,
        type: 'radio',
        checked: true,
        click: () => {
          win.send('curso-trocado', curso);
        }
      }
    );
    return this.templateInicial;
  }
}

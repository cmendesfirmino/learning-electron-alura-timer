const { ipcMain } = require('electron');

const data = require('./data');

module.exports = {
    templateInicial: null,

    geraTrayTemplate(win) {
        let template = [
            {
                'label': 'Cursos'
            },
            {
                type: 'separator'
            }
        ];

        let cursos = data.pegaNomeDosCursos();
        cursos.forEach((curso) => {
            let menuItem = {
                label: curso,
                click: () => {
                    win.send('curso-trocado', curso);
                }
            }
            template.push(menuItem);
        });
        this.templateInicial = template;
        return template;
    },
    adicionaCursoNoTray(curso, win) {
        this.templateInicial.push({
            label: curso,
            checked: true,
            click: () => {
                win.send('curso-trocado', curso);
            }
        })

        return this.templateInicial;
    },
    geraMenuPrincipalTemplate(app) {
        let templateMenu = [
            {
                label: 'Cursos',
                submenu: this.templateInicial
            },
            {
                label: 'View',
                submenu: [
                    {role: 'reload'},
                    {role: 'togglefullscreen'},
                    {role: 'toggledevtools'}
                ]
            }
        ];

        let templateSobre = {
            label: null,
            submenu: [{
                label: 'Sobre',
                accelerator: 'CmdOrCtrl+I',
                click: () => {
                    ipcMain.emit('abrir-janela-sobre')
                }
            }]
        };

        if(process.platform == 'darwin'){
            templateSobre.label =  app.getName();
            templateMenu.unshift(templateSobre);
        } else {
            templateSobre.label = "Sobre";
            templateMenu.push(templateSobre);
        }
        
        return templateMenu;
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    Object.defineProperty(Usuario.prototype, "nomeCompleto", {
        get: function () {
            return this.nome + " " + this.sobrenome;
        },
        enumerable: true,
        configurable: true
    });
    Usuario.usuarioMap = function (usuario) {
        var u = new Usuario();
        u.id = usuario.id;
        u.nome = usuario.nome;
        u.sobrenome = usuario.sobrenome;
        u.email = usuario.email;
        u.senha = usuario.senha;
        u.cargo = usuario.cargo;
        u.token = usuario.token;
        return u;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map
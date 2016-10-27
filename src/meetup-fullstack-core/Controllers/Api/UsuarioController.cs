using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace meetup_fullstack_core.Controllers.Api
{
    [Route("api/[controller]")]
    public class UsuarioController
    {
        private readonly Usuarios _usuarios;

        public UsuarioController(Usuarios usuarios)
        {
            _usuarios = usuarios;
        }

        public IEnumerable<Usuario> Get() =>
            _usuarios.Todos();
    }
}

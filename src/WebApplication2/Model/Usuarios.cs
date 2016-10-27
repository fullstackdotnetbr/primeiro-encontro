using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace meetup_fullstack_core.Model
{
    public class Usuarios
    {
        public List<Usuario> Todos() =>
            new List <Usuario>
            {
                new Usuario { Id = 1, Nome = "Heber Pereira", Imagem = "https://pbs.twimg.com/profile_images/669623554397364225/YY5TiMJY_400x400.jpg" },
                new Usuario { Id = 2, Nome = "Fabio Damasceno", Imagem = "https://pbs.twimg.com/profile_images/626377132332158976/a4-aDQJy_400x400.png" },
                new Usuario { Id = 3, Nome = "Igor Abade", Imagem = "https://pbs.twimg.com/profile_images/733483808255836160/OilPjHjB_400x400.jpg" },
                new Usuario { Id = 4, Nome = "Wennder Wesley Uender", Imagem = "https://pbs.twimg.com/profile_images/654465049524862976/6wp3EmQM_400x400.jpg" },
                new Usuario { Id = 5, Nome = "Vinícius Quaiato", Imagem = "https://pbs.twimg.com/profile_images/742336884580487168/sm3t8_1t_400x400.jpg" },
            };
    }
}

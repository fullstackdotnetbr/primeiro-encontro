using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace meetup_fullstack_core
{
    public class Feedbacks
    {
        private static readonly List<FeedbackItem> _feedbacks;
        private readonly Usuarios _usuarios;

        static Feedbacks()
        {
            _feedbacks = new List<FeedbackItem>
            {
                new FeedbackItem { Id = 2, Texto = "Irmão mais novo do Victor Hugo" },
                new FeedbackItem { Id = 4, Texto = "Ninguém acerta o nome dele :(" }
            };
        }

        public Feedbacks(Usuarios usuarios)
        {
            _usuarios = usuarios;
        }

        public IEnumerable<Feedback> Todos() =>
            from f in _feedbacks
            join u in _usuarios.Todos()
            on f.Id equals u.Id
            select new Feedback
            {
                Id = u.Id,
                Nome = u.Nome,
                Texto = f.Texto,
                Imagem = u.Imagem
            };

        public Feedback DoUsuario(int idUsuario) =>
            Todos().FirstOrDefault(f => f.Id == idUsuario);

        public Feedback Adicionar(int idUsuario, string texto)
        {
            _feedbacks.Add(new FeedbackItem { Id = idUsuario, Texto = texto });
            return DoUsuario(idUsuario);
        }
    }
}

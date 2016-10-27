
namespace meetup_fullstack_core.Model
{
    public class Feedback
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Texto { get; set; }
        public string Imagem { get; set; }
    }

    public class FeedbackItem
    {
        public int Id { get; set; }
        public string Texto { get; set; }
    }
}

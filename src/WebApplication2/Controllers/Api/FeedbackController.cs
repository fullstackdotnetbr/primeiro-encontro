using meetup_fullstack_core.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace meetup_fullstack_core.Controllers.Api
{
    [Route("api/[controller]")]
    public class FeedbackController
    {
        private readonly Feedbacks _feedbacks;

        public FeedbackController(Feedbacks feedbacks)
        {
            _feedbacks = feedbacks;
        }

        public IEnumerable<Feedback> Get() =>
            _feedbacks.Todos();

        [HttpPost]
        public Feedback Post([FromBody] Feedback feedback) =>
            _feedbacks.Adicionar(feedback.Id, feedback.Texto);
    }
}

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

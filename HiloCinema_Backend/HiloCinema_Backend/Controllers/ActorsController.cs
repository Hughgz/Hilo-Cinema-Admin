using HiloCinema_Backend.Dtos;
using HiloCinema_Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiloCinema_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly HiloCinemaContext _context;

        public ActorsController(HiloCinemaContext context)
        {
            _context = context;
        }

        // GET: api/Actors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActorDTO>>> GetActors()
        {
            var actors = await _context.Actors
                .Include(actor => actor.Movies)
                .Select(actor => new ActorDTO
                {
                    Id = actor.Id,
                    Name = actor.Name,
                    Description = actor.Description,
                    Img = actor.Img,
                    Movies = actor.Movies.Select(movie => new MovieDTO
                    {
                        Id = movie.Id,
                        Title = movie.Title,
                        Duration = movie.Duration,
                        ReleasedDate = movie.ReleasedDate,
                        Rate = movie.Rate,
                        Country = movie.Country,
                        Director = movie.Director,
                        Description = movie.Description,
                        ImgSmall = movie.ImgSmall,
                        ImgLarge = movie.ImgLarge,
                        MovieType = movie.MovieType,
                        Trailer = movie.Trailer,
                        Status = movie.Status
                    }).ToList()
                })
                .ToListAsync();

            return actors;
        }

        // GET: api/Actors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActorDTO>> GetActor(int id)
        {
            var actor = await _context.Actors
                .Include(actor => actor.Movies)
                .Select(actor => new ActorDTO
                {
                    Id = actor.Id,
                    Name = actor.Name,
                    Description = actor.Description,
                    Img = actor.Img,
                    Movies = actor.Movies.Select(movie => new MovieDTO
                    {
                        Id = movie.Id,
                        Title = movie.Title,
                        Duration = movie.Duration,
                        ReleasedDate = movie.ReleasedDate,
                        Rate = movie.Rate,
                        Country = movie.Country,
                        Director = movie.Director,
                        Description = movie.Description,
                        ImgSmall = movie.ImgSmall,
                        ImgLarge = movie.ImgLarge,
                        MovieType = movie.MovieType,
                        Trailer = movie.Trailer,
                        Status = movie.Status
                    }).ToList()
                })
                .FirstOrDefaultAsync(actor => actor.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            return actor;
        }

        // PUT: api/Actors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActor(int id, Actor actor)
        {
            if (id != actor.Id)
            {
                return BadRequest();
            }

            _context.Entry(actor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Actors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Actor>> PostActor(Actor actor)
        {
            _context.Actors.Add(actor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActor", new { id = actor.Id }, actor);
        }

        // DELETE: api/Actors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActor(int id)
        {
            var actor = await _context.Actors.FindAsync(id);
            if (actor == null)
            {
                return NotFound();
            }

            _context.Actors.Remove(actor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActorExists(int id)
        {
            return _context.Actors.Any(e => e.Id == id);
        }
    }
}

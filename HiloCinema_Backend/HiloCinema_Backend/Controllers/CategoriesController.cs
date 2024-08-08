using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HiloCinema_Backend.Model;
using HiloCinema_Backend.Dtos;

namespace HiloCinema_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly HiloCinemaContext _context;

        public CategoriesController(HiloCinemaContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetCategories()
        {
            var categories = await _context.Categories
            .Include(c => c.Movies)
                .Select(c => new CategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Movies = c.Movies.Select(m => new MovieDTO
                    {
                        Id = m.Id,
                        Title = m.Title,
                        Duration = m.Duration,
                        ReleasedDate = m.ReleasedDate,
                        Rate = m.Rate,
                        Country = m.Country,
                        Director = m.Director,
                        Description = m.Description,
                        ImgSmall = m.ImgSmall,
                        ImgLarge = m.ImgLarge,
                        MovieType = m.MovieType,
                        Trailer = m.Trailer,
                        Status = m.Status
                    }).ToList()
                })
                .ToListAsync();

            return categories;
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
        {
            var category = await _context.Categories
            .Include(c => c.Movies)
                .Select(c => new CategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Movies = c.Movies.Select(m => new MovieDTO
                    {
                        Id = m.Id,
                        Title = m.Title,
                        Duration = m.Duration,
                        ReleasedDate = m.ReleasedDate,
                        Rate = m.Rate,
                        Country = m.Country,
                        Director = m.Director,
                        Description = m.Description,
                        ImgSmall = m.ImgSmall,
                        ImgLarge = m.ImgLarge,
                        MovieType = m.MovieType,
                        Trailer = m.Trailer,
                        Status = m.Status
                    }).ToList()
                })
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using HiloCinema_Backend.Model;

namespace HiloCinema_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
        private readonly HiloCinemaContext _context;

        public SeatsController(HiloCinemaContext context)
        {
            _context = context;
        }

        // GET: api/Seats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seat>>> GetSeats()
        {
            return await _context.Seats.ToListAsync();
        }

        // GET: api/Seats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Seat>> GetSeat(int id)
        {
            var seat = await _context.Seats.FindAsync(id);

            if (seat == null)
            {
                return NotFound();
            }

            return seat;
        }

        // PUT: api/Seats/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeat(int id, Seat seat)
        {
            if (id != seat.RoomId)
            {
                return BadRequest();
            }

            _context.Entry(seat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeatExists(id))
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

        // POST: api/Seats
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Seat>> PostSeat(Seat seat)
        {
            _context.Seats.Add(seat);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SeatExists(seat.RoomId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSeat", new { id = seat.RoomId }, seat);
        }

        // DELETE: api/Seats/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSeat(int id)
        {
            var seat = await _context.Seats.FindAsync(id);
            if (seat == null)
            {
                return NotFound();
            }

            _context.Seats.Remove(seat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SeatExists(int id)
        {
            return _context.Seats.Any(e => e.RoomId == id);
        }
    }
}
